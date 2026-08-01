// Fetches reviews from Google Business Profile (via Places API "Place Details")
// and returns them in the same shape the frontend already expects from
// list-reviews-public.js, so they can render side-by-side or merged.
//
// Required Netlify env vars (Site settings -> Environment variables):
//   GOOGLE_PLACES_API_KEY - API key with "Places API" enabled in Google Cloud
//   GOOGLE_PLACE_ID        - the Place ID for the Apex Detailing business listing
//
// Notes:
// - Google's Places API only returns up to 5 reviews (the ones Google picks
//   as "most relevant"), not the full review history. This is a Google
//   platform limit, not something we can work around from the frontend.
// - Response is cached in-memory for 1 hour per function instance to avoid
//   unnecessary API calls / cost.

let cache = { data: null, ts: 0 };
const CACHE_MS = 60 * 60 * 1000; // 1 hour

exports.handler = async function () {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviews: [], configured: false }),
    };
  }

  if (cache.data && Date.now() - cache.ts < CACHE_MS) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cache.data),
    };
  }

  try {
    const url =
      "https://maps.googleapis.com/maps/api/place/details/json" +
      "?place_id=" + encodeURIComponent(placeId) +
      "&fields=name,rating,user_ratings_total,reviews,url" +
      "&key=" + apiKey;

    const res = await fetch(url);
    const json = await res.json();

    if (json.status !== "OK") {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviews: [], configured: true, error: json.status }),
      };
    }

    const result = json.result || {};
    const reviews = (result.reviews || []).map((r) => ({
      author: r.author_name,
      authorPhoto: r.profile_photo_url || null,
      rating: r.rating,
      text: r.text,
      relativeTime: r.relative_time_description,
      time: r.time, // unix seconds
      source: "google",
    }));

    const payload = {
      reviews: reviews,
      overallRating: result.rating || null,
      totalReviews: result.user_ratings_total || null,
      mapsUrl: result.url || null,
      configured: true,
    };

    cache = { data: payload, ts: Date.now() };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviews: [], configured: true, error: String(err) }),
    };
  }
};

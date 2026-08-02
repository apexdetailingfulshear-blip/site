const { getBlobStore } = require("./_blob-store");
const { ensureReviewsSeeded, SEED_MARKER } = require("./_reviews-seed");

function reviewsStore() {
  return getBlobStore("reviews");
}

exports.handler = async function (event) {
  const adminKey = process.env.ADMIN_KEY;
  const headers = event.headers || {};
  const provided = headers["x-admin-key"] || headers["X-Admin-Key"];
  if (!adminKey) return { statusCode: 500, body: "ADMIN_KEY is not configured on the server." };
  if (!provided || provided !== adminKey) return { statusCode: 401, body: "Unauthorized" };

  try {
    const store = reviewsStore();
    const justSeeded = await ensureReviewsSeeded(store);
    const { blobs } = await store.list();
    const items = [];
    const seenIds = new Set();
    for (const b of blobs) {
      if (b.key === SEED_MARKER) continue;
      try {
        const rec = await store.get(b.key, { type: "json" });
        if (rec) { items.push(rec); seenIds.add(rec.id); }
      } catch (itemErr) {
        continue;
      }
    }
    if (justSeeded) {
      for (const rec of justSeeded) {
        if (!seenIds.has(rec.id)) items.push(rec);
      }
    }
    items.sort(function (a, b2) {
      return new Date(b2.fecha) - new Date(a.fecha);
    });
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    };
  } catch (e) {
    return { statusCode: 500, body: "Error: " + e.message };
  }
};

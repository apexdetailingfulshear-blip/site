const { getBlobStore } = require("./_blob-store");
const { ensureReviewsSeeded } = require("./_reviews-seed");

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
    const staticItems = await ensureReviewsSeeded(store);
    const seenIds = new Set(staticItems.map(function (r) { return r.id; }));
    const items = staticItems.slice();
    const { blobs } = await store.list();
    for (const b of blobs) {
      if (seenIds.has(b.key)) continue;
      try {
        const rec = await store.get(b.key, { type: "json" });
        if (rec) { items.push(rec); seenIds.add(rec.id); }
      } catch (itemErr) {
        continue;
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

const { getBlobStore } = require("./_blob-store");
const { ensureReviewsSeeded } = require("./_reviews-seed");

function reviewsStore() {
  return getBlobStore("reviews");
}

exports.handler = async function () {
  try {
    const store = reviewsStore();
    const staticItems = (await ensureReviewsSeeded(store)).filter(function (r) { return r.estado === "aprobada"; });
    const seenIds = new Set(staticItems.map(function (r) { return r.id; }));
    const items = staticItems.slice();
    const { blobs } = await store.list();
    for (const b of blobs) {
      if (seenIds.has(b.key)) continue;
      const rec = await store.get(b.key, { type: "json" });
      if (rec && rec.estado === "aprobada") {
        items.push(rec);
        seenIds.add(rec.id);
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

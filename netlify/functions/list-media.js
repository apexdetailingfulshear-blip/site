const { getStore } = require("@netlify/blobs");

function metaStore() {
  return getStore({
    name: "media-meta",
    siteID: process.env.SITE_ID,
    token: process.env.NETLIFY_API_TOKEN,
  });
}

exports.handler = async function () {
  try {
    const store = metaStore();
    const { blobs } = await store.list();
    const items = [];
    for (const b of blobs) {
      const rec = await store.get(b.key, { type: "json" });
      if (rec) {
        rec.url = "/.netlify/functions/media-file?id=" + encodeURIComponent(rec.id);
        items.push(rec);
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

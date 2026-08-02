const { getBlobStore } = require("./lib/blob-store");

function metaStore() {
  return getBlobStore("media-meta");
}

var STATIC_GALLERY = [
  { type: "video", src: "/assets/gallery/video-1.mp4" },
  { type: "video", src: "/assets/gallery/video-2.mp4" },
  { type: "video", src: "/assets/gallery/video-3.mp4" },
  { type: "video", src: "/assets/gallery/video-4.mp4" },
  { type: "video", src: "/assets/gallery/video-5.mp4" },
  { type: "image", src: "/assets/gallery/photo-1.jpg" },
  { type: "image", src: "/assets/gallery/photo-2.jpg" },
  { type: "image", src: "/assets/gallery/photo-3.jpg" },
  { type: "image", src: "/assets/gallery/photo-4.jpg" },
  { type: "image", src: "/assets/gallery/photo-5.jpg" },
  { type: "image", src: "/assets/gallery/photo-6.jpg" },
  { type: "image", src: "/assets/gallery/photo-7.jpg" },
  { type: "image", src: "/assets/gallery/photo-8.jpg" },
];

function staticMediaRecords() {
  return STATIC_GALLERY.map(function (g, i) {
    return {
      id: "static-" + (i + 1),
      tipo: g.type === "video" ? "video" : "photo",
      categoria: "Full Detail",
      titulo: "",
      descripcion: "",
      contentType: g.type === "video" ? "video/mp4" : "image/jpeg",
      size: 0,
      fecha: new Date(2026, 0, 1, 0, 0, i).toISOString(),
      static: true,
      url: g.src,
    };
  });
}

// Self-healing: checks each expected static item directly by key (strongly
// consistent) and (re)writes any that are missing. Does not rely on list().
async function ensureSeeded(store) {
  var expected = staticMediaRecords();
  var result = [];
  for (var i = 0; i < expected.length; i++) {
    var rec = expected[i];
    var existing = await store.get(rec.id, { type: "json" }).catch(function () { return null; });
    if (!existing) {
      await store.setJSON(rec.id, rec);
      result.push(rec);
    } else {
      result.push(existing);
    }
  }
  return result;
}

exports.handler = async function () {
  try {
    const store = metaStore();
    const staticItems = await ensureSeeded(store);
    const seenIds = new Set(staticItems.map(function (r) { return r.id; }));
    const items = staticItems.slice();
    const { blobs } = await store.list();
    for (const b of blobs) {
      if (seenIds.has(b.key)) continue;
      const rec = await store.get(b.key, { type: "json" });
      if (rec) {
        rec.url = "/.netlify/functions/media-file?id=" + encodeURIComponent(rec.id);
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

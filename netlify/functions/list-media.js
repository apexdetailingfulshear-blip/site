const { getBlobStore } = require("./_blob-store");

function metaStore() {
  return getBlobStore("media-meta");
}

var SEED_MARKER = "__seed_v1__";
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

async function ensureSeeded(store) {
  var marker = await store.get(SEED_MARKER, { type: "json" }).catch(function () { return null; });
  if (marker) return;
  for (var i = 0; i < STATIC_GALLERY.length; i++) {
    var g = STATIC_GALLERY[i];
    var id = "static-" + (i + 1);
    var rec = {
      id: id,
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
    await store.setJSON(id, rec);
  }
  await store.setJSON(SEED_MARKER, { done: true, at: new Date().toISOString() });
}

exports.handler = async function () {
  try {
    const store = metaStore();
    await ensureSeeded(store);
    const { blobs } = await store.list();
    const items = [];
    for (const b of blobs) {
      if (b.key === SEED_MARKER) continue;
      const rec = await store.get(b.key, { type: "json" });
      if (rec) {
        if (!rec.static) rec.url = "/.netlify/functions/media-file?id=" + encodeURIComponent(rec.id);
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

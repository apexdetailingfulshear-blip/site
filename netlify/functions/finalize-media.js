const { getStore } = require("@netlify/blobs");

function chunksStore() {
  return getStore({
    name: "media-chunks",
    siteID: process.env.SITE_ID,
    token: process.env.NETLIFY_API_TOKEN,
  });
}
function filesStore() {
  return getStore({
    name: "media-files",
    siteID: process.env.SITE_ID,
    token: process.env.NETLIFY_API_TOKEN,
  });
}
function metaStore() {
  return getStore({
    name: "media-meta",
    siteID: process.env.SITE_ID,
    token: process.env.NETLIFY_API_TOKEN,
  });
}

var CATEGORIAS = [
  "Full Detail",
  "Interior Detail",
  "Exterior Detail",
  "Ceramic Coating",
  "Polishing",
  "Headlight Restoration",
  "Before & After",
];

exports.handler = async function (event) {
  const adminKey = process.env.ADMIN_KEY;
  const headers = event.headers || {};
  const provided = headers["x-admin-key"] || headers["X-Admin-Key"];
  if (!adminKey) return { statusCode: 500, body: "ADMIN_KEY is not configured on the server." };
  if (!provided || provided !== adminKey) return { statusCode: 401, body: "Unauthorized" };
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const id = data.id;
  const totalChunks = parseInt(data.totalChunks, 10);
  const tipo = data.tipo === "video" ? "video" : "photo";
  const categoria = CATEGORIAS.indexOf(data.categoria) !== -1 ? data.categoria : "Full Detail";
  const titulo = (data.titulo || "").toString().trim().slice(0, 120);
  const descripcion = (data.descripcion || "").toString().trim().slice(0, 500);
  const contentType = (data.contentType || (tipo === "video" ? "video/mp4" : "image/jpeg")).toString();

  if (!id || !totalChunks) return { statusCode: 400, body: "Faltan parametros." };

  try {
    const cStore = chunksStore();
    const parts = [];
    for (let i = 0; i < totalChunks; i++) {
      const buf = await cStore.get(id + "::" + i, { type: "arrayBuffer" });
      if (!buf) return { statusCode: 400, body: "Falta el fragmento " + i };
      parts.push(Buffer.from(buf));
    }
    const full = Buffer.concat(parts);

    const fStore = filesStore();
    await fStore.set(id, full, { metadata: { contentType: contentType } });

    for (let i = 0; i < totalChunks; i++) {
      await cStore.delete(id + "::" + i);
    }

    const mStore = metaStore();
    const record = {
      id: id,
      tipo: tipo,
      categoria: categoria,
      titulo: titulo,
      descripcion: descripcion,
      contentType: contentType,
      size: full.length,
      fecha: new Date().toISOString(),
    };
    await mStore.setJSON(id, record);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, item: record }),
    };
  } catch (e) {
    return { statusCode: 500, body: "Error: " + e.message };
  }
};

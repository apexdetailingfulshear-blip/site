const { getStore } = require("@netlify/blobs");

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
  if (!id) return { statusCode: 400, body: "Falta id" };

  try {
    const store = metaStore();
    const rec = await store.get(id, { type: "json" });
    if (!rec) return { statusCode: 404, body: "No encontrado" };
    if (typeof data.titulo === "string") rec.titulo = data.titulo.trim().slice(0, 120);
    if (typeof data.descripcion === "string") rec.descripcion = data.descripcion.trim().slice(0, 500);
    if (CATEGORIAS.indexOf(data.categoria) !== -1) rec.categoria = data.categoria;
    await store.setJSON(id, rec);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, item: rec }),
    };
  } catch (e) {
    return { statusCode: 500, body: "Error: " + e.message };
  }
};

const { getStore } = require("@netlify/blobs");

function reviewsStore() {
  return getStore({
    name: "reviews",
    siteID: process.env.SITE_ID,
    token: process.env.NETLIFY_API_TOKEN,
  });
}

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
  const action = data.action;
  if (!id || !action) return { statusCode: 400, body: "Faltan parametros." };

  try {
    const store = reviewsStore();
    const rec = await store.get(id, { type: "json" });
    if (!rec) return { statusCode: 404, body: "No encontrada" };

    if (action === "delete") {
      await store.delete(id);
      return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: true }) };
    }
    if (action === "approve") {
      rec.estado = "aprobada";
    } else if (action === "reject") {
      rec.estado = "rechazada";
    } else if (action === "edit") {
      if (typeof data.nombre === "string") rec.nombre = data.nombre.trim().slice(0, 80);
      if (typeof data.comentario === "string") rec.comentario = data.comentario.trim().slice(0, 1000);
      if (data.calificacion) {
        const c = parseInt(data.calificacion, 10);
        if (c >= 1 && c <= 5) rec.calificacion = c;
      }
    } else {
      return { statusCode: 400, body: "Accion invalida." };
    }

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

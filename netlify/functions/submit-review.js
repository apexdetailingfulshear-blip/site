const { getStore } = require("@netlify/blobs");

function reviewsStore() {
  return getStore({
    name: "reviews",
    siteID: process.env.SITE_ID,
    token: process.env.NETLIFY_API_TOKEN,
  });
}

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const nombre = (data.nombre || "").toString().trim().slice(0, 80);
  const comentario = (data.comentario || "").toString().trim().slice(0, 1000);
  let calificacion = parseInt(data.calificacion, 10);
  if (!nombre) return { statusCode: 400, body: "El nombre es requerido." };
  if (!comentario) return { statusCode: 400, body: "El comentario es requerido." };
  if (!calificacion || calificacion < 1 || calificacion > 5) {
    return { statusCode: 400, body: "Calificacion invalida." };
  }

  let foto = null;
  if (typeof data.foto === "string" && data.foto.indexOf("data:image/") === 0) {
    if (data.foto.length > 1500000) {
      return { statusCode: 400, body: "La imagen es demasiado grande." };
    }
    foto = data.foto;
  }

  try {
    const store = reviewsStore();
    const id = Date.now() + "-" + Math.random().toString(36).slice(2, 8);
    const record = {
      id: id,
      nombre: nombre,
      comentario: comentario,
      calificacion: calificacion,
      foto: foto,
      estado: "pendiente",
      fecha: new Date().toISOString(),
    };
    await store.setJSON(id, record);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, id: id }),
    };
  } catch (e) {
    return { statusCode: 500, body: "Error guardando resena: " + e.message };
  }
};

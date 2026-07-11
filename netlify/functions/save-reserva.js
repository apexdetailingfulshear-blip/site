const { getStore } = require("@netlify/blobs");

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

  try {
    const store = getStore("reservas");
    const id = Date.now() + "-" + Math.random().toString(36).slice(2, 8);
    const record = Object.assign({}, data, {
      id: id,
      recibido: new Date().toISOString(),
    });

    await store.setJSON(id, record);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, id: id }),
    };
  } catch (e) {
    return { statusCode: 500, body: "Error saving reserva: " + e.message };
  }
};

const { getStore } = require("@netlify/blobs");

function chunksStore() {
  return getStore({
    name: "media-chunks",
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
  const index = data.index;
  const dataBase64 = data.dataBase64;
  if (!id || index === undefined || !dataBase64) {
    return { statusCode: 400, body: "Faltan parametros." };
  }

  try {
    const buf = Buffer.from(dataBase64, "base64");
    const store = chunksStore();
    await store.set(id + "::" + index, buf);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (e) {
    return { statusCode: 500, body: "Error: " + e.message };
  }
};

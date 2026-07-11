const { getStore } = require("@netlify/blobs");

exports.handler = async function (event) {
  const adminKey = process.env.ADMIN_KEY;
  const headers = event.headers || {};
  const provided =
    headers["x-admin-key"] ||
    headers["X-Admin-Key"] ||
    (event.queryStringParameters && event.queryStringParameters.key);

  if (!adminKey) {
    return { statusCode: 500, body: "ADMIN_KEY is not configured on the server." };
  }
  if (!provided || provided !== adminKey) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  try {
    const store = getStore("reservas");
    const { blobs } = await store.list();
    const items = [];
    for (const entry of blobs) {
      const val = await store.get(entry.key, { type: "json" });
      if (val) items.push(val);
    }
    items.sort(function (a, b) {
      return new Date(b.recibido || 0) - new Date(a.recibido || 0);
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    };
  } catch (e) {
    return { statusCode: 500, body: "Error listing reservas: " + e.message };
  }
};

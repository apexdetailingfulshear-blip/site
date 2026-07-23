const { getStore } = require("@netlify/blobs");

function filesStore() {
  return getStore({
    name: "media-files",
    siteID: process.env.SITE_ID,
    token: process.env.NETLIFY_API_TOKEN,
  });
}

exports.handler = async function (event) {
  const id = (event.queryStringParameters || {}).id;
  if (!id) return { statusCode: 400, body: "Falta id" };
  try {
    const store = filesStore();
    const result = await store.getWithMetadata(id, { type: "arrayBuffer" });
    if (!result || !result.data) return { statusCode: 404, body: "No encontrado" };
    const contentType = (result.metadata && result.metadata.contentType) || "application/octet-stream";
    return {
      statusCode: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
      body: Buffer.from(result.data).toString("base64"),
      isBase64Encoded: true,
    };
  } catch (e) {
    return { statusCode: 500, body: "Error: " + e.message };
  }
};

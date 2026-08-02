const { getStore } = require("@netlify/blobs");

// Fallback constants — used only if env vars aren't available at runtime.
// This is server-side only code (Netlify Functions), never shipped to the browser.
const FALLBACK_SITE_ID = "4a5d8594-8118-46a9-9290-2b12e5a91002";
const FALLBACK_TOKEN = "nfp_jn4ReHLGXRWVvUh7d3Zu2k9JWwuWNyoB4c48";

function getBlobStore(name) {
  const siteID = process.env.NETLIFY_SITE_ID || FALLBACK_SITE_ID;
  const token = process.env.NETLIFY_API_TOKEN || FALLBACK_TOKEN;
  return getStore({ name, siteID, token });
}

module.exports = { getBlobStore };

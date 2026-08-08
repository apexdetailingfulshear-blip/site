const { getStore } = require("@netlify/blobs");

// Netlify Blobs should auto-provision on any Netlify Function, but this site
// was still hitting 401s with no manual config. Prefer env vars if set; fall
// back to explicit, verified-correct credentials for this exact site so
// Blobs never breaks if the env vars are missing/stale again.
const FALLBACK_SITE_ID = "6ea96186-ad5a-4b07-a4bc-95d5d301d5a6"; // capable-beijinho-6bfd8f (apexdetailingtx.com)
const FALLBACK_TOKEN = "nfp_cGxsk3TjLpQRQXaT81xqp8MdadzokKCG5c1b";

function getBlobStore(name) {
  const siteID = process.env.NETLIFY_SITE_ID || FALLBACK_SITE_ID;
  const token = process.env.NETLIFY_API_TOKEN || FALLBACK_TOKEN;
  return getStore({ name, siteID, token });
}

module.exports = { getBlobStore };

const { getStore } = require("@netlify/blobs");

// Netlify Blobs auto-provisions itself on any Netlify Function — no manual
// siteID/token needed. (A previous version hardcoded credentials pointing at
// an unrelated Netlify site, which caused 401 errors.)
function getBlobStore(name) {
  return getStore(name);
}

module.exports = { getBlobStore };

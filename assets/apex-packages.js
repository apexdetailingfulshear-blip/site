/*
 * Apex Detailing — Packages (Full Detail / Ceramic Coating / Paint Correction)
 * Injected at runtime into <section id="paquetes"> because the site ships as a
 * compiled bundle with no editable source. All styles are scoped under
 * #apex-pkgs so nothing leaks into the rest of the site.
 *
 * Only these 3 packages exist. Package "name" is the exact string sent to
 * the booking system (data-book) — never translate or alter it.
 */
(function () {
"use strict";

var BOOKING_URL = "https://calendar.app.google/2VnG1xwYJw5LwXKXA";

/* ------------------------------------------------------------ i18n */
function getLang() {
var btns = document.querySelectorAll("header button, nav button, button");
for (var i = 0; i < btns.length; i++) {
var tx = (btns[i].textContent || "").trim();
if (/^Espa(ñ|n)ol$/i.test(tx)) return "es";
if (/^English$/i.test(tx)) return "en";
}
return (document.documentElement.lang || "en").slice(0, 2) === "es" ? "es" : "en";
}

// Only small pre-existing UI labels are translated. Package names,
// includes and prices stay in English everywhere (site content policy).
var ES = {
"Book Now": "Reservar",
"Starting at": "Desde",
};

function t(s) {
return getLang() === "es" && ES[s] ? ES[s] : s;
}

var DISCLAIMER = "Prices may change depending on the vehicle's model and cleanliness condition.";

var PACKAGES = [
{
id: "full-detail",
name: "Full Detail",
price: 400,
img: "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?q=80&w=900&auto=format&fit=crop",
includes: [
"Hand foam wash & paint-safe pre-rinse",
"Complete interior deep clean & steam",
"Full vacuum, dashboard, console & door detailing",
"Wheel, tire & trim detailing",
"Streak-free interior & exterior glass",
],
},
{
id: "ceramic-coating",
name: "Ceramic Coating",
price: 650,
img: "https://images.unsplash.com/photo-1708805282676-0c15476eb8a2?q=80&w=900&auto=format&fit=crop",
includes: [
"Multi-stage paint decontamination",
"Professional-grade ceramic coating application",
"Hydrophobic, water-beading protection",
"Deep mirror-like gloss & UV resistance",
"Long-term protection, not just a quick shine",
],
},
{
id: "paint-correction",
name: "Paint Correction",
price: 450,
img: "https://images.unsplash.com/photo-1632823469901-5d2cfff5ba50?q=80&w=900&auto=format&fit=crop",
includes: [
"Multi-stage machine polish",
"Swirl mark & light scratch removal",
"Mirror-finish paint restoration",
"Full before & after paint inspection",
"Ready for ceramic protection",
],
},
];

var STYLE = [
"#apex-pkgs, #apex-pkgs * { box-sizing: border-box; margin: 0; padding: 0; }",
"#apex-pkgs { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #fff; max-width: 1100px; margin: 0 auto; }",
"#apex-pkgs .section-header { text-align: center; margin-bottom: 32px; }",
"#apex-pkgs .section-header h2 { font-size: 2.4rem; font-weight: 700; margin-bottom: 10px; color: #fff; }",
"#apex-pkgs .section-header h2 span { color: #29b6f6; }",
"#apex-pkgs .section-header p { font-size: 1rem; color: #a8adb1; }",
"#apex-pkgs .section-header .disclaimer { margin-top: 12px; font-size: 0.8rem; color: #6b7075; }",
"#apex-pkgs .price-note { text-align: center; font-size: 12px; color: #29b6f6; background: rgba(41,182,246,.08); border: 1px solid rgba(41,182,246,.18); border-radius: 8px; padding: 9px 12px; max-width: 640px; margin: 20px auto 40px; }",
"#apex-pkgs .packages-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 28px; max-width: 1060px; margin: 0 auto; align-items: stretch; }",
"#apex-pkgs .pkg-card { background: #3a3f43; border: 1px solid #4b5257; border-radius: 18px; overflow: hidden; display: flex; flex-direction: column; transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }",
"#apex-pkgs .pkg-card:hover { transform: translateY(-6px); border-color: #29b6f6; box-shadow: 0 20px 40px rgba(0,0,0,.35), 0 0 0 1px rgba(41,182,246,.15); }",
"#apex-pkgs .pkg-img { width: 100%; height: 210px; object-fit: cover; display: block; background: #2e3337; }",
"#apex-pkgs .pkg-body { padding: 26px; display: flex; flex-direction: column; gap: 14px; flex: 1; }",
"#apex-pkgs .pkg-name { font-size: 1.3rem; font-weight: 700; color: #fff; letter-spacing: .01em; }",
"#apex-pkgs .service-list { list-style: none; display: flex; flex-direction: column; gap: 8px; flex: 1; }",
"#apex-pkgs .service-item { font-size: 13.5px; color: #c7ccd1; line-height: 1.5; padding-left: 20px; position: relative; }",
"#apex-pkgs .service-item::before { content: '\\2713'; position: absolute; left: 0; top: 0; color: #29b6f6; font-weight: 700; }",
"#apex-pkgs .pkg-total-row { display: flex; justify-content: space-between; align-items: baseline; padding-top: 14px; border-top: 1px solid #4b5257; }",
"#apex-pkgs .total-label { font-size: 12px; color: #a8adb1; text-transform: uppercase; letter-spacing: .05em; }",
"#apex-pkgs .total-amount { font-size: 1.7rem; font-weight: 700; color: #29b6f6; }",
"#apex-pkgs .card-disclaimer { font-size: 10px; color: #6b7075; line-height: 1.5; }",
"#apex-pkgs .btn-reserve { display: block; text-align: center; padding: 13px; border-radius: 10px; font-size: 15px; font-weight: 600; text-decoration: none; cursor: pointer; border: none; transition: background-color .2s ease; font-family: inherit; }",
"#apex-pkgs .btn-solid { background: #29b6f6; color: #fff; }",
"#apex-pkgs .btn-solid:hover { background: #139cd8; }",
"#apex-pkgs .btn-reserve:focus-visible { outline: 2px solid #29b6f6; outline-offset: 2px; }",
"@media (max-width: 600px) { #apex-pkgs .section-header h2 { font-size: 1.8rem; } }",
].join("\n");

function ensureStyle() {
if (document.getElementById("apex-pkgs-style")) return;
var s = document.createElement("style");
s.id = "apex-pkgs-style";
s.textContent = STYLE;
document.head.appendChild(s);
}

function esc(str) {
return String(str).replace(/[&<>"]/g, function (c) {
return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
});
}

function cardHTML(pkg) {
return (
'<div class="pkg-card" id="card-' + pkg.id + '" data-pkg="' + pkg.id + '" data-price="' + pkg.price + '">' +
'<img class="pkg-img" src="' + pkg.img + '" alt="' + esc(pkg.name) + '" loading="lazy">' +
'<div class="pkg-body">' +
'<p class="pkg-name">' + esc(pkg.name) + "</p>" +
'<ul class="service-list">' +
pkg.includes.map(function (s) {
return '<li class="service-item">' + esc(s) + "</li>";
}).join("") +
"</ul>" +
'<div class="pkg-total-row"><span class="total-label">' + t("Starting at") + '</span>' +
'<span class="total-amount">$' + pkg.price + "</span></div>" +
'<p class="card-disclaimer">* ' + esc(DISCLAIMER) + "</p>" +
'<button type="button" class="btn-reserve btn-solid" data-book="' + esc(pkg.name) + '">' + t("Book Now") + "</button>" +
"</div></div>"
);
}

function fullHTML() {
return (
'<div id="apex-pkgs">' +
'<div class="section-header">' +
"<h2>Our <span>Signature Packages</span></h2>" +
"<p>Three premium services. One exceptional result.</p>" +
'<p class="disclaimer">* ' + esc(DISCLAIMER) + "</p>" +
"</div>" +
'<div class="packages-grid">' + PACKAGES.map(cardHTML).join("") + "</div>" +
"</div>"
);
}

function bookPackage(pkgName, price) {
if (typeof window.__apexOpenBooking === "function") {
window.__apexOpenBooking(pkgName, [], [], typeof price === "number" ? price : null);
} else {
window.open(BOOKING_URL, "_blank");
}
}

var lastLang = null;

function inject() {
var sec = document.getElementById("paquetes");
if (!sec) return;
if (sec.getAttribute("data-apex-pkgs") === "1") return;

ensureStyle();
sec.setAttribute("data-apex-pkgs", "1");
lastLang = getLang();
sec.innerHTML = fullHTML();

var wrap = sec.querySelector("#apex-pkgs");
wrap.addEventListener("click", function (e) {
var bookBtn = e.target.closest("[data-book]");
if (!bookBtn) return;
var card = bookBtn.closest(".pkg-card");
var price = card ? parseInt(card.getAttribute("data-price"), 10) : null;
bookPackage(bookBtn.getAttribute("data-book"), price);
});
}

// Re-inject when #paquetes (re)mounts, and re-render when the language changes.
var obs = new MutationObserver(function () {
var sec = document.getElementById("paquetes");
if (sec && sec.getAttribute("data-apex-pkgs") !== "1") {
inject();
return;
}
if (sec && lastLang && getLang() !== lastLang) {
sec.removeAttribute("data-apex-pkgs");
inject();
}
});
obs.observe(document.documentElement, { childList: true, subtree: true });

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", inject);
} else {
inject();
}
})();

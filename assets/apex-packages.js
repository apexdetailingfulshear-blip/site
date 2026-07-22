/*
 * Apex Detailing — Packages (Full Detail / Exterior Only / Interior Only)
 * Injected at runtime into <section id="paquetes"> because the site ships as a
 * compiled bundle with no editable source. All styles are scoped under
 * #apex-pkgs so nothing leaks into the rest of the site.
 *
 * Only these 7 packages exist. Package "name" is the exact string sent to
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
  };

  function t(s) {
    return getLang() === "es" && ES[s] ? ES[s] : s;
  }

  var DISCLAIMER = "Prices may change depending on the vehicle's model and cleanliness condition.";

  var CATEGORIES = [
    {
      id: "full",
      title: "Full Detail",
      packages: [
        {
          id: "complete",
          name: "Complete Detail",
          price: 249,
          img: "https://images.unsplash.com/photo-1605164599894-ca98960d41b6?q=80&w=800&auto=format&fit=crop",
          includes: [
            "Full exterior hand wash & wax",
            "Complete interior vacuum & wipe-down",
            "Wheel & tire cleaning",
            "Interior & exterior window cleaning",
            "Dashboard, console & door detailing",
          ],
        },
        {
          id: "complete-deep",
          name: "Complete Deep Detail",
          price: 349,
          img: "https://images.unsplash.com/photo-1620584898989-d39f7f9ed1b7?q=80&w=800&auto=format&fit=crop",
          includes: [
            "Everything in Complete Detail, plus:",
            "Clay bar paint decontamination",
            "Wax or paint sealant",
            "Deep interior shampoo",
            "Interior UV protectant",
          ],
        },
      ],
    },
    {
      id: "exterior",
      title: "Exterior Only",
      packages: [
        {
          id: "ext-refresh",
          name: "Exterior Refresh",
          price: 99,
          img: "https://images.unsplash.com/photo-1633014041037-f5446fb4ce99?q=80&w=800&auto=format&fit=crop",
          includes: [
            "Hand foam wash",
            "Wheel & tire cleaning",
            "Tire shine application",
            "Microfiber towel drying",
            "Exterior window cleaning",
          ],
        },
        {
          id: "ext-premium",
          name: "Exterior Premium",
          price: 179,
          img: "https://images.unsplash.com/photo-1708805282695-ef186db20192?q=80&w=800&auto=format&fit=crop",
          includes: [
            "Everything in Exterior Refresh, plus:",
            "Clay bar paint decontamination",
            "Wax or paint sealant",
            "Trim & plastic restoration",
          ],
        },
        {
          id: "ceramic",
          name: "Ceramic Coating",
          price: 449,
          img: "https://images.unsplash.com/photo-1611651186486-415f04eb78e4?q=80&w=800&auto=format&fit=crop",
          includes: [
            "Paint decontamination & prep",
            "Professional-grade ceramic coating",
            "Long-lasting hydrophobic protection",
            "Enhanced gloss & UV resistance",
          ],
        },
      ],
    },
    {
      id: "interior",
      title: "Interior Only",
      packages: [
        {
          id: "int-refresh",
          name: "Interior Refresh",
          price: 129,
          img: "https://images.unsplash.com/photo-1633080413572-01ae7263f7d4?q=80&w=800&auto=format&fit=crop",
          includes: [
            "Full interior vacuum",
            "Dashboard, console & door cleaning",
            "Interior window cleaning",
            "Cup holder cleaning",
            "Light deodorizing",
          ],
        },
        {
          id: "int-deep",
          name: "Interior Deep Detail",
          price: 199,
          img: "https://images.unsplash.com/photo-1605437241278-c1806d14a4d9?q=80&w=800&auto=format&fit=crop",
          includes: [
            "Everything in Interior Refresh, plus:",
            "Deep seat & carpet shampoo",
            "Interior plastic restoration",
            "Interior UV protectant",
            "Odor elimination",
          ],
        },
      ],
    },
  ];

  var STYLE = [
    "#apex-pkgs, #apex-pkgs * { box-sizing: border-box; margin: 0; padding: 0; }",
    "#apex-pkgs { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #fff; max-width: 1200px; margin: 0 auto; }",
    "#apex-pkgs .section-header { text-align: center; margin-bottom: 12px; }",
    "#apex-pkgs .section-header h2 { font-size: 2.4rem; font-weight: 700; margin-bottom: 10px; color: #fff; }",
    "#apex-pkgs .section-header h2 span { color: #4a8ff5; }",
    "#apex-pkgs .section-header p { font-size: 1rem; color: #8a8fa8; }",
    "#apex-pkgs .section-header .disclaimer { margin-top: 12px; font-size: 0.8rem; color: #555e77; }",
    "#apex-pkgs .price-note { text-align: center; font-size: 12px; color: #4a8ff5; background: rgba(74,143,245,.06); border: 1px solid rgba(74,143,245,.15); border-radius: 8px; padding: 9px 12px; max-width: 640px; margin: 20px auto 40px; }",
    "#apex-pkgs .category-block { margin-bottom: 52px; }",
    "#apex-pkgs .category-block:last-child { margin-bottom: 0; }",
    "#apex-pkgs .category-title { font-size: 1.3rem; font-weight: 700; color: #4a8ff5; text-align: center; margin-bottom: 22px; text-transform: uppercase; letter-spacing: 0.05em; }",
    "#apex-pkgs .packages-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; max-width: 1160px; margin: 0 auto; align-items: stretch; }",
    "#apex-pkgs .pkg-card { background: #111827; border: 1px solid #1e2a3a; border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; transition: transform .2s, border-color .2s, box-shadow .2s; }",
    "#apex-pkgs .pkg-card:hover { transform: translateY(-4px); border-color: #2e4568; box-shadow: 0 14px 30px rgba(0,0,0,.35); }",
    "#apex-pkgs .pkg-img { width: 100%; height: 150px; object-fit: cover; display: block; background: #0a1120; }",
    "#apex-pkgs .pkg-body { padding: 20px; display: flex; flex-direction: column; gap: 12px; flex: 1; }",
    "#apex-pkgs .pkg-name { font-size: 1.1rem; font-weight: 700; color: #fff; }",
    "#apex-pkgs .service-list { list-style: none; display: flex; flex-direction: column; gap: 6px; flex: 1; }",
    "#apex-pkgs .service-item { font-size: 12.5px; color: #c0c8e0; line-height: 1.4; padding-left: 15px; position: relative; }",
    "#apex-pkgs .service-item::before { content: '\\2713'; position: absolute; left: 0; top: 0; color: #4a8ff5; font-weight: 700; }",
    "#apex-pkgs .pkg-total-row { display: flex; justify-content: space-between; align-items: baseline; padding-top: 10px; border-top: 1px solid #1e2a3a; }",
    "#apex-pkgs .total-label { font-size: 12px; color: #8a8fa8; }",
    "#apex-pkgs .total-amount { font-size: 1.5rem; font-weight: 700; color: #4a8ff5; }",
    "#apex-pkgs .card-disclaimer { font-size: 10px; color: #555e77; line-height: 1.5; }",
    "#apex-pkgs .btn-reserve { display: block; text-align: center; padding: 11px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; cursor: pointer; border: none; transition: opacity .15s; font-family: inherit; }",
    "#apex-pkgs .btn-solid { background: #4a8ff5; color: #fff; }",
    "#apex-pkgs .btn-solid:hover { opacity: .88; }",
    "#apex-pkgs .btn-reserve:focus-visible { outline: 2px solid #4a8ff5; outline-offset: 2px; }",
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

  function categoryHTML(cat) {
    return (
      '<div class="category-block" id="cat-' + cat.id + '">' +
      '<h3 class="category-title">' + esc(cat.title) + "</h3>" +
      '<div class="packages-grid">' + cat.packages.map(cardHTML).join("") + "</div>" +
      "</div>"
    );
  }

  function fullHTML() {
    return (
      '<div id="apex-pkgs">' +
      '<div class="section-header">' +
      "<h2>Our <span>Packages</span></h2>" +
      "<p>Choose the package that fits your vehicle's needs.</p>" +
      '<p class="disclaimer">* ' + esc(DISCLAIMER) + "</p>" +
      "</div>" +
      CATEGORIES.map(categoryHTML).join("") +
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

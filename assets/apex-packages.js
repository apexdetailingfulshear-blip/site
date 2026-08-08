/*
 * Apex Detailing — Packages (Full Detail / Exterior Only / Interior Only)
 * Injected at runtime into <section id="paquetes"> because the site ships as a
 * compiled bundle with no editable source. All styles are scoped under
 * #apex-pkgs so nothing leaks into the rest of the site.
 *
 * Only these 8 packages exist. Package "name" is the exact string sent to
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
  // Package names, includes, category titles and headers are translated to
  // Spanish for display. The underlying pkg.name value used for data-book /
  // the booking system is never altered — only what's shown on screen.
  var ES = {
    "Book Now": "Reservar",
    "Starting at": "Desde",
    "Our": "Nuestros",
    "Packages": "Paquetes",
    "Choose the package that fits your vehicle's needs.": "Elige el paquete que se ajuste a las necesidades de tu vehículo.",
    "Prices may change depending on the vehicle's model and cleanliness condition.": "Los precios pueden variar según el modelo del vehículo y su condición de limpieza.",

    "Full Detail": "Detalle Completo",
    "Exterior Only": "Solo Exterior",
    "Interior Only": "Solo Interior",
    "Express": "Express",

    "Express Detail": "Detalle Express",
    "Perfect for regular maintenance": "Perfecto para mantenimiento regular",
    "Full exterior hand wash": "Lavado exterior a mano completo",
    "Spray wax for added shine": "Cera en spray para brillo adicional",
    "Complete interior vacuum": "Aspirado interior completo",
    "Dashboard & center console wipe-down": "Limpieza de tablero y consola central",
    "Tire shine": "Brillo para llantas",

    "Complete Detail": "Detalle Completo",
    "Complete Deep Detail": "Detalle Completo Profundo",
    "Exterior Refresh": "Renovación Exterior",
    "Exterior Premium": "Exterior Premium",
    "Ceramic Coating": "Recubrimiento Cerámico",
    "Interior Refresh": "Renovación Interior",
    "Interior Deep Detail": "Detalle Interior Profundo",

    "Full exterior hand wash & wax": "Lavado y encerado exterior a mano completo",
    "Complete interior vacuum & wipe-down": "Aspirado y limpieza completa del interior",
    "Wheel & tire cleaning": "Limpieza de rines y llantas",
    "Interior & exterior window cleaning": "Limpieza de vidrios interiores y exteriores",
    "Dashboard, console & door detailing": "Detallado de tablero, consola y puertas",

    "Everything in Complete Detail, plus:": "Todo lo del Detalle Completo, más:",
    "Clay bar paint decontamination": "Descontaminación de pintura con clay bar",
    "Wax or paint sealant": "Cera o sellador de pintura",
    "Deep interior shampoo": "Shampoo profundo de interiores",
    "Interior UV protectant": "Protector UV para interiores",

    "Hand foam wash": "Lavado a mano con espuma",
    "Tire shine application": "Aplicación de brillo para llantas",
    "Microfiber towel drying": "Secado con toalla de microfibra",
    "Exterior window cleaning": "Limpieza de vidrios exteriores",

    "Everything in Exterior Refresh, plus:": "Todo lo de la Renovación Exterior, más:",
    "Trim & plastic restoration": "Restauración de molduras y plásticos",

    "Paint decontamination & prep": "Descontaminación y preparación de pintura",
    "Professional-grade ceramic coating": "Recubrimiento cerámico de grado profesional",
    "Long-lasting hydrophobic protection": "Protección hidrofóbica de larga duración",
    "Enhanced gloss & UV resistance": "Brillo mejorado y resistencia UV",

    "Full interior vacuum": "Aspirado completo del interior",
    "Dashboard, console & door cleaning": "Limpieza de tablero, consola y puertas",
    "Cup holder cleaning": "Limpieza de portavasos",
    "Light deodorizing": "Desodorización ligera",

    "Everything in Interior Refresh, plus:": "Todo lo de la Renovación Interior, más:",
    "Deep seat & carpet shampoo": "Shampoo profundo de asientos y alfombras",
    "Interior plastic restoration": "Restauración de plásticos interiores",
    "Odor elimination": "Eliminación de olores",
  };

  function t(s) {
    return getLang() === "es" && ES[s] ? ES[s] : s;
  }

  var DISCLAIMER = "Prices may change depending on the vehicle's model and cleanliness condition.";

  var CATEGORIES = [
    {
      id: "express",
      title: "Express",
      packages: [
        {
          id: "express-detail",
          name: "Express Detail",
          subtitle: "Perfect for regular maintenance",
          price: 149,
          img: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop",
          includes: [
            "Full exterior hand wash",
            "Spray wax for added shine",
            "Complete interior vacuum",
            "Dashboard & center console wipe-down",
            "Interior & exterior window cleaning",
            "Wheel & tire cleaning",
            "Tire shine",
          ],
        },
      ],
    },
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
    "#apex-pkgs { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #202832; max-width: 1200px; margin: 0 auto; }",
    "#apex-pkgs .section-header { text-align: center; margin-bottom: 12px; }",
    "#apex-pkgs .section-header h2 { font-size: 2.4rem; font-weight: 700; margin-bottom: 10px; color: #202832; }",
    "#apex-pkgs .section-header h2 span { color: #29b6f6; }",
    "#apex-pkgs .section-header p { font-size: 1rem; color: #667079; }",
    "#apex-pkgs .section-header .disclaimer { margin-top: 12px; font-size: 0.8rem; color: #838c94; }",
    "#apex-pkgs .price-note { text-align: center; font-size: 12px; color: #29b6f6; background: rgba(41,182,246,.06); border: 1px solid rgba(41,182,246,.15); border-radius: 8px; padding: 9px 12px; max-width: 640px; margin: 20px auto 40px; }",
    "#apex-pkgs .category-block { margin-bottom: 52px; }",
    "#apex-pkgs .category-block:last-child { margin-bottom: 0; }",
    "#apex-pkgs .category-title { font-size: 1.3rem; font-weight: 700; color: #29b6f6; text-align: center; margin-bottom: 22px; text-transform: uppercase; letter-spacing: 0.05em; }",
    "#apex-pkgs .packages-grid { display: flex; flex-direction: column; gap: 28px; max-width: 760px; margin: 0 auto; }",
    "#apex-pkgs .pkg-card { background: #ffffff; border: 1px solid #e2e7eb; border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 6px 20px rgba(0,0,0,.10); transition: transform .2s, border-color .2s, box-shadow .2s; }",
    "#apex-pkgs .pkg-card:hover { transform: translateY(-4px); border-color: #29b6f6; box-shadow: 0 14px 30px rgba(0,0,0,.35); }",
    "#apex-pkgs .pkg-img { width: 100%; height: 220px; object-fit: cover; display: block; background: #eef1f4; }",
    "#apex-pkgs .pkg-body { padding: 24px; display: flex; flex-direction: column; gap: 12px; flex: 1; }",
    "#apex-pkgs .pkg-name { font-size: 1.3rem; font-weight: 700; color: #202832; }",
    "#apex-pkgs .pkg-subtitle { font-size: 13px; color: #667079; }",

    "#apex-pkgs .service-list { list-style: none; display: flex; flex-direction: column; gap: 6px; flex: 1; }",
    "#apex-pkgs .service-item { font-size: 12.5px; color: #3f4750; line-height: 1.4; padding-left: 15px; position: relative; }",
    "#apex-pkgs .service-item::before { content: '\\2713'; position: absolute; left: 0; top: 0; color: #29b6f6; font-weight: 700; }",
    "#apex-pkgs .pkg-total-row { display: flex; justify-content: space-between; align-items: baseline; padding-top: 10px; border-top: 1px solid #e2e7eb; }",
    "#apex-pkgs .total-label { font-size: 12px; color: #667079; }",
    "#apex-pkgs .total-amount { font-size: 1.5rem; font-weight: 700; color: #29b6f6; }",
    "#apex-pkgs .card-disclaimer { font-size: 10px; color: #838c94; line-height: 1.5; }",
    "#apex-pkgs .btn-reserve { display: block; text-align: center; padding: 11px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; cursor: pointer; border: none; transition: opacity .15s; font-family: inherit; }",
    "#apex-pkgs .btn-solid { background: #29b6f6; color: #fff; }",
    "#apex-pkgs .btn-solid:hover { opacity: .88; }",
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
      '<img class="pkg-img" src="' + pkg.img + '" alt="' + esc(t(pkg.name)) + '" loading="lazy">' +
      '<div class="pkg-body">' +
      '<p class="pkg-name">' + esc(t(pkg.name)) + "</p>" +
      (pkg.subtitle ? '<p class="pkg-subtitle">' + esc(t(pkg.subtitle)) + "</p>" : "") +
      '<ul class="service-list">' +
      pkg.includes.map(function (s) {
        return '<li class="service-item">' + esc(t(s)) + "</li>";
      }).join("") +
      "</ul>" +
      '<div class="pkg-total-row"><span class="total-label">' + t("Starting at") + '</span>' +
      '<span class="total-amount">$' + pkg.price + "</span></div>" +
      '<p class="card-disclaimer">* ' + esc(t(DISCLAIMER)) + "</p>" +
      '<button type="button" class="btn-reserve btn-solid" data-book="' + esc(pkg.name) + '">' + t("Book Now") + "</button>" +
      "</div></div>"
    );
  }

  function allPackagesSortedByPrice() {
    var all = [];
    CATEGORIES.forEach(function (cat) {
      cat.packages.forEach(function (pkg) {
        all.push(pkg);
      });
    });
    all.sort(function (a, b) {
      return a.price - b.price;
    });
    return all;
  }

  function innerHTML() {
    return (
      '<div class="section-header">' +
      "<h2>" + t("Our") + " <span>" + t("Packages") + "</span></h2>" +
      "<p>" + t("Choose the package that fits your vehicle's needs.") + "</p>" +
      '<p class="disclaimer">* ' + esc(t(DISCLAIMER)) + "</p>" +
      "</div>" +
      '<div class="packages-grid">' + allPackagesSortedByPrice().map(cardHTML).join("") + "</div>"
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

  // React still owns and periodically re-renders #paquetes (e.g. on language
  // switch). Never delete/replace its own children — deleting nodes React
  // still holds references to makes React re-insert them on its next render,
  // landing its original title/cards on top of ours (the overlapping-text
  // bug). Instead: hide React's original children with CSS and keep our own
  // content in a single dedicated wrapper that only this script ever touches.
  function hideReactContent(sec) {
    for (var i = 0; i < sec.children.length; i++) {
      var el = sec.children[i];
      if (el.id !== "apex-pkgs" && el.style.display !== "none") {
        el.style.display = "none";
      }
    }
  }

  function inject() {
    var sec = document.getElementById("paquetes");
    if (!sec) return;

    ensureStyle();
    hideReactContent(sec);

    var wrap = document.getElementById("apex-pkgs");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "apex-pkgs";
      sec.appendChild(wrap);
      wrap.addEventListener("click", function (e) {
        var bookBtn = e.target.closest("[data-book]");
        if (!bookBtn) return;
        var card = bookBtn.closest(".pkg-card");
        var price = card ? parseInt(card.getAttribute("data-price"), 10) : null;
        bookPackage(bookBtn.getAttribute("data-book"), price);
      });
    }

    lastLang = getLang();
    wrap.innerHTML = innerHTML();
  }

  // On every DOM mutation: re-hide any original content React may have
  // re-inserted, make sure our wrapper exists, and re-render it if the
  // language changed. Never touch React's own nodes beyond hiding them.
  var obs = new MutationObserver(function () {
    var sec = document.getElementById("paquetes");
    if (!sec) return;
    hideReactContent(sec);
    var wrap = document.getElementById("apex-pkgs");
    if (!wrap || (lastLang && getLang() !== lastLang)) {
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

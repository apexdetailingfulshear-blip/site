/*
 * Apex Detailing — Packages (interactive, per-service pricing + Customize)
 * Injected at runtime into <section id="paquetes"> because the site ships as a
 * compiled bundle with no editable source. All styles are scoped under
 * #apex-pkgs so nothing leaks into the rest of the site.
 *
 * Bilingual: the site's language menu only translates its native React content,
 * so this injected section detects the selected language (from the language
 * toggle button) and renders EN/ES itself, re-rendering when the user switches.
 */
(function () {
  "use strict";

  var BOOKING_URL = "https://calendar.app.google/2VnG1xwYJw5LwXKXA";

  /* ------------------------------------------------------------ i18n */
  // Detect the selected language from the header language toggle button.
  function getLang() {
    var btns = document.querySelectorAll("header button, nav button, button");
    for (var i = 0; i < btns.length; i++) {
      var tx = (btns[i].textContent || "").trim();
      if (/^Espa(ñ|n)ol$/i.test(tx)) return "es";
      if (/^English$/i.test(tx)) return "en";
    }
    return (document.documentElement.lang || "en").slice(0, 2) === "es" ? "es" : "en";
  }

  // English -> Spanish for every user-facing string this section renders.
  var ES = {
    // services
    "Hand foam wash": "Lavado a mano con espuma",
    "Wheel and tire cleaning": "Limpieza de rines y llantas",
    "Tire shine application": "Aplicación de brillo para llantas",
    "Microfiber towel drying": "Secado con toalla de microfibra",
    "Exterior window cleaning": "Limpieza de vidrios exteriores",
    "Full interior vacuum": "Aspirado completo del interior",
    "Dashboard, console & door cleaning": "Limpieza de tablero, consola y puertas",
    "Cup holder cleaning": "Limpieza de portavasos",
    "Interior window cleaning": "Limpieza de vidrios interiores",
    "Light deodorizing": "Desodorización ligera",
    "Clay bar paint decontamination": "Descontaminación de pintura con clay bar",
    "Wax or paint sealant": "Cera o sellador de pintura",
    "Interior plastic restoration": "Restauración de plásticos interiores",
    "Deep door jamb cleaning": "Limpieza profunda de marcos de puertas",
    "Interior UV protectant": "Protector UV para interiores",
    "Special attention to detail": "Atención especial a los detalles",
    "Light paint correction": "Corrección ligera de pintura",
    "1-step polish": "1 etapa de pulido",
    "Long-lasting paint protection": "Protección de pintura de larga duración",
    "Deep engine bay cleaning": "Limpieza profunda del compartimento del motor",
    "Show-quality finish": "Acabado de exhibición",
    // packages
    "Exterior Detail": "Detallado Exterior",
    "Exterior & Interior": "Exterior e Interior",
    "Complete Detail": "Detallado Completo",
    "Premium Detail": "Detallado Premium",
    // durations
    "45 – 60 min": "45 – 60 min",
    "1.5 – 2 hours": "1.5 – 2 horas",
    "3 – 4 hours": "3 – 4 horas",
    "Time varies": "Tiempo por confirmar",
    // includes banners
    "Everything in Exterior Detail, plus:": "Todo lo del Detallado Exterior, más:",
    "Everything in Exterior & Interior, plus:": "Todo lo de Exterior e Interior, más:",
    "Everything in Complete Detail, plus:": "Todo lo del Detallado Completo, más:",
    // add-ons
    "Pet hair removal": "Eliminación de pelo de mascotas",
    "Deep seat cleaning": "Limpieza profunda de asientos",
    "Engine bay cleaning": "Limpieza del compartimento del motor",
    "Headlight restoration": "Restauración de faros",
    "Odor mitigation": "Mitigación de olores",
    "Carpet & upholstery shampoo": "Shampoo de alfombras y tapicería",
    "From $30": "Desde $30",
    "From $40": "Desde $40",
    "From $50": "Desde $50",
    "From $80": "Desde $80",
    // UI labels
    "✏ Customize": "✏ Personalizar",
    "✓ Done": "✓ Listo",
    "Remove": "Quitar",
    "Add": "Agregar",
    "Estimated Total": "Total estimado",
    "Starting price": "Precio inicial",
    "No services selected": "Sin servicios seleccionados",
    "service(s) removed · adjusted total": "servicio(s) eliminado(s) · total ajustado",
    "Book Now": "Reservar",
    "+ Add": "+ Agregar",
    "✓ Added": "✓ Agregado",
    "Choose a package — or tap Customize to tailor it to your needs.":
      "Elige un paquete — o pulsa Personalizar para ajustarlo a tus necesidades.",
    "⚠ All prices are initial estimates. The final price may vary based on the size, model, and cleanliness of the vehicle.":
      "⚠ Todos los precios son estimados iniciales. El precio final puede variar según el tamaño, modelo y estado de limpieza del vehículo.",
    "* Prices may change depending on the vehicle's model and cleanliness condition.":
      "* Los precios pueden cambiar según el modelo del vehículo y su estado de limpieza.",
    "Enhance any package with these additional services.":
      "Mejora cualquier paquete con estos servicios adicionales.",
    "The best value for frequent customers.": "El mejor valor para clientes frecuentes.",
    "Apex Monthly Shine": "Brillo Mensual Apex",
    "Everything you need, every month.": "Todo lo que necesitas, cada mes.",
    "Per month": "Por mes",
    "2 exterior details per month": "2 detallados exteriores al mes",
    "10% discount on all premium services": "10% de descuento en todos los servicios premium",
    "Priority booking": "Reservación prioritaria",
    "Join Now": "Unirse Ahora",
  };

  function t(s) {
    return getLang() === "es" && ES[s] ? ES[s] : s;
  }

  // Two-part highlighted section header, translated per language.
  function header(en1, en2, es1, es2) {
    var es = getLang() === "es";
    return "<h2>" + esc(es ? es1 : en1) + " <span>" + esc(es ? es2 : en2) + "</span></h2>";
  }

  var DISCLAIMER = "* Prices may change depending on the vehicle's model and cleanliness condition.";

  // One price per service — consistent everywhere
  var SERVICES = [
    { name: "Hand foam wash", price: 7 }, // 0
    { name: "Wheel and tire cleaning", price: 14 }, // 1
    { name: "Tire shine application", price: 7 }, // 2
    { name: "Microfiber towel drying", price: 7 }, // 3
    { name: "Exterior window cleaning", price: 15 }, // 4
    { name: "Full interior vacuum", price: 11 }, // 5
    { name: "Dashboard, console & door cleaning", price: 16 }, // 6
    { name: "Cup holder cleaning", price: 5 }, // 7
    { name: "Interior window cleaning", price: 11 }, // 8
    { name: "Light deodorizing", price: 17 }, // 9
    { name: "Clay bar paint decontamination", price: 24 }, // 10
    { name: "Wax or paint sealant", price: 24 }, // 11
    { name: "Interior plastic restoration", price: 14 }, // 12
    { name: "Deep door jamb cleaning", price: 14 }, // 13
    { name: "Interior UV protectant", price: 10 }, // 14
    { name: "Special attention to detail", price: 24 }, // 15
    { name: "Light paint correction", price: 28 }, // 16
    { name: "1-step polish", price: 28 }, // 17
    { name: "Long-lasting paint protection", price: 28 }, // 18
    { name: "Deep engine bay cleaning", price: 18 }, // 19
    { name: "Show-quality finish", price: 28 }, // 20
  ];

  var PACKAGES = [
    { id: "exterior", name: "Exterior Detail", popular: false, duration: "45 – 60 min", btnStyle: "btn-outline", noCustomize: true, indices: [0, 1, 2, 3, 4], ownIndices: [0, 1, 2, 3, 4], includesBanner: null },
    { id: "interior", name: "Exterior & Interior", popular: false, duration: "1.5 – 2 hours", btnStyle: "btn-outline", indices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], ownIndices: [5, 6, 7, 8, 9], includesBanner: "Everything in Exterior Detail, plus:" },
    { id: "complete", name: "Complete Detail", popular: false, duration: "3 – 4 hours", btnStyle: "btn-outline", indices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], ownIndices: [10, 11, 12, 13, 14, 15], includesBanner: "Everything in Exterior & Interior, plus:" },
    { id: "premium", name: "Premium Detail", popular: true, duration: "Time varies", btnStyle: "btn-solid", indices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], ownIndices: [16, 17, 18, 19, 20], includesBanner: "Everything in Complete Detail, plus:" },
  ];

  var ADDONS = [
    { name: "Pet hair removal", price: "From $30" },
    { name: "Deep seat cleaning", price: "From $40" },
    { name: "Engine bay cleaning", price: "From $50" },
    { name: "Headlight restoration", price: "From $80" },
    { name: "Odor mitigation", price: "From $40" },
    { name: "Carpet & upholstery shampoo", price: "From $50" },
  ];

  var selectedAddons = {}; // ai -> true
  var removed = {};
  var editMode = {};
  function resetState() {
    PACKAGES.forEach(function (pkg) {
      removed[pkg.id] = {};
      editMode[pkg.id] = false;
    });
  }

  function removedCount(id) {
    return Object.keys(removed[id]).length;
  }
  function pkgTotal(pkg) {
    return pkg.indices.reduce(function (sum, si, li) {
      return removed[pkg.id][li] ? sum : sum + SERVICES[si].price;
    }, 0);
  }

  var STYLE = [
    "#apex-pkgs, #apex-pkgs * { box-sizing: border-box; margin: 0; padding: 0; }",
    "#apex-pkgs { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #fff; max-width: 1200px; margin: 0 auto; }",
    "#apex-pkgs .section-header { text-align: center; margin-bottom: 48px; }",
    "#apex-pkgs .section-header h2 { font-size: 2.4rem; font-weight: 700; margin-bottom: 10px; color: #fff; }",
    "#apex-pkgs .section-header h2 span { color: #4a8ff5; }",
    "#apex-pkgs .section-header p { font-size: 1rem; color: #8a8fa8; }",
    "#apex-pkgs .section-header .disclaimer { margin-top: 12px; font-size: 0.8rem; color: #555e77; }",
    "#apex-pkgs .packages-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; max-width: 1160px; margin: 0 auto 60px; align-items: start; }",
    "#apex-pkgs .pkg-card { background: #111827; border: 1px solid #1e2a3a; border-radius: 14px; padding: 24px 20px; display: flex; flex-direction: column; gap: 12px; }",
    "#apex-pkgs .pkg-card.popular { border: 2px solid #4a8ff5; background: #111e30; }",
    "#apex-pkgs .popular-badge { display: block; background: #4a8ff5; color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 14px; border-radius: 20px; text-align: center; width: fit-content; margin: 0 auto; }",
    "#apex-pkgs .pkg-header-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }",
    "#apex-pkgs .pkg-name { font-size: 1.05rem; font-weight: 700; color: #fff; }",
    "#apex-pkgs .edit-btn { background: transparent; border: 1px solid #2e3c54; color: #8a8fa8; font-size: 11px; padding: 4px 10px; border-radius: 6px; cursor: pointer; white-space: nowrap; transition: all 0.15s; flex-shrink: 0; }",
    "#apex-pkgs .edit-btn:hover { border-color: #4a8ff5; color: #4a8ff5; }",
    "#apex-pkgs .edit-btn.active { border-color: #4a8ff5; color: #4a8ff5; background: rgba(74,143,245,0.08); }",
    "#apex-pkgs .pkg-duration { font-size: 11px; color: #8a8fa8; }",
    "#apex-pkgs .pkg-divider { border: none; border-top: 1px solid #1e2a3a; }",
    "#apex-pkgs .includes-banner { font-size: 12px; color: #4a8ff5; background: rgba(74,143,245,0.07); border: 1px solid rgba(74,143,245,0.15); border-radius: 6px; padding: 7px 10px; line-height: 1.4; }",
    "#apex-pkgs .service-list { list-style: none; display: flex; flex-direction: column; }",
    "#apex-pkgs .service-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #161f2e; transition: opacity 0.2s; }",
    "#apex-pkgs .service-item:last-child { border-bottom: none; }",
    "#apex-pkgs .service-item.removed { opacity: 0.28; }",
    "#apex-pkgs .service-item.removed .svc-name { text-decoration: line-through; }",
    "#apex-pkgs .remove-btn { display: none; background: transparent; border: 1px solid #3a2a2a; color: #e05c5c; font-size: 14px; line-height: 1; width: 20px; height: 20px; border-radius: 50%; cursor: pointer; flex-shrink: 0; align-items: center; justify-content: center; transition: all 0.15s; padding: 0; }",
    "#apex-pkgs .remove-btn:hover { background: rgba(224,92,92,0.15); }",
    "#apex-pkgs .remove-btn.undo { border-color: #2a3a2a; color: #4ac76e; }",
    "#apex-pkgs .remove-btn.undo:hover { background: rgba(74,199,110,0.12); }",
    "#apex-pkgs .service-list.edit-mode .remove-btn { display: flex; }",
    "#apex-pkgs .svc-info { flex: 1; min-width: 0; }",
    "#apex-pkgs .svc-name { font-size: 12.5px; color: #c0c8e0; display: block; line-height: 1.3; }",
    "#apex-pkgs .svc-price { font-size: 12px; font-weight: 700; color: #4a8ff5; white-space: nowrap; flex-shrink: 0; display: none; }",
    "#apex-pkgs .service-list.edit-mode .svc-price { display: block; }",
    "#apex-pkgs .pkg-total-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0 0; border-top: 1px solid #1e2a3a; margin-top: 4px; }",
    "#apex-pkgs .total-label { font-size: 12px; color: #8a8fa8; }",
    "#apex-pkgs .total-note { font-size: 10px; color: #555e77; margin-top: 2px; }",
    "#apex-pkgs .total-amount { font-size: 1.5rem; font-weight: 700; color: #4a8ff5; }",
    "#apex-pkgs .card-disclaimer { font-size: 10px; color: #555e77; line-height: 1.5; padding: 8px 10px; background: #0e1520; border: 1px solid #1e2a3a; border-radius: 6px; }",
    "#apex-pkgs .btn-reserve { display: block; text-align: center; padding: 11px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; cursor: pointer; transition: opacity 0.15s, background 0.15s; }",
    "#apex-pkgs .btn-outline { background: transparent; border: 1.5px solid #3a4460; color: #fff; }",
    "#apex-pkgs .btn-outline:hover { background: #1e2a3a; }",
    "#apex-pkgs .btn-solid { background: #4a8ff5; border: none; color: #fff; }",
    "#apex-pkgs .btn-solid:hover { opacity: 0.88; }",
    "#apex-pkgs .btn-disabled { opacity: 0.35; pointer-events: none; }",
    "#apex-pkgs .extras-section { max-width: 1160px; margin: 0 auto 60px; }",
    "#apex-pkgs .extras-section h2, #apex-pkgs .membership-section h2 { font-size: 1.4rem; font-weight: 700; color: #fff; text-align: center; margin-bottom: 6px; }",
    "#apex-pkgs .extras-section h2 span, #apex-pkgs .membership-section h2 span { color: #4a8ff5; }",
    "#apex-pkgs .section-subtitle { text-align: center; font-size: 0.85rem; color: #8a8fa8; margin-bottom: 24px; }",
    "#apex-pkgs .addons-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }",
    "#apex-pkgs .addon-card { background: #111827; border: 1px solid #1e2a3a; border-radius: 10px; padding: 14px 16px; display: flex; flex-direction: column; gap: 10px; transition: border-color .2s, background .2s; }",
    "#apex-pkgs .addon-card.selected { border-color: #4a8ff5; background: rgba(74,143,245,.07); }",
    "#apex-pkgs .addon-info { display: flex; justify-content: space-between; align-items: center; gap: 8px; }",
    "#apex-pkgs .addon-add-btn { background: transparent; border: 1px solid #2e3c54; color: #8a8fa8; font-size: 12px; font-weight: 600; padding: 6px 10px; border-radius: 6px; cursor: pointer; transition: all .15s; }",
    "#apex-pkgs .addon-add-btn:hover { border-color: #4a8ff5; color: #4a8ff5; }",
    "#apex-pkgs .addon-card.selected .addon-add-btn { border-color: #4ac76e; color: #4ac76e; background: rgba(74,199,110,.08); }",
    "#apex-pkgs .addon-name { font-size: 13px; color: #c0c8e0; }",
    "#apex-pkgs .addon-price { font-size: 13px; font-weight: 700; color: #4a8ff5; white-space: nowrap; }",
    "#apex-pkgs .membership-section { max-width: 700px; margin: 0 auto; }",
    "#apex-pkgs .membership-card { background: #111827; border: 2px solid #4a8ff5; border-radius: 14px; padding: 28px; display: flex; flex-direction: column; gap: 14px; }",
    "#apex-pkgs .membership-top { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; }",
    "#apex-pkgs .membership-title { font-size: 1.1rem; font-weight: 700; color: #fff; }",
    "#apex-pkgs .membership-subtitle { font-size: 12px; color: #8a8fa8; margin-top: 3px; }",
    "#apex-pkgs .membership-price-label { font-size: 11px; color: #8a8fa8; text-align: right; }",
    "#apex-pkgs .membership-price { font-size: 2rem; font-weight: 700; color: #4a8ff5; line-height: 1.1; }",
    "#apex-pkgs .membership-features { list-style: none; display: flex; flex-direction: column; gap: 8px; }",
    "#apex-pkgs .membership-features li { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: #a0a8c0; line-height: 1.4; }",
    "#apex-pkgs .membership-features li::before { content: '\\2713'; color: #4a8ff5; font-weight: 700; font-size: 13px; flex-shrink: 0; margin-top: 1px; }",
    "@media (max-width: 600px) { #apex-pkgs .section-header h2 { font-size: 1.8rem; } #apex-pkgs .membership-top { flex-direction: column; } #apex-pkgs .membership-price-label { text-align: left; } }",
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
    var fullTotal = pkg.indices.reduce(function (s, si) {
      return s + SERVICES[si].price;
    }, 0);

    var collapsed =
      '<div class="collapsed-view" style="display:flex;flex-direction:column;gap:10px;">' +
      (pkg.includesBanner ? '<p class="includes-banner">✦ ' + esc(t(pkg.includesBanner)) + "</p>" : "") +
      '<ul class="service-list">' +
      pkg.ownIndices.map(function (si) {
        return '<li class="service-item"><div class="svc-info"><span class="svc-name">' + esc(t(SERVICES[si].name)) + "</span></div></li>";
      }).join("") +
      "</ul></div>";

    var edit = pkg.noCustomize
      ? ""
      : '<div class="edit-view" style="display:none;"><ul class="service-list edit-mode">' +
        pkg.indices.map(function (si, li) {
          return (
            '<li class="service-item"><button class="remove-btn" data-act="remove" data-li="' + li +
            '" title="' + esc(t("Remove")) + '" aria-label="' + esc(t("Remove")) + '">×</button>' +
            '<div class="svc-info"><span class="svc-name">' + esc(t(SERVICES[si].name)) + "</span></div>" +
            '<span class="svc-price">$' + SERVICES[si].price + "</span></li>"
          );
        }).join("") +
        "</ul></div>";

    return (
      '<div class="pkg-card' + (pkg.popular ? " popular" : "") + '" id="card-' + pkg.id + '" data-pkg="' + pkg.id + '">' +
      (pkg.popular ? '<span class="popular-badge">POPULAR</span>' : "") +
      '<div class="pkg-header-row"><p class="pkg-name">' + esc(t(pkg.name)) + "</p>" +
      (pkg.noCustomize ? "" : '<button class="edit-btn" data-act="edit" type="button">' + t("✏ Customize") + "</button>") +
      "</div>" +
      '<p class="pkg-duration">⏱ ' + esc(t(pkg.duration)) + "</p>" +
      '<hr class="pkg-divider">' +
      collapsed + edit +
      '<div class="pkg-total-row"><div><p class="total-label">' + t("Estimated Total") + "</p>" +
      '<p class="total-note">' + t("Starting price") + "</p></div>" +
      '<p class="total-amount">$' + fullTotal + "</p></div>" +
      '<p class="card-disclaimer">' + esc(t(DISCLAIMER)) + "</p>" +
      '<button type="button" class="btn-reserve ' + pkg.btnStyle + '" data-book="' + esc(pkg.name) + '">' + t("Book Now") + "</button>" +
      "</div>"
    );
  }

  function fullHTML() {
    var cards = PACKAGES.map(cardHTML).join("");
    var addons = ADDONS.map(function (a, ai) {
      var isSel = !!selectedAddons[ai];
      return (
        '<div class="addon-card' + (isSel ? " selected" : "") + '" data-addon="' + ai + '">' +
        '<div class="addon-info"><span class="addon-name">' + esc(t(a.name)) + '</span>' +
        '<span class="addon-price">' + esc(t(a.price)) + "</span></div>" +
        '<button type="button" class="addon-add-btn" data-act="toggle-addon" data-addon="' + ai + '">' +
        (isSel ? t("✓ Added") : t("+ Add")) + "</button></div>"
      );
    }).join("");

    return (
      '<div id="apex-pkgs">' +
      '<div class="section-header">' +
      header("Our", "Packages", "Nuestros", "Paquetes") +
      "<p>" + t("Choose a package — or tap Customize to tailor it to your needs.") + "</p>" +
      '<p class="disclaimer">' + t("⚠ All prices are initial estimates. The final price may vary based on the size, model, and cleanliness of the vehicle.") + "</p>" +
      "</div>" +
      '<div class="packages-grid">' + cards + "</div>" +
      '<div class="extras-section">' + header("Additional", "Services", "Servicios", "Adicionales") +
      '<p class="section-subtitle">' + t("Enhance any package with these additional services.") + "</p>" +
      '<div class="addons-grid">' + addons + "</div></div>" +
      '<div class="membership-section">' + header("Apex", "Membership", "Membresía", "Apex") +
      '<p class="section-subtitle">' + t("The best value for frequent customers.") + "</p>" +
      '<div class="membership-card"><div class="membership-top">' +
      '<div><p class="membership-title">' + t("Apex Monthly Shine") + "</p>" +
      '<p class="membership-subtitle">' + t("Everything you need, every month.") + "</p></div>" +
      '<div><p class="membership-price-label">' + t("Per month") + "</p>" +
      '<p class="membership-price">$99</p></div></div>' +
      '<hr style="border:none;border-top:1px solid #1e2a3a;">' +
      '<ul class="membership-features"><li>' + t("2 exterior details per month") + "</li>" +
      "<li>" + t("10% discount on all premium services") + "</li>" +
      "<li>" + t("Priority booking") + "</li></ul>" +
      '<a class="btn-reserve btn-solid" href="' + BOOKING_URL + '" target="_blank" rel="noopener">' + t("Join Now") + "</a></div></div>" +
      "</div>"
    );
  }

  function renderCard(pkg) {
    var card = document.getElementById("card-" + pkg.id);
    if (!card) return;
    var isEdit = editMode[pkg.id];
    var total = pkgTotal(pkg);
    var count = removedCount(pkg.id);
    var allGone = count === pkg.indices.length;
    var anyRemoved = count > 0;

    if (!pkg.noCustomize) {
      var eb = card.querySelector(".edit-btn");
      eb.className = "edit-btn" + (isEdit ? " active" : "");
      eb.textContent = isEdit ? t("✓ Done") : t("✏ Customize");
    }

    var collapsedView = card.querySelector(".collapsed-view");
    var editView = card.querySelector(".edit-view");
    if (collapsedView) collapsedView.style.display = isEdit ? "none" : "flex";
    if (editView) editView.style.display = isEdit ? "block" : "none";

    if (editView) {
      editView.querySelector(".service-list").className = "service-list" + (isEdit ? " edit-mode" : "");
      editView.querySelectorAll(".service-item").forEach(function (el, li) {
        var isRemoved = !!removed[pkg.id][li];
        el.className = "service-item" + (isRemoved ? " removed" : "");
        var btn = el.querySelector(".remove-btn");
        btn.className = "remove-btn" + (isRemoved ? " undo" : "");
        btn.title = isRemoved ? t("Add") : t("Remove");
        btn.setAttribute("aria-label", isRemoved ? t("Add") : t("Remove"));
        btn.textContent = isRemoved ? "+" : "×";
      });
    }

    card.querySelector(".total-amount").textContent = "$" + (allGone ? 0 : total);
    card.querySelector(".total-note").textContent = allGone
      ? t("No services selected")
      : anyRemoved
        ? count + " " + t("service(s) removed · adjusted total")
        : t("Starting price");

    var bookBtn = card.querySelector(".btn-reserve");
    bookBtn.className = "btn-reserve " + pkg.btnStyle + (allGone ? " btn-disabled" : "");
  }

  function pkgById(id) {
    return PACKAGES.filter(function (p) { return p.id === id; })[0];
  }

  function toggleAddon(ai) {
    if (selectedAddons[ai]) delete selectedAddons[ai];
    else selectedAddons[ai] = true;
    renderAddon(ai);
  }
  function renderAddon(ai) {
    var card = document.querySelector('#apex-pkgs .addon-card[data-addon="' + ai + '"]');
    if (!card) return;
    var isSel = !!selectedAddons[ai];
    card.className = "addon-card" + (isSel ? " selected" : "");
    card.querySelector(".addon-add-btn").textContent = isSel ? t("✓ Added") : t("+ Add");
  }
  function toggleEdit(id) {
    editMode[id] = !editMode[id];
    if (!editMode[id]) removed[id] = {};
    renderCard(pkgById(id));
  }
  function toggleRemove(id, li) {
    if (removed[id][li]) delete removed[id][li];
    else removed[id][li] = true;
    renderCard(pkgById(id));
  }

  var lastLang = null;

  function inject() {
    var sec = document.getElementById("paquetes");
    if (!sec) return;
    if (sec.getAttribute("data-apex-pkgs") === "1") return;

    ensureStyle();
    resetState();
    sec.setAttribute("data-apex-pkgs", "1");
    lastLang = getLang();
    sec.innerHTML = fullHTML();

    var wrap = sec.querySelector("#apex-pkgs");
    wrap.addEventListener("click", function (e) {
      var bookBtn = e.target.closest("[data-book]");
      if (bookBtn) {
        if (bookBtn.classList.contains("btn-disabled")) return;
        if (typeof window.__apexOpenBooking === "function") {
          window.__apexOpenBooking(bookBtn.getAttribute("data-book"), Object.keys(selectedAddons).map(function (i) { return ADDONS[i].name; }));
        } else {
          window.open("https://calendar.app.google/2VnG1xwYJw5LwXKXA", "_blank");
        }
        return;
      }
      var addonBtn = e.target.closest('[data-act="toggle-addon"]');
      if (addonBtn) {
        toggleAddon(parseInt(addonBtn.getAttribute("data-addon"), 10));
        return;
      }
      var editBtn = e.target.closest(".edit-btn");
      if (editBtn) {
        toggleEdit(editBtn.closest(".pkg-card").getAttribute("data-pkg"));
        return;
      }
      var rm = e.target.closest(".remove-btn");
      if (rm) {
        toggleRemove(rm.closest(".pkg-card").getAttribute("data-pkg"), parseInt(rm.getAttribute("data-li"), 10));
      }
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

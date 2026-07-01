/*
 * Apex Detailing — Paquetes (interactive, per-service pricing + Personalizar)
 * Injected at runtime into <section id="paquetes"> because the site ships as a
 * compiled bundle with no editable source. All styles are scoped under
 * #apex-pkgs so nothing leaks into the rest of the site.
 */
(function () {
  "use strict";

  var BOOKING_URL = "https://calendar.app.google/2VnG1xwYJw5LwXKXA";
  var DISCLAIMER =
    "* Los precios pueden cambiar según el modelo del vehículo y su estado de limpieza.";

  // One price per service — consistent everywhere
  var SERVICES = [
    { name: "Lavado a mano con espuma", price: 7 }, // 0
    { name: "Limpieza de rines y llantas", price: 14 }, // 1
    { name: "Aplicación de brillo para llantas", price: 7 }, // 2
    { name: "Secado con toalla de microfibra", price: 7 }, // 3
    { name: "Limpieza de vidrios exteriores", price: 15 }, // 4
    { name: "Aspirado completo del interior", price: 11 }, // 5
    { name: "Limpieza de tablero, consola y puertas", price: 16 }, // 6
    { name: "Limpieza de portavasos", price: 5 }, // 7
    { name: "Limpieza de vidrios interiores", price: 11 }, // 8
    { name: "Desodorización ligera", price: 17 }, // 9
    { name: "Descontaminación de pintura con clay bar", price: 24 }, // 10
    { name: "Cera o sellador de pintura", price: 24 }, // 11
    { name: "Restauración de plásticos interiores", price: 14 }, // 12
    { name: "Limpieza profunda de marcos de puertas", price: 14 }, // 13
    { name: "Protector UV para interiores", price: 10 }, // 14
    { name: "Atención especial a los detalles", price: 24 }, // 15
    { name: "Corrección ligera de pintura", price: 28 }, // 16
    { name: "1 etapa de pulido", price: 28 }, // 17
    { name: "Protección de pintura de larga duración", price: 28 }, // 18
    { name: "Limpieza profunda del compartimento del motor", price: 18 }, // 19
    { name: "Acabado de exhibición", price: 28 }, // 20
  ];

  var PACKAGES = [
    {
      id: "exterior",
      name: "Detallado Exterior",
      popular: false,
      duration: "45 – 60 min",
      btnStyle: "btn-outline",
      noCustomize: true,
      indices: [0, 1, 2, 3, 4],
      ownIndices: [0, 1, 2, 3, 4],
      includesBanner: null,
    },
    {
      id: "interior",
      name: "Exterior e Interior",
      popular: false,
      duration: "1.5 – 2 horas",
      btnStyle: "btn-outline",
      indices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      ownIndices: [5, 6, 7, 8, 9],
      includesBanner: "Todo lo del Detallado Exterior, más:",
    },
    {
      id: "complete",
      name: "Detallado Completo",
      popular: false,
      duration: "3 – 4 horas",
      btnStyle: "btn-outline",
      indices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      ownIndices: [10, 11, 12, 13, 14, 15],
      includesBanner: "Todo lo de Exterior e Interior, más:",
    },
    {
      id: "premium",
      name: "Detallado Premium",
      popular: true,
      duration: "Consultar tiempo",
      btnStyle: "btn-solid",
      indices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      ownIndices: [16, 17, 18, 19, 20],
      includesBanner: "Todo lo del Detallado Completo, más:",
    },
  ];

  var ADDONS = [
    { name: "Eliminación de pelo de mascotas", price: "Desde $30" },
    { name: "Limpieza profunda de asientos", price: "Desde $40" },
    { name: "Limpieza del compartimento del motor", price: "Desde $50" },
    { name: "Restauración de faros", price: "Desde $80" },
    { name: "Mitigación de olores", price: "Desde $40" },
    { name: "Shampoo de alfombras y tapicería", price: "Desde $50" },
  ];

  var removed = {};
  var editMode = {};
  function resetState() {
    PACKAGES.forEach(function (pkg) {
      removed[pkg.id] = {}; // map li -> true
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
    "#apex-pkgs .addon-card { background: #111827; border: 1px solid #1e2a3a; border-radius: 10px; padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; gap: 8px; }",
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
      (pkg.includesBanner
        ? '<p class="includes-banner">✦ ' + esc(pkg.includesBanner) + "</p>"
        : "") +
      '<ul class="service-list">' +
      pkg.ownIndices
        .map(function (si) {
          return (
            '<li class="service-item"><div class="svc-info"><span class="svc-name">' +
            esc(SERVICES[si].name) +
            "</span></div></li>"
          );
        })
        .join("") +
      "</ul></div>";

    var edit = pkg.noCustomize
      ? ""
      : '<div class="edit-view" style="display:none;"><ul class="service-list edit-mode">' +
        pkg.indices
          .map(function (si, li) {
            return (
              '<li class="service-item"><button class="remove-btn" data-act="remove" data-li="' +
              li +
              '" title="Quitar" aria-label="Quitar">×</button>' +
              '<div class="svc-info"><span class="svc-name">' +
              esc(SERVICES[si].name) +
              "</span></div>" +
              '<span class="svc-price">$' +
              SERVICES[si].price +
              "</span></li>"
            );
          })
          .join("") +
        "</ul></div>";

    return (
      '<div class="pkg-card' +
      (pkg.popular ? " popular" : "") +
      '" id="card-' +
      pkg.id +
      '" data-pkg="' +
      pkg.id +
      '">' +
      (pkg.popular ? '<span class="popular-badge">POPULAR</span>' : "") +
      '<div class="pkg-header-row"><p class="pkg-name">' +
      esc(pkg.name) +
      "</p>" +
      (pkg.noCustomize
        ? ""
        : '<button class="edit-btn" data-act="edit" type="button">✏ Personalizar</button>') +
      "</div>" +
      '<p class="pkg-duration">⏱ ' +
      esc(pkg.duration) +
      "</p>" +
      '<hr class="pkg-divider">' +
      collapsed +
      edit +
      '<div class="pkg-total-row"><div><p class="total-label">Total estimado</p>' +
      '<p class="total-note">Precio inicial</p></div>' +
      '<p class="total-amount">$' +
      fullTotal +
      "</p></div>" +
      '<p class="card-disclaimer">' +
      esc(DISCLAIMER) +
      "</p>" +
      '<button type="button" class="btn-reserve ' +
      pkg.btnStyle +
      '" data-book="' +
      esc(pkg.name) +
      '">Reservar</button>' +
      "</div>"
    );
  }

  function fullHTML() {
    var cards = PACKAGES.map(cardHTML).join("");
    var addons = ADDONS.map(function (a) {
      return (
        '<div class="addon-card"><span class="addon-name">' +
        esc(a.name) +
        '</span><span class="addon-price">' +
        esc(a.price) +
        "</span></div>"
      );
    }).join("");

    return (
      '<div id="apex-pkgs">' +
      '<div class="section-header">' +
      "<h2>Nuestros <span>Paquetes</span></h2>" +
      "<p>Elige un paquete — o pulsa Personalizar para ajustarlo a tus necesidades.</p>" +
      '<p class="disclaimer">⚠ Todos los precios son estimados iniciales. El precio final puede variar según el tamaño, modelo y estado de limpieza del vehículo.</p>' +
      "</div>" +
      '<div class="packages-grid">' +
      cards +
      "</div>" +
      '<div class="extras-section"><h2>Servicios <span>Adicionales</span></h2>' +
      '<p class="section-subtitle">Mejora cualquier paquete con estos servicios adicionales.</p>' +
      '<div class="addons-grid">' +
      addons +
      "</div></div>" +
      '<div class="membership-section"><h2>Membresía <span>Apex</span></h2>' +
      '<p class="section-subtitle">El mejor valor para clientes frecuentes.</p>' +
      '<div class="membership-card"><div class="membership-top">' +
      '<div><p class="membership-title">Brillo Mensual Apex</p>' +
      '<p class="membership-subtitle">Todo lo que necesitas, cada mes.</p></div>' +
      '<div><p class="membership-price-label">Por mes</p>' +
      '<p class="membership-price">$99</p></div></div>' +
      '<hr style="border:none;border-top:1px solid #1e2a3a;">' +
      '<ul class="membership-features"><li>2 detallados exteriores al mes</li>' +
      "<li>10% de descuento en todos los servicios premium</li>" +
      "<li>Reservación prioritaria</li></ul>" +
      '<a class="btn-reserve btn-solid" href="' +
      BOOKING_URL +
      '" target="_blank" rel="noopener">Unirse Ahora</a></div></div>' +
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
      eb.textContent = isEdit ? "✓ Listo" : "✏ Personalizar";
    }

    var collapsedView = card.querySelector(".collapsed-view");
    var editView = card.querySelector(".edit-view");
    if (collapsedView) collapsedView.style.display = isEdit ? "none" : "flex";
    if (editView) editView.style.display = isEdit ? "block" : "none";

    if (editView) {
      editView.querySelector(".service-list").className =
        "service-list" + (isEdit ? " edit-mode" : "");
      editView.querySelectorAll(".service-item").forEach(function (el, li) {
        var isRemoved = !!removed[pkg.id][li];
        el.className = "service-item" + (isRemoved ? " removed" : "");
        var btn = el.querySelector(".remove-btn");
        btn.className = "remove-btn" + (isRemoved ? " undo" : "");
        btn.title = isRemoved ? "Agregar" : "Quitar";
        btn.setAttribute("aria-label", isRemoved ? "Agregar" : "Quitar");
        btn.textContent = isRemoved ? "+" : "×";
      });
    }

    card.querySelector(".total-amount").textContent = "$" + (allGone ? 0 : total);
    card.querySelector(".total-note").textContent = allGone
      ? "Sin servicios seleccionados"
      : anyRemoved
        ? count + " servicio(s) eliminado(s) · total ajustado"
        : "Precio inicial";

    var bookBtn = card.querySelector(".btn-reserve");
    bookBtn.className = "btn-reserve " + pkg.btnStyle + (allGone ? " btn-disabled" : "");
  }

  function pkgById(id) {
    return PACKAGES.filter(function (p) {
      return p.id === id;
    })[0];
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

  function inject() {
    var sec = document.getElementById("paquetes");
    if (!sec) return;
    if (sec.getAttribute("data-apex-pkgs") === "1") return;

    ensureStyle();
    resetState();
    sec.setAttribute("data-apex-pkgs", "1");
    sec.innerHTML = fullHTML();

    var wrap = sec.querySelector("#apex-pkgs");
    wrap.addEventListener("click", function (e) {
      var bookBtn = e.target.closest("[data-book]");
      if (bookBtn) {
        if (bookBtn.classList.contains("btn-disabled")) return;
        if (typeof window.__apexOpenBooking === "function") {
          window.__apexOpenBooking(bookBtn.getAttribute("data-book"));
        } else {
          window.open("https://calendar.app.google/2VnG1xwYJw5LwXKXA", "_blank");
        }
        return;
      }
      var editBtn = e.target.closest(".edit-btn");
      if (editBtn) {
        toggleEdit(editBtn.closest(".pkg-card").getAttribute("data-pkg"));
        return;
      }
      var rm = e.target.closest(".remove-btn");
      if (rm) {
        toggleRemove(
          rm.closest(".pkg-card").getAttribute("data-pkg"),
          parseInt(rm.getAttribute("data-li"), 10)
        );
      }
    });
  }

  // The app is a compiled SPA; #paquetes may mount after this script runs, and
  // may be re-rendered (e.g. language toggle). Re-inject whenever it reappears.
  var obs = new MutationObserver(function () {
    var sec = document.getElementById("paquetes");
    if (sec && sec.getAttribute("data-apex-pkgs") !== "1") inject();
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();

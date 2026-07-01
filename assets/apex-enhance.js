/*
 * Apex Detailing — booking flow + gallery + UI polish
 * Injected at runtime (the site ships as a compiled bundle with no source).
 *  - "Reservar Ahora" hero CTA -> scrolls to #paquetes
 *  - Package "Reservar" -> opens a booking modal where the customer submits
 *    car photos (Netlify Forms). On success -> Google Calendar.
 *  - Fills #galeria with real photos/videos.
 * All styles are scoped so nothing leaks into the rest of the site.
 */
(function () {
  "use strict";

  var CAL = "https://calendar.app.google/2VnG1xwYJw5LwXKXA";
  var MAX_FILES = 8;
  var MAX_MB = 10;

  // Gallery media (files live in /assets/gallery/).
  var GALLERY = [
    { type: "video", src: "/assets/gallery/video-1.mp4", poster: "/assets/gallery/poster-1.jpg" },
    { type: "video", src: "/assets/gallery/video-2.mp4", poster: "/assets/gallery/poster-2.jpg" },
    { type: "video", src: "/assets/gallery/video-3.mp4", poster: "/assets/gallery/poster-3.jpg" },
    { type: "video", src: "/assets/gallery/video-4.mp4", poster: "/assets/gallery/poster-4.jpg" },
    { type: "image", src: "/assets/gallery/photo-1.jpg" },
    { type: "image", src: "/assets/gallery/photo-2.jpg" },
    { type: "image", src: "/assets/gallery/photo-3.jpg" },
  ];

  /* ------------------------------------------------------------------ styles */
  var CSS = [
    // modal
    "#apex-modal-overlay{position:fixed;inset:0;background:rgba(3,6,15,.74);backdrop-filter:blur(4px);z-index:99999;display:none;align-items:flex-start;justify-content:center;overflow-y:auto;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}",
    "#apex-modal-overlay.open{display:flex;}",
    "#apex-modal{position:relative;width:100%;max-width:520px;background:#0e1626;border:1px solid #1e2a3a;border-radius:16px;padding:26px;color:#fff;box-shadow:0 24px 60px rgba(0,0,0,.5);animation:apexpop .18s ease;}",
    "@keyframes apexpop{from{opacity:0;transform:translateY(12px) scale(.98);}to{opacity:1;transform:none;}}",
    "#apex-modal h3{font-size:1.35rem;font-weight:700;margin:0 0 4px;}",
    "#apex-modal .amx-sub{font-size:.85rem;color:#8a8fa8;margin:0 0 16px;line-height:1.4;}",
    "#apex-modal .amx-pkg{display:inline-block;font-size:12px;font-weight:700;color:#4a8ff5;background:rgba(74,143,245,.1);border:1px solid rgba(74,143,245,.25);border-radius:20px;padding:4px 12px;margin-bottom:6px;}",
    "#apex-modal label{display:block;font-size:12px;color:#c0c8e0;margin:14px 0 5px;font-weight:600;}",
    "#apex-modal .amx-req{color:#4a8ff5;}",
    "#apex-modal input[type=text],#apex-modal input[type=tel],#apex-modal input[type=email],#apex-modal textarea{width:100%;box-sizing:border-box;background:#0a1120;border:1px solid #22314a;border-radius:8px;padding:10px 12px;color:#fff;font-size:14px;font-family:inherit;transition:border-color .15s;}",
    "#apex-modal input:focus,#apex-modal textarea:focus{outline:none;border-color:#4a8ff5;}",
    "#apex-modal textarea{resize:vertical;min-height:58px;}",
    "#apex-modal .amx-drop{border:1.5px dashed #2e3c54;border-radius:10px;padding:20px;text-align:center;cursor:pointer;transition:border-color .15s,background .15s;color:#8a8fa8;font-size:13px;line-height:1.5;}",
    "#apex-modal .amx-drop:hover,#apex-modal .amx-drop.drag{border-color:#4a8ff5;background:rgba(74,143,245,.06);color:#c0c8e0;}",
    "#apex-modal .amx-drop strong{color:#4a8ff5;}",
    "#apex-modal .amx-previews{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;}",
    "#apex-modal .amx-thumb{position:relative;width:60px;height:60px;border-radius:8px;overflow:hidden;border:1px solid #22314a;}",
    "#apex-modal .amx-thumb img{width:100%;height:100%;object-fit:cover;}",
    "#apex-modal .amx-thumb button{position:absolute;top:-7px;right:-7px;background:#e05c5c;color:#fff;border-radius:50%;width:19px;height:19px;font-size:12px;line-height:1;text-align:center;cursor:pointer;border:2px solid #0e1626;padding:0;}",
    "#apex-modal .amx-msg{font-size:12px;margin-top:10px;min-height:14px;}",
    "#apex-modal .amx-msg.err{color:#e05c5c;}",
    "#apex-modal .amx-msg.ok{color:#4ac76e;}",
    "#apex-modal .amx-actions{display:flex;gap:10px;margin-top:22px;}",
    "#apex-modal .amx-btn{flex:1;padding:12px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;border:none;transition:opacity .15s,background .15s;font-family:inherit;}",
    "#apex-modal .amx-cancel{background:transparent;border:1.5px solid #3a4460;color:#fff;}",
    "#apex-modal .amx-cancel:hover{background:#1e2a3a;}",
    "#apex-modal .amx-submit{background:#4a8ff5;color:#fff;}",
    "#apex-modal .amx-submit:hover{opacity:.9;}",
    "#apex-modal .amx-submit:disabled{opacity:.5;cursor:default;}",
    "#apex-modal .amx-x{position:absolute;top:14px;right:16px;background:none;border:none;color:#8a8fa8;font-size:22px;line-height:1;cursor:pointer;padding:4px;}",
    "#apex-modal .amx-x:hover{color:#fff;}",
    // gallery
    "#apex-gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;}",
    "#apex-gallery .amg-item{position:relative;border-radius:14px;overflow:hidden;border:1px solid #1e2a3a;background:#0a1120;aspect-ratio:3/4;transition:transform .2s,border-color .2s;}",
    "#apex-gallery .amg-item:hover{transform:translateY(-4px);border-color:#4a8ff5;}",
    "#apex-gallery .amg-item video,#apex-gallery .amg-item img{width:100%;height:100%;object-fit:cover;display:block;background:#0a1120;}",
    "#apex-gallery .amg-badge{position:absolute;top:8px;left:8px;background:rgba(10,17,32,.8);color:#fff;font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;padding:3px 8px;border-radius:6px;pointer-events:none;}",
    // package + card polish (scoped to injected packages)
    "#apex-pkgs .pkg-card{transition:transform .2s,border-color .2s,box-shadow .2s;}",
    "#apex-pkgs .pkg-card:hover{transform:translateY(-4px);box-shadow:0 14px 30px rgba(0,0,0,.35);}",
    "#apex-pkgs .btn-reserve{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}",
    "#apex-pkgs .btn-reserve:focus-visible,#apex-pkgs .edit-btn:focus-visible,#apex-pkgs .remove-btn:focus-visible{outline:2px solid #4a8ff5;outline-offset:2px;}",
    "#apex-pkgs .addon-card{transition:border-color .2s,transform .2s;}",
    "#apex-pkgs .addon-card:hover{border-color:#2e4568;transform:translateY(-2px);}",
    "#apex-pkgs .price-note{text-align:center;font-size:12px;color:#4a8ff5;background:rgba(74,143,245,.06);border:1px solid rgba(74,143,245,.15);border-radius:8px;padding:9px 12px;max-width:640px;margin:-32px auto 40px;}",
    "@media (max-width:600px){#apex-modal{padding:20px;}#apex-gallery{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));}}",
  ].join("\n");

  function ensureStyle() {
    if (document.getElementById("apex-enhance-style")) return;
    var s = document.createElement("style");
    s.id = "apex-enhance-style";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ------------------------------------------------------------- booking modal */
  var files = []; // File[]
  var currentPkg = "";
  var overlay, previews, msg, submitBtn;

  function buildModal() {
    if (document.getElementById("apex-modal-overlay")) return;
    overlay = document.createElement("div");
    overlay.id = "apex-modal-overlay";
    overlay.innerHTML =
      '<div id="apex-modal" role="dialog" aria-modal="true" aria-label="Reservar">' +
      '<button class="amx-x" type="button" aria-label="Cerrar">&times;</button>' +
      "<h3>Reserva tu detallado</h3>" +
      '<p class="amx-sub">Sube fotos de tu vehículo y te enviaremos el <strong>precio final</strong> antes de tu cita.</p>' +
      '<span class="amx-pkg" id="amx-pkg"></span>' +
      '<label>Nombre <span class="amx-req">*</span></label>' +
      '<input type="text" id="amx-nombre" autocomplete="name" />' +
      '<label>Teléfono <span class="amx-req">*</span></label>' +
      '<input type="tel" id="amx-tel" autocomplete="tel" />' +
      "<label>Correo (opcional)</label>" +
      '<input type="email" id="amx-correo" autocomplete="email" />' +
      "<label>Vehículo (marca, modelo y año)</label>" +
      '<input type="text" id="amx-veh" placeholder="Ej. Nissan Rogue 2019" />' +
      '<label>Fotos del vehículo <span class="amx-req">*</span></label>' +
      '<div class="amx-drop" id="amx-drop"><strong>Toca para subir</strong> o arrastra tus fotos aquí<br>Interior, exterior y cualquier detalle (máx. ' +
      MAX_FILES +
      ")</div>" +
      '<div class="amx-previews" id="amx-previews"></div>' +
      "<label>Notas (opcional)</label>" +
      '<textarea id="amx-notas" placeholder="Cuéntanos algo que debamos saber..."></textarea>' +
      '<div class="amx-msg" id="amx-msg"></div>' +
      '<div class="amx-actions">' +
      '<button type="button" class="amx-btn amx-cancel">Cancelar</button>' +
      '<button type="button" class="amx-btn amx-submit">Enviar y reservar</button>' +
      "</div>" +
      "</div>";
    document.body.appendChild(overlay);

    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.multiple = true;
    fileInput.style.display = "none";
    overlay.appendChild(fileInput);

    previews = overlay.querySelector("#amx-previews");
    msg = overlay.querySelector("#amx-msg");
    submitBtn = overlay.querySelector(".amx-submit");
    var drop = overlay.querySelector("#amx-drop");

    drop.addEventListener("click", function () { fileInput.click(); });
    fileInput.addEventListener("change", function () { addFiles(fileInput.files); fileInput.value = ""; });
    ["dragenter", "dragover"].forEach(function (ev) {
      drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add("drag"); });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove("drag"); });
    });
    drop.addEventListener("drop", function (e) {
      if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files);
    });

    overlay.querySelector(".amx-x").addEventListener("click", closeModal);
    overlay.querySelector(".amx-cancel").addEventListener("click", closeModal);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closeModal(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
    });
    submitBtn.addEventListener("click", submit);
  }

  function addFiles(list) {
    setMsg("", "");
    Array.prototype.forEach.call(list, function (f) {
      if (files.length >= MAX_FILES) return;
      if (!/^image\//.test(f.type)) { setMsg("Solo se permiten imágenes.", "err"); return; }
      if (f.size > MAX_MB * 1024 * 1024) { setMsg("Cada foto debe pesar menos de " + MAX_MB + " MB.", "err"); return; }
      files.push(f);
    });
    renderPreviews();
  }

  function renderPreviews() {
    previews.innerHTML = "";
    files.forEach(function (f, i) {
      var t = document.createElement("div");
      t.className = "amx-thumb";
      var img = document.createElement("img");
      img.src = URL.createObjectURL(f);
      img.onload = function () { URL.revokeObjectURL(img.src); };
      var rm = document.createElement("button");
      rm.type = "button";
      rm.textContent = "×";
      rm.setAttribute("aria-label", "Quitar foto");
      rm.addEventListener("click", function () { files.splice(i, 1); renderPreviews(); });
      t.appendChild(img);
      t.appendChild(rm);
      previews.appendChild(t);
    });
  }

  function setMsg(text, kind) {
    msg.textContent = text;
    msg.className = "amx-msg" + (kind ? " " + kind : "");
  }

  function openModal(pkgName) {
    buildModal();
    ensureStyle();
    currentPkg = pkgName || "";
    files = [];
    renderPreviews();
    setMsg("", "");
    overlay.querySelector("#amx-pkg").textContent = currentPkg || "Detallado";
    ["#amx-nombre", "#amx-tel", "#amx-correo", "#amx-veh", "#amx-notas"].forEach(function (s) {
      overlay.querySelector(s).value = "";
    });
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar y reservar";
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(function () { overlay.querySelector("#amx-nombre").focus(); }, 50);
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  function submit() {
    var nombre = overlay.querySelector("#amx-nombre").value.trim();
    var tel = overlay.querySelector("#amx-tel").value.trim();
    if (!nombre) { setMsg("Por favor ingresa tu nombre.", "err"); return; }
    if (!tel) { setMsg("Por favor ingresa tu teléfono.", "err"); return; }
    if (!files.length) { setMsg("Sube al menos una foto de tu vehículo.", "err"); return; }

    var fd = new FormData();
    fd.append("form-name", "booking");
    fd.append("bot-field", "");
    fd.append("nombre", nombre);
    fd.append("telefono", tel);
    fd.append("correo", overlay.querySelector("#amx-correo").value.trim());
    fd.append("vehiculo", overlay.querySelector("#amx-veh").value.trim());
    fd.append("paquete", currentPkg);
    fd.append("notas", overlay.querySelector("#amx-notas").value.trim());
    files.forEach(function (f) { fd.append("car_photos", f, f.name); });

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";
    setMsg("Subiendo tus fotos...", "");

    fetch("/", { method: "POST", body: fd })
      .then(function (r) {
        if (!r.ok) throw new Error("status " + r.status);
        setMsg("¡Gracias! Te enviaremos tu precio final. Abriendo la agenda...", "ok");
        setTimeout(function () { window.location.href = CAL; }, 1200);
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar y reservar";
        setMsg(
          "No pudimos enviar el formulario. Escríbenos por WhatsApp o intenta de nuevo.",
          "err"
        );
      });
  }

  // Public entry used by the packages script
  window.__apexOpenBooking = openModal;

  /* ------------------------------------------------------------------ gallery */
  function injectGallery() {
    var sec = document.getElementById("galeria");
    if (!sec || sec.getAttribute("data-apex-gallery") === "1") return;
    ensureStyle();
    var heading = sec.querySelector("h1,h2,h3");
    var headHTML = heading
      ? heading.outerHTML
      : '<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Nuestra <span class="text-blue-brand">Galería</span></h2>';
    var items = GALLERY.map(function (m) {
      if (m.type === "video") {
        return (
          '<div class="amg-item"><span class="amg-badge">Video</span>' +
          '<video src="' + m.src + '" poster="' + m.poster + '" controls preload="none" playsinline muted></video></div>'
        );
      }
      return (
        '<div class="amg-item"><img src="' + m.src + '" alt="Apex Detailing" loading="lazy" /></div>'
      );
    }).join("");
    sec.setAttribute("data-apex-gallery", "1");
    sec.innerHTML = headHTML + '<div id="apex-gallery">' + items + "</div>";
    // Hide any media that fails to load so no broken tiles appear.
    sec.querySelectorAll("#apex-gallery img").forEach(function (el) {
      el.addEventListener("error", function () {
        var item = el.closest(".amg-item");
        if (item) item.remove();
      });
    });
    sec.querySelectorAll("#apex-gallery video").forEach(function (el) {
      el.addEventListener("error", function () {
        var item = el.closest(".amg-item");
        if (item) item.remove();
      }, true);
    });
  }

  /* ------------------------------------------------------------- hero CTA + note */
  function rewireHero() {
    var links = document.querySelectorAll('a[href="#contacto"]');
    links.forEach(function (a) {
      if (/reservar\s+ahora/i.test(a.textContent) && a.getAttribute("href") !== "#paquetes") {
        a.setAttribute("href", "#paquetes");
      }
    });
  }

  function addPriceNote() {
    var sec = document.getElementById("paquetes");
    var wrap = sec && sec.querySelector("#apex-pkgs");
    if (!wrap || wrap.querySelector(".price-note")) return;
    var grid = wrap.querySelector(".packages-grid");
    if (!grid) return;
    var note = document.createElement("p");
    note.className = "price-note";
    note.innerHTML =
      "📸 Al reservar, sube fotos de tu vehículo y te confirmamos el <strong>precio final</strong> antes de tu cita.";
    grid.parentNode.insertBefore(note, grid.nextSibling);
  }

  /* ------------------------------------------------------------------ observers */
  function apply() {
    rewireHero();
    injectGallery();
    addPriceNote();
  }

  var obs = new MutationObserver(apply);
  obs.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();

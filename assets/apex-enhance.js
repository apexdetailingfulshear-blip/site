/*
 * Apex Detailing — booking flow + gallery + extra sections + UI polish
 * Injected at runtime (the site ships as a compiled bundle with no source).
 *
 * Bilingual: the site's language menu only translates its native React content,
 * so everything injected here detects the selected language (from the language
 * toggle button) and renders EN/ES itself, re-rendering when the user switches.
 */
(function () {
  "use strict";

  var CAL = "https://calendar.app.google/2VnG1xwYJw5LwXKXA";
  var MAX_FILES = 8;
  var MAX_MB = 10;
  var HOURS = "7:00 AM – 8:00 PM";

  var SOCIAL = { facebook: "https://www.facebook.com/ApexDetailingTX", instagram: "https://www.instagram.com/apexdetailingtx", tiktok: "#" };
  var CITY_BASE = "/areas/";

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

  var ES = {
    // modal
    "Book Your Detail": "Reserva tu Detallado",
    "Upload photos of your vehicle and we'll send you the <strong>final price</strong> before your appointment.":
      "Sube fotos de tu vehículo y te enviaremos el <strong>precio final</strong> antes de tu cita.",
    "Close": "Cerrar",
    "Name": "Nombre",
    "Phone": "Teléfono",
    "Email (optional)": "Correo (opcional)",
    "Vehicle (make, model & year)": "Vehículo (marca, modelo y año)",
    "E.g. Nissan Rogue 2019": "Ej. Nissan Rogue 2019",
    "Preferred date": "Fecha preferida",
    "Preferred time": "Hora preferida",
    "Vehicle photos": "Fotos del vehículo",
    "Tap to upload": "Toca para subir",
    "or drag your photos here": "o arrastra tus fotos aquí",
    "Interior, exterior and any details (max.": "Interior, exterior y cualquier detalle (máx.",
    "Notes (optional)": "Notas (opcional)",
    "Tell us anything we should know...": "Cuéntanos algo que debamos saber...",
    "Cancel": "Cancelar",
    "Submit & Book": "Enviar y Reservar",
    "Detail": "Detallado",
    "Add-ons: ": "Adicionales: ",
    "Sending...": "Enviando...",
    "Uploading your photos...": "Subiendo tus fotos...",
    "Thank you! We'll send you your final price soon.":
      "¡Gracias! Te enviaremos tu precio final pronto.",
    "We couldn't submit the form. Message us on WhatsApp or try again.":
      "No pudimos enviar el formulario. Escríbenos por WhatsApp o intenta de nuevo.",
    "Only images are allowed.": "Solo se permiten imágenes.",
    "Each photo must be under": "Cada foto debe pesar menos de",
    "Please enter your name.": "Por favor ingresa tu nombre.",
    "Please enter your phone number.": "Por favor ingresa tu teléfono.",
    "Please choose a date.": "Por favor elige una fecha.",
    "Please choose a time.": "Por favor elige una hora.",
    "Upload at least one photo of your vehicle.": "Sube al menos una foto de tu vehículo.",
    "Remove photo": "Quitar foto",
    // gallery / lightbox
    "Video": "Video",
    "Fullscreen": "Pantalla completa",
    "View fullscreen": "Ver en pantalla completa",
    "Scroll or +/− to zoom · drag to pan · double-click to zoom":
      "Rueda o +/− para acercar · arrastra para mover · doble clic para acercar",
    "Zoom out": "Alejar",
    "Reset": "Restablecer",
    "Zoom in": "Acercar",
    // footer
    "Open every day": "Abierto todos los días",
    // quote form
    "Please enter your name and phone number.": "Por favor ingresa tu nombre y teléfono.",
    "Submitting your request...": "Enviando tu solicitud...",
    "Thank you! We received your request. We'll contact you soon.":
      "¡Gracias! Recibimos tu solicitud. Te contactaremos pronto.",
    "We couldn't submit it. Call us at 346-307-0407 or try again.":
      "No pudimos enviar. Llámanos al 346-307-0407 o intenta de nuevo.",
    // price note
    "📸 When booking, upload photos of your vehicle and we'll confirm the <strong>final price</strong> before your appointment.":
      "📸 Al reservar, sube fotos de tu vehículo y te confirmamos el <strong>precio final</strong> antes de tu cita.",
    // tagline
    "Excellence in Every Detail": "Excelencia en Cada Detalle",
    "Your Prestige. Our Passion.": "Tu Prestigio. Nuestra Pasión.",
    // how it works
    "Book Your Time": "Reserva tu Horario",
    "Choose your package and select the date and time that works best for you.":
      "Elige tu paquete y selecciona la fecha y hora que mejor te convenga.",
    "We Come to You": "Vamos a Ti",
    "We arrive with all the necessary equipment, so you don't have to go anywhere.":
      "Llegamos con todo el equipo necesario, para que no tengas que ir a ningún lado.",
    "Enjoy Your Car": "Disfruta tu Auto",
    "Get your vehicle back clean, shiny, and like new.":
      "Recibe tu vehículo limpio, brillante y como nuevo.",
    // service areas
    "Mobile detailing service in Houston and surrounding areas.":
      "Servicio de detallado móvil en Houston y áreas cercanas.",
  };

  function t(s) {
    return getLang() === "es" && ES[s] ? ES[s] : s;
  }
  // Two-part highlighted heading (lead + <span>highlight</span>), per language.
  function hdr(en1, en2, es1, es2, spanClass) {
    var es = getLang() === "es";
    return (
      esc(es ? es1 : en1) +
      ' <span' + (spanClass ? ' class="' + spanClass + '"' : "") + ">" +
      esc(es ? es2 : en2) +
      "</span>"
    );
  }

  var TIKTOK_SVG =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>';

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
    "#apex-modal-overlay{position:fixed;inset:0;background:rgba(3,6,15,.74);backdrop-filter:blur(4px);z-index:99999;display:none;align-items:flex-start;justify-content:center;overflow-y:auto;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}",
    "#apex-modal-overlay.open{display:flex;}",
    "#apex-modal{position:relative;width:100%;max-width:520px;background:#0e1626;border:1px solid #1e2a3a;border-radius:16px;padding:26px;color:#fff;box-shadow:0 24px 60px rgba(0,0,0,.5);animation:apexpop .18s ease;}",
    "@keyframes apexpop{from{opacity:0;transform:translateY(12px) scale(.98);}to{opacity:1;transform:none;}}",
    "#apex-modal h3{font-size:1.35rem;font-weight:700;margin:0 0 4px;}",
    "#apex-modal .amx-sub{font-size:.85rem;color:#8a8fa8;margin:0 0 16px;line-height:1.4;}",
    "#apex-modal .amx-pkg{display:inline-block;font-size:12px;font-weight:700;color:#4a8ff5;background:rgba(74,143,245,.1);border:1px solid rgba(74,143,245,.25);border-radius:20px;padding:4px 12px;margin-bottom:6px;}",
    "#apex-modal label{display:block;font-size:12px;color:#c0c8e0;margin:14px 0 5px;font-weight:600;}",
    "#apex-modal .amx-req{color:#4a8ff5;}",
    "#apex-modal input[type=text],#apex-modal input[type=tel],#apex-modal input[type=email],#apex-modal input[type=date],#apex-modal input[type=time],#apex-modal textarea{width:100%;box-sizing:border-box;background:#0a1120;border:1px solid #22314a;border-radius:8px;padding:10px 12px;color:#fff;font-size:14px;font-family:inherit;transition:border-color .15s;}",
    "#apex-modal .amx-addons{font-size:12px;color:#4a8ff5;background:rgba(74,143,245,.08);border:1px solid rgba(74,143,245,.2);border-radius:8px;padding:8px 10px;margin:-2px 0 4px;line-height:1.4;}",
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
    "#apex-gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;}",
    "#apex-gallery .amg-item{position:relative;border-radius:14px;overflow:hidden;border:1px solid #1e2a3a;background:#0a1120;aspect-ratio:3/4;transition:transform .2s,border-color .2s;}",
    "#apex-gallery .amg-item:hover{transform:translateY(-4px);border-color:#4a8ff5;}",
    "#apex-gallery .amg-item video,#apex-gallery .amg-item img{width:100%;height:100%;object-fit:cover;display:block;background:#0a1120;}",
    "#apex-gallery .amg-badge{position:absolute;top:8px;left:8px;background:rgba(10,17,32,.8);color:#fff;font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;padding:3px 8px;border-radius:6px;pointer-events:none;}",
    "#apex-pkgs .pkg-card{transition:transform .2s,border-color .2s,box-shadow .2s;}",
    "#apex-pkgs .pkg-card:hover{transform:translateY(-4px);box-shadow:0 14px 30px rgba(0,0,0,.35);}",
    "#apex-pkgs .btn-reserve{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}",
    "#apex-pkgs .btn-reserve:focus-visible,#apex-pkgs .edit-btn:focus-visible,#apex-pkgs .remove-btn:focus-visible{outline:2px solid #4a8ff5;outline-offset:2px;}",
    "#apex-pkgs .addon-card{transition:border-color .2s,transform .2s;}",
    "#apex-pkgs .addon-card:hover{border-color:#2e4568;transform:translateY(-2px);}",
    "#apex-pkgs .price-note{text-align:center;font-size:12px;color:#4a8ff5;background:rgba(74,143,245,.06);border:1px solid rgba(74,143,245,.15);border-radius:8px;padding:9px 12px;max-width:640px;margin:-32px auto 40px;}",
    "#apex-gallery .amg-item.amg-photo{cursor:zoom-in;}",
    "#apex-gallery .amg-expand{position:absolute;top:8px;right:8px;background:rgba(10,17,32,.82);border:none;color:#fff;width:34px;height:34px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;z-index:2;transition:background .15s,transform .15s;}",
    "#apex-gallery .amg-item:hover .amg-expand{background:#4a8ff5;}",
    "#apex-gallery .amg-expand:hover{transform:scale(1.08);}",
    "#apex-lightbox{position:fixed;inset:0;z-index:100000;background:rgba(3,6,15,.96);display:none;align-items:center;justify-content:center;overflow:hidden;touch-action:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}",
    "#apex-lightbox.open{display:flex;}",
    "#apex-lightbox img{max-width:96vw;max-height:90vh;object-fit:contain;transform-origin:center center;cursor:grab;user-select:none;-webkit-user-drag:none;will-change:transform;}",
    "#apex-lightbox img.grabbing{cursor:grabbing;}",
    "#apex-lb-close{position:fixed;top:16px;right:20px;background:rgba(255,255,255,.12);border:none;color:#fff;font-size:26px;line-height:1;width:44px;height:44px;border-radius:50%;cursor:pointer;z-index:2;}",
    "#apex-lb-close:hover{background:rgba(255,255,255,.24);}",
    ".apex-lb-ctrls{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);display:flex;gap:10px;z-index:2;}",
    ".apex-lb-ctrls button{background:rgba(255,255,255,.13);border:none;color:#fff;width:46px;height:46px;border-radius:50%;font-size:22px;cursor:pointer;line-height:1;}",
    ".apex-lb-ctrls button:hover{background:rgba(255,255,255,.26);}",
    ".apex-lb-hint{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);color:#8a8fa8;font-size:12px;z-index:2;white-space:nowrap;}",
    ".apex-city-link{color:#4a8ff5 !important;text-decoration:none;transition:color .15s;}",
    ".apex-city-link:hover{text-decoration:underline;color:#6fa8ff !important;}",
    ".apex-city-sep{color:#4a5568;margin:0 2px;}",
    ".apex-hours{color:#9aa3b8;font-size:13px;margin-top:6px;}",
    ".apex-hours strong{color:#fff;}",
    ".apex-quote-msg{margin-top:10px;font-size:13px;}",
    "@media (max-width:600px){#apex-modal{padding:20px;}#apex-gallery{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));}.apex-lb-hint{display:none;}}",
    ".apex-tagline{background:linear-gradient(135deg,#05070c 0%,#0d1526 55%,#05070c 100%);padding:64px 20px;text-align:center;border-top:1px solid #1e2a3a;border-bottom:1px solid #1e2a3a;}",
    ".apex-tagline-inner{max-width:820px;margin:0 auto;}",
    ".apex-tagline-kicker{color:#4a8ff5;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;}",
    ".apex-tagline-main{color:#fff;font-size:clamp(22px,4vw,38px);font-weight:800;line-height:1.25;text-transform:uppercase;letter-spacing:.5px;margin:0;}",
    ".apex-tagline-main span{color:#4a8ff5;}",
    ".apex-tagline-divider{width:60px;height:3px;background:#4a8ff5;margin:24px auto;border-radius:2px;}",
    ".apex-tagline-sub{color:#c7cedd;font-size:18px;font-style:italic;font-weight:500;letter-spacing:.5px;margin:0;}",
    ".apex-hiw{background:#05070c;padding:80px 16px;}",
    ".apex-hiw-inner{max-width:1100px;margin:0 auto;text-align:center;}",
    ".apex-hiw-title{font-size:2rem;font-weight:800;color:#fff;margin-bottom:44px;}",
    ".apex-hiw-title span{color:#2563eb;}",
    ".apex-hiw-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:32px;text-align:left;}",
    ".apex-hiw-step{background:#0e1626;border:1px solid #1e2a3a;border-radius:14px;padding:26px;}",
    ".apex-hiw-num{width:40px;height:40px;border-radius:50%;background:#2563eb;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;margin-bottom:16px;}",
    ".apex-hiw-step h3{color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:8px;}",
    ".apex-hiw-step p{color:#9aa3b8;font-size:14px;line-height:1.5;margin:0;}",
    ".apex-areas{background:#0b0f1a;padding:80px 16px;}",
    ".apex-areas-inner{max-width:1100px;margin:0 auto;text-align:center;}",
    ".apex-areas-title{font-size:2rem;font-weight:800;color:#fff;margin-bottom:10px;}",
    ".apex-areas-title span{color:#2563eb;}",
    ".apex-areas-sub{color:#9aa3b8;margin-bottom:40px;}",
    ".apex-areas-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:18px;}",
    ".apex-area-card{position:relative;height:160px;border-radius:14px;background-size:cover;background-position:center;overflow:hidden;border:1px solid #1e2a3a;transition:transform .2s ease;}",
    ".apex-area-card:hover{transform:translateY(-4px);}",
    ".apex-area-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,7,12,.15),rgba(5,7,12,.85));display:flex;align-items:flex-end;justify-content:center;padding-bottom:16px;}",
    ".apex-area-overlay span{color:#fff;font-weight:700;font-size:16px;letter-spacing:.3px;}",
    "@media (max-width:600px){.apex-hiw-title,.apex-areas-title{font-size:1.6rem;}}",
  ].join("\n");

  function ensureStyle() {
    if (document.getElementById("apex-enhance-style")) return;
    var s = document.createElement("style");
    s.id = "apex-enhance-style";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function esc(str) {
    return String(str).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ------------------------------------------------------------- booking modal */
  var files = [];
  var currentPkg = "";
  var currentAddons = [];
  var currentRemoved = [];
  var currentTotal = null;
  var overlay, previews, msg, submitBtn;

  function buildModal() {
    if (document.getElementById("apex-modal-overlay")) return;
    overlay = document.createElement("div");
    overlay.id = "apex-modal-overlay";
    overlay.innerHTML =
      '<div id="apex-modal" role="dialog" aria-modal="true" aria-label="Book">' +
      '<button class="amx-x" type="button" aria-label="' + esc(t("Close")) + '">&times;</button>' +
      "<h3>" + t("Book Your Detail") + "</h3>" +
      '<p class="amx-sub">' + t("Upload photos of your vehicle and we'll send you the <strong>final price</strong> before your appointment.") + "</p>" +
      '<span class="amx-pkg" id="amx-pkg"></span>' +
      '<p class="amx-addons" id="amx-addons" style="display:none;"></p>' +
      '<p class="amx-removed" id="amx-removed" style="display:none;"></p>' +
      '<p class="amx-total" id="amx-total" style="display:none;font-weight:600;"></p>' +
      "<label>" + t("Name") + ' <span class="amx-req">*</span></label>' +
      '<input type="text" id="amx-nombre" autocomplete="name" />' +
      "<label>" + t("Phone") + ' <span class="amx-req">*</span></label>' +
      '<input type="tel" id="amx-tel" autocomplete="tel" />' +
      "<label>" + t("Email (optional)") + "</label>" +
      '<input type="email" id="amx-correo" autocomplete="email" />' +
      "<label>" + t("Vehicle (make, model & year)") + "</label>" +
      '<input type="text" id="amx-veh" placeholder="' + esc(t("E.g. Nissan Rogue 2019")) + '" />' +
      "<label>" + t("Preferred date") + ' <span class="amx-req">*</span></label>' +
      '<input type="date" id="amx-fecha" />' +
      "<label>" + t("Preferred time") + ' <span class="amx-req">*</span></label>' +
      '<input type="time" id="amx-hora" />' +
      "<label>" + t("Vehicle photos") + ' <span class="amx-req">*</span></label>' +
      '<div class="amx-drop" id="amx-drop"><strong>' + t("Tap to upload") + "</strong> " + t("or drag your photos here") + "<br>" + t("Interior, exterior and any details (max.") + " " + MAX_FILES + ")</div>" +
      '<div class="amx-previews" id="amx-previews"></div>' +
      "<label>" + t("Notes (optional)") + "</label>" +
      '<textarea id="amx-notas" placeholder="' + esc(t("Tell us anything we should know...")) + '"></textarea>' +
      '<div class="amx-msg" id="amx-msg"></div>' +
      '<div class="amx-actions">' +
      '<button type="button" class="amx-btn amx-cancel">' + t("Cancel") + "</button>" +
      '<button type="button" class="amx-btn amx-submit">' + t("Submit & Book") + "</button>" +
      "</div></div>";
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
      if (!/^image\//.test(f.type)) { setMsg(t("Only images are allowed."), "err"); return; }
      if (f.size > MAX_MB * 1024 * 1024) { setMsg(t("Each photo must be under") + " " + MAX_MB + " MB.", "err"); return; }
      files.push(f);
    });
    renderPreviews();
  }

  function renderPreviews() {
    previews.innerHTML = "";
    files.forEach(function (f, i) {
      var d = document.createElement("div");
      d.className = "amx-thumb";
      var img = document.createElement("img");
      img.src = URL.createObjectURL(f);
      img.onload = function () { URL.revokeObjectURL(img.src); };
      var rm = document.createElement("button");
      rm.type = "button";
      rm.textContent = "×";
      rm.setAttribute("aria-label", t("Remove photo"));
      rm.addEventListener("click", function () { files.splice(i, 1); renderPreviews(); });
      d.appendChild(img);
      d.appendChild(rm);
      previews.appendChild(d);
    });
  }

  function setMsg(text, kind) {
    msg.textContent = text;
    msg.className = "amx-msg" + (kind ? " " + kind : "");
  }

  function openModal(pkgName, addons, removedNames, total) {
    // Rebuild if the modal is stale (e.g. language changed since it was built).
    var existing = document.getElementById("apex-modal-overlay");
    if (existing && existing.getAttribute("data-lang") !== getLang()) {
      existing.remove();
    }
    buildModal();
    ensureStyle();
    overlay.setAttribute("data-lang", getLang());
    currentPkg = pkgName || "";
    currentAddons = addons && addons.length ? addons : [];
    currentRemoved = removedNames && removedNames.length ? removedNames : [];
    currentTotal = (typeof total === "number") ? total : null;
    files = [];
    renderPreviews();
    setMsg("", "");
    overlay.querySelector("#amx-pkg").textContent = currentPkg || t("Detail");
    var addonsEl = overlay.querySelector("#amx-addons");
    if (currentAddons.length) {
      addonsEl.textContent = t("Add-ons: ") + currentAddons.join(", ");
      addonsEl.style.display = "block";
    } else {
      addonsEl.style.display = "none";
    }
    var removedEl = overlay.querySelector("#amx-removed");
    if (removedEl) {
      if (currentRemoved.length) {
        removedEl.textContent = (getLang() === "es" ? "Quitado: " : "Removed: ") + currentRemoved.join(", ");
        removedEl.style.display = "block";
      } else {
        removedEl.style.display = "none";
      }
    }
    var totalEl = overlay.querySelector("#amx-total");
    if (totalEl) {
      if (currentTotal !== null) {
        totalEl.textContent = (getLang() === "es" ? "Total estimado: " : "Estimated total: ") + "$" + currentTotal;
        totalEl.style.display = "block";
      } else {
        totalEl.style.display = "none";
      }
    }
    ["#amx-nombre", "#amx-tel", "#amx-correo", "#amx-veh", "#amx-notas", "#amx-fecha", "#amx-hora"].forEach(function (s) {
      overlay.querySelector(s).value = "";
    });
    overlay.querySelector("#amx-fecha").min = new Date().toISOString().slice(0, 10);
    submitBtn.disabled = false;
    submitBtn.textContent = t("Submit & Book");
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
    var fecha = overlay.querySelector("#amx-fecha").value;
    var hora = overlay.querySelector("#amx-hora").value;
    if (!nombre) { setMsg(t("Please enter your name."), "err"); return; }
    if (!tel) { setMsg(t("Please enter your phone number."), "err"); return; }
    if (!fecha) { setMsg(t("Please choose a date."), "err"); return; }
    if (!hora) { setMsg(t("Please choose a time."), "err"); return; }
    if (!files.length) { setMsg(t("Upload at least one photo of your vehicle."), "err"); return; }

    var fd = new FormData();
    fd.append("form-name", "booking");
    fd.append("bot-field", "");
    fd.append("nombre", nombre);
    fd.append("telefono", tel);
    fd.append("correo", overlay.querySelector("#amx-correo").value.trim());
    fd.append("vehiculo", overlay.querySelector("#amx-veh").value.trim());
    fd.append("paquete", currentPkg);
    fd.append("extras", currentAddons.join(", "));
      fd.append("personalizacion", currentRemoved.length ? currentRemoved.join(", ") : "");
      fd.append("total_estimado", currentTotal !== null ? ("$" + currentTotal) : "");
    fd.append("fecha", fecha);
    fd.append("hora", hora);
    fd.append("notas", overlay.querySelector("#amx-notas").value.trim());
    files.forEach(function (f) { fd.append("car_photos", f, f.name); });

    submitBtn.disabled = true;
    submitBtn.textContent = t("Sending...");
    setMsg(t("Uploading your photos..."), "");

      fetch("/", { method: "POST", body: fd })
      .then(function (r) {
        if (!r.ok) throw new Error("status " + r.status);
        setMsg(t("Thank you! We'll send you your final price soon."), "ok");
        try {
          fetch("/.netlify/functions/create-calendar-event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombre: nombre,
              telefono: tel,
              correo: overlay.querySelector("#amx-correo").value.trim(),
              vehiculo: overlay.querySelector("#amx-veh").value.trim(),
              paquete: currentPkg,
              extras: currentAddons.join(", "),
              personalizacion: currentRemoved.length ? currentRemoved.join(", ") : "",
              total_estimado: currentTotal !== null ? ("$" + currentTotal) : "",
              fecha: fecha,
              hora: hora,
              notas: overlay.querySelector("#amx-notas").value.trim(),
              origen: "booking",
            }),
          }).catch(function () {});
        } catch (e) {}

                submitBtn.disabled = false;
                submitBtn.textContent = t("Submit & Book");
                setTimeout(closeModal, 1200);
        
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = t("Submit & Book");
        setMsg(t("We couldn't submit the form. Message us on WhatsApp or try again."), "err");
      });
  }

  window.__apexOpenBooking = openModal;

  /* ------------------------------------------------------------------ gallery */
  function injectGallery() {
    var sec = document.getElementById("galeria");
    if (!sec || sec.getAttribute("data-apex-gallery") === "1") return;
    ensureStyle();
    var headHTML =
      '<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">' +
      hdr("Our", "Gallery", "Nuestra", "Galería", "text-blue-brand") +
      "</h2>";
    var items = GALLERY.map(function (m) {
      if (m.type === "video") {
        return (
          '<div class="amg-item"><span class="amg-badge">' + t("Video") + "</span>" +
          '<video src="' + m.src + '" poster="' + m.poster + '" controls preload="none" playsinline muted></video>' +
          '<button class="amg-expand amg-vid-full" type="button" aria-label="' + esc(t("Fullscreen")) + '" title="' + esc(t("Fullscreen")) + '">&#9974;</button></div>'
        );
      }
      return (
        '<div class="amg-item amg-photo" data-full="' + m.src + '">' +
        '<img src="' + m.src + '" alt="Apex Detailing" loading="lazy" />' +
        '<button class="amg-expand" type="button" aria-label="' + esc(t("View fullscreen")) + '" title="' + esc(t("Fullscreen")) + '">⛶</button></div>'
      );
    }).join("");
    sec.setAttribute("data-apex-gallery", "1");
    sec.setAttribute("data-lang", getLang());
    sec.innerHTML = headHTML + '<div id="apex-gallery">' + items + "</div>";

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
    sec.querySelectorAll("#apex-gallery .amg-photo").forEach(function (item) {
      item.addEventListener("click", function () { openLightbox(item.getAttribute("data-full")); });
    });
    sec.querySelectorAll("#apex-gallery .amg-vid-full").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var vid = btn.previousElementSibling;
        if (!vid) return;
        if (vid.requestFullscreen) vid.requestFullscreen();
        else if (vid.webkitRequestFullscreen) vid.webkitRequestFullscreen();
        else if (vid.webkitEnterFullscreen) vid.webkitEnterFullscreen();
      });
    });
  }

  /* ----------------------------------------------------------- image lightbox */
  var lb, lbImg, lbScale = 1, lbX = 0, lbY = 0;
  function applyTransform() {
    lbImg.style.transform = "translate(" + lbX + "px," + lbY + "px) scale(" + lbScale + ")";
  }
  function setScale(s) {
    lbScale = Math.max(1, Math.min(6, s));
    if (lbScale === 1) { lbX = 0; lbY = 0; }
    applyTransform();
  }
  function resetZoom() { lbScale = 1; lbX = 0; lbY = 0; if (lbImg) applyTransform(); }
  function touchDist(e) {
    var a = e.touches[0], b = e.touches[1];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  }

  function buildLightbox() {
    if (document.getElementById("apex-lightbox")) return;
    lb = document.createElement("div");
    lb.id = "apex-lightbox";
    lb.innerHTML =
      '<button id="apex-lb-close" type="button" aria-label="' + esc(t("Close")) + '">&times;</button>' +
      '<img alt="Apex Detailing" />' +
      '<div class="apex-lb-hint">' + t("Scroll or +/− to zoom · drag to pan · double-click to zoom") + "</div>" +
      '<div class="apex-lb-ctrls"><button type="button" data-z="out" aria-label="' + esc(t("Zoom out")) + '">−</button>' +
      '<button type="button" data-z="reset" aria-label="' + esc(t("Reset")) + '">⟲</button>' +
      '<button type="button" data-z="in" aria-label="' + esc(t("Zoom in")) + '">+</button></div>';
    document.body.appendChild(lb);
    lbImg = lb.querySelector("img");

    lb.querySelector("#apex-lb-close").addEventListener("click", closeLightbox);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lb.classList.contains("open")) closeLightbox();
    });
    lb.querySelectorAll(".apex-lb-ctrls button").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        var z = b.getAttribute("data-z");
        if (z === "in") setScale(lbScale * 1.4);
        else if (z === "out") setScale(lbScale / 1.4);
        else resetZoom();
      });
    });
    lb.addEventListener("wheel", function (e) {
      e.preventDefault();
      setScale(lbScale * (e.deltaY < 0 ? 1.12 : 0.89));
    }, { passive: false });
    lbImg.addEventListener("dblclick", function (e) {
      e.preventDefault();
      if (lbScale > 1) resetZoom(); else setScale(2.4);
    });

    var dragging = false, sx = 0, sy = 0;
    lbImg.addEventListener("mousedown", function (e) {
      if (lbScale <= 1) return;
      dragging = true; sx = e.clientX - lbX; sy = e.clientY - lbY;
      lbImg.classList.add("grabbing"); e.preventDefault();
    });
    window.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      lbX = e.clientX - sx; lbY = e.clientY - sy; applyTransform();
    });
    window.addEventListener("mouseup", function () {
      dragging = false; if (lbImg) lbImg.classList.remove("grabbing");
    });

    var pinch = 0, startScale = 1, tsx = 0, tsy = 0, touchPan = false;
    lbImg.addEventListener("touchstart", function (e) {
      if (e.touches.length === 2) { pinch = touchDist(e); startScale = lbScale; }
      else if (e.touches.length === 1 && lbScale > 1) {
        touchPan = true; tsx = e.touches[0].clientX - lbX; tsy = e.touches[0].clientY - lbY;
      }
    }, { passive: false });
    lbImg.addEventListener("touchmove", function (e) {
      if (e.touches.length === 2 && pinch) { e.preventDefault(); setScale(startScale * (touchDist(e) / pinch)); }
      else if (touchPan && e.touches.length === 1) {
        e.preventDefault();
        lbX = e.touches[0].clientX - tsx; lbY = e.touches[0].clientY - tsy; applyTransform();
      }
    }, { passive: false });
    lbImg.addEventListener("touchend", function (e) { if (e.touches.length === 0) touchPan = false; });
  }

  function openLightbox(src) {
    if (!src) return;
    buildLightbox();
    ensureStyle();
    resetZoom();
    lbImg.src = src;
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove("open");
    document.body.style.overflow = "";
    resetZoom();
  }

  /* --------------------------------------------------- footer: cities, hours, social */
  function slugify(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function enhanceFooter() {
    var footer = document.querySelector("footer");
    if (!footer) return;
    ensureStyle();

    var social = [].slice.call(footer.querySelectorAll('a[href="#"]'));
    var order = ["facebook", "instagram", "tiktok"];
    social.forEach(function (a, i) {
      var key = order[i];
      if (!key) return;
      a.setAttribute("href", SOCIAL[key] || "#");
      if (SOCIAL[key] && SOCIAL[key] !== "#") {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
      }
      a.setAttribute("aria-label", key);
    });
    if (social[2] && social[2].getAttribute("data-apex-tt") !== "1") {
      social[2].innerHTML = TIKTOK_SVG;
      social[2].setAttribute("data-apex-tt", "1");
    }

    // Cities -> links (only once; city names don't translate).
    if (!footer.querySelector(".apex-city-link")) {
      var cityP = [].slice.call(footer.querySelectorAll("p")).find(function (p) {
        return /Houston/.test(p.textContent) && /Katy/.test(p.textContent) && p.children.length === 0;
      });
      if (cityP) {
        var cities = cityP.textContent.split("|").map(function (c) { return c.trim(); }).filter(Boolean);
        cityP.innerHTML = cities.map(function (c) {
          return '<a class="apex-city-link" href="' + CITY_BASE + slugify(c) + '">' + c + "</a>";
        }).join('<span class="apex-city-sep">|</span>');
        var h = document.createElement("p");
        h.className = "apex-hours";
        cityP.parentNode.insertBefore(h, cityP.nextSibling);
      }
    }
    // Hours text: keep in the current language. Only write when it actually
    // changes, otherwise the innerHTML update retriggers the MutationObserver.
    var hoursEl = footer.querySelector(".apex-hours");
    if (hoursEl) {
      var desiredHours = t("Open every day") + " · <strong>" + HOURS + "</strong>";
      if (hoursEl.innerHTML !== desiredHours) hoursEl.innerHTML = desiredHours;
    }
  }

  /* ------------------------------------------------- quote form -> Netlify Forms */
  function showQuoteMsg(form, text, kind) {
    var m = form.querySelector(".apex-quote-msg");
    if (!m) { m = document.createElement("p"); m.className = "apex-quote-msg"; form.appendChild(m); }
    m.textContent = text;
    m.style.color = kind === "err" ? "#e05c5c" : kind === "ok" ? "#4ac76e" : "#8a8fa8";
  }

  function wireQuote() {
    var c = document.getElementById("contacto");
    if (!c) return;
    var form = c.querySelector("form");
    if (!form || form.getAttribute("data-apex-quote") === "1") return;
    form.setAttribute("data-apex-quote", "1");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      // Select by position/type so it works regardless of language (placeholders translate).
      var texts = [].slice.call(form.querySelectorAll('input[type="text"], input[type="tel"], input:not([type])'));
      var nombre = (texts[0] && texts[0].value.trim()) || "";
      var tel = (texts[1] && texts[1].value.trim()) || "";
      var veh = (texts[2] && texts[2].value.trim()) || "";
      var s = form.querySelector("select");
      var serv = s ? s.value : "";
      var d = form.querySelector('input[type="date"]');
      var fecha = d ? d.value : "";
      var ta = form.querySelector("textarea");
      var mensaje = ta ? ta.value.trim() : "";
      var btn = form.querySelector('button[type="submit"]') || form.querySelector("button");

      if (!nombre || !tel) { showQuoteMsg(form, t("Please enter your name and phone number."), "err"); return; }

      var fd = new FormData();
      fd.append("form-name", "quote");
      fd.append("bot-field", "");
      fd.append("nombre", nombre);
      fd.append("telefono", tel);
      fd.append("vehiculo", veh);
      fd.append("servicio", serv);
      fd.append("fecha", fecha);
      fd.append("mensaje", mensaje);

      var oldTxt = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = t("Sending..."); }
      showQuoteMsg(form, t("Submitting your request..."), "");

      fetch("/", { method: "POST", body: fd })
        .then(function (r) {
          if (!r.ok) throw new Error();
          showQuoteMsg(form, t("Thank you! We received your request. We'll contact you soon."), "ok");
          try {
            fetch("/.netlify/functions/create-calendar-event", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                nombre: nombre,
                telefono: tel,
                vehiculo: veh,
                servicio: serv,
                fecha: fecha,
                mensaje: mensaje,
                origen: "quote",
              }),
            }).catch(function () {});
          } catch (e) {}
          form.reset();
        })
        .catch(function () {
          showQuoteMsg(form, t("We couldn't submit it. Call us at 346-307-0407 or try again."), "err");
        })
        .then(function () { if (btn) { btn.disabled = false; btn.textContent = oldTxt; } });
    }, true);
  }

  /* ------------------------------------------------------------- hero CTA + note */
  function rewireHero() {
    var links = document.querySelectorAll('a[href="#contacto"]');
    links.forEach(function (a) {
      if (/(reservar\s+ahora|book\s+now)/i.test(a.textContent) && a.getAttribute("href") !== "#paquetes") {
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
    note.innerHTML = t("📸 When booking, upload photos of your vehicle and we'll confirm the <strong>final price</strong> before your appointment.");
    grid.parentNode.insertBefore(note, grid.nextSibling);
  }

  /* ------------------------------------------------- prestige tagline */
  function injectTagline() {
    var target = document.getElementById("servicios");
    if (!target || document.getElementById("apex-tagline")) return;
    ensureStyle();
    var sec = document.createElement("div");
    sec.id = "apex-tagline";
    sec.className = "apex-tagline";
    sec.innerHTML =
      '<div class="apex-tagline-inner">' +
      '<p class="apex-tagline-kicker">' + t("Excellence in Every Detail") + "</p>" +
      '<h2 class="apex-tagline-main">' + hdr("We Treat Every Car Like", "a Work of Art", "Tratamos Cada Auto Como", "una Obra de Arte") + "</h2>" +
      '<div class="apex-tagline-divider"></div>' +
      '<p class="apex-tagline-sub">' + t("Your Prestige. Our Passion.") + "</p>" +
      "</div>";
    target.parentNode.insertBefore(sec, target);
  }

  /* ------------------------------------------------- how it works */
  var HIW_STEPS = [
    { title: "Book Your Time", text: "Choose your package and select the date and time that works best for you." },
    { title: "We Come to You", text: "We arrive with all the necessary equipment, so you don't have to go anywhere." },
    { title: "Enjoy Your Car", text: "Get your vehicle back clean, shiny, and like new." },
  ];

  function injectHowItWorks() {
    var target = document.getElementById("nosotros");
    if (!target || document.getElementById("apex-hiw")) return;
    ensureStyle();
    var sec = document.createElement("section");
    sec.id = "apex-hiw";
    sec.className = "apex-hiw";
    sec.innerHTML =
      '<div class="apex-hiw-inner">' +
      '<h2 class="apex-hiw-title">' + hdr("How It", "Works", "Cómo", "Funciona") + "</h2>" +
      '<div class="apex-hiw-steps">' +
      HIW_STEPS.map(function (s, i) {
        return '<div class="apex-hiw-step"><div class="apex-hiw-num">' + (i + 1) + "</div>" +
          "<h3>" + esc(t(s.title)) + "</h3><p>" + esc(t(s.text)) + "</p></div>";
      }).join("") +
      "</div></div>";
    target.parentNode.insertBefore(sec, target);
  }

  /* ------------------------------------------------- service areas */
  var CITIES = [
    { name: "Houston", img: "https://images.unsplash.com/photo-1746311528667-1038fe0c8c46?q=80&w=800&auto=format&fit=crop" },
    { name: "Katy", img: "https://images.unsplash.com/photo-1770938474431-d1192cac9642?q=80&w=800&auto=format&fit=crop" },
    { name: "Fulshear", img: "https://images.unsplash.com/photo-1763680694053-6e86cd08053e?q=80&w=800&auto=format&fit=crop" },
    { name: "Richmond", img: "https://images.unsplash.com/photo-1758304481137-9eb706071871?q=80&w=800&auto=format&fit=crop" },
    { name: "Rosenberg", img: "https://images.unsplash.com/photo-1765601296884-eb4fabe7fc2e?q=80&w=800&auto=format&fit=crop" },
  ];

  function injectServiceAreas() {
    var target = document.getElementById("nosotros");
    if (!target || document.getElementById("apex-areas")) return;
    ensureStyle();
    var sec = document.createElement("section");
    sec.id = "apex-areas";
    sec.className = "apex-areas";
    sec.innerHTML =
      '<div class="apex-areas-inner">' +
      '<h2 class="apex-areas-title">' + hdr("Areas We", "Serve", "Áreas que", "Atendemos") + "</h2>" +
      '<p class="apex-areas-sub">' + t("Mobile detailing service in Houston and surrounding areas.") + "</p>" +
      '<div class="apex-areas-grid">' +
      CITIES.map(function (c) {
        return '<div class="apex-area-card" style="background-image:url(\'' + c.img + '\')">' +
          '<div class="apex-area-overlay"><span>' + esc(c.name) + "</span></div></div>";
      }).join("") +
      "</div></div>";
    target.parentNode.insertBefore(sec, target);
  }

  /* ------------------------------------------------------------------ observers */
  function apply() {
    rewireHero();
    injectGallery();
    addPriceNote();
    enhanceFooter();
    wireQuote();
    injectTagline();
    injectHowItWorks();
    injectServiceAreas();
  }

  // When the language changes, tear down language-dependent injected pieces so
  // they rebuild in the new language on the next apply().
  var lastLang = getLang();
  function onMutation() {
    var now = getLang();
    if (now !== lastLang) {
      lastLang = now;
      ["apex-tagline", "apex-hiw", "apex-areas", "apex-modal-overlay"].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.remove();
      });
      var g = document.getElementById("galeria");
      if (g) g.removeAttribute("data-apex-gallery");
      var note = document.querySelector("#apex-pkgs .price-note");
      if (note) note.remove();
    }
    apply();
  }

  var obs = new MutationObserver(onMutation);
  obs.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();

/*
 * Apex Detailing — booking flow + gallery + extra sections + UI polish
 * Injected at runtime (the site ships as a compiled bundle with no source).
 *
 * Bilingual: the site's language menu only translates its native React content,
 * so everything injected here detects the selected language (from the language
 * toggle button) and renders EN/ES itself, re-rendering when the user switches.
 * Note: brand content (slogan, package names) is kept in English per site policy.
 */
(function () {
  "use strict";

 var CAL = "https://calendar.app.google/2VnG1xwYJw5LwXKXA";
  var MAX_FILES = 8;
  var MAX_MB = 10;
  var HOURS = "7:00 AM – 8:00 PM";
  var SLOGAN = "We Treat Every Car Like a Masterpiece.";
  var INSTAGRAM_HANDLE = "@Apex_Detailing_Fulshear";

 // Centralized social config. Instagram is the confirmed official handle.
 // Facebook reuses the confirmed link already present in the project.
 // Any network with no confirmed URL is left out entirely (no dead links).
 var SOCIAL = {
   facebook: "https://www.facebook.com/ApexDetailingTX",
   instagram: "https://www.instagram.com/apex_detailing_fulshear/",
 };
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
   // social / contact (kept in English on purpose; see SLOGAN/INSTAGRAM_HANDLE)
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

 var IG_SVG =
   '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
   '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg>';

 var FB_SVG =
   '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
   '<path d="M22 12.06C22 6.48 17.52 2 11.94 2S1.88 6.48 1.88 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.42V9.91c0-2.39 1.42-3.71 3.6-3.71 1.04 0 2.13.19 2.13.19v2.35h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.91h-2.22V22c4.78-.76 8.44-4.92 8.44-9.94z"></path></svg>';

 var PHONE_SVG =
   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
   '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';

 var GALLERY = [
{ type: "drive", id: "1Wuzt1OHtPyBSe8pqM6HvBYW3UNWXonDO" },
{ type: "drive", id: "14KUGy3SaatcdH9_2RIYn9SJZDlliaXSa" },
{ type: "drive", id: "1ZpBGBV-OI-GB9ozcrsAH9BJYVN-d7RM0" },
{ type: "video", src: "/assets/gallery/video-1.mp4", poster: "/assets/gallery/poster-1.jpg" },
{ type: "video", src: "/assets/gallery/video-2.mp4", poster: "/assets/gallery/poster-2.jpg" },
{ type: "video", src: "/assets/gallery/video-3.mp4", poster: "/assets/gallery/poster-3.jpg" },
{ type: "video", src: "/assets/gallery/video-4.mp4", poster: "/assets/gallery/poster-4.jpg" },
{ type: "image", src: "/assets/gallery/photo-1.jpg" },
{ type: "image", src: "/assets/gallery/photo-2.jpg" },
{ type: "image", src: "/assets/gallery/photo-3.jpg" },
{ type: "image", src: "/assets/gallery/photo-4.jpg" },
{ type: "image", src: "/assets/gallery/photo-5.jpg" },
];

 /* ------------------------------------------------------------------ styles */
 var CSS = [
   "#apex-modal-overlay{position:fixed;inset:0;background:rgba(3,6,15,.74);backdrop-filter:blur(4px);z-index:99999;display:none;align-items:flex-start;justify-content:center;overflow-y:auto;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}",
   "#apex-modal-overlay.open{display:flex;}",
   "#apex-modal{position:relative;width:100%;max-width:520px;background:#3a3f43;border:1px solid #4b5257;border-radius:16px;padding:26px;color:#fff;box-shadow:0 24px 60px rgba(0,0,0,.5);animation:apexpop .18s ease;}",
   "@keyframes apexpop{from{opacity:0;transform:translateY(12px) scale(.98);}to{opacity:1;transform:none;}}",
   "#apex-modal h3{font-size:1.35rem;font-weight:700;margin:0 0 4px;}",
   "#apex-modal .amx-sub{font-size:.85rem;color:#a8adb1;margin:0 0 16px;line-height:1.4;}",
   "#apex-modal .amx-pkg{display:inline-block;font-size:12px;font-weight:700;color:#29b6f6;background:rgba(41,182,246,.1);border:1px solid rgba(41,182,246,.25);border-radius:20px;padding:4px 12px;margin-bottom:6px;}",
   "#apex-modal label{display:block;font-size:12px;color:#d4d8db;margin:14px 0 5px;font-weight:600;}",
   "#apex-modal .amx-req{color:#29b6f6;}",
   "#apex-modal input[type=text],#apex-modal input[type=tel],#apex-modal input[type=email],#apex-modal input[type=date],#apex-modal input[type=time],#apex-modal textarea{width:100%;box-sizing:border-box;background:#2b2f32;border:1px solid #54595d;border-radius:8px;padding:10px 12px;color:#fff;font-size:14px;font-family:inherit;transition:border-color .15s;}",
   "#apex-modal .amx-addons{font-size:12px;color:#29b6f6;background:rgba(41,182,246,.08);border:1px solid rgba(41,182,246,.2);border-radius:8px;padding:8px 10px;margin:-2px 0 4px;line-height:1.4;}",
   "#apex-modal input:focus,#apex-modal textarea:focus{outline:none;border-color:#29b6f6;}",
   "#apex-modal textarea{resize:vertical;min-height:58px;}",
   "#apex-modal .amx-drop{border:1.5px dashed #585d61;border-radius:10px;padding:20px;text-align:center;cursor:pointer;transition:border-color .15s,background .15s;color:#a8adb1;font-size:13px;line-height:1.5;}",
   "#apex-modal .amx-drop:hover,#apex-modal .amx-drop.drag{border-color:#29b6f6;background:rgba(41,182,246,.06);color:#d4d8db;}",
   "#apex-modal .amx-drop strong{color:#29b6f6;}",
   "#apex-modal .amx-previews{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;}",
   "#apex-modal .amx-thumb{position:relative;width:60px;height:60px;border-radius:8px;overflow:hidden;border:1px solid #54595d;}",
   "#apex-modal .amx-thumb img{width:100%;height:100%;object-fit:cover;}",
   "#apex-modal .amx-thumb button{position:absolute;top:-7px;right:-7px;background:#e05c5c;color:#fff;border-radius:50%;width:19px;height:19px;font-size:12px;line-height:1;text-align:center;cursor:pointer;border:2px solid #3a3f43;padding:0;}",
   "#apex-modal .amx-msg{font-size:12px;margin-top:10px;min-height:14px;}",
   "#apex-modal .amx-msg.err{color:#e05c5c;}",
   "#apex-modal .amx-msg.ok{color:#4ac76e;}",
   "#apex-modal .amx-actions{display:flex;gap:10px;margin-top:22px;}",
   "#apex-modal .amx-btn{flex:1;padding:12px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;border:none;transition:opacity .15s,background .15s;font-family:inherit;}",
   "#apex-modal .amx-cancel{background:transparent;border:1.5px solid #63686c;color:#fff;}",
   "#apex-modal .amx-cancel:hover{background:#4b5257;}",
   "#apex-modal .amx-submit{background:#29b6f6;color:#fff;}",
   "#apex-modal .amx-submit:hover{opacity:.9;}",
   "#apex-modal .amx-submit:disabled{opacity:.5;cursor:default;}",
   "#apex-modal .amx-x{position:absolute;top:14px;right:16px;background:none;border:none;color:#a8adb1;font-size:22px;line-height:1;cursor:pointer;padding:4px;}",
   "#apex-modal .amx-x:hover{color:#fff;}",
   "#apex-gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;}",
   "#apex-gallery .amg-item{position:relative;border-radius:14px;overflow:hidden;border:1px solid #4b5257;background:#2b2f32;aspect-ratio:3/4;transition:transform .2s,border-color .2s;}",
   "#apex-gallery .amg-item:hover{transform:translateY(-4px);border-color:#29b6f6;}",
   "#apex-gallery .amg-item video,#apex-gallery .amg-item img,#apex-gallery .amg-item iframe{width:100%;height:100%;object-fit:cover;display:block;background:#2b2f32;border:0;}",
   "#apex-gallery .amg-badge{position:absolute;top:8px;left:8px;background:rgba(10,17,32,.8);color:#fff;font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;padding:3px 8px;border-radius:6px;pointer-events:none;}",
   "#apex-pkgs .price-note{text-align:center;font-size:12px;color:#29b6f6;background:rgba(41,182,246,.06);border:1px solid rgba(41,182,246,.15);border-radius:8px;padding:9px 12px;max-width:640px;margin:-32px auto 40px;}",
   "#apex-gallery .amg-item.amg-photo{cursor:zoom-in;}",
   "#apex-gallery .amg-expand{position:absolute;top:8px;right:8px;background:rgba(10,17,32,.82);border:none;color:#fff;width:34px;height:34px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;z-index:2;transition:background .15s,transform .15s;}",
   "#apex-gallery .amg-item:hover .amg-expand{background:#29b6f6;}",
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
   ".apex-lb-hint{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);color:#a8adb1;font-size:12px;z-index:2;white-space:nowrap;}",
   ".apex-city-link{color:#29b6f6 !important;text-decoration:none;transition:color .15s;}",
   ".apex-city-link:hover{text-decoration:underline;color:#5cd0ff !important;}",
   ".apex-city-sep{color:#6b7075;margin:0 2px;}",
   ".apex-hours{color:#a8adb1;font-size:13px;margin-top:6px;}",
   ".apex-hours strong{color:#fff;}",
   ".apex-quote-msg{margin-top:10px;font-size:13px;}",
   "@media (max-width:600px){#apex-modal{padding:20px;}#apex-gallery{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));}.apex-lb-hint{display:none;}}",
   ".apex-tagline{background:linear-gradient(135deg,#2e3337 0%,#3d4348 55%,#2e3337 100%);padding:64px 20px;text-align:center;border-top:1px solid #4b5257;border-bottom:1px solid #4b5257;}",
   ".apex-tagline-inner{max-width:820px;margin:0 auto;}",
   ".apex-tagline-kicker{color:#29b6f6;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;}",
   ".apex-tagline-main{color:#fff;font-size:clamp(22px,4vw,38px);font-weight:800;line-height:1.25;text-transform:uppercase;letter-spacing:.5px;margin:0;}",
   ".apex-tagline-main span{color:#29b6f6;}",
   ".apex-tagline-divider{width:60px;height:3px;background:#29b6f6;margin:24px auto;border-radius:2px;}",
   ".apex-tagline-sub{color:#d4d8db;font-size:18px;font-style:italic;font-weight:500;letter-spacing:.5px;margin:0;}",
   ".apex-hiw{background:#2e3337;padding:80px 16px;}",
   ".apex-hiw-inner{max-width:1100px;margin:0 auto;text-align:center;}",
   ".apex-hiw-title{font-size:2rem;font-weight:800;color:#fff;margin-bottom:44px;}",
   ".apex-hiw-title span{color:#29b6f6;}",
   ".apex-hiw-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:32px;text-align:left;}",
   ".apex-hiw-step{background:#3a3f43;border:1px solid #4b5257;border-radius:14px;padding:26px;}",
   ".apex-hiw-num{width:40px;height:40px;border-radius:50%;background:#29b6f6;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;margin-bottom:16px;}",
   ".apex-hiw-step h3{color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:8px;}",
   ".apex-hiw-step p{color:#a8adb1;font-size:14px;line-height:1.5;margin:0;}",
   ".apex-areas{background:#33383c;padding:80px 16px;}",
   ".apex-areas-inner{max-width:1100px;margin:0 auto;text-align:center;}",
   ".apex-areas-title{font-size:2rem;font-weight:800;color:#fff;margin-bottom:10px;}",
   ".apex-areas-title span{color:#29b6f6;}",
   ".apex-areas-sub{color:#a8adb1;margin-bottom:40px;}",
   ".apex-areas-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:18px;}",
   ".apex-area-card{position:relative;height:160px;border-radius:14px;background-size:cover;background-position:center;overflow:hidden;border:1px solid #4b5257;transition:transform .2s ease;}",
   ".apex-area-card:hover{transform:translateY(-4px);}",
   ".apex-area-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,7,12,.15),rgba(5,7,12,.85));display:flex;align-items:flex-end;justify-content:center;padding-bottom:16px;}",
   ".apex-area-overlay span{color:#fff;font-weight:700;font-size:16px;letter-spacing:.3px;}",
   "html{scroll-behavior:smooth;}",
   "#servicios,#paquetes,#nosotros,#galeria,#testimonios,#contacto,.pkg-card,[id^='card-']{scroll-margin-top:88px;}",
   ".apex-header-ig{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;color:#d4d8db;background:transparent;border:1px solid transparent;transition:color .15s,border-color .15s;margin-right:6px;}",
   ".apex-header-ig:hover,.apex-header-ig:focus-visible{color:#29b6f6;border-color:#585d61;outline:none;}",
   ".apex-contact-links{display:flex;flex-direction:column;gap:10px;margin-bottom:22px;}",
   ".apex-contact-link{display:inline-flex;align-items:center;gap:8px;color:#d4d8db;text-decoration:none;font-size:14px;transition:color .15s;}",
   ".apex-contact-link:hover,.apex-contact-link:focus-visible{color:#29b6f6;outline:none;}",
   ".apex-follow{background:#2e3337;padding:64px 16px;border-top:1px solid #4b5257;text-align:center;}",
   ".apex-follow-inner{max-width:640px;margin:0 auto;}",
   ".apex-follow-inner h2{color:#fff;font-size:1.7rem;font-weight:800;margin-bottom:10px;}",
   ".apex-follow-inner p{color:#a8adb1;font-size:14px;margin-bottom:26px;}",
   ".apex-follow-btns{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;}",
   ".apex-follow-btn{display:inline-flex;align-items:center;gap:10px;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;transition:opacity .15s,transform .15s;}",
   ".apex-follow-btn:hover{opacity:.88;transform:translateY(-2px);}",
   ".apex-follow-btn:focus-visible{outline:2px solid #29b6f6;outline-offset:2px;}",
   ".apex-follow-btn.ig{background:linear-gradient(135deg,#29b6f6,#8b5cf6);color:#fff;}",
   ".apex-follow-btn.fb{background:#1877f2;color:#fff;}",
   "@media (max-width:600px){.apex-hiw-title,.apex-areas-title{font-size:1.6rem;}}",
      "/* ===== Global site-wide theme: cement gray + sky blue + white (Tailwind overrides) ===== */",
   "body,#root,#root>div{background-color:#3d4348 !important;}",
   "[class*=\"bg-black\"]{background-color:#2e3337 !important;}",
   "[class*=\"bg-gray-950\"]{background-color:#2e3337 !important;}",
   "[class*=\"bg-gray-900\"]{background-color:#3d4348 !important;}",
   "section[class*=\"bg-gradient-to-b\"],div[class*=\"bg-gradient-to-b\"]{background-image:linear-gradient(180deg,#3d4348 0%,#2e3337 100%) !important;}",
   "[class*=\"border-gray-600\"],[class*=\"border-gray-700\"],[class*=\"border-gray-800\"]{border-color:#4b5257 !important;}",
   "[class*=\"text-gray-300\"],[class*=\"text-gray-400\"]{color:#c7ccd1 !important;}",
   "[class*=\"text-gray-500\"]{color:#a8adb1 !important;}",
   "[class*=\"text-gray-600\"]{color:#9aa0a5 !important;}",
   ".bg-blue-brand{background-color:#29b6f6 !important;}",
   ".text-blue-brand{color:#29b6f6 !important;}",
   ".border-blue-brand{border-color:#29b6f6 !important;}",
   "[class*=\"hover:bg-blue-700\"]:hover,[class*=\"hover:bg-blue-brand\"]:hover{background-color:#139cd8 !important;}",
   "[class*=\"hover:text-blue-brand\"]:hover{color:#139cd8 !important;}",
   "[class*=\"hover:border-blue-brand\"]:hover,[class*=\"focus:border-blue-brand\"]:focus{border-color:#139cd8 !important;}",
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

 function getPhoneHref() {
   var a = document.querySelector('a[href^="tel:"]');
   return a ? a.getAttribute("href") : null;
 }

 function closeMobileMenu() {
   var mobileNav = document.querySelector("nav.md\\:hidden");
   if (!mobileNav) return;
   var btns = document.querySelectorAll("header button");
   var toggle = btns[btns.length - 1];
   if (toggle) toggle.click();
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

 window.__apexOpenBooking = openModal;

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
     if (m.type === "drive") {
     return (
     '<div class="amg-item amg-drive"><span class="amg-badge">' + t("Video") + "</span>" +
     '<iframe src="https://drive.google.com/file/d/' + m.id + '/preview" allow="autoplay" loading="lazy" frameborder="0"></iframe></div>'
     );
     }
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

  // Social icons: process each placeholder exactly once (fixes a re-render
  // bug where a stale icon could inherit the wrong network's link), and
  // drop any icon with no confirmed URL instead of leaving a dead "#" link.
  var socialRow = footer.querySelector(".flex.justify-center.gap-4") || footer;
   var candidates = [].slice.call(socialRow.querySelectorAll("a")).filter(function (a) {
     return a.getAttribute("data-apex-social") !== "1";
   });
   var order = ["facebook", "instagram"];
   candidates.forEach(function (a, i) {
     a.setAttribute("data-apex-social", "1");
     var key = order[i];
     if (!key || !SOCIAL[key]) { a.remove(); return; }
     a.setAttribute("href", SOCIAL[key]);
     a.setAttribute("target", "_blank");
     a.setAttribute("rel", "noopener noreferrer");
     a.setAttribute("aria-label", key === "instagram" ? "Visit Apex Detailing on Instagram" : "Visit Apex Detailing on Facebook");
   });

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
   var hoursEl = footer.querySelector(".apex-hours");
   if (hoursEl) {
     var desiredHours = t("Open every day") + " · <strong>" + HOURS + "</strong>";
     if (hoursEl.innerHTML !== desiredHours) hoursEl.innerHTML = desiredHours;
   }

  // Phone: give it an icon + descriptive aria-label (reuses the existing number).
  var telA = footer.querySelector('a[href^="tel:"]');
   if (telA && telA.getAttribute("data-apex-tel") !== "1") {
     telA.setAttribute("data-apex-tel", "1");
     telA.setAttribute("aria-label", "Call Apex Detailing");
     telA.innerHTML = PHONE_SVG + '<span style="margin-left:6px;">' + telA.textContent + "</span>";
     telA.style.display = "inline-flex";
     telA.style.alignItems = "center";
     telA.style.justifyContent = "center";
   }

  // Dynamic copyright year (no hardcoded year).
  var copyP = [].slice.call(footer.querySelectorAll("p")).find(function (p) {
    return /©\s*\d{4}/.test(p.textContent);
  });
   if (copyP) {
     var fixedYear = copyP.textContent.replace(/\d{4}/, String(new Date().getFullYear()));
     if (copyP.textContent !== fixedYear) copyP.textContent = fixedYear;
   }
 }

 /* ------------------------------------------------------- social: header, nav, contact */
 function enhanceSocial() {
   ensureStyle();

  // Header: persistent Instagram icon next to the language toggle / hamburger.
  var headerRow = document.querySelector("header > div, header .flex.items-center.justify-between");
   if (headerRow && !document.getElementById("apex-header-ig")) {
     var hamburger = headerRow.querySelector(":scope > button");
     var a = document.createElement("a");
     a.id = "apex-header-ig";
     a.href = SOCIAL.instagram;
     a.target = "_blank";
     a.rel = "noopener noreferrer";
     a.setAttribute("aria-label", "Visit Apex Detailing on Instagram");
     a.className = "apex-header-ig";
     a.innerHTML = IG_SVG;
     if (hamburger) headerRow.insertBefore(a, hamburger);
     else headerRow.appendChild(a);
   }

  // Desktop + mobile nav menus: add Ceramic Coating, Book Now, Instagram.
  document.querySelectorAll("nav").forEach(function (nav) {
    if (nav.getAttribute("data-apex-nav") === "1") return;
    var sample = nav.querySelector("a");
    if (!sample) return;
    nav.setAttribute("data-apex-nav", "1");
    var cls = sample.className;

                                           var ceramic = document.createElement("a");
    ceramic.href = "#card-ceramic";
    ceramic.className = cls;
    ceramic.textContent = "Ceramic Coating";

                                           var book = document.createElement("a");
    book.href = "#paquetes";
    book.className = cls;
    book.textContent = "Book Now";

                                           var ig = document.createElement("a");
    ig.href = SOCIAL.instagram;
    ig.target = "_blank";
    ig.rel = "noopener noreferrer";
    ig.setAttribute("aria-label", "Visit Apex Detailing on Instagram");
    ig.className = cls;
    ig.textContent = "Instagram";

                                           var contactLink = nav.querySelector('a[href="#contacto"]');
    [ceramic, book, ig].forEach(function (el) {
      if (contactLink) nav.insertBefore(el, contactLink);
      else nav.appendChild(el);
    });

                                           [ceramic, book].forEach(function (el) {
                                             el.addEventListener("click", function (e) {
                                               e.preventDefault();
                                               var target = document.querySelector(el.getAttribute("href"));
                                               closeMobileMenu();
                                               if (target) {
                                                 setTimeout(function () {
                                                   target.scrollIntoView({ behavior: "smooth", block: "start" });
                                                 }, 10);
                                               }
                                             });
                                           });
    ig.addEventListener("click", function () { closeMobileMenu(); });
  });

  // Contact section: quick phone + Instagram links (reuses existing phone number).
  var contact = document.getElementById("contacto");
   if (contact && !contact.querySelector(".apex-contact-links")) {
     var box = document.createElement("div");
     box.className = "apex-contact-links";
     var telHref = getPhoneHref();
     var telNum = telHref ? telHref.replace("tel:", "") : "";
     box.innerHTML =
       (telHref
        ? '<a href="' + telHref + '" class="apex-contact-link" aria-label="Call Apex Detailing">' + PHONE_SVG + "<span>" + esc(telNum) + "</span></a>"
        : "") +
       '<a href="' + SOCIAL.instagram + '" target="_blank" rel="noopener noreferrer" class="apex-contact-link" aria-label="Visit Apex Detailing on Instagram">' +
       IG_SVG + "<span>Follow us on Instagram " + esc(INSTAGRAM_HANDLE) + "</span></a>";
     contact.insertBefore(box, contact.firstChild);
   }
 }

 /* ------------------------------------------------- pre-footer follow section */
 function injectFollowSection() {
   var footer = document.querySelector("footer");
   if (!footer || document.getElementById("apex-follow")) return;
   ensureStyle();
   var sec = document.createElement("section");
   sec.id = "apex-follow";
   sec.className = "apex-follow";
   sec.innerHTML =
     '<div class="apex-follow-inner">' +
     "<h2>Follow Apex Detailing</h2>" +
     "<p>See our latest details, transformations and behind-the-scenes work.</p>" +
     '<div class="apex-follow-btns">' +
     '<a class="apex-follow-btn ig" href="' + SOCIAL.instagram + '" target="_blank" rel="noopener noreferrer" aria-label="Visit Apex Detailing on Instagram">' +
     IG_SVG + "<span>Follow " + esc(INSTAGRAM_HANDLE) + "</span></a>" +
     (SOCIAL.facebook
      ? '<a class="apex-follow-btn fb" href="' + SOCIAL.facebook + '" target="_blank" rel="noopener noreferrer" aria-label="Visit Apex Detailing on Facebook">' + FB_SVG + "<span>Follow Us on Facebook</span></a>"
      : "") +
     "</div></div>";
   footer.parentNode.insertBefore(sec, footer);
 }

 /* ------------------------------------------------- quote form -> Netlify Forms */
 function showQuoteMsg(form, text, kind) {
   var m = form.querySelector(".apex-quote-msg");
   if (!m) { m = document.createElement("p"); m.className = "apex-quote-msg"; form.appendChild(m); }
   m.textContent = text;
   m.style.color = kind === "err" ? "#e05c5c" : kind === "ok" ? "#4ac76e" : "#a8adb1";
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
   var header = wrap.querySelector(".section-header");
   if (!header) return;
   var note = document.createElement("p");
   note.className = "price-note";
   note.innerHTML = t("📸 When booking, upload photos of your vehicle and we'll confirm the <strong>final price</strong> before your appointment.");
   header.parentNode.insertBefore(note, header.nextSibling);
 }

 /* ------------------------------------------------- brand tagline */
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
     '<p class="apex-tagline-sub">' + esc(SLOGAN) + "</p>" +
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
 function apply() { fixLogoLink(); function fixLogoLink() { var a = document.querySelectorAll('a[href="#"]'); for (var i=0;i<a.length;i++){ if (a[i].querySelector('img[alt="Apex Detailing"]') && !a[i].getAttribute('data-apex-logo-fixed')) { a[i].setAttribute('href','/'); a[i].setAttribute('data-apex-logo-fixed','1'); } } }
   rewireHero();
   injectGallery();
   addPriceNote();
   enhanceFooter();
   enhanceSocial();
   injectFollowSection();
   wireQuote();
   injectTagline();
   injectHowItWorks();
   injectServiceAreas();
 }

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

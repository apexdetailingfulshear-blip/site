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
 // Any network with no confirmed URL is left out entirely (no dead links).
 var SOCIAL = {
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
 
  // reviews
  "Loading reviews...": "Cargando resenas...",
  "Share Your Experience": "Comparte tu Experiencia",
  "Rating": "Calificacion",
  "Your Review": "Tu Resena",
  "Photo (optional)": "Foto (opcional)",
  "Choose photo": "Elegir foto",
  "Submit Review": "Enviar Resena",
  "Be the first to leave a review!": "Se el primero en dejar una resena!",
  "Reviews are unavailable right now.": "Las resenas no estan disponibles en este momento.",
  "Please choose a rating.": "Por favor elige una calificacion.",
  "Please write a comment.": "Por favor escribe un comentario.",
  "Thank you! Your review will appear after approval.": "Gracias! Tu resena aparecera despues de ser aprobada.",
  "We couldn't submit your review. Please try again.": "No se pudo enviar tu resena. Intenta de nuevo.",
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

 var PHONE_SVG =
   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
   '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';

 var EMAIL_ADDR = "apexdetailingfulshear@gmail.com";
 var EMAIL_SVG =
   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
   '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>';

 var GALLERY = [
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
   "#apex-modal{position:relative;width:100%;max-width:520px;background:#ffffff;border:1px solid #d8dee3;border-radius:16px;padding:26px;color:#202832;box-shadow:0 24px 60px rgba(0,0,0,.5);animation:apexpop .18s ease;}",
   "@keyframes apexpop{from{opacity:0;transform:translateY(12px) scale(.98);}to{opacity:1;transform:none;}}",
   "#apex-modal h3{font-size:1.35rem;font-weight:700;margin:0 0 4px;}",
   "#apex-modal .amx-sub{font-size:.85rem;color:#667079;margin:0 0 16px;line-height:1.4;}",
   "#apex-modal .amx-pkg{display:inline-block;font-size:12px;font-weight:700;color:#29b6f6;background:rgba(41,182,246,.1);border:1px solid rgba(41,182,246,.25);border-radius:20px;padding:4px 12px;margin-bottom:6px;}",
   "#apex-modal label{display:block;font-size:12px;color:#4b5560;margin:14px 0 5px;font-weight:600;}",
   "#apex-modal .amx-req{color:#29b6f6;}",
   "#apex-modal input[type=text],#apex-modal input[type=tel],#apex-modal input[type=email],#apex-modal input[type=date],#apex-modal input[type=time],#apex-modal textarea{width:100%;box-sizing:border-box;background:#eef1f4;border:1px solid #d8dee3;border-radius:8px;padding:10px 12px;color:#202832;font-size:14px;font-family:inherit;transition:border-color .15s;}",
   "#apex-modal .amx-addons{font-size:12px;color:#29b6f6;background:rgba(41,182,246,.08);border:1px solid rgba(41,182,246,.2);border-radius:8px;padding:8px 10px;margin:-2px 0 4px;line-height:1.4;}",
   "#apex-modal input:focus,#apex-modal textarea:focus{outline:none;border-color:#29b6f6;}",
   "#apex-modal textarea{resize:vertical;min-height:58px;}",
   "#apex-modal .amx-drop{border:1.5px dashed #d8dee3;border-radius:10px;padding:20px;text-align:center;cursor:pointer;transition:border-color .15s,background .15s;color:#667079;font-size:13px;line-height:1.5;}",
   "#apex-modal .amx-drop:hover,#apex-modal .amx-drop.drag{border-color:#29b6f6;background:rgba(41,182,246,.06);color:#4b5560;}",
   "#apex-modal .amx-drop strong{color:#29b6f6;}",
   "#apex-modal .amx-previews{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;}",
   "#apex-modal .amx-thumb{position:relative;width:60px;height:60px;border-radius:8px;overflow:hidden;border:1px solid #d8dee3;}",
   "#apex-modal .amx-thumb img{width:100%;height:100%;object-fit:cover;}",
   "#apex-modal .amx-thumb button{position:absolute;top:-7px;right:-7px;background:#e05c5c;color:#fff;border-radius:50%;width:19px;height:19px;font-size:12px;line-height:1;text-align:center;cursor:pointer;border:2px solid #ffffff;padding:0;}",
   "#apex-modal .amx-msg{font-size:12px;margin-top:10px;min-height:14px;}",
   "#apex-modal .amx-msg.err{color:#e05c5c;}",
   "#apex-modal .amx-msg.ok{color:#4ac76e;}",
   "#apex-modal .amx-actions{display:flex;gap:10px;margin-top:22px;}",
   "#apex-modal .amx-btn{flex:1;padding:12px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;border:none;transition:opacity .15s,background .15s;font-family:inherit;}",
   "#apex-modal .amx-cancel{background:transparent;border:1.5px solid #d8dee3;color:#202832;}",
   "#apex-modal .amx-cancel:hover{background:#d8dee3;}",
   "#apex-modal .amx-submit{background:#29b6f6;color:#fff;}",
   "#apex-modal .amx-submit:hover{opacity:.9;}",
   "#apex-modal .amx-submit:disabled{opacity:.5;cursor:default;}",
   "#apex-modal .amx-x{position:absolute;top:14px;right:16px;background:none;border:none;color:#667079;font-size:22px;line-height:1;cursor:pointer;padding:4px;}",
   "#apex-modal .amx-x:hover{color:#139cd8;}",
   "#apex-gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;}",
   "#apex-gallery .amg-item{position:relative;border-radius:14px;overflow:hidden;border:1px solid #d8dee3;background:#eef1f4;aspect-ratio:3/4;transition:transform .2s,border-color .2s;}",
   "#apex-gallery .amg-item:hover{transform:translateY(-4px);border-color:#29b6f6;}",
   "#apex-gallery .amg-item video,#apex-gallery .amg-item img,#apex-gallery .amg-item iframe{width:100%;height:100%;object-fit:cover;display:block;background:#eef1f4;border:0;}",
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
   ".apex-lb-hint{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);color:#667079;font-size:12px;z-index:2;white-space:nowrap;}",
   ".apex-city-link{color:#29b6f6 !important;text-decoration:none;transition:color .15s;}",
   ".apex-city-link:hover{text-decoration:underline;color:#139cd8 !important;}",
   ".apex-city-sep{color:#838c94;margin:0 2px;}",
   ".apex-hours{color:#667079;font-size:13px;margin-top:6px;}",
   ".apex-hours strong{color:#202832;}",
   ".apex-quote-msg{margin-top:10px;font-size:13px;}",
   "@media (max-width:600px){#apex-modal{padding:20px;}#apex-gallery{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));}.apex-lb-hint{display:none;}}",
   ".apex-tagline{background:linear-gradient(135deg,#eef1f4 0%,#ffffff 55%,#eef1f4 100%);padding:64px 20px;text-align:center;border-top:1px solid #d8dee3;border-bottom:1px solid #d8dee3;}",
   ".apex-tagline-inner{max-width:820px;margin:0 auto;}",
   ".apex-tagline-kicker{color:#29b6f6;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;}",
   ".apex-tagline-main{color:#202832;font-size:clamp(22px,4vw,38px);font-weight:800;line-height:1.25;text-transform:uppercase;letter-spacing:.5px;margin:0;}",
   ".apex-tagline-main span{color:#29b6f6;}",
   ".apex-tagline-divider{width:60px;height:3px;background:#29b6f6;margin:24px auto;border-radius:2px;}",
   ".apex-tagline-sub{color:#4b5560;font-size:18px;font-style:italic;font-weight:500;letter-spacing:.5px;margin:0;}",
   ".apex-hiw{background:#eef1f4;padding:80px 16px;}",
   ".apex-hiw-inner{max-width:1100px;margin:0 auto;text-align:center;}",
   ".apex-hiw-title{font-size:2rem;font-weight:800;color:#202832;margin-bottom:44px;}",
   ".apex-hiw-title span{color:#29b6f6;}",
   ".apex-hiw-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:32px;text-align:left;}",
   ".apex-hiw-step{background:#ffffff;border:1px solid #d8dee3;border-radius:14px;padding:26px;}",
   ".apex-hiw-num{width:40px;height:40px;border-radius:50%;background:#29b6f6;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;margin-bottom:16px;}",
   ".apex-hiw-step h3{color:#202832;font-size:1.1rem;font-weight:700;margin-bottom:8px;}",
   ".apex-hiw-step p{color:#667079;font-size:14px;line-height:1.5;margin:0;}",
   ".apex-areas{background:#eef1f4;padding:80px 16px;}",
   ".apex-areas-inner{max-width:1100px;margin:0 auto;text-align:center;}",
   ".apex-areas-title{font-size:2rem;font-weight:800;color:#202832;margin-bottom:10px;}",
   ".apex-areas-title span{color:#29b6f6;}",
   ".apex-areas-sub{color:#667079;margin-bottom:40px;}",
   ".apex-areas-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:18px;}",
   ".apex-area-card{position:relative;height:160px;border-radius:14px;background-size:cover;background-position:center;overflow:hidden;border:1px solid #d8dee3;transition:transform .2s ease;}",
   ".apex-area-card:hover{transform:translateY(-4px);}",
   ".apex-area-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,7,12,.15),rgba(5,7,12,.85));display:flex;align-items:flex-end;justify-content:center;padding-bottom:16px;}",
   ".apex-area-overlay span{color:#fff;font-weight:700;font-size:16px;letter-spacing:.3px;}",
   "html{scroll-behavior:smooth;}",
   "#servicios,#paquetes,#nosotros,#galeria,#testimonios,#contacto,.pkg-card,[id^='card-']{scroll-margin-top:88px;}",
   ".apex-header-ig{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;color:#4b5560;background:transparent;border:1px solid transparent;transition:color .15s,border-color .15s;margin-right:6px;}",
   ".apex-header-ig:hover,.apex-header-ig:focus-visible{color:#29b6f6;border-color:#d8dee3;outline:none;}",
   ".apex-contact-links{display:flex;flex-direction:column;gap:10px;margin-bottom:22px;}",
   ".apex-contact-link{display:inline-flex;align-items:center;gap:8px;color:#4b5560;text-decoration:none;font-size:14px;transition:color .15s;}",
   ".apex-contact-link:hover,.apex-contact-link:focus-visible{color:#29b6f6;outline:none;}",
   ".apex-follow{background:#eef1f4;padding:64px 16px;border-top:1px solid #d8dee3;text-align:center;}",
   ".apex-follow-inner{max-width:640px;margin:0 auto;}",
   ".apex-follow-inner h2{color:#202832;font-size:1.7rem;font-weight:800;margin-bottom:10px;}",
   ".apex-follow-inner p{color:#667079;font-size:14px;margin-bottom:26px;}",
   ".apex-follow-btns{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;}",
   ".apex-follow-btn{display:inline-flex;align-items:center;gap:10px;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;transition:opacity .15s,transform .15s;}",
   ".apex-follow-btn:hover{opacity:.88;transform:translateY(-2px);}",
   ".apex-follow-btn:focus-visible{outline:2px solid #29b6f6;outline-offset:2px;}",
   ".apex-follow-btn.ig{background:linear-gradient(135deg,#29b6f6,#8b5cf6);color:#fff;}",
   "@media (max-width:600px){.apex-hiw-title,.apex-areas-title{font-size:1.6rem;}}",
      "/* ===== Global site-wide theme: light gray + sky blue + white ===== */",
   "body,#root,#root>div{background-color:#eef1f4 !important;color:#202832 !important;}",
   "[class*=\"bg-black\"]{background-color:#ffffff !important;}",
   "[class*=\"bg-gray-950\"]{background-color:#ffffff !important;}",
   "[class*=\"bg-gray-900\"]{background-color:#eef1f4 !important;}",
   "section[class*=\"bg-gradient-to-b\"],div[class*=\"bg-gradient-to-b\"]{background-image:linear-gradient(180deg,#ffffff 0%,#eef1f4 100%) !important;}",
   "[class*=\"border-gray-600\"],[class*=\"border-gray-700\"],[class*=\"border-gray-800\"]{border-color:#d8dee3 !important;}",
   "[class*=\"text-gray-300\"],[class*=\"text-gray-400\"]{color:#4b5560 !important;}",
   "[class*=\"text-gray-500\"]{color:#667079 !important;}",
   "[class*=\"text-gray-600\"]{color:#838c94 !important;}",
   ".bg-blue-brand{background-color:#29b6f6 !important;}",
   ".text-blue-brand{color:#29b6f6 !important;}",
   ".border-blue-brand{border-color:#29b6f6 !important;}",
   "[class*=\"hover:bg-blue-700\"]:hover,[class*=\"hover:bg-blue-brand\"]:hover{background-color:#139cd8 !important;}",
   "[class*=\"hover:text-blue-brand\"]:hover{color:#139cd8 !important;}",
   "[class*=\"hover:border-blue-brand\"]:hover,[class*=\"focus:border-blue-brand\"]:focus{border-color:#139cd8 !important;}",
   "[class*=\"text-white\"][class*=\"md:hidden\"]{color:#202832 !important;}",
   "[class*=\"hover:text-white\"]:not([class*=\"hover:bg-blue-brand\"]):hover{color:#139cd8 !important;}","#apex-reviews-wrap{max-width:1100px;margin:0 auto;}",
".apex-rev-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;margin-bottom:40px;}",
".apex-rev-card{background:#fff;border:1px solid #d8dee3;border-radius:14px;padding:20px;box-shadow:0 2px 10px rgba(20,30,40,.05);}",
".apex-rev-stars{color:#f5c518;letter-spacing:2px;margin-bottom:8px;font-size:15px;}",
".apex-rev-name{font-weight:700;color:#202832;margin-bottom:6px;}",
".apex-rev-comment{color:#4b5560;line-height:1.5;font-size:14px;}",
".apex-rev-photo{width:100%;max-height:180px;object-fit:cover;border-radius:10px;margin-top:12px;}",
".apex-rev-empty{text-align:center;color:#667079;padding:20px;grid-column:1/-1;}",
"#apex-review-form-wrap{background:#fff;border:1px solid #d8dee3;border-radius:16px;padding:28px;max-width:640px;margin:0 auto;}",
"#apex-review-form-wrap h3{color:#202832;margin-top:0;}",
".apex-rf-row{margin-bottom:14px;}",
".apex-rf-row label{display:block;font-size:13px;color:#667079;margin-bottom:6px;font-weight:600;}",
".apex-rf-row input[type=\"text\"]{width:100%;padding:10px 12px;border-radius:10px;border:1px solid #d8dee3;background:#eef1f4;color:#202832;font-family:inherit;font-size:14px;box-sizing:border-box;}",
".apex-rf-row textarea{width:100%;padding:10px 12px;border-radius:10px;border:1px solid #d8dee3;background:#eef1f4;color:#202832;font-family:inherit;font-size:14px;box-sizing:border-box;min-height:90px;resize:vertical;}",
".apex-rf-stars{display:flex;gap:6px;font-size:26px;cursor:pointer;}",
".apex-rf-stars span{color:#d8dee3;transition:color .15s;}",
".apex-rf-stars span.on{color:#f5c518;}",
".apex-rf-file-btn{display:inline-block;padding:9px 16px;border-radius:999px;border:1px solid #d8dee3;background:#eef1f4;color:#4b5560;font-size:13px;cursor:pointer;}",
".apex-rf-submit{background:#29b6f6;color:#fff;border:none;padding:12px 22px;border-radius:999px;font-weight:700;cursor:pointer;font-size:15px;}",
".apex-rf-submit:hover{background:#139cd8;}",
".apex-rf-submit:disabled{opacity:.6;cursor:default;}",
".apex-rf-msg{margin-top:12px;font-size:14px;min-height:18px;}",
".apex-rf-msg.err{color:#d64545;}",
".apex-rf-msg.ok{color:#1ea672;}",
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
 
   loadDynamicMedia(sec);
 }

 /* ------------------------------------------------------------ dynamic media */
 function loadDynamicMedia(sec) {
   fetch("/.netlify/functions/list-media").then(function (r) { return r.json(); }).then(function (items) {
     if (!items || !items.length) return;
     var grid = sec.querySelector("#apex-gallery");
     if (!grid) return;
     items.forEach(function (m) {
       var div = document.createElement("div");
       if (m.tipo === "video") {
         div.className = "amg-item";
         div.innerHTML =
           '<span class="amg-badge">' + t("Video") + "</span>" +
           '<video src="' + m.url + '" controls preload="none" playsinline muted></video>' +
           '<button class="amg-expand amg-vid-full" type="button" aria-label="' + esc(t("Fullscreen")) + '" title="' + esc(t("Fullscreen")) + '">\u26F6</button>';
       } else {
         div.className = "amg-item amg-photo";
         div.setAttribute("data-full", m.url);
         div.innerHTML =
           '<img src="' + m.url + '" alt="Apex Detailing" loading="lazy" />' +
           '<button class="amg-expand" type="button" aria-label="' + esc(t("View fullscreen")) + '" title="' + esc(t("Fullscreen")) + '">\u26F6</button>';
       }
       grid.appendChild(div);
       var imgEl = div.querySelector("img"), vidEl = div.querySelector("video");
       if (imgEl) imgEl.addEventListener("error", function () { div.remove(); });
       if (vidEl) vidEl.addEventListener("error", function () { div.remove(); }, true);
       if (m.tipo === "video") {
         var fbtn = div.querySelector(".amg-vid-full");
         if (fbtn) fbtn.addEventListener("click", function (ev) {
           ev.stopPropagation();
           var vid = fbtn.previousElementSibling;
           if (!vid) return;
           if (vid.requestFullscreen) vid.requestFullscreen();
           else if (vid.webkitRequestFullscreen) vid.webkitRequestFullscreen();
           else if (vid.webkitEnterFullscreen) vid.webkitEnterFullscreen();
         });
       } else {
         div.addEventListener("click", function () { openLightbox(div.getAttribute("data-full")); });
       }
     });
   }).catch(function () {});
 }

 /* ------------------------------------------------------------------ reviews */
 function injectReviews() {
   var sec = document.getElementById("testimonios");
   if (!sec || sec.getAttribute("data-apex-reviews") === "1") return;
   ensureStyle();
   sec.setAttribute("data-apex-reviews", "1");
   sec.setAttribute("data-lang", getLang());
   var headHTML =
     '<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">' +
     hdr("What Our", "Clients Say", "Lo Que Dicen", "Nuestros Clientes", "text-blue-brand") +
     "</h2>";
   var starsHtml = [1, 2, 3, 4, 5].map(function (n) { return '<span data-n="' + n + '">\u2605</span>'; }).join("");
   sec.innerHTML =
     headHTML +
     '<div id="apex-reviews-wrap">' +
     '<div id="apex-rev-grid" class="apex-rev-grid"><div class="apex-rev-empty">' + esc(t("Loading reviews...")) + "</div></div>" +
     '<div id="apex-review-form-wrap">' +
     "<h3>" + esc(t("Share Your Experience")) + "</h3>" +
     '<div class="apex-rf-row"><label>' + esc(t("Name")) + '</label><input type="text" id="apex-rf-name" maxlength="80" /></div>' +
     '<div class="apex-rf-row"><label>' + esc(t("Rating")) + '</label><div class="apex-rf-stars" id="apex-rf-stars">' + starsHtml + "</div></div>" +
     '<div class="apex-rf-row"><label>' + esc(t("Your Review")) + '</label><textarea id="apex-rf-comment" maxlength="1000"></textarea></div>' +
     '<div class="apex-rf-row"><label>' + esc(t("Photo (optional)")) + '</label><label class="apex-rf-file-btn" for="apex-rf-photo">' + esc(t("Choose photo")) + "</label>" +
     '<input type="file" accept="image/*" id="apex-rf-photo" style="display:none" /></div>' +
     '<button class="apex-rf-submit" id="apex-rf-submit">' + esc(t("Submit Review")) + "</button>" +
     '<div class="apex-rf-msg" id="apex-rf-msg"></div>' +
     "</div></div>";

   loadApprovedReviews();
   wireReviewForm();
 }

 function loadApprovedReviews() {
   var grid = document.getElementById("apex-rev-grid");
   if (!grid) return;
   fetch("/.netlify/functions/list-reviews-public")
     .then(function (r) { return r.json(); })
     .then(function (items) {
       if (!document.getElementById("apex-rev-grid")) return;
       if (!items || !items.length) {
         grid.innerHTML = '<div class="apex-rev-empty">' + esc(t("Be the first to leave a review!")) + "</div>";
         return;
       }
       grid.innerHTML = items.map(function (it) {
         var starsStr = "";
         for (var i = 1; i <= 5; i++) starsStr += i <= (it.calificacion || 0) ? "\u2605" : "\u2606";
         var photo = it.foto ? '<img class="apex-rev-photo" src="' + it.foto + '" alt="" />' : "";
         return (
           '<div class="apex-rev-card">' +
           '<div class="apex-rev-stars">' + starsStr + "</div>" +
           '<div class="apex-rev-name">' + esc(it.nombre) + "</div>" +
           '<div class="apex-rev-comment">' + esc(it.comentario) + "</div>" +
           photo +
           "</div>"
         );
       }).join("");
     })
     .catch(function () {
       if (grid) grid.innerHTML = '<div class="apex-rev-empty">' + esc(t("Reviews are unavailable right now.")) + "</div>";
     });
 }

 function compressReviewImage(file, maxDim, quality) {
   return new Promise(function (resolve, reject) {
     var img = new Image();
     var reader = new FileReader();
     reader.onload = function () {
       img.onload = function () {
         var w = img.width, h = img.height;
         if (w > h && w > maxDim) { h = Math.round((h * maxDim) / w); w = maxDim; }
         else if (h >= w && h > maxDim) { w = Math.round((w * maxDim) / h); h = maxDim; }
         var canvas = document.createElement("canvas");
         canvas.width = w; canvas.height = h;
         canvas.getContext("2d").drawImage(img, 0, 0, w, h);
         resolve(canvas.toDataURL("image/jpeg", quality));
       };
       img.onerror = function () { reject(new Error("bad image")); };
       img.src = reader.result;
     };
     reader.onerror = function () { reject(new Error("read error")); };
     reader.readAsDataURL(file);
   });
 }

 function wireReviewForm() {
   var starsWrap = document.getElementById("apex-rf-stars");
   var rating = 0;
   if (!starsWrap) return;
   var starEls = starsWrap.querySelectorAll("span");
   starEls.forEach(function (sp) {
     sp.addEventListener("click", function () {
       rating = parseInt(sp.getAttribute("data-n"), 10);
       starEls.forEach(function (s2) {
         if (parseInt(s2.getAttribute("data-n"), 10) <= rating) s2.classList.add("on");
         else s2.classList.remove("on");
       });
     });
   });

   var submitBtn = document.getElementById("apex-rf-submit");
   var msg = document.getElementById("apex-rf-msg");
   submitBtn.addEventListener("click", function () {
     msg.textContent = ""; msg.className = "apex-rf-msg";
     var nameInput = document.getElementById("apex-rf-name");
     var commentInput = document.getElementById("apex-rf-comment");
     var fileInput = document.getElementById("apex-rf-photo");
     var nombre = nameInput.value.trim();
     var comentario = commentInput.value.trim();
     if (!nombre) { msg.textContent = t("Please enter your name."); msg.className = "apex-rf-msg err"; return; }
     if (!rating) { msg.textContent = t("Please choose a rating."); msg.className = "apex-rf-msg err"; return; }
     if (!comentario) { msg.textContent = t("Please write a comment."); msg.className = "apex-rf-msg err"; return; }

     submitBtn.disabled = true;
     function finish(ok, text) {
       submitBtn.disabled = false;
       msg.textContent = text;
       msg.className = "apex-rf-msg " + (ok ? "ok" : "err");
       if (ok) {
         nameInput.value = ""; commentInput.value = ""; fileInput.value = "";
         rating = 0;
         starEls.forEach(function (s2) { s2.classList.remove("on"); });
       }
     }
     function send(foto) {
       fetch("/.netlify/functions/submit-review", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ nombre: nombre, calificacion: rating, comentario: comentario, foto: foto || null }),
       })
         .then(function (r) { if (!r.ok) throw new Error("status " + r.status); finish(true, t("Thank you! Your review will appear after approval.")); })
         .catch(function () { finish(false, t("We couldn't submit your review. Please try again.")); });
     }
     if (fileInput.files && fileInput.files[0]) {
       compressReviewImage(fileInput.files[0], 1000, 0.75).then(send).catch(function () { send(null); });
     } else {
       send(null);
     }
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
   candidates.forEach(function (a) {
     a.setAttribute("data-apex-social", "1");
     var isInstagram = /M12 2\.163/.test(a.innerHTML);
     if (!isInstagram) { a.remove(); return; }
     a.setAttribute("href", SOCIAL.instagram);
     a.setAttribute("target", "_blank");
     a.setAttribute("rel", "noopener noreferrer");
     a.setAttribute("aria-label", "Visit Apex Detailing on Instagram");
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

  // Email: add a mailto link next to phone (only once).
  if (!footer.querySelector(".apex-email-link")) {
    var emailA = document.createElement("a");
    emailA.href = "mailto:" + EMAIL_ADDR;
    emailA.className = "apex-email-link";
    emailA.setAttribute("aria-label", "Email Apex Detailing");
    emailA.innerHTML = EMAIL_SVG + '<span style="margin-left:6px;">' + EMAIL_ADDR + "</span>";
    emailA.style.display = "inline-flex";
    emailA.style.alignItems = "center";
    emailA.style.justifyContent = "center";
    emailA.style.color = "inherit";
    if (telA && telA.parentNode) {
      telA.parentNode.insertBefore(emailA, telA.nextSibling);
    } else {
      footer.appendChild(emailA);
    }
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
       '<a href="mailto:' + EMAIL_ADDR + '" class="apex-contact-link" aria-label="Email Apex Detailing">' + EMAIL_SVG + "<span>" + esc(EMAIL_ADDR) + "</span></a>" +
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
     "</div></div>";
   footer.parentNode.insertBefore(sec, footer);
 }

 /* ------------------------------------------------- quote form -> Netlify Forms */
 function showQuoteMsg(form, text, kind) {
   var m = form.querySelector(".apex-quote-msg");
   if (!m) { m = document.createElement("p"); m.className = "apex-quote-msg"; form.appendChild(m); }
   m.textContent = text;
   m.style.color = kind === "err" ? "#e05c5c" : kind === "ok" ? "#4ac76e" : "#667079";
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
   injectReviews();
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
      var rv = document.getElementById("testimonios");
      if (rv) rv.removeAttribute("data-apex-reviews");
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

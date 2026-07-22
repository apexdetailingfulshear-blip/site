const { JWT } = require("google-auth-library");

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "apexdetailingfulshear@gmail.com";
const TIMEZONE = "America/Chicago";
const DEFAULT_DURATION_MIN = 90;

// --- SMS notifications (Twilio) -------------------------------------------
// Sending is fully optional: if these environment variables are not set in
// Netlify (Site settings -> Environment variables), SMS is simply skipped
// and the booking / calendar event still works normally. No credentials are
// ever hard-coded here.
//   TWILIO_ACCOUNT_SID   - from your Twilio console
//   TWILIO_AUTH_TOKEN    - from your Twilio console
//   TWILIO_FROM_NUMBER   - the Twilio phone number that sends the SMS (E.164, e.g. +1346XXXXXXX)
//   OWNER_NOTIFY_NUMBER  - where new-booking alerts are sent (defaults to 346-307-0407)
const OWNER_NOTIFY_NUMBER = process.env.OWNER_NOTIFY_NUMBER || "+13463070407";

function smsConfigured() {
  return !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM_NUMBER);
}

function toE164(raw) {
  if (!raw) return null;
  var digits = String(raw).replace(/[^0-9]/g, "");
  if (digits.length === 10) return "+1" + digits;
  if (digits.length === 11 && digits[0] === "1") return "+" + digits;
  if (String(raw).trim().startsWith("+")) return String(raw).trim();
  return null;
}

async function sendSMS(to, body) {
  if (!smsConfigured() || !to) return;
  var sid = process.env.TWILIO_ACCOUNT_SID;
  var token = process.env.TWILIO_AUTH_TOKEN;
  var from = process.env.TWILIO_FROM_NUMBER;
  var url = "https://api.twilio.com/2010-04-01/Accounts/" + sid + "/Messages.json";
  var params = new URLSearchParams({ To: to, From: from, Body: body });
  try {
    var res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + Buffer.from(sid + ":" + token).toString("base64"),
      },
      body: params.toString(),
    });
    if (!res.ok) {
      var errText = await res.text().catch(function () { return ""; });
      console.error("Twilio SMS failed (" + res.status + "): " + errText);
    }
  } catch (e) {
    console.error("Twilio SMS error: " + (e && e.message ? e.message : String(e)));
  }
}

function buildOwnerMessage(data, bookingId) {
  var lines = [];
  lines.push("New Apex Detailing Booking");
  lines.push("Customer: " + (data.nombre || "-"));
  if (data.telefono) lines.push("Phone: " + data.telefono);
  if (data.correo) lines.push("Email: " + data.correo);
  lines.push("Service: " + (data.paquete || data.servicio || "-"));
  if (data.vehiculo) lines.push("Vehicle: " + data.vehiculo);
  if (data.fecha) lines.push("Date: " + data.fecha);
  if (data.hora) lines.push("Time: " + data.hora);
  lines.push("Address: Mobile service (client location)");
  if (data.total_estimado) lines.push("Total: " + data.total_estimado);
  if (data.notas) lines.push("Notes: " + data.notas);
  lines.push("Booking ID: " + bookingId);
  return lines.join("\n");
}

function buildCustomerMessage(data, bookingId) {
  var lines = [];
  lines.push("Apex Detailing - Booking Received");
  lines.push("Service: " + (data.paquete || data.servicio || "-"));
  if (data.fecha) lines.push("Date: " + data.fecha + (data.hora ? " " + data.hora : ""));
  lines.push("We come to you (mobile detailing) - please confirm your address with us.");
  lines.push("Questions or need to reschedule? Call/text us at 346-307-0407.");
  lines.push("Booking ID: " + bookingId);
  return lines.join("\n");
}
// ---------------------------------------------------------------------------

function getClient() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is not configured");
  const key = JSON.parse(raw);
  return new JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
}

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  try {
    const fecha = (data.fecha || "").trim();
    const hora = (data.hora || "").trim();

    if (!fecha) {
      return { statusCode: 400, body: "Missing fecha" };
    }

    let start, end;
    let allDay = false;

    if (hora) {
      const startDate = new Date(fecha + "T" + hora + ":00");
      if (isNaN(startDate.getTime())) {
        return { statusCode: 400, body: "Invalid fecha/hora" };
      }
      const endDate = new Date(startDate.getTime() + DEFAULT_DURATION_MIN * 60000);
      start = { dateTime: startDate.toISOString(), timeZone: TIMEZONE };
      end = { dateTime: endDate.toISOString(), timeZone: TIMEZONE };
    } else {
      const endDate = new Date(fecha + "T00:00:00");
      if (isNaN(endDate.getTime())) {
        return { statusCode: 400, body: "Invalid fecha" };
      }
      endDate.setDate(endDate.getDate() + 1);
      start = { date: fecha };
      end = { date: endDate.toISOString().slice(0, 10) };
      allDay = true;
    }

    const titlePkg = data.paquete || data.servicio || "Detailing";
    const nombre = data.nombre || "Cliente";
    const summary = "Apex Detailing: " + titlePkg + " - " + nombre;

    const descLines = [];
    if (data.telefono) descLines.push("Telefono: " + data.telefono);
    if (data.correo) descLines.push("Correo: " + data.correo);
    if (data.vehiculo) descLines.push("Vehiculo: " + data.vehiculo);
    if (data.extras) descLines.push("Adicionales: " + data.extras);
    if (data.personalizacion) descLines.push("Personalizacion: " + data.personalizacion);
    if (data.total_estimado) descLines.push("Total estimado: " + data.total_estimado);
    if (data.notas) descLines.push("Notas: " + data.notas);
    if (data.mensaje) descLines.push("Mensaje: " + data.mensaje);
    if (allDay) descLines.push("(Hora exacta pendiente de confirmar con el cliente)");
    descLines.push("Origen: " + (data.origen || "sitio web"));

    const client = getClient();
    await client.authorize();

    const res = await client.request({
      url:
        "https://www.googleapis.com/calendar/v3/calendars/" +
        encodeURIComponent(CALENDAR_ID) +
        "/events",
      method: "POST",
      data: {
        summary: summary,
        description: descLines.join("\n"),
        start: start,
        end: end,
      },
    });

    const bookingId = "APX-" + String(res.data.id || "").slice(-8).toUpperCase();

    if (smsConfigured()) {
      try {
        await sendSMS(OWNER_NOTIFY_NUMBER, buildOwnerMessage(data, bookingId));
        const custPhone = toE164(data.telefono);
        if (custPhone) await sendSMS(custPhone, buildCustomerMessage(data, bookingId));
      } catch (smsErr) {
        console.error("SMS notification error: " + (smsErr && smsErr.message ? smsErr.message : String(smsErr)));
      }
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, eventId: res.data.id, htmlLink: res.data.htmlLink, bookingId: bookingId }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: "Error creating calendar event: " + (e && e.message ? e.message : String(e)),
    };
  }
};

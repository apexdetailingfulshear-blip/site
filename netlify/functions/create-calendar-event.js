const { JWT } = require("google-auth-library");

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "apexdetailingfulshear@gmail.com";
const TIMEZONE = "America/Chicago";
const DEFAULT_DURATION_MIN = 90;

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

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, eventId: res.data.id, htmlLink: res.data.htmlLink }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: "Error creating calendar event: " + (e && e.message ? e.message : String(e)),
    };
  }
};

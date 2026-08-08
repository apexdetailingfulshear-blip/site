const { getBlobStore } = require("./lib/blob-store");

function reservasStore() {
  return getBlobStore("reservas");
}

exports.handler = async function (event) {
  const adminKey = process.env.ADMIN_KEY;
  const headers = event.headers || {};
  const provided = headers["x-admin-key"] || headers["X-Admin-Key"];
  if (!adminKey) return { statusCode: 500, body: "ADMIN_KEY is not configured on the server." };
  if (!provided || provided !== adminKey) return { statusCode: 401, body: "Unauthorized" };
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const id = data.id;
  const action = data.action;
  if (!id || !action) return { statusCode: 400, body: "Faltan parametros." };

  // Reservations that came in through Netlify Forms (not our own blob store)
  // have ids like "form-<formname>-<number>" — there's nothing to update in
  // Blobs for those, so just no-op success for status changes (the admin UI
  // still lets the person call/WhatsApp/email from the list either way).
  const isFormEntry = String(id).indexOf("form-") === 0;

  try {
    const store = reservasStore();

    if (action === "delete") {
      if (!isFormEntry) await store.delete(id);
      return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: true }) };
    }

    if (action === "estado") {
      const estado = data.estado;
      const allowed = ["nuevo", "contactado", "completado", "cancelado"];
      if (allowed.indexOf(estado) === -1) return { statusCode: 400, body: "Estado invalido." };
      if (isFormEntry) {
        return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: true, note: "form-entry" }) };
      }
      const rec = await store.get(id, { type: "json" });
      if (!rec) return { statusCode: 404, body: "No encontrada" };
      rec.estado = estado;
      await store.setJSON(id, rec);
      return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: true, item: rec }) };
    }

    return { statusCode: 400, body: "Accion invalida." };
  } catch (e) {
    return { statusCode: 500, body: "Error: " + e.message };
  }
};

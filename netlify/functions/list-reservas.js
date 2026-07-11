const { getStore } = require("@netlify/blobs");

function reservasStore() {
      return getStore({
              name: "reservas",
              siteID: process.env.SITE_ID,
              token: process.env.NETLIFY_API_TOKEN,
      });
}

async function fetchFormSubmissions() {
      const siteId = process.env.SITE_ID;
      const token = process.env.NETLIFY_API_TOKEN;
      if (!siteId || !token) return [];

  const apiHeaders = { Authorization: "Bearer " + token };
      const formsRes = await fetch(
              "https://api.netlify.com/api/v1/sites/" + siteId + "/forms",
          { headers: apiHeaders }
            );
      if (!formsRes.ok) return [];
      const forms = await formsRes.json();

  const all = [];
      for (const form of forms) {
              const subsRes = await fetch(
                        "https://api.netlify.com/api/v1/forms/" + form.id + "/submissions",
                  { headers: apiHeaders }
                      );
              if (!subsRes.ok) continue;
              const subs = await subsRes.json();
              for (const s of subs) {
                        const d = s.data || {};
                        all.push({
                                    id: "form-" + form.name + "-" + s.number,
                                    origen: form.name,
                                    recibido: s.created_at,
                                    nombre: d.nombre || d.name || "",
                                    telefono: d.telefono || d.phone || "",
                                    vehiculo: d.vehiculo || "",
                                    paquete: d.paquete || d.servicio || "",
                                    personalizacion: d.personalizacion || "",
                                    extras: d.extras || "",
                                    total_estimado: d.total_estimado || "",
                                    fecha: d.fecha || "",
                                    hora: d.hora || "",
                                    notas: d.notas || d.mensaje || "",
                        });
              }
      }
      return all;
}

exports.handler = async function (event) {
      const adminKey = process.env.ADMIN_KEY;
      const headers = event.headers || {};
      const provided =
              headers["x-admin-key"] ||
              headers["X-Admin-Key"] ||
              (event.queryStringParameters && event.queryStringParameters.key);

      if (!adminKey) {
              return { statusCode: 500, body: "ADMIN_KEY is not configured on the server." };
      }
      if (!provided || provided !== adminKey) {
              return { statusCode: 401, body: "Unauthorized" };
      }

      try {
              const items = [];

        try {
                  const store = reservasStore();
                  const { blobs } = await store.list();
                  for (const entry of blobs) {
                              const val = await store.get(entry.key, { type: "json" });
                              if (val) items.push(val);
                  }
        } catch (e) {
                  // Blobs opcional: si falla, seguimos solo con Netlify Forms.
        }

        const formItems = await fetchFormSubmissions();
              items.push.apply(items, formItems);

        items.sort(function (a, b) {
                  return new Date(b.recibido || 0) - new Date(a.recibido || 0);
        });

        return {
                  statusCode: 200,
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(items),
        };
      } catch (e) {
              return { statusCode: 500, body: "Error listing reservas: " + e.message };
      }
};

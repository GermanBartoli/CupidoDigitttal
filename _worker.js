const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });

export async function onRequestPost({ request, env }) {
  if (!env.CONTACT_RECIPIENT)
    return json(
      { ok: false, error: "El formulario todavía no está configurado." },
      503,
    );
  if (Number(request.headers.get("content-length") || 0) > 12000)
    return json({ ok: false, error: "El mensaje es demasiado largo." }, 413);

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "No pudimos leer el formulario." }, 400);
  }

  if (form.get("website")) return json({ ok: true });

  const nombre = String(form.get("nombre") || "").trim();
  const email = String(form.get("email") || "").trim();
  const servicio = String(form.get("servicio") || "").trim();
  const mensaje = String(form.get("mensaje") || "").trim();

  if (
    !nombre ||
    nombre.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 200 ||
    !servicio ||
    !mensaje ||
    mensaje.length > 3000
  ) {
    return json(
      { ok: false, error: "Revisá los datos e intentá nuevamente." },
      400,
    );
  }

  const allowed = [
    "Gestión de redes",
    "Reels y contenido",
    "Fotografía",
    "Diseño e identidad",
    "Una idea diferente",
  ];
  if (!allowed.includes(servicio))
    return json({ ok: false, error: "Elegí un servicio válido." }, 400);

  const payload = new URLSearchParams({
    name: nombre,
    email,
    service: servicio,
    message: mensaje,
    _subject: "Nuevo contacto desde Cupido Digitttal",
    _template: "table",
    _honey: "",
  });

  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/" + encodeURIComponent(env.CONTACT_RECIPIENT),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Origin: new URL(request.url).origin,
          Referer: new URL(request.url).origin + "/",
        },
        body: payload.toString(),
      },
    );
    const result = await response.json();
    if (result.success === false || result.success === "false") {
      if (/activation/i.test(String(result.message || ""))) {
        return json(
          {
            ok: false,
            error:
              "El formulario aún no está activado. Escribinos por Instagram mientras tanto.",
          },
          503,
        );
      }
      throw new Error("Rechazado por el servicio de correo");
    }
    if (!response.ok) throw new Error("Error del servicio de correo");
    return json({ ok: true });
  } catch {
    return json(
      {
        ok: false,
        error: "No pudimos enviar el mensaje ahora. Intentá más tarde.",
      },
      502,
    );
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST")
        return json({ ok: false, error: "Método no permitido." }, 405);
      return onRequestPost({ request, env });
    }
    return env.ASSETS.fetch(request);
  },
};

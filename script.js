const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  navigation.classList.toggle("open", open);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((item) => observer.observe(item));
} else {
  document
    .querySelectorAll(".reveal")
    .forEach((item) => item.classList.add("visible"));
}

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

async function sendDirectly() {
  const data = new FormData(form);
  const response = await fetch("https://formsubmit.co/ajax/anastacianieto2@gmail.com", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: data.get("nombre"),
      email: data.get("email"),
      service: data.get("servicio"),
      message: data.get("mensaje"),
      _subject: "Nuevo contacto desde Cupido Digitttal",
      _template: "table",
      _honey: data.get("website"),
    }),
  });
  const result = await response.json();
  if (!response.ok || (result.success !== true && result.success !== "true"))
    throw new Error("No pudimos enviar el mensaje ahora. Intentá más tarde.");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  status.textContent = "Enviando tu mensaje...";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    const result = await response.json();
    if (response.status === 502) await sendDirectly();
    else if (!response.ok || !result.ok)
      throw new Error(result.error || "No pudimos enviar el mensaje.");
    form.reset();
    status.textContent = "¡Mensaje enviado! Te responderemos pronto. ♥";
  } catch (error) {
    status.textContent =
      error.message || "Ocurrió un error. Intentá nuevamente.";
  } finally {
    button.disabled = false;
  }
});

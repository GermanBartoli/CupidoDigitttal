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
const mediaDialog = document.querySelector("#media-dialog");
const mediaImage = document.querySelector("#media-image");
const mediaVideo = document.querySelector("#media-video");
const mediaControls = document.querySelector(".gallery-controls");
const mediaError = document.querySelector("#media-error");
let activeMedia;
let mediaIndex = 0;
let mediaTrigger;

const works = {
  ingreso: { title: "Un nuevo ingreso que se ve.", description: "Flyer de producto para Almacén La Paz: Monster Ultra Strawberry Dreams.", images: ["/assets/trabajos/nuevo-ingreso.jpeg"], url: "/assets/trabajos/nuevo-ingreso.jpeg" },
  halloween: { title: "La Paz se viste de Halloween.", description: "Una identidad de temporada para acompañar los contenidos de Almacén La Paz.", images: ["/assets/trabajos/halloween.jpeg"], url: "/assets/trabajos/halloween.jpeg" },
  boletos: { title: "Boletos con un toque de magia.", description: "Boleto Fantasma: tres versiones para La Paz 1, La Paz 2 y La Paz 3. Explorá los diseños o abrí el PDF completo.", images: [1, 2, 3].map(number => `/assets/trabajos/ticket-${number}.jpg`), url: "/assets/trabajos/boletos-fantasma.pdf", sourceLabel: "Abrir PDF completo ↗" },
};

function showMediaImage() {
  mediaError.hidden = true;
  mediaImage.src = activeMedia.images[mediaIndex];
  mediaImage.alt = `${activeMedia.title} · imagen ${mediaIndex + 1} de ${activeMedia.images.length}`;
  document.querySelector("#media-counter").textContent = `${mediaIndex + 1} / ${activeMedia.images.length}`;
}

function openMedia(item, trigger) {
  activeMedia = item;
  mediaIndex = 0;
  mediaTrigger = trigger;
  mediaError.hidden = true;
  document.querySelector("#media-title").textContent = item.title;
  document.querySelector("#media-description").textContent = item.description;
  document.querySelector("#media-label").textContent = item.label || "CUPIDO DIGITTTAL · DISEÑO";
  const source = document.querySelector("#media-source");
  source.href = item.url;
  source.textContent = item.sourceLabel || "Abrir diseño original ↗";
  mediaImage.hidden = Boolean(item.video);
  mediaVideo.hidden = !item.video;
  mediaControls.hidden = Boolean(item.video) || item.images.length < 2;
  if (item.video) {
    mediaVideo.poster = item.images[0];
    mediaVideo.src = item.video;
    mediaVideo.setAttribute("aria-label", item.title);
  } else showMediaImage();
  mediaDialog.showModal();
  document.body.classList.add("modal-open");
}

function stepMedia(direction) {
  if (!activeMedia || activeMedia.video || activeMedia.images.length < 2) return;
  mediaIndex = (mediaIndex + direction + activeMedia.images.length) % activeMedia.images.length;
  showMediaImage();
}

const postVideos = {
  "Dd-EZdOhMqi": "/assets/instagram-juego.mp4",
  "Ddzy5iQhMVa": "/assets/instagram-jefes.mp4",
};
document.querySelectorAll(".post-card").forEach(card => {
  card.setAttribute("aria-haspopup", "dialog");
  card.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const code = new URL(card.href).pathname.split("/").filter(Boolean).pop();
    openMedia({ title: card.querySelector("h3").textContent, description: card.querySelector(".post-content p").textContent.trim(), images: [card.querySelector("img").src], video: postVideos[code], url: card.href, label: "CUPIDO DIGITTTAL · INSTAGRAM", sourceLabel: "Ver en Instagram ↗" }, card);
  });
});
document.querySelectorAll("[data-work]").forEach(button => {
  button.setAttribute("aria-haspopup", "dialog");
  button.addEventListener("click", () => openMedia(works[button.dataset.work], button));
});
document.querySelector(".media-close").addEventListener("click", () => mediaDialog.close());
document.querySelector("#media-prev").addEventListener("click", () => stepMedia(-1));
document.querySelector("#media-next").addEventListener("click", () => stepMedia(1));
mediaDialog.addEventListener("keydown", event => {
  if (!mediaVideo.hidden) return;
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    stepMedia(event.key === "ArrowRight" ? 1 : -1);
  }
});
mediaDialog.addEventListener("click", event => {
  if (event.target !== mediaDialog) return;
  const rect = mediaDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) mediaDialog.close();
});
mediaDialog.addEventListener("close", () => {
  mediaVideo.pause();
  mediaVideo.removeAttribute("src");
  mediaVideo.load();
  mediaImage.removeAttribute("src");
  document.body.classList.remove("modal-open");
  mediaTrigger?.focus({ preventScroll: true });
  activeMedia = null;
});
[mediaImage, mediaVideo].forEach(element => element.addEventListener("error", () => {
  if (mediaDialog.open && element.getAttribute("src")) mediaError.hidden = false;
}));
let mediaTouchX = null;
mediaImage.addEventListener("touchstart", event => { mediaTouchX = event.changedTouches[0].clientX; }, { passive: true });
mediaImage.addEventListener("touchend", event => {
  if (mediaTouchX !== null) {
    const distance = event.changedTouches[0].clientX - mediaTouchX;
    if (Math.abs(distance) > 45) stepMedia(distance < 0 ? 1 : -1);
  }
  mediaTouchX = null;
}, { passive: true });

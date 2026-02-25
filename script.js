// ===== Footer year =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== OPTIONAL: Header "Hebebühne" beim Scroll ===== */
const header = document.getElementById("liftHeader");
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

if (header) {
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function update() {
    ticking = false;
    const y = window.scrollY || 0;

    const liftMax = 240;
    const lift = clamp(y * 0.45, 0, liftMax);

    const scale = 1 - clamp(y / 1700, 0, 0.12);
    const opacity = 1 - clamp((y - 120) / 650, 0, 1);
    const blur = clamp((y - 520) / 220, 0, 5);

    header.style.setProperty("--liftY", `${lift}px`);
    header.style.setProperty("--liftScale", `${scale}`);
    header.style.setProperty("--liftOpacity", `${opacity}`);
    header.style.setProperty("--liftBlur", `${blur}px`);
    header.style.pointerEvents = opacity < 0.15 ? "none" : "auto";
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  update();
}
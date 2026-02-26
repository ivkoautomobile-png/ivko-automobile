// ===== Footer Jahr
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Header - SCHNELL VERSCHWINDEN bei Scroll
const header = document.getElementById("liftHeader");
const spacer = document.getElementById("headerSpacer");

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

function setSpacerHeight() {
  const rect = header.getBoundingClientRect();
  const extra = 34;
  spacer.style.height = `${Math.round(rect.height + extra)}px`;
}

let ticking = false;

function update() {
  ticking = false;
  const y = window.scrollY || 0;

  // SCHNELLERES VERSCHWINDEN - niedrigere Werte
  const fadeStart = 30;     // fängt früher an zu verschwinden
  const fadeEnd = 150;      // ist schneller ganz weg
  const t = clamp((y - fadeStart) / (fadeEnd - fadeStart), 0, 1);

  const liftY = -clamp(y * 0.3, 0, 80);      // stärkerer Lift
  const scale = 1 - (t * 0.1);                // etwas mehr Schrumpfen
  const opacity = 1 - (t * 1.2);              // schnelleres Ausblenden
  const blur = t * 8;                          // mehr Blur

  header.style.setProperty("--liftY", `${liftY}px`);
  header.style.setProperty("--liftScale", `${scale}`);
  header.style.setProperty("--liftOpacity", `${opacity}`);
  header.style.setProperty("--liftBlur", `${blur}px`);

  header.style.pointerEvents = (opacity < 0.20) ? "none" : "auto";
}

function onScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
}

window.addEventListener("scroll", onScroll, { passive: true });

window.addEventListener("resize", () => {
  setSpacerHeight();
  update();
});

setSpacerHeight();
update();
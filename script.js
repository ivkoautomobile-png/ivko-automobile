// Footer Jahr
document.getElementById('year').textContent = new Date().getFullYear();

// Header verschwinden bei Scroll
const header = document.getElementById('mainHeader');
const spacer = document.getElementById('headerSpacer');
let ticking = false;

function setSpacerHeight() {
  const headerHeight = header.offsetHeight;
  spacer.style.height = headerHeight + 30 + 'px';
}

function updateHeader() {
  const currentScroll = window.scrollY;
  
  // Header schnell verschwinden lassen
  if (currentScroll > 60) {
    header.classList.add('header--hidden');
  } else {
    header.classList.remove('header--hidden');
  }
  
  ticking = false;
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(updateHeader);
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', setSpacerHeight);

// Initial
setSpacerHeight();

// Kleine Retro-Animation für die Zahlen
document.querySelectorAll('.service-card-retro').forEach((card, index) => {
  const number = card.querySelector('.service-card-retro__number');
  if (number) {
    number.style.opacity = '0.1';
    card.addEventListener('mouseenter', () => {
      number.style.opacity = '0.3';
    });
    card.addEventListener('mouseleave', () => {
      number.style.opacity = '0.15';
    });
  }
});
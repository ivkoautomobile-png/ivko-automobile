(() => {
  const car = document.querySelector(".car");
  const bubbleDriver = document.querySelector(".bubble--driver");
  const bubbleWorker = document.querySelector(".bubble--worker");
  const textDriver = document.getElementById("bubbleDriver");
  const textWorker = document.getElementById("bubbleWorker");

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    // Statisch + eine Bubble, damit trotzdem “verständlich”
    car?.classList.add("window-down");
    textDriver.textContent = "Hi, kurzer Check bitte.";
    textWorker.textContent = "Klar, komm rein – wir schauen sofort.";
    bubbleDriver.classList.add("show");
    bubbleWorker.classList.add("show");
    return;
  }

  // Dialog-Varianten (kurz, landingpage-tauglich)
  const scripts = [
    {
      driver: ["Hallo, ich hab ein Geräusch vorne links…", "Könnt ihr kurz prüfen?", "Super, danke!"],
      worker:  ["Klar – kurz auf die Bühne.", "Dauert 10 Minuten.", "Wir melden uns sofort."]
    },
    {
      driver: ["Moin! TÜV steht an.", "Ist heute noch möglich?", "Perfekt."],
      worker:  ["Ja, passt. Wir machen einen Schnell-Check.", "Wenn alles ok ist: direkt fertig.", "Komm, ich zeig dir kurz."]
    },
    {
      driver: ["Motorlampe ist an…", "Diagnose möglich?", "Danke dir!"],
      worker:  ["Kein Problem – wir lesen den Fehlerspeicher aus.", "Dann bekommst du klaren Kostenvorschlag.", "Alles transparent."]
    }
  ];

  const CYCLE_MS = 10000; // muss zu --cycle passen (10s)
  let cycleStart = performance.now();
  let chosen = scripts[Math.floor(Math.random() * scripts.length)];

  function hideAll() {
    bubbleDriver.classList.remove("show");
    bubbleWorker.classList.remove("show");
    car.classList.remove("window-down");
  }

  function startCycle() {
    chosen = scripts[Math.floor(Math.random() * scripts.length)];
    cycleStart = performance.now();
    hideAll();
  }

  // Zeitplan innerhalb eines Zyklus
  // 0-3000: reinfahren
  // 3000-7000: steht
  // Fenster runter ab 3200
  // Bubbles: 3700/4900/6100
  // Hide ab 7300, Fenster hoch ab 7600
  function tick(now) {
    const t = (now - cycleStart) % CYCLE_MS;

    // Fenster runter/hoch
    if (t > 3200 && t < 7500) car.classList.add("window-down");
    else car.classList.remove("window-down");

    // Dialog 1 (Kunde)
    if (t > 3700 && t < 4600) {
      textDriver.textContent = chosen.driver[0];
      bubbleDriver.classList.add("show");
      bubbleWorker.classList.remove("show");
    }

    // Dialog 2 (IvKo)
    if (t > 4900 && t < 5850) {
      textWorker.textContent = chosen.worker[0];
      bubbleWorker.classList.add("show");
      bubbleDriver.classList.remove("show");
    }

    // Dialog 3 (Kunde + IvKo kurzer Abschluss)
    if (t > 6100 && t < 7100) {
      textDriver.textContent = chosen.driver[1] ?? chosen.driver[0];
      textWorker.textContent = chosen.worker[1] ?? chosen.worker[0];
      bubbleDriver.classList.add("show");
      bubbleWorker.classList.add("show");
    }

    // Ende: alles ausblenden
    if (t > 7300) {
      bubbleDriver.classList.remove("show");
      bubbleWorker.classList.remove("show");
    }

    // Zyklus neu starten (optional: nach jedem Loop neues Script)
    if (t < 50 && (now - cycleStart) > CYCLE_MS) {
      startCycle();
    }

    requestAnimationFrame(tick);
  }

  // Start
  startCycle();
  requestAnimationFrame(tick);
})();
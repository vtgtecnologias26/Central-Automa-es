// VTG Central de Automações
// Este script controla o menu mobile, animações de entrada, ano do rodapé,
// simulação demonstrativa e carregamento opcional do vídeo da versão 1.0.

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    mainNav.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
      document.body.classList.remove("menu-open");
    });
  });
}

// Reveal ao rolar a página.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

// Ano automático no rodapé.
const currentYear = document.querySelector("#currentYear");
if (currentYear) currentYear.textContent = new Date().getFullYear();

// Simulação visual de um fluxo. Nenhuma ação real é executada no computador.
const runDemoButton = document.querySelector("#runDemo");
const demoSteps = Array.from(document.querySelectorAll(".demo-step"));
const demoReadout = document.querySelector("#demoReadout");
const demoMessage = document.querySelector("#demoMessage");
let demoIsRunning = false;
let demoTimerIds = [];

function clearDemoTimers() {
  demoTimerIds.forEach((timerId) => window.clearTimeout(timerId));
  demoTimerIds = [];
}

function resetDemo() {
  demoSteps.forEach((step) => step.classList.remove("active", "done"));
}

if (runDemoButton && demoSteps.length) {
  runDemoButton.addEventListener("click", () => {
    if (demoIsRunning) return;

    clearDemoTimers();
    resetDemo();
    demoIsRunning = true;
    runDemoButton.disabled = true;
    runDemoButton.innerHTML = "<span>◌</span> Simulação em andamento";
    if (demoReadout) demoReadout.textContent = "INICIANDO FLUXO...";
    if (demoMessage) demoMessage.textContent = "Destacando cada etapa da demonstração.";

    demoSteps.forEach((step, index) => {
      const timerId = window.setTimeout(() => {
        if (index > 0) demoSteps[index - 1].classList.replace("active", "done");
        step.classList.add("active");
        if (demoReadout) demoReadout.textContent = `ETAPA ${String(index + 1).padStart(2, "0")} / 04`;
        if (demoMessage) demoMessage.textContent = [
          "Fluxo iniciado. Esta etapa é apenas ilustrativa.",
          "Simulando a etapa de abertura de um aplicativo.",
          "Simulando uma ação de teclado.",
          "Fluxo demonstrativo concluído!"
        ][index];
      }, index * 850);
      demoTimerIds.push(timerId);
    });

    const finishTimer = window.setTimeout(() => {
      demoSteps[demoSteps.length - 1].classList.replace("active", "done");
      if (demoReadout) demoReadout.textContent = "SIMULAÇÃO CONCLUÍDA";
      if (demoMessage) demoMessage.textContent = "Pronto! Nenhuma ação foi executada fora desta página.";
      runDemoButton.disabled = false;
      runDemoButton.innerHTML = "<span>↻</span> Executar novamente";
      demoIsRunning = false;
    }, demoSteps.length * 850 + 200);
    demoTimerIds.push(finishTimer);
  });
}

// Vídeo opcional: coloque o arquivo em videos/demonstracao-v1.mp4.
// Quando o arquivo existir e puder ser carregado, o player aparece automaticamente.
const versionVideo = document.querySelector("#versionVideo");
const videoPlaceholder = document.querySelector("#videoPlaceholder");

if (versionVideo && videoPlaceholder) {
  versionVideo.addEventListener("loadedmetadata", () => {
    videoPlaceholder.hidden = true;
    versionVideo.hidden = false;
  });

  versionVideo.addEventListener("error", () => {
    // Mantém o espaço de espera se o arquivo ainda não tiver sido adicionado.
    versionVideo.hidden = true;
    videoPlaceholder.hidden = false;
  });

  // Faz uma tentativa de carregar o vídeo sem iniciar a reprodução.
  versionVideo.load();
}
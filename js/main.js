'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const percentElement = document.getElementById("loadingPercent");
  const cards = [...document.querySelectorAll(".preloader_card")];

  if (!preloader || !percentElement || cards.length === 0) return;

  document.body.classList.add("is-loading");

  const MIN_LOADING_TIME = 2200;
  const CARD_DELAY = 400;
  const EXIT_DURATION = 800;

  const startTime = performance.now();

  let resourcesLoaded = document.readyState === "complete";
  let currentPercent = 0;

  if (!resourcesLoaded) {
    window.addEventListener("load", () => {
      resourcesLoaded = true;
    }, { once: true });
  }

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("is-visible");
    }, index * CARD_DELAY);
  });

  const progressInterval = setInterval(() => {
    const elapsed = performance.now() - startTime;

    const target = Math.min(
      95,
      Math.floor((elapsed / MIN_LOADING_TIME) * 95)
    );

    if (currentPercent < target) {
      currentPercent = Math.min(currentPercent + 2, target);
      percentElement.textContent = `${currentPercent}%`;
    }
  }, 30);

  async function waitUntilReady() {
    while (
      !resourcesLoaded ||
      performance.now() - startTime < MIN_LOADING_TIME
    ) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    clearInterval(progressInterval);

    currentPercent = 100;
    percentElement.textContent = "100%";

    await new Promise(resolve => setTimeout(resolve, 100));

    preloader.classList.add("is-exiting");

    await new Promise(resolve =>
      setTimeout(resolve, EXIT_DURATION)
    );

    preloader.classList.add("is-hidden");
    document.body.classList.remove("is-loading");

    await new Promise(resolve => setTimeout(resolve, 250));

    preloader.remove();
  }

  waitUntilReady();
});
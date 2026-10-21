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

  // Ожидание полной загрузки страницы
  if (!resourcesLoaded) {
    window.addEventListener("load", () => {
      resourcesLoaded = true;
    }, { once: true });
  }

  // Последовательное появление карточек
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("is-visible");
    }, index * CARD_DELAY);
  });

  // Счётчик: до полной загрузки максимум 95%
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

  // Ожидаем и загрузку, и минимальное время
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

    // Небольшая задержка на 100%
    await new Promise(resolve => setTimeout(resolve, 100));

    // Начинаем финальный съезд
    preloader.classList.add("is-exiting");

    await new Promise(resolve =>
      setTimeout(resolve, EXIT_DURATION)
    );

    // Убираем прелоадер
    preloader.classList.add("is-hidden");
    document.body.classList.remove("is-loading");

    await new Promise(resolve => setTimeout(resolve, 250));

    preloader.remove();
  }

  waitUntilReady();
});

// const preloader = document.getElementById('preloader');
// const counter = document.getElementById('loadingPercent');
// const site = document.getElementById('site');
// const questionButton = document.getElementById('questionButton');
// const questionHint = document.getElementById('questionHint');

// // Продолжительность только декоративной анимации. Дожидаемся DOM (defer)
// // и загрузки изображений; если они медленные, оставляем экран на 99%.
// const DURATION = 2300;
// const EXIT_DURATION = 550;
// const startedAt = performance.now();
// let assetsReady = false;
// let hasFinished = false;

// function finishLoading() {
//   if (hasFinished) return;
//   hasFinished = true;
//   counter.textContent = '100%';
//   window.setTimeout(() => {
//     preloader.classList.add('is-done');
//     preloader.setAttribute('aria-hidden', 'true');
//     site.removeAttribute('inert');
//     document.body.classList.remove('is-loading');
//     window.setTimeout(() => preloader.remove(), EXIT_DURATION + 80);
//   }, 200);
// }

// function animateCounter(now) {
//   if (hasFinished) return;
//   const progress = Math.min((now - startedAt) / DURATION, 1);
//   // Плавное приближение к 100; не показываем 100 до готовности.
//   const eased = 1 - Math.pow(1 - progress, 2.2);
//   counter.textContent = `${Math.min(99, Math.floor(eased * 100))}%`;
//   if (progress === 1 && assetsReady) finishLoading();
//   else requestAnimationFrame(animateCounter);
// }

// const images = Array.from(document.images);
// Promise.all(images.map(img => img.complete
//   ? Promise.resolve()
//   : new Promise(resolve => { img.addEventListener('load', resolve, {once:true}); img.addEventListener('error', resolve, {once:true}); })
// )).then(() => { assetsReady = true; });

// // На медленном устройстве анимация не оставляет посетителя в вечной загрузке.
// window.setTimeout(() => { assetsReady = true; }, 8000);
// requestAnimationFrame(animateCounter);

// questionButton.addEventListener('click', () => {
//   const expanded = questionButton.getAttribute('aria-expanded') === 'true';
//   questionButton.setAttribute('aria-expanded', String(!expanded));
//   questionHint.hidden = expanded;
// });

// document.addEventListener('keydown', event => {
//   if (event.key === 'Escape' && !questionHint.hidden) {
//     questionHint.hidden = true;
//     questionButton.setAttribute('aria-expanded', 'false');
//     questionButton.focus();
//   }
// });

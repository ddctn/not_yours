
(() => {
  const cards = [...document.querySelectorAll(".final-card")];
  const pile = document.querySelector(".final-cards");
  const copy = document.querySelector(".final-copy");
  const next = document.querySelector("[data-final-next]");
  const stage = document.querySelector(".final-stage");
  const closing = document.querySelector(".closing");
  const footer = document.querySelector(".footer");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function start() {
    if (!pile || !copy || !cards.length) return;

    for (const card of cards) {
      card.classList.add("is-visible");

      if (!reduceMotion) {
        await delay(330);
      }
    }

    if (!reduceMotion) {
      await delay(450);
    }

    pile.classList.add("is-down");

    if (!reduceMotion) {
      await delay(750);
    }

    copy.classList.add("is-visible");
  }

  if (next && stage && closing && footer) {
    next.addEventListener("click", () => {
      stage.hidden = true;
      stage.style.display = "none";

      closing.classList.add("is-active");
      footer.classList.add("is-visible");

      window.scrollTo({
        top: 0,
        behavior: "instant"
      });

      const heading = closing.querySelector("h1");

      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    });
  }

  start();
})();

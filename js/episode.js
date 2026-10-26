(() => {
  const scenes = [...document.querySelectorAll("[data-scene]")];

  function showScene(name) {
    const target = scenes.find((scene) => scene.dataset.scene === name);

    if (!target) {
      console.error(`Экран "${name}" не найден. Проверь data-scene в HTML.`);
      return;
    }

    scenes.forEach((scene) => {
      const isActive = scene === target;

      scene.classList.toggle("is-active", isActive);
      scene.inert = !isActive;
    });

    const heading = target.querySelector("h1, h2, [data-focus]");

    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  }

  document.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => {
      showScene(button.dataset.next);
    });
  });

  const choiceCards = document.querySelectorAll("[data-choice]");

  const bubble = document.getElementById("choiceBubble");
  const bubbleText = document.getElementById("choiceBubbleText");

  // Поддержка старого блока реакции, если он остался
  const oldReaction = document.querySelector("[data-reaction-box]");
  const oldContinue = document.querySelector("[data-choice-continue]");

  let bubbleTimer = null;
  let transitionTimer = null;
  let choiceLocked = false;

  function showBubble(message) {
    clearTimeout(bubbleTimer);

    if (bubble && bubbleText) {
      bubbleText.textContent = message;
      bubble.classList.add("is-visible");

      bubbleTimer = setTimeout(() => {
        bubble.classList.remove("is-visible");
      }, 3000);
    }
  }
  function hideBubble() {
    clearTimeout(bubbleTimer);

    if (bubble) {
      bubble.classList.remove("is-visible");
    }
  }

  choiceCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (choiceLocked) return;

      const message = card.dataset.message || "";
      const isAllowed = card.dataset.choice === "allowed";
      card.classList.remove("is-shaking");
      void card.offsetWidth;
      showBubble(message);

      if (!isAllowed) {
        card.classList.add("is-shaking");

        return;
      }

      choiceLocked = true;
      card.classList.add("is-selected");

      transitionTimer = setTimeout(() => {
        hideBubble();

        card.classList.remove("is-selected");

        showScene("reflection");

        choiceLocked = false;
      }, 3500);
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const title = document.querySelector("[data-answer-title]");

      const correctAnswer = document.body.dataset.correctAnswer || "myth";

      const isCorrect = button.dataset.answer === correctAnswer;

      if (title) {
        const answerName = correctAnswer === "myth" ? "миф" : "правда";

        title.textContent = isCorrect
          ? `Правильно! Это ${answerName}`
          : `Не совсем! Это ${answerName}`;
      }

      showScene("explanation");
    });
  });

  showScene("story");
})();

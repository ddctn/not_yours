const rulesModal = document.getElementById("rulesModal");
const openRules = document.getElementById("openRules");
const closeRules = document.getElementById("closeRules");

// Открываем правила
openRules.addEventListener("click", () => {
  rulesModal.showModal();
});

// Закрываем по кнопке
closeRules.addEventListener("click", () => {
  rulesModal.close();
});

// Закрываем по клику на затемнённую область
rulesModal.addEventListener("click", (event) => {
  const rect = rulesModal.getBoundingClientRect();

  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (clickedOutside) {
    rulesModal.close();
  }
});
const rulesModal = document.getElementById("rulesModal");
const openRules = document.getElementById("openRules");
const closeRules = document.getElementById("closeRules");

openRules.addEventListener("click", () => {
  rulesModal.showModal();
});

closeRules.addEventListener("click", () => {
  rulesModal.close();
});

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
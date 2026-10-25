
(() => {
  const scenes = [...document.querySelectorAll('[data-scene]')];
  let current = 'story';
  function showScene(name) {
    const target = scenes.find(el => el.dataset.scene === name);
    if (!target) return;
    scenes.forEach(el => { el.classList.toggle('is-active', el === target); el.inert = el !== target; });
    current = name;
    target.querySelector('h1,h2,[data-focus]')?.setAttribute('tabindex', '-1');
    target.querySelector('h1,h2,[data-focus]')?.focus({ preventScroll:true });
  }
  document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => showScene(button.dataset.next)));
  const reaction = document.querySelector('[data-reaction-box]');
  const choiceContinue = document.querySelector('[data-choice-continue]');
  document.querySelectorAll('[data-choice]').forEach(card => card.addEventListener('click', () => {
    if (choiceContinue && !choiceContinue.hidden) return;
    document.querySelectorAll('[data-choice]').forEach(c => c.classList.remove('is-selected'));
    card.classList.remove('is-shaking');
    void card.offsetWidth;
    reaction.textContent = card.dataset.message || '';
    reaction.hidden = false;
    if (card.dataset.choice === 'allowed') {
      card.classList.add('is-selected');
      choiceContinue.hidden = false;
    } else {
      card.classList.add('is-shaking');
    }
  }));
  document.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => {
    const title = document.querySelector('[data-answer-title]');
    const isMyth = document.body.dataset.correctAnswer === 'myth';
    const correct = button.dataset.answer === (isMyth ? 'myth' : 'truth');
    if (title) title.textContent = correct ? 'Верно!' : 'Не совсем!';
    showScene('explanation');
  }));
  showScene(current);
})();

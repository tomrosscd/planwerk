/*
  Visitor protocol, revision 2.
  Previous revision escalated an image to a physical security incident.
  This revision includes a close button. Progress.
*/
(() => {
  const triggers = [...document.querySelectorAll('[data-visitor]')];
  if (!triggers.length || !window.HTMLDialogElement) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const dialog = document.createElement('dialog');
  dialog.className = 'visitor-dialog';
  dialog.setAttribute('aria-labelledby', 'visitor-title');
  dialog.innerHTML = `
    <div class="visitor-panel">
      <p class="visitor-label">Physical presence: unconfirmed</p>
      <h2 id="visitor-title">Visitor recognised.</h2>
      <p role="status" aria-live="polite" id="visitor-status">Escalation unnecessary. This is still a photograph.</p>
      <button class="visitor-close" type="button" aria-label="Close visitor" autofocus>×</button>
      <button class="visitor-escalate" type="button">Escalate</button>
    </div>
    <button class="visitor-figure" type="button" aria-label="Move the visitors">
      <span class="visitor-bubble">Is this a good time?</span>
      <img data-src="/images/visitor.png" alt="Two familiar visitors from the office prank." width="598" height="558" />
    </button>`;
  document.body.append(dialog);
  const figure = dialog.querySelector('.visitor-figure');
  const bubble = dialog.querySelector('.visitor-bubble');
  const close = dialog.querySelector('.visitor-close');
  const escalate = dialog.querySelector('.visitor-escalate');
  const status = dialog.querySelector('#visitor-status');
  let origin, escapes = 0, ready = false, timer, previousOverflow;
  const say = ['Just passing through.', 'No need to escalate.', "Fine. We'll wait."];

  function resetPosition() { figure.removeAttribute('style'); }
  function dodge() {
    if (!ready || escapes >= 3) return;
    ready = false;
    bubble.textContent = say[escapes];
    if (!motion.matches) {
      const bounds = figure.getBoundingClientRect();
      const panel = dialog.querySelector('.visitor-panel').getBoundingClientRect();
      const maxX = Math.max(16, dialog.clientWidth - bounds.width - 16);
      const bottom = Math.max(panel.bottom + 20, dialog.clientHeight - bounds.height - 12);
      const upper = Math.min(bottom, panel.bottom + 24);
      figure.style.right = 'auto';
      figure.style.bottom = 'auto';
      // Establish coordinates before moving so the first dodge also transitions.
      figure.style.left = bounds.left + 'px';
      figure.style.top = bounds.top + 'px';
      figure.getBoundingClientRect();
      figure.style.left = (escapes % 2 === 0 ? 16 : maxX) + 'px';
      figure.style.top = (escapes === 1 ? upper : bottom) + 'px';
    }
    escapes += 1;
    if (escapes === 3) {
      status.textContent = 'Visitors settled. No further action required.';
      figure.setAttribute('aria-label', 'Visitors settled');
    }
    clearTimeout(timer);
    timer = setTimeout(() => { ready = true; }, 400);
  }
  triggers.forEach(trigger => {
    trigger.hidden = false;
    trigger.addEventListener('click', () => {
      if (dialog.open) return;
      origin = trigger;
      escapes = 0;
      ready = motion.matches;
      resetPosition();
      bubble.textContent = 'Is this a good time?';
      status.textContent = 'Escalation unnecessary. This is still a photograph.';
      escalate.textContent = 'Escalate';
      figure.setAttribute('aria-label', 'Move the visitors');
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const photo = figure.querySelector('img');
      if (!photo.hasAttribute('src')) photo.src = photo.dataset.src;
      dialog.showModal();
      close.focus();
      figure.classList.add('visitor-enter');
      clearTimeout(timer);
      timer = setTimeout(() => { ready = true; figure.classList.remove('visitor-enter'); }, motion.matches ? 0 : 1650);
    });
  });
  figure.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse' && !motion.matches) dodge(); });
  figure.addEventListener('click', dodge);
  close.addEventListener('click', () => dialog.close());
  escalate.addEventListener('click', () => {
    escalate.textContent = "We've discussed this.";
    status.textContent = 'Escalation declined. The visitors remain two-dimensional.';
  });
  dialog.addEventListener('close', () => {
    clearTimeout(timer);
    ready = false;
    figure.classList.remove('visitor-enter');
    document.body.style.overflow = previousOverflow;
    origin?.focus();
  });
  addEventListener('resize', () => { if (dialog.open) resetPosition(); });
  motion.addEventListener('change', () => {
    if (dialog.open) { figure.classList.remove('visitor-enter'); resetPosition(); }
  });
})();

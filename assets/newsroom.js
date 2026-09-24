(() => {
  const copy = async (text, btn, done) => {
    const label = btn.textContent;
    try { await navigator.clipboard.writeText(text); btn.textContent = done; }
    catch { btn.textContent = 'Copy failed. Try again.'; }
    setTimeout(() => { btn.textContent = label; }, 1800);
  };

  document.querySelectorAll('[data-copy-url]').forEach(b => b.addEventListener('click', () => copy(location.href, b, 'Link copied')));
  document.querySelectorAll('[data-copy-target]').forEach(b => b.addEventListener('click', () => {
    const el = document.getElementById(b.dataset.copyTarget);
    if (el) copy(el.textContent.trim(), b, 'Copied. Use responsibly.');
  }));
  document.querySelectorAll('[data-print]').forEach(b => { b.hidden = false; b.addEventListener('click', () => print()); });

  const chips = [...document.querySelectorAll('.nr-chip')];
  if (!chips.length) return;
  const items = [...document.querySelectorAll('[data-cat]')];
  const count = document.getElementById('nr-count');
  const empty = document.getElementById('nr-empty');
  const list = document.getElementById('nr-list');
  chips.forEach(chip => chip.addEventListener('click', () => {
    const cat = chip.dataset.filter;
    chips.forEach(c => c.setAttribute('aria-pressed', String(c === chip)));
    let shown = 0;
    items.forEach(el => {
      const show = cat === 'All' || el.dataset.cat === cat;
      el.hidden = !show;
      if (show) shown += 1;
    });
    const inList = list.querySelectorAll('li:not([hidden])').length;
    empty.hidden = inList > 0 || shown > 0;
    count.textContent = cat === 'All' ? `Showing all ${shown} releases` : `Showing ${shown} ${shown === 1 ? 'release' : 'releases'} in ${cat}`;
  }));
})();

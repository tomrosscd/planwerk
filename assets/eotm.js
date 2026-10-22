const notes = {
  '2024-07': 'Founded a company and immediately became 100% of its top performers. The committee called it a landslide.',
  '2024-10': 'Held an all-hands meeting with himself. Minutes were approved unanimously.',
  '2025-02': 'Kept the office plant alive long enough for Tom to inherit the responsibility.',
  '2025-03': 'Joined, watered the pot plant, and briefly became the only employee with an onboarding plan.',
  '2025-04': 'Mapped The Framework on 270 sticky notes. Lost only three to the air conditioner.',
  '2025-07': 'Found the good whiteboard marker in the garage. Productivity rose for seven minutes.',
  '2025-10': 'Delivered a keynote about capacity. Still found enough capacity to mention the keynote.',
  '2026-01': 'Appeared on so many podcasts that the microphone requested annual leave.',
  '2026-04': 'Turned “quick sync” into an actual quick sync. A precedent the team may never recover from.',
  '2026-07': 'Replaced “circle back” with a concrete date. Legal is reviewing the implications.',
  '2026-09': 'Closed seventeen browser tabs and remembered what three of them were for.'
};
const grid = document.querySelector('#archive-grid');
const records = [];
for (let year = 2024, month = 7; year < 2026 || month <= 9; ) {
  const key = `${year}-${String(month).padStart(2, '0')}`;
  const beforeTom = year < 2025 || (year === 2025 && month < 3);
  const monthsSinceTom = (year - 2025) * 12 + month - 3;
  const winner = beforeTom || monthsSinceTom % 2 === 1 ? 'seb' : 'tom';
  records.push({key, year, month, winner, futures: beforeTom ? 7 + (month % 5) : 8 + ((monthsSinceTom * 3 + 2) % 7)});
  month += 1;
  if (month > 12) { month = 1; year += 1; }
}
records.reverse();
const monthLabel = (year, month) => new Intl.DateTimeFormat('en-AU', {month:'long', year:'numeric'}).format(new Date(year, month - 1, 1));
for (const record of records) {
  const article = document.createElement('article');
  article.className = `history-card ${record.winner}`;
  article.dataset.winner = record.winner;
  const name = record.winner === 'seb' ? 'Seb' : 'Tom';
  const note = notes[record.key] || (record.winner === 'seb' ? 'Kept the big picture in view while locating a surprisingly small missing detail.' : 'Made a useful thing work and then explained it without opening a slide deck.');
  article.innerHTML = `<div class="card-top"><span>${monthLabel(record.year, record.month)}</span><span>✳ ${record.futures} TACO FUTURES</span></div><div class="card-person"><img src="images/portrait-${record.winner === 'seb' ? 'sebastian' : 'tom'}.jpg" alt=""><div><small>EMPLOYEE OF THE MONTH</small><h3>${name}</h3></div></div><p>“${note}”</p>`;
  grid.append(article);
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  document.querySelectorAll('.history-card').forEach(card => { card.hidden = filter !== 'all' && card.dataset.winner !== filter; });
}));

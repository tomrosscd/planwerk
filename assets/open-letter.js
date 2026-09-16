(() => {
  const button = document.querySelector('#print-letter');
  button.hidden = false;
  button.addEventListener('click', () => window.print());
})();

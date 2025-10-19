
// assets/search.js — tiny instant search (no deps)
const input = document.getElementById('search');
const grid = document.getElementById('post-grid');
const count = document.getElementById('result-count');
if (input && grid) {
  const cards = Array.from(grid.querySelectorAll('.post-card'));
  const haystacks = cards.map(card => {
    const t = (card.getAttribute('data-title') || '').toLowerCase();
    const e = (card.getAttribute('data-excerpt') || '').toLowerCase();
    return { card, text: (t + ' ' + e).trim() };
  });

  const updateCount = (visible) => {
    const total = cards.length;
    count.textContent = input.value.trim() ? `${visible} of ${total} post${total === 1 ? '' : 's'}` : '';
  };

  let raf = 0;
  const runFilter = () => {
    const q = input.value.toLowerCase().trim();
    if (!q) {
      cards.forEach(c => c.hidden = false);
      updateCount(cards.length);
      return;
    }
    let visible = 0;
    for (const { card, text } of haystacks) {
      const ok = text.includes(q);
      card.hidden = !ok;
      if (ok) visible++;
    }
    updateCount(visible);
  };

  const schedule = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(runFilter);
  };

  input.addEventListener('input', schedule);
}

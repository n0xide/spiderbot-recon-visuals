// spiderbot-recon visuals — shared helpers
// Persistence: per-page localStorage of checkbox + text inputs by id.
// Namespace by page so phase-dashboard checkboxes don't collide with calibration.

(function () {
  const NS = (document.body && document.body.dataset.ns) || location.pathname.split('/').pop() || 'page';
  const KEY = `spiderbot.${NS}`;

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
    catch (_) { return {}; }
  }

  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {}
  }

  function hydrate() {
    const state = load();
    document.querySelectorAll('input[type="checkbox"][data-persist]').forEach(el => {
      if (state[el.id] !== undefined) el.checked = !!state[el.id];
    });
    document.querySelectorAll('input[type="text"][data-persist], input[type="number"][data-persist], textarea[data-persist]').forEach(el => {
      if (state[el.id] !== undefined) el.value = state[el.id];
    });
    refreshRollups();
  }

  function persist(el) {
    const state = load();
    if (el.type === 'checkbox') state[el.id] = el.checked;
    else state[el.id] = el.value;
    save(state);
  }

  function refreshRollups() {
    document.querySelectorAll('[data-rollup]').forEach(container => {
      const sel = container.getAttribute('data-rollup');
      const boxes = document.querySelectorAll(sel);
      const total = boxes.length;
      const done = Array.from(boxes).filter(b => b.checked).length;
      const pct = total ? Math.round((done / total) * 100) : 0;
      const valueEl = container.querySelector('[data-rollup-value]');
      const barEl = container.querySelector('[data-rollup-bar]');
      const pctEl = container.querySelector('[data-rollup-pct]');
      if (valueEl) valueEl.textContent = `${done} / ${total}`;
      if (pctEl) pctEl.textContent = `${pct}%`;
      if (barEl) barEl.style.width = `${pct}%`;
    });

    document.querySelectorAll('[data-spend-rollup]').forEach(el => {
      const sel = el.getAttribute('data-spend-rollup');
      let total = 0;
      document.querySelectorAll(sel).forEach(b => {
        if (b.checked) total += parseFloat(b.dataset.cost || '0');
      });
      el.textContent = `$${total.toFixed(0)}`;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    hydrate();
    document.body.addEventListener('change', (e) => {
      const el = e.target;
      if (el.matches('[data-persist]')) {
        persist(el);
        refreshRollups();
      }
    });

    document.querySelectorAll('[data-reset-ns]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm(`Reset all saved state for ${NS}?`)) {
          localStorage.removeItem(KEY);
          location.reload();
        }
      });
    });
  });

  window.SB = { load, save, refreshRollups, NS, KEY };
})();

// NovaAgencyTEC — entrada del hero, gráficos al hacer scroll, WhatsApp flotante y formulario.
(() => {
  const WA = 'https://wa.me/5493424633285?text=';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = n => Math.round(n).toLocaleString('es-AR');

  // Hero: una sola secuencia al cargar.
  requestAnimationFrame(() => document.querySelector('.hero')?.classList.add('is-in'));

  // Números que cuentan hasta su valor real.
  function countUp(el) {
    const end = Number(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    if (reduced) { el.textContent = prefix + fmt(end); return; }
    const dur = end > 100000 ? 1800 : 1200;
    const t0 = performance.now();
    const step = t => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = prefix + fmt(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    el.textContent = prefix + '0';
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    const seen = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('seen');
        e.target.querySelectorAll('[data-count]').forEach(countUp);
        seen.unobserve(e.target);
      });
    }, { threshold: .35 });
    document.querySelectorAll('.night, .wa-demo, .res-bot, .res-grid li, .aios-map').forEach(el => seen.observe(el));
  }

  // WhatsApp flotante: aparece después del hero y se esconde en contacto.
  const float = document.querySelector('.wa-float');
  const hero = document.querySelector('.hero');
  const contact = document.querySelector('#contacto');
  if (float && hero && contact && 'IntersectionObserver' in window) {
    let pastHero = false, atContact = false;
    const sync = () => float.classList.toggle('show', pastHero && !atContact);
    new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; sync(); }).observe(hero);
    new IntersectionObserver(([e]) => { atContact = e.isIntersecting; sync(); }, { threshold: .15 }).observe(contact);
  }

  // Medir de dónde sale cada mensaje (sirve para los anuncios).
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-wa]');
    if (!a) return;
    try { window.va?.('event', { name: 'whatsapp', data: { origen: a.dataset.wa } }); } catch {}
    try { window.fbq?.('track', 'Contact', { content_name: a.dataset.wa }); } catch {}
  });

  // Formulario: arma el mensaje y abre WhatsApp.
  const form = document.querySelector('.contact-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach(f => {
      const bad = !f.value.trim();
      f.setAttribute('aria-invalid', bad);
      if (bad && ok) { f.focus(); ok = false; }
    });
    if (!ok) return;
    const d = new FormData(form);
    const extra = d.get('message').trim();
    const msg = `Hola Nova, soy ${d.get('name').trim()}. Tengo ${d.get('business').trim()}.\nNecesito: ${d.get('service')}.` + (extra ? `\n${extra}` : '');
    try { window.va?.('event', { name: 'whatsapp', data: { origen: 'formulario' } }); } catch {}
    try { window.fbq?.('track', 'Contact', { content_name: 'formulario' }); } catch {}
    window.open(WA + encodeURIComponent(msg), '_blank', 'noopener');
  });
  form?.addEventListener('input', e => { if (e.target.matches('[aria-invalid="true"]') && e.target.value.trim()) e.target.setAttribute('aria-invalid', 'false'); });
})();

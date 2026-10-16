// măm — shared behaviour for index.html and games.html. Every block checks its element exists first.
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ---------- Reveal on scroll ----------
  const revealed = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealed.forEach((el) => io.observe(el));
  } else {
    revealed.forEach((el) => el.classList.add('is-in'));
  }

  // ---------- Toast + pig rain (easter egg) ----------
  const toast = (msg) => {
    const t = document.createElement('p');
    t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
    document.body.append(t);
    setTimeout(() => t.remove(), 2600);
  };
  let raining = false;
  const rain = () => {
    if (raining) return;
    if (reduce) { toast('Ụt ịt! Bạn vừa tìm ra trứng phục sinh của măm.'); return; }
    raining = true;
    const box = document.createElement('div');
    box.className = 'pig-rain'; box.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 30; i++) {
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      s.setAttribute('viewBox', '0 0 100 100');
      const size = 48 + Math.random() * 80;
      s.style.cssText = `left:${Math.random() * 100 - 6}%;width:${size}px;height:${size}px;--d:${(1.8 + Math.random() * 1.8).toFixed(2)}s;--spin:${Math.round(Math.random() * 720 - 360)}deg;animation-delay:${(Math.random() * .9).toFixed(2)}s`;
      s.innerHTML = '<use href="#pig-face"/>';
      box.append(s);
    }
    document.body.append(box);
    toast('Ụt ịt! Bạn vừa tìm ra trứng phục sinh của măm.');
    setTimeout(() => { box.remove(); raining = false; }, 4800);
  };
  // Typing "mam" anywhere (outside form fields) makes it rain pigs.
  let typed = '';
  window.addEventListener('keydown', (e) => {
    if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target.closest && e.target.closest('input, textarea, select')) return;
    typed = (typed + e.key.toLowerCase().replace('ă', 'a')).slice(-3);
    if (typed === 'mam') rain();
  });

  // ---------- Big pig in the hero: eyes follow the pointer, click to talk ----------
  const pig = document.querySelector('[data-bigpig]');
  if (pig) {
    const pupils = pig.querySelectorAll('[data-pupil]');
    let raf = 0, px = 0, py = 0;
    if (!reduce && finePointer) {
      window.addEventListener('pointermove', (e) => {
        px = e.clientX; py = e.clientY;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = pig.getBoundingClientRect();
          if (r.bottom < 0 || r.top > innerHeight) return;
          const dx = px - (r.left + r.width / 2), dy = py - (r.top + r.height * 0.4);
          const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 300) * 4.2;
          pupils.forEach((p) => p.setAttribute('transform', `translate(${(dx / d * k).toFixed(2)} ${(dy / d * k).toFixed(2)})`));
        });
      }, { passive: true });
    }
    const bubble = document.querySelector('[data-bubble]');
    const lines = [
      'Ụt ịt! Đói chưa?', 'Tui ăn 89 quán rồi đó nha.', 'Đừng nói “ăn gì cũng được” nữa!',
      'Ghế nhựa là ngai vàng của tui.', 'Cà phê sữa đá, ít đá, nhiều tình.', 'Bấm nữa đi… có bất ngờ.',
    ];
    let taps = 0;
    const poke = () => {
      taps += 1;
      bubble.textContent = taps >= 5 ? 'Á! Cả họ nhà heo tới rồi!' : lines[(taps - 1) % lines.length];
      pig.classList.remove('is-jump'); void pig.getBoundingClientRect(); pig.classList.add('is-jump');
      if (taps === 5) rain();
    };
    pig.addEventListener('click', poke);
    pig.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); poke(); } });
  }

  // ---------- Category row: endless draggable carousel on a gentle arc ----------
  // Slow auto-drift (stops while hovered); drag with momentum; "heo chọn giùm" spins it to a random dish.
  const orbsBox = document.querySelector('[data-orbs-box]');
  const orbs = document.querySelector('[data-orbs]');
  let carousel = null;
  if (orbsBox && orbs) {
    const originals = [...orbs.children];
    originals.forEach((orb) => {
      const clone = orb.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.tabIndex = -1;
      orbs.appendChild(clone);
    });
    const items = [...orbs.children];
    const count = originals.length;

    let setWidth = 0, centers = [], arc = 0, autoSpeed = 0, maxSpeed = 0;
    let offset = 0, velocity = 0, hovering = false, dragging = false, target = null;

    const render = () => {
      const x = ((offset % setWidth) + setWidth) % setWidth;
      orbs.style.transform = `translate3d(${-x}px, 0, 0)`;
      const mid = window.innerWidth / 2;
      for (let i = 0; i < items.length; i++) {
        const d = (centers[i] - x - mid) / mid;            // -1 … 1 across the viewport
        if (d < -1.6 || d > 1.6) continue;                 // off-screen: skip the write
        items[i].style.transform = `translateY(${(arc * d * d).toFixed(1)}px) rotate(${(d * 7).toFixed(2)}deg)`;
      }
    };
    const measure = () => {
      orbs.style.transform = 'none';
      items.forEach((el) => { el.style.transform = 'none'; });
      setWidth = orbs.scrollWidth / 2;
      centers = items.map((el) => el.offsetLeft + el.offsetWidth / 2);
      arc = Math.min(104, Math.max(34, window.innerWidth * 0.065)); // px drop at the screen edges
      autoSpeed = reduce ? 0 : window.innerWidth * 0.035;          // px per second
      maxSpeed = window.innerWidth * 4;
      render();
    };

    let last = performance.now(), running = false;
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (target !== null) {
        offset += (target - offset) * (1 - Math.exp(-dt * 4));       // ease to the picked dish
        if (Math.abs(target - offset) < 0.5) { offset = target; target = null; velocity = 0; }
      } else if (!dragging) {
        const goal = hovering ? 0 : autoSpeed;
        velocity += (goal - velocity) * (1 - Math.exp(-dt * 1.8));  // friction back to the drift
        offset += velocity * dt;
      }
      render();
      if (running) requestAnimationFrame(tick);
    };
    const start = () => { if (!running) { running = true; last = performance.now(); requestAnimationFrame(tick); } };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { if (e.isIntersecting) start(); else running = false; }).observe(orbsBox);
    } else start();

    // Drag — move/up on window so a plain click still reaches the link.
    const cursor = finePointer ? document.querySelector('[data-drag-cursor]') : null;
    let startX = 0, startOffset = 0, lastX = 0, lastT = 0, moved = false;
    orbsBox.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      dragging = true; moved = false; target = null;
      startX = lastX = e.clientX; lastT = e.timeStamp;
      startOffset = offset; velocity = 0;
      orbsBox.classList.add('is-dragging');
      orbsBox.closest('section')?.classList.add('has-dragged');   // hides the drag hint
      cursor?.classList.add('is-pressed');
    });
    window.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) moved = true;
      offset = startOffset - dx;
      const dt = (e.timeStamp - lastT) / 1000;
      if (dt > 0) velocity = velocity * 0.5 + (-(e.clientX - lastX) / dt) * 0.5;   // smoothed drag speed
      lastX = e.clientX; lastT = e.timeStamp;
    });
    const release = (e) => {
      if (!dragging) return;
      dragging = false;
      if (e.timeStamp - lastT > 90) velocity = 0;              // held still before letting go
      velocity = Math.max(-maxSpeed, Math.min(maxSpeed, velocity));
      orbsBox.classList.remove('is-dragging');
      cursor?.classList.remove('is-pressed');
    };
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    orbsBox.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
    orbsBox.addEventListener('dragstart', (e) => e.preventDefault());

    orbsBox.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return;
      hovering = true;
      cursor?.classList.add('is-visible');
    });
    orbsBox.addEventListener('pointerleave', () => { hovering = false; cursor?.classList.remove('is-visible'); });
    if (cursor) {
      window.addEventListener('pointermove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }, { passive: true });
    }

    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    measure();

    carousel = {
      count,
      label: (i) => originals[i].querySelector('span').textContent,
      href: (i) => originals[i].getAttribute('href'),
      // Spin forward (one extra lap) and stop with dish i centred; highlight it and its clone.
      spinTo(i) {
        const mid = window.innerWidth / 2;
        const want = (((centers[i] - mid) % setWidth) + setWidth) % setWidth;
        let goal = offset - (((offset % setWidth) + setWidth) % setWidth) + want;
        if (goal <= offset) goal += setWidth;
        if (!reduce) goal += setWidth;
        if (reduce) { offset = goal; render(); } else { target = goal; start(); }
        items.forEach((el, n) => el.classList.toggle('is-picked', n % count === i));
      },
    };
  }

  // ---------- "Bí quá, heo chọn giùm!" ----------
  const pickBtn = document.querySelector('[data-pick]');
  const verdict = document.querySelector('[data-verdict]');
  if (pickBtn && verdict && carousel) {
    const sayings = ['Quyết rồi, khỏi cãi.', 'Tin heo đi, không hối hận.', 'Heo đã phán, cả bàn phải nghe.'];
    let lastPick = -1;
    pickBtn.addEventListener('click', () => {
      let i = Math.floor(Math.random() * carousel.count);
      if (i === lastPick) i = (i + 1) % carousel.count;
      lastPick = i;
      carousel.spinTo(i);
      document.querySelector('[data-orbs-box]').closest('section')?.classList.add('has-dragged');
      const show = () => {
        verdict.textContent = `Heo phán: hôm nay ăn ${carousel.label(i).toLowerCase()}! ${sayings[Math.floor(Math.random() * sayings.length)]} `;
        const a = document.createElement('a');
        a.href = carousel.href(i); a.textContent = 'Xem quán →';
        verdict.append(a);
      };
      verdict.textContent = 'Heo đang lắc đầu suy nghĩ…';
      setTimeout(show, reduce ? 0 : 1100);
    });
  }

  // ---------- Posts track: drag to scroll with the mouse (touch scrolls natively) ----------
  const track = document.querySelector('[data-drag]');
  if (track) {
    let sx = 0, sScroll = 0, moved = false, down = false;
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; sx = e.clientX; sScroll = track.scrollLeft;
    });
    window.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 4) { moved = true; track.classList.add('is-dragging'); }
      track.scrollLeft = sScroll - dx;
    });
    window.addEventListener('pointerup', () => {
      down = false;
      requestAnimationFrame(() => track.classList.remove('is-dragging'));
    });
    track.addEventListener('click', (e) => { if (moved) e.preventDefault(); }, true);
    track.addEventListener('dragstart', (e) => e.preventDefault());
  }

  // ---------- Suggestion form — no backend yet, so confirm locally ----------
  const form = document.querySelector('[data-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.elements.name.value.trim();
      form.querySelector('[data-form-note]').textContent =
        `Ụt ịt, cảm ơn nha! Heo sẽ ghé thử ${name || 'quán này'} sớm.`;
      form.reset();
    });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();

// Góc bếp — three small cooking games. Winning a game unlocks its recipe card.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Progress (per-viewer convenience only; the page works without storage) ----------
  const KEY = 'mam-kitchen';
  const store = {
    read() {
      try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
    },
    save(id, stars) {
      try {
        const data = this.read();
        data[id] = Math.max(data[id] || 0, stars);
        localStorage.setItem(KEY, JSON.stringify(data));
      } catch { /* storage blocked: progress just isn't remembered */ }
    },
  };
  const unlocked = new Set();

  const refreshProgress = () => {
    document.querySelector('[data-unlocked]').textContent = unlocked.size;
    document.querySelectorAll('[data-dot]').forEach((dot) => dot.classList.toggle('is-on', unlocked.has(dot.dataset.dot)));
    document.querySelectorAll('[data-pick]').forEach((card) => {
      const done = unlocked.has(card.dataset.pick);
      card.classList.toggle('is-done', done);
      card.querySelector('[data-status]').textContent = done ? 'Đã mở khóa công thức ✓' : 'Chưa mở khóa';
    });
  };

  const starText = (n) => '★'.repeat(n) + '☆'.repeat(3 - n);

  const unlock = (game, id, stars, fresh = true) => {
    unlocked.add(id);
    const recipe = game.querySelector('[data-recipe]');
    recipe.classList.remove('is-locked');
    recipe.querySelector('[data-stars]').textContent = starText(stars);
    if (fresh) {
      store.save(id, stars);
      recipe.classList.remove('is-fresh'); void recipe.offsetWidth; recipe.classList.add('is-fresh');
    }
    refreshProgress();
  };

  // ---------- Coach pig ----------
  const coach = (game) => {
    const box = game.querySelector('[data-coach]');
    const bubble = box.querySelector('[data-say]');
    const mistakes = box.querySelector('[data-mistakes]');
    return {
      say(text, mood) {
        bubble.textContent = text;
        bubble.classList.remove('is-pop'); void bubble.offsetWidth; bubble.classList.add('is-pop');
        box.classList.remove('is-good', 'is-bad');
        if (mood && !reduceMotion) { void box.offsetWidth; box.classList.add(`is-${mood}`); }
      },
      setMistakes(n) { mistakes.textContent = n; },
      onReset(fn) { box.querySelector('[data-reset]').addEventListener('click', fn); },
    };
  };

  const shuffle = (list) => {
    const a = [...list];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const flash = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

  // =====================================================================
  // Game 1 — Phở: tap the steps in cooking order
  // =====================================================================
  (() => {
    const game = document.querySelector('[data-game="pho"]');
    if (!game) return;
    const steps = [
      { text: 'Chần xương bò trong nước sôi vài phút rồi rửa sạch.', hint: 'Xương cần được làm sạch trước tiên, để nước dùng không bị đục.' },
      { text: 'Hầm xương với hành tây, gừng nướng và gói quế, hồi, thảo quả trong nhiều giờ.', hint: 'Có xương sạch rồi thì phải hầm lấy nước dùng đã!' },
      { text: 'Nêm nước dùng bằng nước mắm, đường phèn và muối.', hint: 'Nước dùng hầm xong mới nêm nếm cho vừa.' },
      { text: 'Trụng bánh phở qua nước sôi rồi cho vào tô.', hint: 'Nước dùng đã sẵn sàng, giờ chuẩn bị bánh phở trong tô.' },
      { text: 'Xếp thịt bò thái mỏng lên trên bánh phở.', hint: 'Bánh phở vào tô rồi thì xếp thịt lên trên.' },
      { text: 'Chan nước dùng đang sôi, rắc hành lá và ngò.', hint: 'Chan nước dùng là bước cuối, để thịt tái chín vừa.' },
    ];
    const deck = game.querySelector('[data-deck]');
    const slots = game.querySelector('[data-slots]');
    const broth = game.querySelector('[data-broth]');
    const board = game.querySelector('.pho');
    const recipeSteps = game.querySelector('[data-recipe-steps]');
    const c = coach(game);
    let next = 0, mistakes = 0;

    recipeSteps.innerHTML = steps.map((s) => `<li>${s.text}</li>`).join('');

    const start = () => {
      next = 0; mistakes = 0;
      c.setMistakes(0);
      board.classList.remove('is-done');
      broth.style.setProperty('--fill', 0);
      slots.innerHTML = steps.map(() => '<li>…</li>').join('');
      let order = shuffle(steps.map((_, i) => i));
      while (order.every((v, i) => v === i)) order = shuffle(order);
      deck.innerHTML = '';
      order.forEach((i) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'step-card';
        btn.textContent = steps[i].text;
        btn.addEventListener('click', () => pick(btn, i));
        li.appendChild(btn);
        deck.appendChild(li);
      });
      c.say('Bước đầu tiên là gì nhỉ?');
    };

    const pick = (btn, i) => {
      if (i !== next) {
        mistakes++;
        c.setMistakes(mistakes);
        flash(btn, 'is-wrong');
        c.say(`Chưa đúng lượt! ${steps[next].hint}`, 'bad');
        return;
      }
      btn.classList.add('is-used');
      btn.disabled = true;
      // Collapse the card once it has faded out so the deck closes up.
      setTimeout(() => { btn.parentElement.hidden = true; }, reduceMotion ? 0 : 300);
      const slot = slots.children[next];
      slot.textContent = steps[i].text;
      slot.classList.add('is-filled');
      next++;
      broth.style.setProperty('--fill', (next / steps.length).toFixed(2));
      if (next === steps.length) {
        board.classList.add('is-done');
        setTimeout(() => { deck.innerHTML = '<li class="pho__empty">Nồi phở đã sôi, mời bạn ăn! 🍜</li>'; }, reduceMotion ? 0 : 320);
        const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
        c.say(stars === 3 ? 'Tô phở hoàn hảo! Công thức đã mở khóa 🎉' : 'Xong tô phở rồi! Công thức đã mở khóa.', 'good');
        unlock(game, 'pho', stars);
      } else {
        c.say(['Chuẩn luôn!', 'Đúng rồi, tiếp nè!', 'Thơm quá đi!', 'Ngon, gần xong rồi!', 'Sắp được ăn rồi!'][next - 1], 'good');
      }
    };

    c.onReset(start);
    start();
  })();

  // =====================================================================
  // Game 2 — Cà phê sữa đá: hold to pour into the target band
  // =====================================================================
  (() => {
    const game = document.querySelector('[data-game="coffee"]');
    if (!game) return;
    const CAPACITY = 150;                 // ml that fill the glass
    const TOP = 12, BOTTOM = 190;         // glass interior in SVG units
    const RATE = 18;                      // ml per second while holding
    const phases = [
      { name: 'sữa đặc', target: 30, tol: 5, button: 'Giữ để rót sữa đặc', over: 'Lố tay rồi, ly này sẽ hơi ngọt!', under: 'Thêm chút sữa nữa…' },
      { name: 'cà phê', target: 40, tol: 6, button: 'Giữ để chế cà phê', over: 'Nhiều cà phê quá, hơi đắng đó!', under: 'Thêm chút cà phê nữa…' },
    ];
    const box = game.querySelector('.coffee');
    const milkEl = game.querySelector('[data-milk]');
    const coffeeEl = game.querySelector('[data-coffee-layer]');
    const band = game.querySelector('[data-band]');
    const stream = game.querySelector('[data-stream]');
    const readout = game.querySelector('[data-readout]');
    const pour = game.querySelector('[data-pour]');
    const mix = game.querySelector('[data-mix]');
    const phaseItems = [...game.querySelectorAll('[data-phase]')];
    const c = coach(game);
    let phase = 0, amounts = [0, 0], overs = 0, pouring = false, last = 0;

    const y = (ml) => BOTTOM - (ml / CAPACITY) * (BOTTOM - TOP);
    const setLayer = (el, fromMl, toMl) => {
      el.setAttribute('y', y(toMl));
      el.setAttribute('height', Math.max(0, y(fromMl) - y(toMl)));
    };

    const draw = () => {
      setLayer(milkEl, 0, amounts[0]);
      setLayer(coffeeEl, amounts[0], amounts[0] + amounts[1]);
      const p = phases[phase];
      if (p) {
        const base = phase === 0 ? 0 : amounts[0];
        setLayer(band, base + p.target - p.tol, base + p.target + p.tol);
        band.style.display = '';
      } else {
        band.style.display = 'none';
      }
      readout.textContent = Math.round(phase < 2 ? amounts[phase] : amounts[0] + amounts[1]);
      phaseItems.forEach((li, i) => {
        li.classList.toggle('is-current', i === phase);
        li.classList.toggle('is-done', i < phase);
      });
    };

    const tick = (now) => {
      if (!pouring) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      amounts[phase] = Math.min(CAPACITY - (phase === 1 ? amounts[0] : 0), amounts[phase] + RATE * dt);
      draw();
      requestAnimationFrame(tick);
    };

    const startPour = () => {
      if (pouring || phase > 1) return;
      pouring = true;
      last = performance.now();
      pour.classList.add('is-pressed');
      stream.classList.add('is-on');
      stream.classList.toggle('is-coffee', phase === 1);
      requestAnimationFrame(tick);
    };

    const stopPour = () => {
      if (!pouring) return;
      pouring = false;
      pour.classList.remove('is-pressed');
      stream.classList.remove('is-on');
      const p = phases[phase];
      const amt = amounts[phase];
      if (amt < p.target - p.tol) { c.say(`${Math.round(amt)} ml — ${p.under}`); return; }
      if (amt > p.target + p.tol) { overs++; c.setMistakes(overs); c.say(p.over, 'bad'); }
      else c.say(phase === 0 ? 'Vừa khéo! Giờ chế cà phê nha.' : 'Chuẩn tỉ lệ luôn! Thêm đá thôi.', 'good');
      phase++;
      if (phase === 2) {
        pour.disabled = true;
        pour.textContent = 'Đã rót xong';
        mix.hidden = false;
      } else {
        pour.textContent = phases[phase].button;
      }
      draw();
    };

    pour.addEventListener('pointerdown', (e) => { e.preventDefault(); startPour(); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((t) => pour.addEventListener(t, stopPour));
    pour.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); startPour(); } });
    pour.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') stopPour(); });
    pour.addEventListener('contextmenu', (e) => e.preventDefault());

    mix.addEventListener('click', () => {
      box.classList.add('is-mixed');
      mix.hidden = true;
      phase = 3;
      draw();
      const stars = Math.max(1, 3 - overs);
      c.say(stars === 3 ? 'Ly cà phê sữa đá chuẩn vị Sài Gòn! 🎉' : 'Xong một ly rồi! Lần sau rót khéo hơn nha.', 'good');
      unlock(game, 'coffee', stars);
    });

    const start = () => {
      phase = 0; amounts = [0, 0]; overs = 0;
      c.setMistakes(0);
      box.classList.remove('is-mixed');
      pour.disabled = false;
      pour.textContent = phases[0].button;
      mix.hidden = true;
      draw();
      c.say('Sữa đặc vào ly trước nha!');
    };
    c.onReset(start);
    start();
  })();

  // =====================================================================
  // Game 3 — Canh chua: pick the right ingredients at the market
  // =====================================================================
  (() => {
    const game = document.querySelector('[data-game="canh"]');
    if (!game) return;
    const items = [
      { name: 'Cá lóc', ok: true, why: 'Cá lóc thịt chắc, ngọt, rất hợp canh chua.' },
      { name: 'Me chua', ok: true, why: 'Me cho vị chua thanh đặc trưng của món này.' },
      { name: 'Cà chua', ok: true, why: 'Cà chua thêm vị chua nhẹ và màu đỏ đẹp mắt.' },
      { name: 'Thơm (dứa)', ok: true, why: 'Thơm cho vị chua ngọt và mùi thơm dịu.' },
      { name: 'Bạc hà (dọc mùng)', ok: true, why: 'Bạc hà giòn, thấm nước canh rất ngon.' },
      { name: 'Đậu bắp', ok: true, why: 'Đậu bắp làm nước canh sánh nhẹ.' },
      { name: 'Giá', ok: true, why: 'Giá cho vào cuối cùng để còn giòn.' },
      { name: 'Ngò om', ok: true, why: 'Ngò om là mùi thơm không thể thiếu của canh chua.' },
      { name: 'Quế & hoa hồi', ok: false, why: 'Quế hồi là linh hồn của phở, không phải canh chua!' },
      { name: 'Sữa đặc', ok: false, why: 'Để dành sữa đặc cho ly cà phê nhé!' },
      { name: 'Phô mai', ok: false, why: 'Phô mai hợp với pizza hơn là canh chua.' },
      { name: 'Bánh phở', ok: false, why: 'Canh chua ăn với cơm trắng, không phải bánh phở.' },
    ];
    const NEED = items.filter((i) => i.ok).length;
    const stall = game.querySelector('[data-stall]');
    const basket = game.querySelector('[data-basket]');
    const c = coach(game);
    let got = 0, mistakes = 0, done = false;

    const start = () => {
      got = 0; mistakes = 0; done = false;
      c.setMistakes(0);
      basket.textContent = 0;
      stall.innerHTML = '';
      shuffle(items).forEach((item) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ingredient';
        btn.textContent = item.name;
        btn.addEventListener('click', () => pick(btn, item));
        li.appendChild(btn);
        stall.appendChild(li);
      });
      c.say('Chợ đông quá, chọn lẹ nè!');
    };

    const pick = (btn, item) => {
      if (done || btn.disabled) return;
      btn.disabled = true;
      if (!item.ok) {
        mistakes++;
        c.setMistakes(mistakes);
        btn.classList.add('is-wrong');
        c.say(item.why, 'bad');
        return;
      }
      got++;
      basket.textContent = got;
      btn.classList.add('is-right');
      if (got === NEED) {
        done = true;
        const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
        c.say('Đủ đồ rồi, về nấu canh chua thôi! 🎉', 'good');
        unlock(game, 'canh', stars);
      } else {
        c.say(item.why, 'good');
      }
    };

    c.onReset(start);
    start();
  })();

  // Restore recipes unlocked on earlier visits.
  const saved = store.read();
  Object.entries(saved).forEach(([id, stars]) => {
    const game = document.querySelector(`[data-game="${id}"]`);
    if (game && stars > 0) unlock(game, id, stars, false);
  });
  refreshProgress();
})();

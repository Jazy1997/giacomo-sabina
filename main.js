/* ============================================================
   MATRIMONIO GIACOMO & SABINA — main.js
   ============================================================ */

// ── CONFIGURAZIONE ─────────────────────────────────────────
const N8N_WEBHOOK_URL = 'PLACEHOLDER_WEBHOOK_URL'; // sostituire con URL reale
const WEDDING_DATE    = new Date('2026-09-06T12:00:00');

// ── LISTA INVITATI ──────────────────────────────────────────
// Ogni array = un gruppo/famiglia che condivide l'invito.
// Quando un membro digita il proprio nome nel form, compaiono
// automaticamente gli altri del gruppo con toggle Sì/No.
const GRUPPI = [
  ['Luigi Ganora', 'Marina Imarisio', 'Don Danilo', 'Don Giorgio'],
  ['Caterina Ganora'],
  ['Martina Ganora', 'Marco Vito'],
  ['Marco Imarisio', 'Cecilia Piazza', 'Marta Imarisio'],
  ['Giorgio Ganora', 'Diego Ganora', 'Monica Massimo', 'Lisa'],
  ['Alessandro Repetto', 'Elisa Galiè'],
  ['Fabio Cazzaro', 'Lorenza Polcan', 'Giuseppe Polcan', 'Marinella Fabbian'],
  ['Lorenzo Marafante'],
  ['Ebera Polcan', 'Luciano Squizzato', 'Edoardo Squizzato', 'Riccardo Squizzato', 'Desiree Michielin'],
  ['Patrizia Cazzaro', 'Mithya Trabacchin', 'Ejaz Trabacchin', 'Chante White'],
  ['Katia Michieletto', 'Alessio Cazzaro'],
  ['Mara Cazzaro', 'Alessandro Perin', 'Giorgia Perin', 'Emanuele Marazzato'],
  ['Giada Cazzaro', 'Germano Rodelli'],
  ['Chiara Perin', 'Gianmarco Pattaro'],
  ['Mattia Cazzaro', 'Cristal Zanin'],
  ['Giulio Tullio'],
  ["Gemma Dell'Aquila", 'Stefania Sabino'],
  ['Filippo Aggio', 'Annita De Biasi'],
  ['Alessandro Zedda'],
  ['Diego Conti Vecchi'],
  ['Marta Ottoz', 'Andrea Lerede'],
  ['Daniel Saraceno', 'Martha Umana'],
  ['Veronica Solimei'],
  ['Giacomo Barchetta'],
  ['Francesco Regis'],
  ['Eugenio Cattini'],
  ['Luca Marchi'],
  ['Andrea Po'],
  ['Stefano Gentilini'],
  ['Martina Cera'],
  ['Ilaria Coratti'],
  ['Gregory Ezechieli'],
];

// ── UTILITÀ ────────────────────────────────────────────────
function trovaCognome(inputRaw) {
  const input = inputRaw.toLowerCase().trim().replace(/\s+/g, ' ');
  if (input.length < 2) return null;
  for (const gruppo of GRUPPI) {
    for (const nome of gruppo) {
      if (nome.toLowerCase().trim() === input) {
        return gruppo.length > 1 ? gruppo : null;
      }
    }
  }
  return null;
}

function debounce(fn, delay) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

// ── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  initNavbar();
  initHeroAnimation();
  initScrollAnimations();
  initCountdown();
  initQuiz();
  initRSVPForm();
});

/* ============================================================
   NAVBAR
   ============================================================ */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const toggle    = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');
  const links     = navLinks.querySelectorAll('a');

  // Sticky style on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile toggle
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !toggle.contains(e.target)) {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ============================================================
   HERO ANIMATIONS
   ============================================================ */
function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl
    .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
    .to('.hero-name--left',  { opacity: 1, x: 0, duration: 1 },   '-=0.4')
    .to('.hero-ampersand',   { opacity: 1, scale: 1, duration: 0.7 }, '-=0.6')
    .to('.hero-name--right', { opacity: 1, x: 0, duration: 1 },   '-=0.7')
    .to('.hero-info',        { opacity: 1, y: 0, duration: 0.8 },  '-=0.4')
    .to('.hero-cta',         { opacity: 1, y: 0, duration: 0.8 },  '-=0.5')
    .to('.hero-scroll',      { opacity: 1, duration: 1 },           '-=0.3');
}

/* ============================================================
   SCROLL ANIMATIONS
   ============================================================ */
function initScrollAnimations() {
  // Generic fade-up for section headers
  gsap.utils.toArray('.section-header').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
    });
  });

  // Cerimonia cards
  gsap.utils.toArray('.cerimonia-card').forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.12,
      ease: 'power3.out',
    });
  });

  // Testimone cards
  gsap.utils.toArray('.testimone-card').forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out',
    });
  });

  // Info cards
  gsap.utils.toArray('.info-card').forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.12,
      ease: 'power3.out',
    });
  });

  // IBAN box
  const ibanBox = document.querySelector('.iban-box');
  if (ibanBox) {
    gsap.to(ibanBox, {
      scrollTrigger: {
        trigger: ibanBox,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
    });
  }

  // Weather note
  const weatherNote = document.querySelector('.weather-note');
  if (weatherNote) {
    gsap.from(weatherNote, {
      scrollTrigger: {
        trigger: weatherNote,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 16,
      duration: 0.8,
      ease: 'power3.out',
    });
  }

  // RSVP section header
  gsap.from('.rsvp-section .section-header', {
    scrollTrigger: {
      trigger: '.rsvp-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 24,
    duration: 0.8,
    ease: 'power3.out',
  });
}

/* ============================================================
   COUNTDOWN
   ============================================================ */
function initCountdown() {
  const daysEl    = document.getElementById('cd-days');
  const hoursEl   = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function updateCountdown() {
    const now  = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
      daysEl.textContent    = '00';
      hoursEl.textContent   = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent    = pad(days);
    hoursEl.textContent   = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Animate in when section enters viewport
  ScrollTrigger.create({
    trigger: '.countdown-section',
    start: 'top 80%',
    onEnter: () => {
      gsap.from('.countdown-item', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      });
      gsap.from('.countdown-colon', {
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        delay: 0.3,
      });
    },
    once: true,
  });
}

/* ============================================================
   RSVP FORM
   ============================================================ */
function initRSVPForm() {
  const form                 = document.getElementById('rsvp-form');
  const presenzaInputs       = document.querySelectorAll('input[name="presenza"]');
  const fieldsetLogistica    = document.getElementById('fieldset-logistica');
  const fieldsetAlimentari   = document.getElementById('fieldset-alimentari');
  const fieldsetExtra        = document.getElementById('fieldset-extra');
  const fieldsetAccomp       = document.getElementById('fieldset-accompagnatori');
  const accompGrid           = document.getElementById('accompagnatori-grid');
  const nomeInput            = document.getElementById('nome_cognome');
  const submitBtn            = document.getElementById('submit-btn');
  const formResponse         = document.getElementById('form-response');

  if (!form) return;

  // ── Logica accompagnatori ──────────────────────────────────
  let currentGruppo = null;

  function aggiornaAccompagnatori() {
    const gruppo = trovaCognome(nomeInput.value);
    if (gruppo === currentGruppo) return;
    currentGruppo = gruppo;

    if (!gruppo) {
      toggleFieldset(fieldsetAccomp, false);
      accompGrid.innerHTML = '';
      return;
    }

    const chi = nomeInput.value.toLowerCase().trim().replace(/\s+/g, ' ');
    const companions = gruppo.filter(n => n.toLowerCase().trim() !== chi);

    accompGrid.innerHTML = companions.map((nome, i) => `
      <label class="acc-card">
        <input type="checkbox" name="accompagnatori" value="${nome}" checked>
        <span class="acc-nome">${nome}</span>
        <span class="acc-track"><span class="acc-thumb"></span></span>
      </label>
    `).join('');

    toggleFieldset(fieldsetAccomp, true);
    rebuildAlimentari();
  }

  nomeInput.addEventListener('blur', aggiornaAccompagnatori);
  nomeInput.addEventListener('input', debounce(aggiornaAccompagnatori, 500));

  // Toggle dieta quando un accompagnatore viene attivato/disattivato
  accompGrid.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox' && e.target.name === 'accompagnatori') {
      rebuildAlimentari();
    }
  });

  // Mostra/nascondi blocchi condizionali al click su presenza
  presenzaInputs.forEach(input => {
    input.addEventListener('change', () => {
      const val = input.value;
      const showConditional = val === 'si' || val === 'forse';

      toggleFieldset(fieldsetLogistica, showConditional);
      toggleFieldset(fieldsetAlimentari, showConditional);
      toggleFieldset(fieldsetExtra, showConditional);
      if (showConditional) rebuildAlimentari();
    });
  });

  // Form submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    setLoading(true);
    formResponse.className = 'form-response';
    formResponse.style.display = 'none';

    const payload = buildPayload(form);

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      showResponse('success', '🥂 Grazie! Abbiamo ricevuto la tua conferma. Ci vediamo il 6 settembre!');
      form.reset();
      hideAllConditionalFieldsets();

    } catch (err) {
      console.error('RSVP error:', err);
      showResponse('error', '😕 Qualcosa è andato storto. Riprova o contatta uno dei testimoni.');
    } finally {
      setLoading(false);
    }
  });

  // ── helpers ──────────────────────────────────────────────

  function toggleFieldset(el, show) {
    if (!el) return;
    if (show) {
      el.classList.remove('form-fieldset--hidden');
      el.classList.add('visible');
    } else {
      el.classList.add('form-fieldset--hidden');
      el.classList.remove('visible');
    }
  }

  function buildDietaRow(nome, idx) {
    const id   = `p${idx}`;
    const safe = nome.replace(/"/g, '&quot;');
    return `
      <div class="dieta-row" data-nome="${safe}">
        <p class="dieta-row-nome">${nome}</p>
        <div class="dieta-row-fields">
          <div class="form-field">
            <label for="dieta_${id}">Regime alimentare</label>
            <select id="dieta_${id}">
              <option value="nessuno">Mangio tutto 🍽️</option>
              <option value="vegetariano">Vegetariano</option>
              <option value="vegano">Vegano</option>
              <option value="celiaco">Celiaco / Gluten free</option>
              <option value="kosher">Kosher</option>
              <option value="halal">Halal</option>
              <option value="altro">Altro</option>
            </select>
          </div>
          <div class="form-field">
            <label for="allergie_${id}">Allergie / Intolleranze</label>
            <textarea id="allergie_${id}" rows="2" placeholder="Specifica solo se necessario..."></textarea>
          </div>
        </div>
      </div>`;
  }

  function rebuildAlimentari() {
    const alimentariRows = document.getElementById('alimentari-rows');
    if (!alimentariRows) return;

    // Salva i dati già inseriti (per non perderli al rebuild)
    const saved = {};
    document.querySelectorAll('.dieta-row').forEach(row => {
      saved[row.dataset.nome] = {
        dieta:    row.querySelector('select')?.value    || 'nessuno',
        allergie: row.querySelector('textarea')?.value || '',
      };
    });

    // Determina chi viene
    const presence = [...presenzaInputs].find(i => i.checked)?.value;
    const people   = [];
    if (presence === 'si' || presence === 'forse') {
      people.push(nomeInput.value.trim() || 'Tu');
      [...accompGrid.querySelectorAll('input[type="checkbox"]')]
        .filter(cb => cb.checked)
        .forEach(cb => people.push(cb.value));
    }

    // Ricostruisce le righe
    alimentariRows.innerHTML = people.map((nome, i) => buildDietaRow(nome, i)).join('');

    // Ripristina dati già inseriti
    document.querySelectorAll('.dieta-row').forEach(row => {
      const d = saved[row.dataset.nome];
      if (!d) return;
      const sel = row.querySelector('select');
      const tex = row.querySelector('textarea');
      if (sel) sel.value = d.dieta;
      if (tex) tex.value = d.allergie;
    });
  }

  function hideAllConditionalFieldsets() {
    [fieldsetLogistica, fieldsetAlimentari, fieldsetExtra, fieldsetAccomp].forEach(el => {
      if (el) {
        el.classList.add('form-fieldset--hidden');
        el.classList.remove('visible');
      }
    });
    accompGrid.innerHTML = '';
    const alimentariRows = document.getElementById('alimentari-rows');
    if (alimentariRows) alimentariRows.innerHTML = '';
    currentGruppo = null;
  }

  function validateForm(f) {
    let valid = true;

    // Clear previous errors
    f.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    // Required fields
    const required = f.querySelectorAll('[required]');
    required.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
    });

    // Presenza must be selected
    const presenzaSelected = [...presenzaInputs].some(i => i.checked);
    if (!presenzaSelected) {
      document.querySelector('.presenza-grid').classList.add('error');
      valid = false;
    }

    if (!valid) {
      const firstError = f.querySelector('.error');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return valid;
  }

  function buildPayload(f) {
    const data = new FormData(f);

    const accompagnatori = [...f.querySelectorAll('input[name="accompagnatori"]')].map(cb => ({
      nome:     cb.value,
      presente: cb.checked,
    }));

    const dieta_persone = [...document.querySelectorAll('.dieta-row')].map(row => ({
      nome:     row.dataset.nome,
      dieta:    row.querySelector('select')?.value        || '',
      allergie: row.querySelector('textarea')?.value?.trim() || '',
    }));

    return {
      nome_cognome:   data.get('nome_cognome')?.trim()  || '',
      presenza:       data.get('presenza')              || '',
      email:          data.get('email')?.trim()         || '',
      telefono:       data.get('telefono')?.trim()      || '',
      ricevimento:    data.get('ricevimento')           || '',
      pernottamento:  data.get('pernottamento')         || '',
      auto:           data.get('auto')                  || '0',
      come_conosci:   data.get('come_conosci')          || '',
      canzone:        data.get('canzone')?.trim()       || '',
      messaggio:      data.get('messaggio')?.trim()     || '',
      accompagnatori,
      dieta_persone,
      timestamp:      new Date().toISOString(),
    };
  }

  function setLoading(loading) {
    submitBtn.disabled = loading;
    submitBtn.classList.toggle('loading', loading);
  }

  function showResponse(type, message) {
    formResponse.className = `form-response ${type}`;
    formResponse.style.display = 'block';
    formResponse.textContent = message;
    formResponse.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/* ============================================================
   QUIZ SUGLI SPOSI
   ============================================================ */
function initQuiz() {
  const DOMANDE = [
    {
      testo: 'Dove ci siamo conosciuti?',
      opzioni: ['Castelfranco Veneto', 'Sanremo', 'Milano'],
      corretta: 1,
    },
    {
      testo: 'Chi ha organizzato questo matrimonio?',
      opzioni: [
        'Amorevolmente insieme',
        'Sabina ha voluto decidere tutto',
        'Giacomo ha voluto decidere tutto',
      ],
      corretta: 1,
    },
    {
      testo: 'Chi è il più disordinato tra i due?',
      opzioni: ['Sabina', 'Giacomo', 'Siamo impeccabilmente ordinati'],
      corretta: 0,
    },
    {
      testo: 'Chi è il/la tuttologa della coppia?',
      opzioni: [
        'Giacomo è un maestrino',
        'Nessuno dei due: passano ore a discutere e alla fine chiedono a Google per non litigare',
        'Entrambi: è una sfida all\'ultima citazione bibliografica',
      ],
      corretta: 0,
    },
    {
      testo: 'Quale di queste cose potrà avverarsi il giorno delle nozze?',
      opzioni: [
        'Sabina sbroccherà appena qualcosa andrà storto',
        'Giacomo arriverà sbronzo all\'altare',
        'Gli sposi si presenteranno in infradito',
      ],
      corretta: 0,
    },
  ];

  const counterEl   = document.getElementById('quiz-counter');
  const fillEl      = document.getElementById('quiz-progress-fill');
  const questionEl  = document.getElementById('quiz-question');
  const optionsEl   = document.getElementById('quiz-options');
  const quizCard    = document.getElementById('quiz-card');
  const overlay     = document.getElementById('quiz-overlay');
  const resultMsg   = document.getElementById('quiz-result-msg');
  const resultBtn   = document.getElementById('quiz-result-btn');
  const fwContainer = document.getElementById('quiz-overlay-fireworks');

  if (!counterEl) return;

  let current   = 0;
  let score     = 0;
  let fwInterval = null;

  // ── render domanda ────────────────────────────────────────
  function renderDomanda() {
    const d = DOMANDE[current];
    counterEl.textContent = `${current + 1} / ${DOMANDE.length}`;
    fillEl.style.width    = `${(current / DOMANDE.length) * 100}%`;

    // Fade-out card, poi aggiorna e fade-in
    quizCard.style.opacity   = '0';
    quizCard.style.transform = 'translateY(16px)';

    setTimeout(() => {
      questionEl.textContent = d.testo;
      optionsEl.innerHTML    = '';

      d.opzioni.forEach((testo, idx) => {
        const btn = document.createElement('button');
        btn.className   = 'quiz-option';
        btn.textContent = testo;
        btn.addEventListener('click', () => scegli(idx));
        optionsEl.appendChild(btn);
      });

      quizCard.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      quizCard.style.opacity    = '1';
      quizCard.style.transform  = 'translateY(0)';
    }, 220);
  }

  // ── gestione risposta ─────────────────────────────────────
  function scegli(idx) {
    const d       = DOMANDE[current];
    const buttons = optionsEl.querySelectorAll('.quiz-option');

    // Blocca tutti i bottoni
    buttons.forEach(btn => (btn.disabled = true));

    // Evidenzia esito
    buttons[idx].classList.add(idx === d.corretta ? 'quiz-option--correct' : 'quiz-option--wrong');
    if (idx !== d.corretta) {
      buttons[d.corretta].classList.add('quiz-option--correct');
    } else {
      score++;
    }

    // Avanza dopo pausa
    setTimeout(() => {
      current++;
      if (current < DOMANDE.length) {
        renderDomanda();
      } else {
        mostraRisultato();
      }
    }, 950);
  }

  // ── risultato finale ──────────────────────────────────────
  function mostraRisultato() {
    fillEl.style.width = '100%';
    const win = score === DOMANDE.length;

    overlay.classList.add('active', win ? 'quiz-overlay--win' : 'quiz-overlay--lose');
    overlay.removeAttribute('aria-hidden');

    if (win) {
      resultMsg.innerHTML = 'Grande!<br><em>Hai appena vinto:<br>puoi pagare le nozze!</em>';
    } else {
      resultMsg.innerHTML = 'Ci spiace che tu abbia sbagliato alcune risposte.<br><em>Per redimerti potrai<br>pagarci le nozze.</em>';
    }

    avviaPetali(win);
  }

  // ── petali che cadono ─────────────────────────────────────
  function avviaPetali(win) {
    const COLORI_WIN  = ['#F5F0E8', '#EDE7D5', '#D4C8A8', '#C8D5B0', '#B5C4A0'];
    const COLORI_LOSE = ['#6B7B5C', '#8A9A7A', '#9AA8A0', '#7A8880', '#A8A090'];
    const colori = win ? COLORI_WIN : COLORI_LOSE;

    fwInterval = setInterval(() => {
      const petal = document.createElement('div');
      petal.className = 'petal';
      const sz = 5 + Math.random() * 9;
      petal.style.width    = `${sz}px`;
      petal.style.height   = `${sz * 1.5}px`;
      petal.style.background = colori[Math.floor(Math.random() * colori.length)];
      petal.style.left     = `${Math.random() * 100}%`;
      petal.style.setProperty('--dur',  `${6 + Math.random() * 6}s`);
      petal.style.setProperty('--rot',  `${Math.random() * 360}deg`);
      petal.style.setProperty('--sway', `${(Math.random() - 0.5) * 140}px`);
      fwContainer.appendChild(petal);
      setTimeout(() => petal.remove(), 13000);
    }, 280);
  }

  // ── riprova ───────────────────────────────────────────────
  resultBtn.addEventListener('click', () => {
    clearInterval(fwInterval);
    fwContainer.innerHTML = '';
    overlay.classList.remove('active', 'quiz-overlay--win', 'quiz-overlay--lose');
    overlay.setAttribute('aria-hidden', 'true');
    current = 0;
    score   = 0;
    renderDomanda();
  });

  // Avvio
  renderDomanda();
}

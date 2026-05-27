/* =============================================
   ATC Club Montréal — main.js
   ============================================= */

/* ——— LANGUAGE SYSTEM ——— */

let currentLang = localStorage.getItem('atc-lang') || 'fr';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('atc-lang', lang);

  /* swap every element that carries data-fr / data-en */
  document.querySelectorAll('[data-fr]').forEach(el => {
    el.textContent = lang === 'fr' ? el.dataset.fr : el.dataset.en;
  });

  /* swap placeholder attributes */
  document.querySelectorAll('[data-fr-placeholder]').forEach(el => {
    el.placeholder = lang === 'fr' ? el.dataset.frPlaceholder : el.dataset.enPlaceholder;
  });

  /* update toggle button label (shows the OTHER language) */
  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.textContent = lang === 'fr' ? 'EN' : 'FR';

  /* update html[lang] */
  document.documentElement.lang = lang === 'fr' ? 'fr' : 'en';

  /* re-render gallery cards if present */
  const grid = document.getElementById('gallery-grid');
  if (grid) {
    const active = document.querySelector('.filter-btn.active');
    renderGallery(active ? active.dataset.filter : 'all');
  }
}

/* ——— NAVIGATION ——— */

function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* active page highlight */
  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });

  /* language toggle */
  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.addEventListener('click', () => applyLanguage(currentLang === 'fr' ? 'en' : 'fr'));
}

/* ——— BACK TO TOP ——— */

function initBackToTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 380);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ——— GALLERY DATA ——— */

const cards = [
  {
    id: 1,
    fr: 'Coucher de soleil',    en: 'Sunset',
    school: 'jeanne-mance',
    schoolFr: 'École sec. Jeanne-Mance', schoolEn: 'Jeanne-Mance Secondary',
    grade: 'Sec. 3',
    bg: 'linear-gradient(135deg,#ff9a9e,#fecfef,#ffecd2)',
    descFr: 'Une belle représentation du coucher de soleil sur le mont Royal, créée aux pastels.',
    descEn: 'A beautiful sunset over Mount Royal, rendered in pastel.'
  },
  {
    id: 2,
    fr: 'Jardin imaginaire',    en: 'Imaginary Garden',
    school: 'jeanne-mance',
    schoolFr: 'École sec. Jeanne-Mance', schoolEn: 'Jeanne-Mance Secondary',
    grade: 'Sec. 4',
    bg: 'linear-gradient(135deg,#56ab2f,#a8e063)',
    descFr: 'Un jardin fantaisiste avec des fleurs improbables et des papillons colorés.',
    descEn: 'A whimsical garden with improbable flowers and colorful butterflies.'
  },
  {
    id: 3,
    fr: 'Océan de rêves',       en: 'Ocean of Dreams',
    school: 'mont-royal',
    schoolFr: 'Collège Mont-Royal', schoolEn: 'Collège Mont-Royal',
    grade: 'Sec. 2',
    bg: 'linear-gradient(135deg,#4facfe,#00f2fe)',
    descFr: 'Les profondeurs de l\'océan et ses mystères, peints à l\'aquarelle.',
    descEn: 'The ocean depths and their mysteries, painted in watercolor.'
  },
  {
    id: 4,
    fr: 'Ville nocturne',       en: 'Night City',
    school: 'mont-royal',
    schoolFr: 'Collège Mont-Royal', schoolEn: 'Collège Mont-Royal',
    grade: 'Sec. 5',
    bg: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)',
    descFr: 'Le skyline de Montréal la nuit, capturé en miniature.',
    descEn: 'Montreal\'s skyline at night, captured in miniature.'
  },
  {
    id: 5,
    fr: 'Automne doré',         en: 'Golden Autumn',
    school: 'pierre-laporte',
    schoolFr: 'École sec. Pierre-Laporte', schoolEn: 'Pierre-Laporte Secondary',
    grade: 'Sec. 1',
    bg: 'linear-gradient(135deg,#f7971e,#ffd200)',
    descFr: 'Les feuilles d\'automne du parc Angrignon à l\'acrylique.',
    descEn: 'Autumn leaves from Parc Angrignon in acrylic paint.'
  },
  {
    id: 6,
    fr: 'Portrait abstrait',    en: 'Abstract Portrait',
    school: 'pierre-laporte',
    schoolFr: 'École sec. Pierre-Laporte', schoolEn: 'Pierre-Laporte Secondary',
    grade: 'Sec. 4',
    bg: 'linear-gradient(135deg,#e96c75,#f7a1a8,#ffdde1)',
    descFr: 'Une exploration du visage humain à travers l\'art abstrait.',
    descEn: 'An exploration of the human face through abstract art.'
  },
  {
    id: 7,
    fr: 'Montagne bleue',       en: 'Blue Mountain',
    school: 'northview',
    schoolFr: 'Northview Heights Secondary', schoolEn: 'Northview Heights Secondary',
    grade: 'Sec. 3',
    bg: 'linear-gradient(135deg,#1e3c72,#2a5298)',
    descFr: 'Une vue montagnarde sereine aux teintes bleues apaisantes.',
    descEn: 'A serene mountain view in soothing blue hues.'
  },
  {
    id: 8,
    fr: 'Spirales et formes',   en: 'Spirals & Shapes',
    school: 'northview',
    schoolFr: 'Northview Heights Secondary', schoolEn: 'Northview Heights Secondary',
    grade: 'Sec. 2',
    bg: 'linear-gradient(135deg,#d4fc79,#96e6a1)',
    descFr: 'Des motifs géométriques inspirés de la nature et des mathématiques.',
    descEn: 'Geometric patterns inspired by nature and mathematics.'
  },
  {
    id: 9,
    fr: 'Soleil de minuit',     en: 'Midnight Sun',
    school: 'edouard-montpetit',
    schoolFr: 'Éc. sec. Édouard-Montpetit', schoolEn: 'Édouard-Montpetit Secondary',
    grade: 'Sec. 5',
    bg: 'linear-gradient(135deg,#f8b500,#ff4500)',
    descFr: 'L\'atmosphère mystique du soleil de minuit dans le Nord canadien.',
    descEn: 'The mystical atmosphere of the midnight sun in northern Canada.'
  },
  {
    id: 10,
    fr: 'Petite maison',        en: 'Little House',
    school: 'edouard-montpetit',
    schoolFr: 'Éc. sec. Édouard-Montpetit', schoolEn: 'Édouard-Montpetit Secondary',
    grade: 'Sec. 1',
    bg: 'linear-gradient(135deg,#f7d794,#f8a978)',
    descFr: 'Une maison colorée de banlieue montréalaise en style naïf.',
    descEn: 'A colorful Montreal suburban house in naïve art style.'
  },
  {
    id: 11,
    fr: 'Oiseau tropical',      en: 'Tropical Bird',
    school: 'west-island',
    schoolFr: 'West Island College', schoolEn: 'West Island College',
    grade: 'Sec. 3',
    bg: 'linear-gradient(135deg,#fd79a8,#a29bfe,#74b9ff)',
    descFr: 'Un oiseau du paradis imaginé avec des encres colorées.',
    descEn: 'A bird of paradise imagined with colored inks.'
  },
  {
    id: 12,
    fr: 'Pluie d\'étoiles',     en: 'Star Rain',
    school: 'west-island',
    schoolFr: 'West Island College', schoolEn: 'West Island College',
    grade: 'Sec. 4',
    bg: 'linear-gradient(135deg,#2d3436,#636e72,#b2bec3)',
    descFr: 'Une pluie d\'étoiles filantes dans un ciel d\'encre noire.',
    descEn: 'Shooting stars falling through an ink-black sky.'
  }
];

/* ——— GALLERY RENDER ——— */

function renderGallery(filter) {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  const subset = filter === 'all' ? cards : cards.filter(c => c.school === filter);

  grid.innerHTML = subset.map(c => `
    <article class="gallery-card" data-id="${c.id}" tabindex="0" role="button"
             aria-label="${currentLang === 'fr' ? c.fr : c.en}">
      <div class="gallery-card-art" style="background:${c.bg}">
        ${currentLang === 'fr' ? c.fr : c.en}
      </div>
      <div class="gallery-card-info">
        <div class="gallery-card-title">${currentLang === 'fr' ? c.fr : c.en}</div>
        <div class="gallery-card-school">${currentLang === 'fr' ? c.schoolFr : c.schoolEn}</div>
        <div class="gallery-card-grade">${c.grade}</div>
      </div>
    </article>
  `).join('');

  /* attach click + keyboard events */
  grid.querySelectorAll('.gallery-card').forEach(el => {
    const id   = parseInt(el.dataset.id);
    const card = cards.find(c => c.id === id);
    el.addEventListener('click',   () => openLightbox(card));
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(card); });
  });
}

/* ——— LIGHTBOX ——— */

function openLightbox(card) {
  const overlay = document.getElementById('lightbox-overlay');
  if (!overlay) return;

  document.getElementById('lb-art').style.background        = card.bg;
  document.getElementById('lb-title').textContent           = currentLang === 'fr' ? card.fr     : card.en;
  document.getElementById('lb-school').textContent          = currentLang === 'fr' ? card.schoolFr: card.schoolEn;
  document.getElementById('lb-grade').textContent           = card.grade;
  document.getElementById('lb-desc').textContent            = currentLang === 'fr' ? card.descFr  : card.descEn;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('lb-close').focus();
}

function closeLightbox() {
  const overlay = document.getElementById('lightbox-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function initGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  renderGallery('all');

  /* filter buttons */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(btn.dataset.filter);
    });
  });

  /* lightbox close */
  document.getElementById('lb-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'lightbox-overlay') closeLightbox();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

/* ——— CONTACT FORM ——— */

function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function setErr(id, msgFr, msgEn) {
    const f = document.getElementById(id);
    const e = document.getElementById(id + '-err');
    if (f) f.classList.add('err');
    if (e) { e.textContent = currentLang === 'fr' ? msgFr : msgEn; e.classList.add('show'); }
  }

  function clearField(id) {
    const f = document.getElementById(id);
    const e = document.getElementById(id + '-err');
    f?.classList.remove('err', 'ok');
    e?.classList.remove('show');
  }

  function setOk(id) {
    const f = document.getElementById(id);
    f?.classList.remove('err'); f?.classList.add('ok');
  }

  ['name','email','school','message'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => clearField(id));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;

    const name    = document.getElementById('name')?.value.trim();
    const email   = document.getElementById('email')?.value.trim();
    const school  = document.getElementById('school')?.value;
    const message = document.getElementById('message')?.value.trim();

    if (!name)   { setErr('name', 'Veuillez entrer votre nom.', 'Please enter your name.'); ok = false; }
    else setOk('name');

    if (!email)              { setErr('email', 'Veuillez entrer votre courriel.', 'Please enter your email.'); ok = false; }
    else if (!validEmail(email)) { setErr('email', 'Courriel invalide.', 'Invalid email address.'); ok = false; }
    else setOk('email');

    if (!school) { setErr('school', 'Veuillez choisir une école.', 'Please select a school.'); ok = false; }
    else setOk('school');

    if (!message || message.length < 10) {
      setErr('message',
        message ? 'Message trop court (min. 10 caractères).' : 'Veuillez entrer votre message.',
        message ? 'Message too short (min. 10 chars).'        : 'Please enter your message.');
      ok = false;
    } else setOk('message');

    if (ok) {
      form.style.display = 'none';
      document.getElementById('form-success')?.classList.add('show');
    }
  });
}

/* ——— BOOT ——— */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  applyLanguage(currentLang);
  initBackToTop();
  initGallery();
  initContact();
});

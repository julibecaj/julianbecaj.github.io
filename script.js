// ── FOLDER MODAL DATA ──
window.projects = {
  vodafone: {
    path: 'vodafone-app',
    name: 'Vodafone Full-Stack App',
    type: 'Full-Stack Web Application · Internship Project',
    desc: 'Production-style web application built during my internship at Vodafone Albania. Supports user registration, login, profile management, and service purchases with a secure, scalable architecture.',
    stack: ['React.js', 'Next.js', 'Java Spring Boot', 'MySQL', 'REST API', 'Git/GitHub', 'Postman'],
    bullets: [
      'Implemented token-based authentication, CORS policies, and access control mechanisms',
      'Designed and integrated RESTful APIs for reliable client-server communication and DB persistence',
      'Built reusable, modular UI components to improve scalability and maintainability',
      'Tested and validated all API flows using Postman in an Agile workflow',
    ],
    liveUrl: 'PASTE_VODAFONE_LIVE_URL_HERE',
    githubUrl: 'PASTE_VODAFONE_GITHUB_URL_HERE',
    previewType: 'iframe'
  },
  driverent: {
    path: 'drive-rent',
    name: 'DriveRent',
    type: 'Frontend Web Application · Internship Project',
    desc: 'Responsive car rental platform allowing users to browse available cars, view pricing, and manage bookings. Focused on clean UI, cross-browser compatibility, and smooth user interactions.',
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    bullets: [
      'Designed and implemented a fully responsive layout across desktop and mobile',
      'Built interactive UI components improving user engagement and navigation flow',
      'Applied clean semantic HTML and CSS structure for cross-browser compatibility',
    ],
    liveUrl: 'PASTE_DRIVERENT_LIVE_URL_HERE',
    githubUrl: 'PASTE_DRIVERENT_GITHUB_URL_HERE',
    previewType: 'iframe'
  },
  hotel: {
    path: 'hotel-mgmt',
    name: 'Hotel Management System',
    type: 'Full-Stack Web Application · Academic Project',
    desc: 'Academic hotel management system that automates room allocation, booking management, and customer records. Reduces manual operations through system-driven data consistency.',
    stack: ['C#', 'ASP.NET MVC', 'Oracle SQL'],
    bullets: [
      'Implemented server-side logic using ASP.NET MVC following strict MVC architectural patterns',
      'Designed and queried a relational database schema using Oracle SQL',
      'Improved data consistency and reduced manual operations through automation logic',
    ],
    liveUrl: 'PASTE_HOTEL_LIVE_URL_HERE',
    githubUrl: 'PASTE_HOTEL_GITHUB_URL_HERE',
    previewType: 'iframe'
  },
  soul:{
    path: 'soul',
    name: 'Soul',
    type: 'Full-Stack Music Web Application · (In Progress)',
    desc: '',
    stack: ['React', 'Next.js', 'Typescript', 'Java', 'Spring Boot', 'Postman', 'Figma', 'PostgreSQL'],
    bullets: '',
    liveUrl: 'https://soul-web-app-git-master-julian-becajs-projects.vercel.app',
    githubUrl: '',
    previewType: 'iframe'
  }
};

let activePreviewUrl = '';
let previewLoadTimeout = null;
let previouslyFocusedElement = null;

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.filter(item => typeof item === 'string' && item.trim());
  }

  if (typeof value === 'string' && value.trim()) {
    return [value.trim()];
  }

  return [];
}

function isConfiguredUrl(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url) && !url.includes('PASTE_');
}

function externalLinkAttributes(url) {
  const configured = isConfiguredUrl(url);
  return {
    href: configured ? url : '#',
    className: configured ? '' : ' is-disabled',
    accessibility: configured ? '' : ' aria-disabled="true" tabindex="-1"'
  };
}

window.openFolder = function(id) {
  const p = window.projects[id];
  if (!p) return;

  const overlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  const liveLink = externalLinkAttributes(p.liveUrl);
  const sourceLink = externalLinkAttributes(p.githubUrl);
  const hasLivePreview = p.previewType === 'iframe' && isConfiguredUrl(p.liveUrl);
  const stack = normalizeList(p.stack);
  const bullets = normalizeList(p.bullets);

  previouslyFocusedElement = document.activeElement;
  activePreviewUrl = hasLivePreview ? p.liveUrl : '';
  document.getElementById('modal-path').textContent = p.path;
  modalBody.innerHTML = `
    <div class="modal-proj-name" id="modal-project-title">${p.name}</div>
    <div class="modal-proj-type">${p.type}</div>
    <div class="modal-desc">${p.desc || 'Project details coming soon.'}</div>
    <div class="modal-section-label">// stack</div>
    <div class="modal-stack">${stack.map(s => `<span class="stack-tag">${s}</span>`).join('')}</div>
    <div class="modal-section-label">// features</div>
    <ul class="modal-bullets">${bullets.length ? bullets.map(b => `<li>${b}</li>`).join('') : '<li>More details coming soon.</li>'}</ul>
    <div class="project-actions">
      <a class="project-action${liveLink.className}" href="${liveLink.href}" target="_blank" rel="noopener noreferrer"${liveLink.accessibility}>↗ Open Live Site</a>
      <a class="project-action${sourceLink.className}" href="${sourceLink.href}" target="_blank" rel="noopener noreferrer"${sourceLink.accessibility}>⌥ View Source Code</a>
    </div>
    <div class="modal-section-label">// live preview</div>
    <div class="project-preview" data-preview-mode="desktop">
      <div class="preview-toolbar">
        <div class="preview-address" title="${hasLivePreview ? p.liveUrl : 'Live URL not configured'}">${hasLivePreview ? p.liveUrl : 'Live URL not configured'}</div>
        <div class="preview-controls" aria-label="Preview controls">
          <button type="button" class="preview-control active" data-preview-mode="desktop" aria-pressed="true" onclick="setPreviewMode('desktop')">Desktop</button>
          <button type="button" class="preview-control" data-preview-mode="mobile" aria-pressed="false" onclick="setPreviewMode('mobile')">Mobile</button>
          <button type="button" class="preview-control" id="refresh-preview" onclick="refreshPreview()"${hasLivePreview ? '' : ' disabled'}>↻ Refresh</button>
        </div>
      </div>
      <div class="preview-frame-container">
        <div class="preview-loading" role="status" aria-live="polite"${hasLivePreview ? '' : ' hidden'}>Loading preview...</div>
        <div class="preview-frame-shell">
          <iframe id="project-preview-frame" title="${p.name} live website preview" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
        <div class="preview-fallback" role="status"${hasLivePreview ? ' hidden' : ''}>
          <p>${hasLivePreview ? 'The live preview could not be displayed inside the portfolio. Some websites block embedded previews.' : 'No live preview URL has been configured for this project yet.'}</p>
          <a class="preview-external-link${liveLink.className}" href="${liveLink.href}" target="_blank" rel="noopener noreferrer"${liveLink.accessibility}>Open Live Site</a>
        </div>
      </div>
      <div class="preview-embed-note">// Some websites block iframe embedding. If the preview is blank, use “Open Live Site”.</div>
    </div>
  `;

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (hasLivePreview) loadPreview(p.liveUrl);
  document.querySelector('.modal-close').focus();
};

function loadPreview(url) {
  const frame = document.getElementById('project-preview-frame');
  const loading = document.querySelector('.preview-loading');
  const fallback = document.querySelector('.preview-fallback');
  if (!frame || !loading || !fallback || !isConfiguredUrl(url)) return;

  clearTimeout(previewLoadTimeout);
  loading.hidden = false;
  fallback.hidden = true;

  frame.onload = () => {
    clearTimeout(previewLoadTimeout);
    loading.hidden = true;
  };
  frame.onerror = () => showPreviewFallback();
  frame.src = url;

  previewLoadTimeout = window.setTimeout(() => {
    if (!loading.hidden) showPreviewFallback();
  }, 15000);
}

function showPreviewFallback() {
  clearTimeout(previewLoadTimeout);
  const loading = document.querySelector('.preview-loading');
  const fallback = document.querySelector('.preview-fallback');
  if (loading) loading.hidden = true;
  if (fallback) fallback.hidden = false;
}

window.setPreviewMode = function(mode) {
  if (!['desktop', 'mobile'].includes(mode)) return;
  const preview = document.querySelector('.project-preview');
  if (!preview) return;

  preview.dataset.previewMode = mode;
  preview.querySelectorAll('[data-preview-mode]').forEach(button => {
    const active = button.dataset.previewMode === mode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
};

window.refreshPreview = function() {
  const frame = document.getElementById('project-preview-frame');
  if (!frame || !isConfiguredUrl(activePreviewUrl)) return;

  frame.onload = null;
  frame.onerror = null;
  frame.removeAttribute('src');
  window.requestAnimationFrame(() => loadPreview(activePreviewUrl));
};

function cleanupPreview() {
  clearTimeout(previewLoadTimeout);
  previewLoadTimeout = null;
  activePreviewUrl = '';

  const frame = document.getElementById('project-preview-frame');
  if (frame) {
    frame.onload = null;
    frame.onerror = null;
    frame.removeAttribute('src');
  }

  document.getElementById('modal-body').innerHTML = '';
}

window.closeFolder = function(e, force = false) {
  const overlay = document.getElementById('modal-overlay');
  const shouldClose = force || (e && e.target === overlay);
  if (shouldClose && overlay.classList.contains('open')) {
    cleanupPreview();
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (previouslyFocusedElement) previouslyFocusedElement.focus();
    previouslyFocusedElement = null;
  }
};

document.addEventListener('keydown', e => {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay.classList.contains('open')) return;

  if (e.key === 'Escape') {
    e.preventDefault();
    window.closeFolder(null, true);
    return;
  }

  if (e.key === 'Tab') {
    const focusable = [...overlay.querySelectorAll('button:not(:disabled), a[href]:not([aria-disabled="true"]), iframe, [tabindex]:not([tabindex="-1"])')]
      .filter(element => element.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

// ── INTERACTIVE TERMINAL ──
const commands = {
  help: () => [
    { text: 'Available commands:', cls: 't-green' },
    { text: '  whoami       — who is Julian?', cls: 't-dim' },
    { text: '  skills       — technical skill set', cls: 't-dim' },
    { text: '  experience   — work history', cls: 't-dim' },
    { text: '  projects     — project list', cls: 't-dim' },
    { text: '  contact      — get in touch', cls: 't-dim' },
    { text: '  education    — academic background', cls: 't-dim' },
    { text: '  clear        — clear terminal', cls: 't-dim' },
  ],
  whoami: () => [
    { text: 'Julian Becaj', cls: 't-green' },
    { text: 'Full-Stack Software Engineer | Tirana, Albania', cls: 't-cyan' },
    { text: 'Student @ University of New York Tirana (2023–2026)', cls: 't-white' },
    { text: 'React · Next.js · Java Spring Boot · PostgreSQL', cls: 't-dim' },
    { text: 'Currently: open to internships & junior positions', cls: 't-yellow' },
  ],
  skills: () => [
    { text: 'Technical Skills:', cls: 't-green' },
    { text: '  Languages   → Java, Python, C#, JavaScript', cls: 't-white' },
    { text: '  Frontend    → React.js, Next.js, HTML5, CSS3', cls: 't-white' },
    { text: '  Backend     → Spring Boot, ASP.NET MVC, REST APIs', cls: 't-white' },
    { text: '  Databases   → MySQL, PostgreSQL, Oracle SQL', cls: 't-white' },
    { text: '  Tools       → Git/GitHub, Postman, Figma', cls: 't-white' },
    { text: '  Concepts    → OOP, MVC, DSA, Agile, UI/UX', cls: 't-dim' },
  ],
  experience: () => [
    { text: 'Work Experience:', cls: 't-green' },
    { text: '  [2025] Software Engineer Intern — Vodafone Albania', cls: 't-cyan' },
    { text: '         Full-stack app: React + Spring Boot + MySQL', cls: 't-dim' },
    { text: '  [2025] Frontend Developer Intern — Dominusoft', cls: 't-cyan' },
    { text: '         Responsive UI with HTML/CSS/JS', cls: 't-dim' },
    { text: '  [2024] IT Support Intern — Infinity Investment', cls: 't-cyan' },
    { text: '         Hardware, network, Office 365 management', cls: 't-dim' },
  ],
  projects: () => [
    { text: 'Projects:', cls: 't-green' },
    { text: '  ./vodafone-app    → Full-stack: React, Next.js, Spring Boot, MySQL', cls: 't-cyan' },
    { text: '  ./drive-rent      → Car rental UI: HTML, CSS, JavaScript', cls: 't-cyan' },
    { text: '  ./hotel-mgmt      → Academic: C#, ASP.NET MVC, Oracle SQL', cls: 't-cyan' },
  ],
  contact: () => [
    { text: 'Contact Info:', cls: 't-green' },
    { text: '  email     → julian.becaj16@gmail.com', cls: 't-white' },
    { text: '  github    → github.com/julibecaj', cls: 't-white' },
    { text: '  linkedin  → linkedin.com/in/julian-becaj', cls: 't-white' },
    { text: '  phone     → +355 69 450 2291', cls: 't-white' },
  ],
  education: () => [
    { text: 'Education:', cls: 't-green' },
    { text: '  BSc Software Engineering', cls: 't-cyan' },
    { text: '  University of New York Tirana', cls: 't-white' },
    { text: '  2023 – 2026 | Tirana, Albania', cls: 't-dim' },
    { text: '  English: C1 (Aptis Certified)', cls: 't-dim' },
  ],
  clear: () => null,
};

const output = document.getElementById('terminal-output');
const input  = document.getElementById('cmd-input');

function addLine(text, cls = 't-white') {
  const el = document.createElement('div');
  el.className = `t-line ${cls}`;
  el.innerHTML = text;
  output.appendChild(el);
  output.scrollTop = output.scrollHeight;
}

window.runCmd = function(cmd) {
  cmd = cmd.trim().toLowerCase();
  addLine(`<span class="t-green">julian@becaj</span><span class="t-dim">:</span><span class="t-cyan">~</span><span class="t-dim"> $ </span><span class="t-white">${cmd}</span>`);

  if (cmd === 'clear') { output.innerHTML = ''; return; }
  if (!cmd) return;

  const fn = commands[cmd];
  if (fn) {
    const lines = fn();
    if (lines) lines.forEach(l => addLine(l.text, l.cls));
  } else {
    addLine(`bash: ${cmd}: command not found. Try <span class="t-green">help</span>`, 't-red');
  }

  input.value = '';
};

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') window.runCmd(input.value);
});

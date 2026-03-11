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
    ]
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
    ]
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
    ]
  }
};

window.openFolder = function(id) {
  const p = window.projects[id];
  document.getElementById('modal-path').textContent = p.path;
  document.getElementById('modal-body').innerHTML = `
    <div class="modal-proj-name">${p.name}</div>
    <div class="modal-proj-type">${p.type}</div>
    <div class="modal-desc">${p.desc}</div>
    <div class="modal-section-label">// stack</div>
    <div class="modal-stack">${p.stack.map(s => `<span class="stack-tag">${s}</span>`).join('')}</div>
    <div class="modal-section-label">// highlights</div>
    <ul class="modal-bullets">${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
  `;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeFolder = function(e, force = false) {
  if (force || (e && e.target === document.getElementById('modal-overlay'))) {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }
};

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') window.closeFolder(null, true);
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
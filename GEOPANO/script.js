/* ============================================================
   BOXYARD Resto Bar — Shared JS
   ============================================================ */

// ---------- Demo accounts (frontend-only, no database) ----------
const DEMO_ACCOUNTS = [
  { username: 'user1',  password: 'user1pass',  role: 'user',       displayName: 'Alex Carter',  redirect: 'user.html' },
  { username: 'admin1', password: 'admin1pass', role: 'admin',      displayName: 'Jordan Reyes', redirect: 'admin.html' },
  { username: 'super1', password: 'super1pass', role: 'superadmin', displayName: 'Morgan Vale',  redirect: 'super-admin.html' },
];
const ROLE_LABEL = { user: 'User', admin: 'Admin', superadmin: 'Super Admin' };
const ROLE_HOME  = { user: 'user.html', admin: 'admin.html', superadmin: 'super-admin.html' };

// ---------- Session helpers ----------
function getSession(){
  try { return JSON.parse(localStorage.getItem('boxyard.account') || 'null'); } catch { return null; }
}
function setSession(acc){ localStorage.setItem('boxyard.account', JSON.stringify(acc)); }
function clearSession(){ localStorage.removeItem('boxyard.account'); }
function logout(){ clearSession(); window.location.href = 'login.html'; }

// Guard a dashboard page — redirects to login if not signed in / wrong role.
function requireRole(role){
  const acc = getSession();
  if (!acc){ window.location.href = 'login.html'; return null; }
  if (acc.role !== role){ window.location.href = ROLE_HOME[acc.role]; return null; }
  // Fill any [data-user-name] elements
  document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = acc.displayName);
  return acc;
}

// ---------- Toast ----------
function toast(msg, type){
  let t = document.getElementById('toast');
  if (!t){ t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = 'show' + (type === 'error' ? ' error' : '');
  clearTimeout(window.__toastT);
  window.__toastT = setTimeout(() => t.classList.remove('show'), 2200);
}

// ---------- Smooth scroll for in-page anchors ----------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if (target){ e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ---------- Highlight active nav link ----------
(function highlightNav(){
  const here = location.pathname.split('/').pop() || 'home.html';
  document.querySelectorAll('header nav a').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('active');
  });
})();

// ---------- Inject Login/Dashboard chip into public nav if logged in ----------
(function injectLoginChip(){
  const link = document.querySelector('.login-link');
  if (!link) return;
  const acc = getSession();
  if (!acc) return;
  link.textContent = 'Dashboard';
  link.setAttribute('href', ROLE_HOME[acc.role]);
})();

// ---------- Reservation form (public page) ----------
const resForm = document.getElementById('reservationForm');
if (resForm){
  // table-card selection sync
  document.querySelectorAll('.table-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.table-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const sel = document.getElementById('tableType');
      if (sel) sel.value = card.dataset.value;
    });
  });
  resForm.addEventListener('submit', e => {
    e.preventDefault();
    toast("Reservation request sent! We'll confirm within 24 hours.");
    resForm.reset();
    document.querySelectorAll('.table-card').forEach((c, i) => c.classList.toggle('active', i === 0));
  });
}

// ---------- Login form ----------
const loginForm = document.getElementById('loginForm');
if (loginForm){
  // Build sample-account buttons
  const list = document.getElementById('sampleList');
  if (list){
    DEMO_ACCOUNTS.forEach(a => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'sample-btn';
      b.innerHTML = `<span><b>${ROLE_LABEL[a.role]}</b> <span class="muted">· ${a.username} / ${a.password}</span></span><span class="muted">Use →</span>`;
      b.addEventListener('click', () => {
        loginForm.querySelector('input[name=username]').value = a.username;
        loginForm.querySelector('input[name=password]').value = a.password;
      });
      list.appendChild(b);
    });
  }
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const u = loginForm.username.value.trim();
    const p = loginForm.password.value;
    if (!u || !p){ toast('Please fill in all fields.', 'error'); return; }
    const found = DEMO_ACCOUNTS.find(a => a.username === u && a.password === p);
    if (!found){ toast('Invalid username or password.', 'error'); return; }
    setSession(found);
    toast(`Welcome, ${found.displayName}!`);
    setTimeout(() => { window.location.href = found.redirect; }, 600);
  });
}

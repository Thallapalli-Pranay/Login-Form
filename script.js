// ---- clock in the titlebar ----
const clockEl = document.getElementById('clock');
function tickClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  clockEl.textContent = `${hh}:${mm}:${ss}`;
}
tickClock();
setInterval(tickClock, 1000);

// ---- show / hide password ----
const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggle-password');
toggleBtn.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  toggleBtn.textContent = isHidden ? 'hide' : 'show';
});

// ---- terminal-style log output ----
const logEl = document.getElementById('terminal-log');
function setLog(message, tone = 'idle', withCursor = true) {
  logEl.innerHTML = `<p class="log-line log-line-${tone}"><span class="prompt-symbol">$</span> ${message}${
    withCursor ? '<span class="cursor-blink">▌</span>' : ''
  }</p>`;
}

// ---- demo credentials ----
// This is a front-end only demo: there is no server here.
// Swap checkCredentials() for a real API call to your auth backend
// (e.g. POST /api/login) when you wire this up to a real service.
const DEMO_USERNAME = 'demo';
const DEMO_PASSWORD = 'demo123';

function checkCredentials(username, password) {
  return Promise.resolve(username === DEMO_USERNAME && password === DEMO_PASSWORD);
}

// ---- form handling ----
const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  usernameInput.classList.remove('field-error');
  passwordInput.classList.remove('field-error');

  if (!username || !password) {
    if (!username) usernameInput.classList.add('field-error');
    if (!password) passwordInput.classList.add('field-error');
    setLog('missing required field(s)', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-label').textContent = 'authenticating';
  setLog('verifying credentials', 'warn');

  const ok = await checkCredentials(username, password);

  // small delay so the "authenticating" state is visible
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-label').textContent = 'authenticate';

    if (ok) {
      setLog(`session opened for ${username}`, 'success', false);
    } else {
      passwordInput.classList.add('field-error');
      setLog('authentication failed — check credentials', 'error');
    }
  }, 550);
});

// ---- forgot password (demo placeholder) ----
document.getElementById('forgot-link').addEventListener('click', (e) => {
  e.preventDefault();
  setLog('password reset is not wired up in this demo', 'warn');
});

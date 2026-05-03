const API_BASE = (window.GITA_MENTOR_API_BASE || 'http://localhost:8080').replace(/\/+$/, '');
const REQUEST_TIMEOUT_MS = 15000;

const Session = {
  save(userId, username) {
    sessionStorage.setItem('gm_userId', String(userId));
    sessionStorage.setItem('gm_username', String(username));
  },
  getUserId() {
    return sessionStorage.getItem('gm_userId');
  },
  getUsername() {
    return sessionStorage.getItem('gm_username');
  },
  isLoggedIn() {
    return Boolean(sessionStorage.getItem('gm_userId'));
  },
  clear() {
    sessionStorage.removeItem('gm_userId');
    sessionStorage.removeItem('gm_username');
  }
};

async function requestJson(endpoint, options = {}) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(API_BASE + endpoint, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(options.headers || {})
      }
    });

    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json') ? await response.json() : null;

    if (!response.ok) {
      throw new Error(payload?.message || `Request failed with status ${response.status}.`);
    }

    return payload;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('The server took too long to respond. Please try again.');
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function apiPost(endpoint, data) {
  return requestJson(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

function apiGet(endpoint) {
  return requestJson(endpoint);
}

function requireAuth() {
  if (!Session.isLoggedIn()) {
    window.location.href = 'login.html';
  }
}

function initNavbar() {
  const usernameEl = document.getElementById('nav-username');
  const logoutBtn = document.getElementById('logout-btn');

  if (usernameEl) {
    usernameEl.textContent = Session.getUsername() ? `Signed in as ${Session.getUsername()}` : '';
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      Session.clear();
      window.location.href = 'login.html';
    });
  }
}

function showAlert(elementId, message, type = 'info') {
  const el = document.getElementById(elementId);
  if (!el) return;

  el.textContent = message;
  el.className = `alert alert-${type} show`;
  el.setAttribute('role', type === 'error' ? 'alert' : 'status');
}

function hideAlert(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  el.textContent = '';
  el.className = 'alert';
  el.removeAttribute('role');
}

function setLoading(button, loadingText) {
  if (!button) return;

  if (!button.dataset.defaultText) {
    button.dataset.defaultText = button.textContent;
  }

  button.disabled = true;
  button.textContent = loadingText;
}

function clearLoading(button) {
  if (!button) return;

  button.disabled = false;
  if (button.dataset.defaultText) {
    button.textContent = button.dataset.defaultText;
  }
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value ?? '';
  }
}

window.Session = Session;
window.apiPost = apiPost;
window.apiGet = apiGet;
window.requireAuth = requireAuth;
window.initNavbar = initNavbar;
window.showAlert = showAlert;
window.hideAlert = hideAlert;
window.setLoading = setLoading;
window.clearLoading = clearLoading;
window.setText = setText;

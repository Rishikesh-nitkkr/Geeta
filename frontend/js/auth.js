const MIN_PASSWORD_LENGTH = 8;

document.addEventListener('DOMContentLoaded', () => {
  if (Session.isLoggedIn()) {
    window.location.href = 'home.html';
    return;
  }

  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
});

async function handleLogin(event) {
  event.preventDefault();
  hideAlert('login-alert');

  const form = event.currentTarget;
  const username = form.username.value.trim();
  const password = form.password.value;
  const button = document.getElementById('login-btn');

  if (!username || !password) {
    showAlert('login-alert', 'Please enter both username and password.', 'error');
    return;
  }

  setLoading(button, 'Signing in...');

  try {
    const data = await apiPost('/login', { username, password });
    Session.save(data.userId, data.username);
    showAlert('login-alert', data.message || 'Login successful.', 'success');
    window.setTimeout(() => {
      window.location.href = 'home.html';
    }, 500);
  } catch (error) {
    showAlert('login-alert', error.message || 'Cannot connect to the server.', 'error');
  } finally {
    clearLoading(button);
  }
}

async function handleRegister(event) {
  event.preventDefault();
  hideAlert('register-alert');

  const form = event.currentTarget;
  const username = form.username.value.trim();
  const password = form.password.value;
  const confirm = form.confirmPassword.value;
  const button = document.getElementById('register-btn');

  if (!username || !password || !confirm) {
    showAlert('register-alert', 'Please fill in all fields.', 'error');
    return;
  }

  if (username.length < 3 || username.length > 50) {
    showAlert('register-alert', 'Username must be between 3 and 50 characters.', 'error');
    return;
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    showAlert('register-alert', 'Password must be at least 8 characters.', 'error');
    return;
  }

  if (password !== confirm) {
    showAlert('register-alert', 'Passwords do not match.', 'error');
    return;
  }

  setLoading(button, 'Creating account...');

  try {
    const data = await apiPost('/register', { username, password });
    showAlert('register-alert', `${data.message} Redirecting to login...`, 'success');
    form.reset();
    window.setTimeout(() => {
      window.location.href = 'login.html';
    }, 900);
  } catch (error) {
    showAlert('register-alert', error.message || 'Cannot connect to the server.', 'error');
  } finally {
    clearLoading(button);
  }
}

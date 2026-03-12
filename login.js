const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

if (window.voyaraAuth.currentUser()) {
  window.location.href = 'index.html';
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const result = window.voyaraAuth.login(formData.get('email'), formData.get('password'));

  if (!result.ok) {
    loginMessage.textContent = result.message;
    return;
  }

  window.location.href = 'index.html';
});

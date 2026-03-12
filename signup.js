const signupForm = document.getElementById('signupForm');
const signupMessage = document.getElementById('signupMessage');

if (window.voyaraAuth.currentUser()) {
  window.location.href = 'index.html';
}

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(signupForm);
  const result = window.voyaraAuth.signUp(
    formData.get('name').trim(),
    formData.get('email'),
    formData.get('password')
  );

  if (!result.ok) {
    signupMessage.textContent = result.message;
    return;
  }

  window.location.href = 'index.html';
});

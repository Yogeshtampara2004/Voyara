(function () {
  const USERS_KEY = 'voyara_users';
  const SESSION_KEY = 'voyara_session';

  function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function signUp(name, email, password) {
    const users = getUsers();
    const normalizedEmail = email.toLowerCase();

    if (users.some((user) => user.email === normalizedEmail)) {
      return { ok: false, message: 'Email already registered.' };
    }

    const newUser = { name, email: normalizedEmail, password };
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ name, email: normalizedEmail }));
    return { ok: true };
  }

  function login(email, password) {
    const users = getUsers();
    const normalizedEmail = email.toLowerCase();
    const existing = users.find((user) => user.email === normalizedEmail && user.password === password);

    if (!existing) {
      return { ok: false, message: 'Invalid email or password.' };
    }

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        name: existing.name,
        email: existing.email,
      })
    );

    return { ok: true };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function currentUser() {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  }

  window.voyaraAuth = {
    signUp,
    login,
    logout,
    currentUser,
  };
})();

const trips = [
  { destination: 'Bali, Indonesia', type: 'Beach', price: 899, nights: 5, image: 'images/beach.svg' },
  { destination: 'Paris, France', type: 'City', price: 1799, nights: 6, image: 'images/city.svg' },
  {
    destination: 'Swiss Alps, Switzerland',
    type: 'Nature',
    price: 2499,
    nights: 7,
    image: 'images/nature.svg',
  },
  { destination: 'Dubai, UAE', type: 'City', price: 1399, nights: 4, image: 'images/city.svg' },
  {
    destination: 'Queenstown, New Zealand',
    type: 'Adventure',
    price: 2699,
    nights: 8,
    image: 'images/adventure.svg',
  },
  { destination: 'Maldives', type: 'Beach', price: 2299, nights: 5, image: 'images/beach.svg' },
  { destination: 'Rishikesh, India', type: 'Adventure', price: 699, nights: 4, image: 'images/adventure.svg' },
  { destination: 'Kyoto, Japan', type: 'Nature', price: 1599, nights: 6, image: 'images/nature.svg' },
];

const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const budgetFilter = document.getElementById('budgetFilter');
const packageGrid = document.getElementById('packageGrid');
const resultsCount = document.getElementById('resultsCount');
const cardTemplate = document.getElementById('cardTemplate');
const authNav = document.getElementById('authNav');
const activeUser = window.voyaraAuth.currentUser();

function setAuthNav() {
  if (activeUser) {
    authNav.innerHTML = `
      <span class="welcome">Hi, ${activeUser.name}</span>
      <button id="logoutBtn" class="nav-btn" type="button">Logout</button>
    `;
    document.getElementById('logoutBtn').addEventListener('click', () => {
      window.voyaraAuth.logout();
      window.location.href = 'login.html';
    });
    return;
  }

  authNav.innerHTML = `
    <a class="nav-btn ghost" href="login.html">Login</a>
    <a class="nav-btn" href="signup.html">Sign Up</a>
  `;
}

function getBudgetBand(price) {
  if (price < 1000) return 'low';
  if (price <= 2000) return 'mid';
  return 'high';
}

function filterTrips() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedType = typeFilter.value;
  const selectedBudget = budgetFilter.value;

  return trips.filter((trip) => {
    const matchesQuery = trip.destination.toLowerCase().includes(query);
    const matchesType = selectedType === 'all' || trip.type === selectedType;
    const matchesBudget = selectedBudget === 'all' || getBudgetBand(trip.price) === selectedBudget;
    return matchesQuery && matchesType && matchesBudget;
  });
}

function renderTrips() {
  const filtered = filterTrips();
  packageGrid.innerHTML = '';

  if (!filtered.length) {
    resultsCount.textContent = '0 packages found';
    const empty = document.createElement('p');
    empty.className = 'no-results';
    empty.textContent = 'No matching packages found. Try changing your filters.';
    packageGrid.appendChild(empty);
    return;
  }

  resultsCount.textContent = `${filtered.length} package${filtered.length > 1 ? 's' : ''} found`;

  filtered.forEach((trip) => {
    const clone = cardTemplate.content.cloneNode(true);
    clone.querySelector('.card-image').src = trip.image;
    clone.querySelector('.card-image').alt = `${trip.destination} preview`;
    clone.querySelector('.card-title').textContent = trip.destination;
    clone.querySelector('.card-meta').textContent = `${trip.type} • ${trip.nights} nights`;
    clone.querySelector('.card-price').textContent = `$${trip.price.toLocaleString()}`;

    const bookBtn = clone.querySelector('.book-btn');
    bookBtn.addEventListener('click', () => {
      if (!activeUser) {
        window.location.href = 'login.html';
        return;
      }
      alert(`Thanks ${activeUser.name}! Your booking request for ${trip.destination} is received.`);
    });

    packageGrid.appendChild(clone);
  });
}

[searchInput, typeFilter, budgetFilter].forEach((control) => {
  control.addEventListener('input', renderTrips);
  control.addEventListener('change', renderTrips);
});

setAuthNav();
renderTrips();

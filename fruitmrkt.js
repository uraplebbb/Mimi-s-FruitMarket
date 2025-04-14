const validSellers = [
    { username: 'seller1', password: 'pass1' },
    { username: 'seller2', password: 'pass2' },
    { username: 'seller3', password: 'pass3' }
  ];
  
  const fruits = [
    { name: "Apple", price: 3 },
    { name: "Banana", price: 1 },
    { name: "Orange", price: 2 },
    { name: "Mango", price: 4 },
    { name: "Grapes", price: 2.5 },
    { name: "Pineapple", price: 5 },
    { name: "Papaya", price: 3.5 },
    { name: "Strawberry", price: 6 },
    { name: "Watermelon", price: 7 },
    { name: "Blueberry", price: 8 }
  ];
  
  // LOGIN FUNCTION (for index.html)
  function login(event) {
    event.preventDefault();
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    const found = validSellers.find(s => s.username === u && s.password === p);
    if (found) {
      sessionStorage.setItem('loggedIn', 'true');
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid username or password.");
    }
  }
  
  // DASHBOARD FUNCTIONS
  if (window.location.pathname.includes("dashboard.html")) {
    if (sessionStorage.getItem('loggedIn') !== 'true') {
      alert("Access denied. Please login first.");
      window.location.href = "index.html";
    } else {
      // Populate fruit list
      const list = document.getElementById('fruit-list');
      fruits.forEach(fruit => {
        const li = document.createElement('li');
        li.textContent = `${fruit.name} - £${fruit.price.toFixed(2)}`;
        list.appendChild(li);
      });
  
      // Build order form
      const formDiv = document.getElementById('order-form');
      fruits.forEach(fruit => {
        const row = document.createElement('div');
        row.innerHTML = `
          <label>${fruit.name} (£${fruit.price}): 
            <input type="number" min="0" value="0" data-price="${fruit.price}">
          </label>`;
        formDiv.appendChild(row);
      });
    }
  }
  
  // FRUIT CHECKER
  function checkFruit() {
    const name = document.getElementById('fruit-check').value.toLowerCase();
    const found = fruits.find(f => f.name.toLowerCase() === name);
    document.getElementById('check-result').textContent = found
      ? `"${found.name}" is Available.`
      : "Not Available.";
  }
  
  // TOTAL PRICE CALCULATOR
  function calculateTotal() {
    const inputs = document.querySelectorAll('#order-form input');
    let total = 0;
    inputs.forEach(input => {
      total += parseInt(input.value || 0) * parseFloat(input.dataset.price);
    });
    document.getElementById('total').textContent = `Total Price: $${total.toFixed(2)}`;
  }
  
  //LOGOUT FUNCTION
  function logout() {
    if (confirm("Are you sure you want to logout?")) {
      sessionStorage.removeItem('loggedIn');
      window.location.href = "index.html";
    }
  }
  
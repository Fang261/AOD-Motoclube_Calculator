let modifications = { 'Chapas': 0 }; // Initialize with Chapas count at 0
let multipliers = []; // Stores all active multipliers

document.addEventListener("DOMContentLoaded", () => {
  const dateElement = document.getElementById("currentDate");
  const today = new Date();
  dateElement.innerText = today.toLocaleDateString(); // Set the current date
});

function updateItem(item, price, change) {
  // Increase or decrease the count of 'Chapas'
  modifications[item] = (modifications[item] || 0) + change;
  if (modifications[item] < 0) modifications[item] = 0; // Prevent negative values

  // Update the display for the current count of 'Chapas'
  document.getElementById(item).innerText = modifications[item];
  
  calculateTotal();
}

function updateCheckboxItem(checkbox, item) {
  // Set item price if checked, remove if unchecked
  if (checkbox.checked) {
    modifications[item] = parseFloat(checkbox.value); 
  } else {
    delete modifications[item]; 
  }
  calculateTotal();
}

function calculateTotal() {
  let baseTotal = 0;

  // Calculate the total for each item in modifications
  for (const [item, qty] of Object.entries(modifications)) {
    if (item === 'Chapas') {
      baseTotal += qty * 5000; // Each Chapas costs 5000
    } else {
      baseTotal += qty; // Other items add their fixed price
    }
  }

  // Apply multipliers
  let finalMultiplier = multipliers.reduce((acc, curr) => acc * curr, 1);
  document.getElementById("totalPrice").innerText = (baseTotal * finalMultiplier).toFixed(2);
}

function updateMultiplier(checkbox) {
  const value = parseFloat(checkbox.value);
  if (checkbox.checked) {
    multipliers.push(value);
  } else {
    multipliers = multipliers.filter(mult => mult !== value);
  }
  calculateTotal();
}

function clearAll() {
  modifications = { 'Chapas': 0 };
  multipliers = [];
  document.querySelectorAll("#modifications .item span").forEach(span => span.innerText = 0);
  document.querySelectorAll("#modifications input[type='checkbox']").forEach(checkbox => checkbox.checked = false);
  document.querySelectorAll("#multipliers input[type='checkbox']").forEach(checkbox => checkbox.checked = false);
  document.getElementById("totalPrice").innerText = 0;
  document.getElementById("motarName").value = '';
}

function saveTotal() {
  const name = document.getElementById("motarName").value;
  const date = document.getElementById("currentDate").innerText;
  const total = document.getElementById("totalPrice").innerText;
  if (name) {
    alert(`Saved: Motar ${name}, Date: ${date}, Total: ${total}`);
  } else {
    alert("Please fill in the Motar name.");
  }
}

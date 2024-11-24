/**
 * Your JS code here
 */

/**
 * Sample code
 */
const form = document.getElementById('inventory-form');
const tableBody = document.querySelector('#inventory-table tbody');

// Load inventory from localStorage or initialize as an empty array
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// Populate the table on page load
if (tableBody) updateTable();
if (typeof updateChart === "function") updateChart(); // Update chart if on Analytics page

form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const brand = document.getElementById('brand').value;
    const color = document.getElementById('color').value;
    const type = document.getElementById('type').value;
    const quantity = parseInt(document.getElementById('quantity').value, 10);

    const shoe = { brand, color, type, quantity };
    inventory.push(shoe);

    // Save to localStorage
    localStorage.setItem('inventory', JSON.stringify(inventory));

    updateTable();
    if (typeof updateChart === "function") updateChart(); // Update chart dynamically if needed

    form.reset();
});

function updateTable() {
    tableBody.innerHTML = '';
    inventory.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.brand}</td>
            <td>${item.color}</td>
            <td>${item.type}</td>
            <td>${item.quantity}</td>
            <td>
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteItem(index) {
    inventory.splice(index, 1);

    // Save to localStorage
    localStorage.setItem('inventory', JSON.stringify(inventory));

    updateTable();
    if (typeof updateChart === "function") updateChart(); // Update chart dynamically if needed
}

function editItem(index) {
    const item = inventory[index];
    document.getElementById('brand').value = item.brand;
    document.getElementById('color').value = item.color;
    document.getElementById('type').value = item.type;
    document.getElementById('quantity').value = item.quantity;

    // Remove item from inventory temporarily
    inventory.splice(index, 1);

    // Save to localStorage
    localStorage.setItem('inventory', JSON.stringify(inventory));

    updateTable();
    if (typeof updateChart === "function") updateChart(); // Update chart dynamically if needed
}


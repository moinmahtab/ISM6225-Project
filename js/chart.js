// Load inventory data from localStorage
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

let inventoryChart; // Global variable for the Chart instance

function initializeChart() {
    const ctx = document.getElementById('inventoryChart').getContext('2d');

    inventoryChart = new Chart(ctx, {
        type: 'bar', // Chart type
        data: {
            labels: [], // Initially empty X-axis labels
            datasets: [
                {
                    label: 'Inventory Count',
                    data: [], // Initially no data points
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                    borderColor: 'rgba(75, 192, 192, 1)', // Bar border color
                    borderWidth: 1, // Border thickness
                },
            ],
        },
        options: {
            responsive: true, // Ensures the chart resizes with the screen
            plugins: {
                legend: {
                    display: true, // Show the legend
                },
            },
            scales: {
                y: {
                    beginAtZero: true, // Start Y-axis from zero
                },
            },
        },
    });
}

function updateChart() {
    // Extract data for the chart
    const brands = inventory.map((item) => item.brand);
    const quantities = inventory.map((item) => item.quantity);

    // Update the chart's data
    inventoryChart.data.labels = brands;
    inventoryChart.data.datasets[0].data = quantities;

    // Refresh the chart
    inventoryChart.update();
}

// Initialize the chart on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    if (inventory.length > 0) {
        updateChart();
    }
});



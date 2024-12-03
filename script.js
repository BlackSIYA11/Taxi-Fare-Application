document.addEventListener("DOMContentLoaded", () => {
    const seatingRows = document.getElementById("seatingRows");

    // Create rows dynamically
    for (let i = 1; i <= 5; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        row.innerHTML = `
            <label>Row ${i}</label>
            <input type="number" id="people${i}" placeholder="No of People" oninput="updateTotals()">
            <input type="number" id="amount${i}" placeholder="Amount Entered" oninput="calculateFareForRow(${i})">
            <button onclick="calculateFareForRow(${i})">Calculate</button>
            <span>Total Fare: <span id="total${i}">0</span></span>
            <span>Change: <span id="change${i}">0</span></span>
        `;
        seatingRows.appendChild(row);
    }
});

let currentRate = 0; // Global variable for the rate per person

// Function to update the rate and recalculate all fares
function updateRate(newRate) {
    currentRate = newRate;
    document.getElementById("rate").value = currentRate; // Update the rate input field
    recalculateAllFares(); // Recalculate total fare and change for all rows
    updateTotals(); // Update the total fare and total amount of people
}

// Function to calculate fare and change for each row
function calculateFareForRow(rowNumber) {
    const people = parseInt(document.getElementById(`people${rowNumber}`).value) || 0; // Get number of people
    const amount = parseFloat(document.getElementById(`amount${rowNumber}`).value) || 0; // Get amount entered

    const totalFare = currentRate * people; // Calculate total fare for the row
    const change = amount - totalFare; // Calculate change

    // Update total fare and change in the DOM for the row
    document.getElementById(`total${rowNumber}`).innerText = `R${totalFare.toFixed(2)}`;
    document.getElementById(`change${rowNumber}`).innerText = `R${change.toFixed(2)}`;
    
    updateTotals(); // Update the total fare and total amount of people after calculation
}

// Function to recalculate all fares across all rows
function recalculateAllFares() {
    for (let i = 1; i <= 5; i++) {
        calculateFareForRow(i); // Recalculate each row's fare
    }
}

// Function to update the total amount of people and total fare
function updateTotals() {
    let grandTotal = 0; // Initialize total fare
    let totalPeople = 0; // Initialize total number of people

    // Loop through each row to calculate the total fare and total people
    for (let i = 1; i <= 5; i++) {
        const people = parseInt(document.getElementById(`people${i}`).value) || 0; // Get number of people
        totalPeople += people; // Add to total number of people
        grandTotal += currentRate * people; // Add the fare for this row to the grand total
    }

    // Update the total amount of people in the info div
    document.querySelector('.info span:nth-child(1)').textContent = `Total Amount of People: ${totalPeople}`;
    
    // Update the total fare in the info div
    document.querySelector('.info span:nth-child(2)').textContent = `Total Fare: R${grandTotal.toFixed(2)}`;
}
function clearInputs() {
    // Clear all input fields
    document.getElementById("rate").value = "";

    for (let i = 1; i <= 5; i++) {
        document.getElementById("people" + i).value = "";
        document.getElementById("amount" + i).value = "";
        document.getElementById("total" + i).textContent = "";
        document.getElementById("change" + i).textContent = "";
    }
}


function calculateFareForRow(rowNum) {
    const totalFareForTrip = 225; // Total fare for 15 people
    const totalPeople = 15; // Total number of people in the taxi
    const ratePerPerson = totalFareForTrip / totalPeople; // Fare per person

    // Use document.querySelector to select inputs and output
    const people = parseInt(document.querySelector(`#people${rowNum}`).value) || 0;
    const amountEntered = parseFloat(document.querySelector(`#amount${rowNum}`).value) || 0;

    // Calculate total fare for the row
    const totalFareForRow = ratePerPerson * people;

    // Calculate the change
    const change = amountEntered - totalFareForRow;

    // Update the output using textContent
    document.querySelector(`#total${rowNum}`).textContent = totalFareForRow.toFixed(2);
    document.querySelector(`#change${rowNum}`).textContent = change.toFixed(2);
}

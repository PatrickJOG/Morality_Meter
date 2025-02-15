document.getElementById('moralityForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let score = 0;

    // Get answers and calculate score
    const answers = {
        fastFashion: document.querySelector('input[name="fastFashion"]:checked').value,
        children: document.querySelector('input[name="children"]:checked').value,
        meatDairy: document.querySelector('input[name="meatDairy"]:checked').value,
        solarFarmland: document.querySelector('input[name="solarFarmland"]:checked').value,
        nuclearEnergy: document.querySelector('input[name="nuclearEnergy"]:checked').value,
        economicDegrowth: document.querySelector('input[name="economicDegrowth"]:checked').value,
        machineRelationships: document.querySelector('input[name="machineRelationships"]:checked').value
    };

    // Example scoring logic (customize as needed)
    if (answers.fastFashion === 'no') score++;
    if (answers.children === 'no') score++;
    if (answers.meatDairy === 'no') score++;
    if (answers.solarFarmland === 'yes') score++;
    if (answers.nuclearEnergy === 'no') score++;
    if (answers.economicDegrowth === 'yes') score++;
    if (answers.machineRelationships === 'no') score++;


    const resultsDiv = document.getElementById('results');
    if (score >= 4) { // Adjust threshold as needed
        resultsDiv.textContent = "You are moral (in the eyes of the future)!";
    } else {
        resultsDiv.textContent = "You are immoral (in the eyes of the future)!";
    }
});
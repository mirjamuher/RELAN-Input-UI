function handleDichtomisationSelection(dichtValue) {
    // Step 1: check if dichtomisation is set to "0"
    if (dichtValue !== "0") {
        return
    }

    // Step 2: check that number of variables isn't 0 or null
    let numOfVars = document.getElementById('numOfVars').value;
    if (numOfVars === null || numOfVars === 0) {
        return;
    }

    // Step 3: Set vector of dichtomisation value to numOfVars times 0.5
    let vecOfDicht = document.getElementById('vectorOfDichotomisation');
    vecOfDicht.value = "0.5 ".repeat(numOfVars);
}

function handleNumOfVariablesChange(numOfVars) {
    // Step 1: check if dichtomisation is set to "0"
    let dichtomisation = document.getElementById('dichtomisation');
    if (dichtomisation.value !== "0") {
        return;
    }

    // Step 2: check that number of variables isn't 0 or null
    if (numOfVars === null || numOfVars === 0) {
        return;
    }

    // Step 3: Set vector of dichtomisation value to numOfVars times 0.5
    let vecOfDicht = document.getElementById('vectorOfDichotomisation');
    vecOfDicht.value = "0.5 ".repeat(numOfVars);
}

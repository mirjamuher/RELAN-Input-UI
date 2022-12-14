function handleOptionSelection(optionValue) {
    // have everything reappear & restore value to be empty
    document.querySelectorAll('.hidden').forEach(el => {
        var input = el.querySelector('input');
        if (input != null) {
            input.value = ''
        }

        var select = el.querySelector('select');
        if (select != null) {
            select.value = ''
        }
        el.classList.remove('hidden');
    })

    // hide unnecessary parameters from user
    // CONNECTIONS
    if (optionValue === '0') {
        document.getElementById('simParameterDiv').classList.add('hidden');
        document.getElementById('extractParamDiv').classList.add('hidden');
        document.getElementById('extractionModelDiv').classList.add('hidden');
        document.getElementById('hypoFuncDiv').classList.add('hidden');
        document.getElementById('extraFuncDiv').classList.add('hidden');

        // Connection-specific selection logic
        document.getElementById('inclusionCriteria').value = 1;
    }
    // IMPLICATION
    else if (optionValue === '1') {
        document.getElementById('simParameterDiv').classList.add('hidden');
        document.getElementById('extractParamDiv').classList.add('hidden');
        document.getElementById('extractionModelDiv').classList.add('hidden');
        document.getElementById('hypoFuncDiv').classList.add('hidden');
        document.getElementById('extraFuncDiv').classList.add('hidden');

        // Implication-specific selection logic
        document.getElementById('inclusionCriteria').value = 0;
        document.getElementById('truthFunc').value = 0;
    }
    // CONFIRMATION
    else if (optionValue === '2') {
        document.getElementById('simParameterDiv').classList.add('hidden');
        document.getElementById('inclusionCriteriaDiv').classList.add('hidden');
        document.getElementById('yCutDiv').classList.add('hidden');
        document.getElementById('xCutDiv').classList.add('hidden');
        document.getElementById('graphAnalysisDiv').classList.add('hidden');
    }
    // SIMULATION
    else if (optionValue === '3') {
        document.getElementById('dataInputDiv').classList.add('hidden');
        document.getElementById('dichtomisationDiv').classList.add('hidden');
        document.getElementById('vectorOfDichtomisationDiv').classList.add('hidden');
        document.getElementById('inclusionCriteriaDiv').classList.add('hidden');
        document.getElementById('yCutDiv').classList.add('hidden');
        document.getElementById('xCutDiv').classList.add('hidden');
        document.getElementById('graphAnalysisDiv').classList.add('hidden');

        // simulation-specific selection logic
        document.getElementById('truthFunc').value = 0;
    } 
    else {
        console.error(`Error: invalid option value selected: ${optionValue}`);
        alert("Unknown error occurred. Please restart program. Contact Dr. Maderthaner if problem persists");
    }

    // set value of all hidden elements
    document.querySelectorAll('.hidden').forEach(el => {
        var input = el.querySelector('input');
        if (input != null) {
            // special Hypothetical Function & Extraction Function logic
            if (el.id === "hypoFuncDiv" || el.id === "extraFuncDiv") {
                input.value = 'A + B';
            } 
            
            else {
                input.value = '0';
            }
        }

        var select = el.querySelector('select');
        if (select != null) {
            select.value = '0'
        }

    })
}

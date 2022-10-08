// Read in RELAN-IN.txt values
function handleFileInput(files){
    let file = files[0];
    let reader = new FileReader();

    reader.readAsText(file);
    reader.onerror = function() {
        alert('Upload failed.\nPlease ensure you selected "RELAN-IN.txt" and try again.')
        return;
    }

    reader.onload = function() {
        //console.log(reader.result);
        var result = reader.result.trim();
        var resultList = result.split('\n');
        var chosenOption = 0;
        var cleanedValuesList = [];

        // loop through input file and put values into list
        var i = 0;
        for (var line of resultList) {
            line = line.trim();
            if (line === "") {
                continue;
            }
            // The third line holds the Option, which determins what form-elements are to be used
            if (i === 2) {
                chosenOption = line;
            }
            // if line is odd, it should contain a value which we want to save
            if (i%2 !== 0) {
                cleanedValuesList.push(line);
            }
            // increment counter
            i += 1;
        }   

        // get all input Elements from the form
        const inputElements = Array.from(document.getElementById('ipcForm').querySelectorAll('input:not([data-non-RELAN-input-field="true"]), select:not([data-non-RELAN-input-field="true"])'));

        // loop through read-in values ('iValue') and inputElements ('iInput') seperately to account for lines holding values for multiple input elements ('valueList')
        let iInput = 0, iValue = 0;
        const assignments = [];  // store pairs of values & InputElement
        while (iValue < cleanedValuesList.length && iInput < inputElements.length) {
            const value = cleanedValuesList[iValue];
            const inputEl = inputElements[iInput];
            if (inputEl.dataset['beginMultivaluedLine'] === 'true') {
                // if we come to an input element marking a line that takes multiple value/inputElement pairs, we step through some painful logic
                const valueList = value.split(/\s+/);
                assignments.push([inputEl, valueList.shift()]);
                iInput += 1; // move to next inputElement but stay in same value entry
                while (true) {
                    const inputEl = inputElements[iInput];
                    if (inputEl.dataset["appendToPrior"] === "true") {
                        // inputElement is marked with being in same line as prior inputElement
                        if (valueList.length === 0) {
                            console.error(`Error: Expected value is missing. We were at input element ${inputEl.innerHTML}.`);
                            alert('Parsing of document failed.\nPlease ensure you selected "RELAN-IN.txt" and try again.');
                            return;
                        } else {
                            assignments.push([inputEl, valueList.shift()]);
                            iInput += 1;
                        }
                    } else {
                        // inputElement is on a new line
                        if (valueList.length === 0) {
                            // This is the expected case where we've assigned out all of the multivalued line bits correctly.
                            // Move on to the next input line.
                            iValue += 1;
                            break;
                        } else {
                            console.error(`Error: Failed to assign all of the values on this line. Remaining is ${valueList}.`);
                            alert('Parsing of document failed.\nPlease ensure you selected "RELAN-IN.txt" and try again.');
                            return;
                        }
                    }
                }
            } else {
                // Propose assigning the current value to the current input element.
                assignments.push([inputEl, value]);
                iInput += 1;
                iValue += 1;
            }
        }
        // If we exited the above loop without getting to the end of either of the two lists, something went wrong.
        if (!(iInput === inputElements.length && iValue === cleanedValuesList.length)) {
            console.error(`Error: The input file looks to be missing some lines. Not enough values found. ${iInput} != ${inputElements.length} || ${iValue} != ${cleanedValuesList.length}`);
            alert('Parsing of document failed.\nPlease ensure you selected "RELAN-IN.txt" and try again.');
            return;
        }

        // Actually do the assignments now that we know we have enough data to populate each of the input elements.
        for (const [inputEl, value] of assignments) {
            inputEl.value = value;
        }

        // Trigger change event on the select to hide unused fields
        option.dispatchEvent(new Event('change'));
    }
};

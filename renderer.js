// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

document.addEventListener('DOMContentLoaded', (event) => {
    // Whenever a different option is selected, certain parameters are hidden
    const option = document.getElementById('option');

    option.addEventListener('change', function handleOptionSelection(event) {
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
        if (event.target.value === '0') {
            console.log(event)
            document.getElementById('simParameterDiv').classList.add('hidden');
            document.getElementById('extractParamDiv').classList.add('hidden');
            document.getElementById('extractionModelDiv').classList.add('hidden');
            document.getElementById('inclusionCriteriaDiv').classList.add('hidden');
            document.getElementById('yCutDiv').classList.add('hidden');
            document.getElementById('xCutDiv').classList.add('hidden');
            document.getElementById('graphAnalysisDiv').classList.add('hidden');
            document.getElementById('truthFuncDiv').classList.add('hidden');
            document.getElementById('hypoFuncDiv').classList.add('hidden');
            document.getElementById('extraFuncDiv').classList.add('hidden');
        }
        // IMPLICATION
        else if (event.target.value === '1') {
            console.log(event)
            document.getElementById('simParameterDiv').classList.add('hidden');
            document.getElementById('extractParamDiv').classList.add('hidden');
            document.getElementById('extractionModelDiv').classList.add('hidden');
            document.getElementById('inclusionCriteriaDiv').classList.add('hidden');
            document.getElementById('yCutDiv').classList.add('hidden');
            document.getElementById('xCutDiv').classList.add('hidden');
            document.getElementById('truthFuncDiv').classList.add('hidden');
            document.getElementById('hypoFuncDiv').classList.add('hidden');
            document.getElementById('extraFuncDiv').classList.add('hidden');
        }
        // CONFIRMATION
        else if (event.target.value === '2') {
            console.log(event)
            document.getElementById('simParameterDiv').classList.add('hidden');
            document.getElementById('inclusionCriteriaDiv').classList.add('hidden');
            document.getElementById('yCutDiv').classList.add('hidden');
            document.getElementById('xCutDiv').classList.add('hidden');
            document.getElementById('graphAnalysisDiv').classList.add('hidden');
        }
        // SIMULATION
        else if (event.target.value === '3') {
            console.log(event)
            document.getElementById('dataInputDiv').classList.add('hidden');
            document.getElementById('dataFormatDiv').classList.add('hidden');
            document.getElementById('dichtomisationDiv').classList.add('hidden');
            document.getElementById('vectorOfDichtomisationDiv').classList.add('hidden');
            document.getElementById('inclusionCriteriaDiv').classList.add('hidden');
            document.getElementById('yCutDiv').classList.add('hidden');
            document.getElementById('xCutDiv').classList.add('hidden');
            document.getElementById('graphAnalysisDiv').classList.add('hidden');
        }

        //set value of all hidden elements to '0'
        document.querySelectorAll('.hidden').forEach(el => {
            var input = el.querySelector('input');
            if (input != null) {
                input.value = '0'
            }

            var select = el.querySelector('select');
            if (select != null) {
                select.value = '0'
            }
        })

        // WIP: have button do a validation check while we still have access to the elements, before moving to the submit event with just formData
        // have button validate fields before triggering submit event
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.addEventListener('click', event => {
            alert("BTN WAS CLICKED");
            // do validation here

            // if validation passes, submit form
            document.getElementById('ipcForm').dispatchEvent(new CustomEvent('submit'));
        })
    })

    // Read in RELAN-IN.txt values
    document.getElementById('fileReader').addEventListener('change', event => {
        let file = event.target.files[0];
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
            var cleanedResultList = [];

            // get all input Elements from the form
            const inputElements = Array.from(document.getElementById('ipcForm').querySelectorAll('input:not([data-non-RELAN-input-field="true"]), select:not([data-non-RELAN-input-field="true"])'));
            
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
                    cleanedResultList.push(line);
                }

                // increment counter
                i += 1;
            }   

            console.log(cleanedResultList);

            // test if length of cleanedResultList === length of inputElements. If not, it means the read-in .txt file was invalid and we have to reject it.
            if (cleanedResultList.length !== inputElements.length) {
                alert('Selected file content could not be parsed.\nPlease ensure you selected "RELAN-IN.txt" and try again.')
                return;
            }

            alert("EVERYTHING WENT GREAT; GOOD JOB")
        }
    });

    // Get FormData and save it to RELAN-IN.txt
    document.getElementById('ipcForm').addEventListener('submit', event => {
        event.preventDefault();
        console.log(event); // todo: remove

        const fd = new FormData(event.target);
        const data = [];
        for (const [key, value] of fd) {
            console.log(`${key} => ${value}`);
            
            // TODO: ENABLE FOR PRODUCTION
            // // Step 1: VALIDATION
            // if (value === "") {
            //     alert("VALUE EMPTY NONO");
            //     return false;
            // }

            // Step  2: VALUE EXTRACTION
            const el = event.target.querySelector(`[name="${key}"]`)
            if (el.dataset['appendToPrior'] === 'true') {
                // some of the keys and values are grouped in the output
                data[data.length - 2] += ' / ' + key;
                data[data.length - 1] += '\t' + value;
            } else {
                data.push(key);
                data.push(value);
            }
        }

        // Step 3: SAVE FILE
        var blob = new Blob([data.join('\n') + '\n'], {type: "text/plain"});
        var url = window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "RELAN-IN.txt";

        anchor.click();
        window.URL.revokeObjectURL(url);
        document.removeChild(anchor);

        return false;
    })
});

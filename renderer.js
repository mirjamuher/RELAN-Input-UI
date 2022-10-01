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
        // have everything reappear 
        document.querySelectorAll('.hidden').forEach(el => {
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

        // TODO: set value of all hidden elements to '0'
        // document.querySelectorAll('.hidden').forEach(el => {
        //     var input = el.querySelector('input');
        //     if (input != null) {
        //         input.value = '0'
        //     } else {
        //         el.querySelector('')
        //     }
        //     console.log(el);
        // })
    })

    document.getElementById('ipcForm').addEventListener('submit', event => {
        event.preventDefault(); // stop form from submitting
        console.log(event);

        // Step 1: VALIDATION
        //todo

        // Step  2: extract value
        const fd = new FormData(event.target);
        const data = [];
        for (const [key, value] of fd) {
            console.log(`${key} => ${value}`);

            var cleanedValue = value;
            if (value === "" || value === "Choose one of the following") {
                cleanedValue = '0';
            };

            // some of the values have to be grouped in the output; that is achieved here
            const el = event.target.querySelector(`[name="${key}"]`)
            if (el.dataset['appendToPrior'] === 'true') {
                data[data.length - 2] += ' / ' + key;
                data[data.length - 1] += '\t' + cleanedValue;
            } else {
                data.push(key);
                data.push(cleanedValue);
            }
        }

        // Step 3: save file 
        var blob = new Blob([data.join('\n') + '\n'], {type: "text/plain"});
        var url = window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "demo.txt";

        anchor.click();
        window.URL.revokeObjectURL(url);
        document.removeChild(anchor);

        return false;
    })
});

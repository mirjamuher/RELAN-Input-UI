// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

document.addEventListener('DOMContentLoaded', (event) => {
    // Read in RELAN-IN.txt values
    document.getElementById('fileReader').addEventListener('change', event => {
        handleFileInput(event.target.files);
    });

    // Whenever a different option is selected, certain parameters are hidden
    document.getElementById('option').addEventListener('change', event => {
        handleOptionSelection(event.target.value);
    });

    // WIP: have button do a validation check while we still have access to the elements, before moving to the submit event with just formData
    // have button validate fields before triggering submit event
    // const submitBtn = document.getElementById('saveBtn');
    // submitBtn.addEventListener('click', event => {
    //     alert("BTN WAS CLICKED");
    //     // do validation here

    //     // if validation passes, submit form
    //     document.getElementById('ipcForm').dispatchEvent(new CustomEvent('submit'));
    // })

    // Get FormData and save it to RELAN-IN.txt
    document.getElementById('ipcForm').addEventListener('submit', event => {
        // Step 1: Prevent form from submitting
        event.preventDefault();

        // Step 2: check if free version is used. If so, amend validation
        const form = event.target;
        const freeVersion = document.getElementById('freeVersion').checked
        if (freeVersion) {
            isLicensedMattersEl = document.querySelectorAll('[data-free-version-max]');
            for (el of isLicensedMattersEl) {
                const max = el.dataset.freeVersionMax
                el.setAttribute("max", max);
            }
        }

        // Step 3: Check form validity and give user feedback
        if (!form.checkValidity()) {
            // let reported = false;
            // for (input of form.querySelectorAll('input, select')) {
            //     console.log("input is ", input)
            //     if (!input.checkValidity()) {
            //         input.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
            //         input.reportValidity();
            //         reported = true;
            //         break;
            //     }
            // }
            // if (!reported) {
            //     form.reportValidity();
            // }
            form.classList.add('was-validated');
            return;
        }

        const fd = new FormData(form);
        saveFormDataToFile(form, fd);
    })
});

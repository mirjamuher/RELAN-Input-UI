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
    const submitBtn = document.getElementById('saveBtn');
    submitBtn.addEventListener('click', event => {
        alert("BTN WAS CLICKED");
        // do validation here

        // if validation passes, submit form
        document.getElementById('ipcForm').dispatchEvent(new CustomEvent('submit'));
    })

    // Get FormData and save it to RELAN-IN.txt
    document.getElementById('ipcForm').addEventListener('submit', event => {
        event.preventDefault();
        const form = event.target;
        const fd = new FormData(form);
        saveFormDataToFile(form, fd);
    })
});

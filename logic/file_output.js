function saveFormDataToFile(form, formData) {
    const fd = formData;
    const data = [];
    for (const [key, value] of fd) {
        //console.log(`${key} => ${value}`);

        // Step  1: VALUE EXTRACTION
        const el = form.querySelector(`[name="${key}"]`)
        if (el.dataset['nonRelanInputField'] === 'true') {
            // fields we do not want to add to the output
            continue;
        } else if (el.dataset['appendToPrior'] === 'true') {
            // some of the keys and values are grouped in the output
            data[data.length - 2] += ' / ' + key;
            data[data.length - 1] += '\t' + value;
        } else {
            data.push(key);
            data.push(value);
        }
    }

    // Step 2: SAVE FILE
    var blob = new Blob([data.join('\n') + '\n'], {type: "text/plain"});
    var url = window.URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "RELAN-IN.txt";

    anchor.click();
    window.URL.revokeObjectURL(url);
    // document.removeChild(anchor); does not seem to work?

    return false;
}

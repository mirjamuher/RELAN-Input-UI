function saveFormDataToFile(formData) {
    const fd = formData;
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
    // document.removeChild(anchor); does not seem to work?

    return false;
}

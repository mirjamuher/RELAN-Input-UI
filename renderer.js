// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

$(document).ready(function(){
    // jQuery methods go here
    //$("#option").prop('disabled', true);

    // 1. depending on which Option is selected, certain parameters are disabled
    $('#option').on('change', function() {
        if ($('#option').val() === "0") {
           alert("CONNECTIONS") 
        } 

        else if ($('#option').val() === "1") {
            alert("IMPLICATIONS") 
        } 

        else if ($('#option').val() === "2") {
            alert("CONFIRMATION") 
            // level of simulation, inclusion criterion, graph theoretical analysis
            $('#simParameter').prop('disabled', true);
            $('#inclusionCriteria').prop('disabled', true);
            $('#graphAnalysis').prop('disabled', true);
            // todo: have text under field update to say "disabled for option CONFIRMATION" or something
        } 

        else if ($('#option').val() === "3") {
            alert("SIMULATION") 
        } 
    })
});

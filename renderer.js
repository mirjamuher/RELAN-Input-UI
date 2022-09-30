// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

$(document).ready(function(){
    // jQuery methods go here
    //$("#option").prop('disabled', true);

    // Whenever a different option is selected, certain parameters are hidden
    $('#option').on('change', function() {
        // have everything reappear upon change of option
        $('div:hidden').each(function() {
            $(this).show();
        })
        
        // hide unnecessary parameters from user
        // CONNECTIONS
        if ($('#option').val() === "0") {
           $('#simParameterDiv').hide();
           $('#extractParamDiv').hide();
           $('#extractionModelDiv').hide();
           $('#inclusionCriteriaDiv').hide();
           $('#yCutDiv').hide();
           $('#xCutDiv').hide();
           $('#graphAnalysisDiv').hide();
           $('#truthFuncDiv').hide();
           $('#hypoFuncDiv').hide();
           $('#extraFuncDiv').hide();
        } 

        // IMPLICATIONS
        else if ($('#option').val() === "1") {
            $('#simParameterDiv').hide();
            $('#extractParamDiv').hide();
            $('#extractionModelDiv').hide();
            $('#inclusionCriteriaDiv').hide();
            $('#yCutDiv').hide();
            $('#xCutDiv').hide();
            $('#truthFuncDiv').hide();
            $('#hypoFuncDiv').hide();
            $('#extraFuncDiv').hide();
        } 

        // CONFIRMATION
        else if ($('#option').val() === "2") {
            // level of simulation, inclusion criterion, graph theoretical analysis
            $('#simParameterDiv').hide();
            $('#inclusionCriteriaDiv').hide();
            $('#yCutDiv').hide();
            $('#xCutDiv').hide();
            $('#graphAnalysisDiv').hide();
        }

        // SIMULATION
        else if ($('#option').val() === "3") {
            alert("SIMULATION") 
            $('#dataInputDiv').hide();
            $('#dataFormatDiv').hide();
            $('#dichtomisationDiv').hide();
            $('#vectorOfDichtomisationDiv').hide();
            $('#inclusionCriteriaDiv').hide();
            $('#yCutDiv').hide();
            $('#xCutDiv').hide();
            $('#graphAnalysisDiv').hide();
        } 
    })
});

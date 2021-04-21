
// Global variable to assist with functions when needed
var meta;

// Use the D3 library to read in data.json
d3.json("samples.json").then((data) => {

    // Add names to dropdown menu
    // Select the HTML 
    var dropDown = d3.select("#selDataset");

    // Get the names from the JSON to append to dropdown
    var names = data.names;

    // Append each name to the HTML dropdown
    names.forEach(name => {
        var option = dropDown.append("option")
        var selected = option.text(name);
    });
    
    meta = data.metadata;

    // Build function for initial page view
    function init(){
        buildDemoBox("940");
        buildPlots("940");
    }

    init();
});


function buildPlots(sample) {
    d3.json("samples.json").then((data) => {
    // Get samples data needed to build bar chart
        var sampleData = data.samples;

        var sampleResult = sampleData.filter(samp => samp.id === sample);

        var barSampleValues = sampleResult[0].sample_values.slice(0,10);

        var bubSampleValues = sampleResult[0].sample_values;

        var otuIdsBar = sampleResult[0].otu_ids.map(id => "OTU " + id).slice(0,10);
        
        var otuIdsBub = sampleResult[0].otu_ids;

        var otuLabelsBar = sampleResult[0].otu_labels.slice(0,10);

        var otuLabelsBub = sampleResult[0].otu_labels

        // Build bar chart
        barData = [{
            x: barSampleValues.reverse(),
            y: otuIdsBar.reverse(),
            text: otuLabelsBar.reverse(),
            type: "bar",
            orientation: "h"
        }];

        barLayout = {
            title: "Top 10 OTUs Found in Subject's Navel"
            
        }

        Plotly.newPlot("bar", barData, barLayout);

        bubbleData = [{
            x: otuIdsBub,
            y: bubSampleValues,
            mode: "markers",
            text: otuLabelsBub,
            marker: {
                size: bubSampleValues,
                color: otuIdsBub,
                colorscale: "Blackbody",
                type: "heatmap"
            }
        }]

        bubbleLayout = {
            title: "All OTUs Found in Subject's Navel",
            xaxis:{
                title: "OTU ID"
            }
        }

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    
    })

};

buildPlots();

function buildDemoBox(sample){

    // Select Demo box HTML
    var demoBox = d3.select("#sample-metadata")
    console.log(meta);
    //var samples = data.samples;
    var demoResult = meta.filter(m => m.id === +sample);        

    // Append metadata to the Demo Box
    demoBox.text("");
    Object.entries(demoResult[0]).forEach(([key, value]) => {
        demoBox.append("p").text(`${key}: ${value}`);
        
    })
}
     
function optionChanged(sample) {
    d3.select("#sample-metadata").html("");
    buildDemoBox(sample);
    buildPlots(sample);
}

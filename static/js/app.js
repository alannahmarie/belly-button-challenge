// Use the D3 library to read in data.json
// Add names to dropdown menu

d3.json("samples.json").then((data) => {

// Select the HTML 
    var dropDown = d3.select("#selDataset");

// Get the names from the JSON to append to dropdown
    var names = data.names;

// Append each name to the HTML dropdown
    names.forEach(name => {
        var option = dropDown.append("option")
        var selected = option.text(name);
    });

    var dropValue = +dropDown.property("value");
    console.log(dropValue);

    function buildDemoBox(sample){
        // Get metadata from the JSON to build Demographic Info box
        var metaData = data.metadata;

        // Select Demo box HTML
        var demoBox = d3.select("#sample-metadata")
        console.log(metaData[0].id)
        //var samples = data.samples;
        var demoResult = metaData.filter(meta => meta.id === dropValue)[0];        
        console.log(demoResult);

         // Append metadata to the Demo Box
        demoBox.text("");
        Object.entries(demoResult).forEach(([key, value]) => {
            console.log(`Key: ${key}, Value: ${value}`);
            demoBox.append("p").text(`${key}: ${value}`);
            
        })
    }
    buildDemoBox();


    function buildPlots(sample) {
        // Get samples data needed to build bar chart
        var sampleData = data.samples;

        var sampleResult = sampleData.filter(samp => +samp.id === dropValue)[0];
        console.log(sampleResult);

        var barSampleValues = sampleResult.sample_values.slice(0,10);

        var bubSampleValues = sampleResult.sample_values;

        var otuIdsBar = sampleResult.otu_ids.map(id => "OTU " + id).slice(0,10);
        
        var otuIdsBub = sampleResult.otu_ids;

        var otuLabelsBar = sampleResult.otu_labels.slice(0,10);

        var otuLabelsBub = sampleResult.otu_labels

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

    }

    buildPlots();
});

function optionChanged(changeSample){
    buildDemoBox(changeSample);
    buildPlots(changeSample);
}

optionChanged();

        

// Use the D3 library to read in data.json
d3.json("samples.json").then((data) => {

    // Add names to dropdown menu

    // Select the HTML 
    var dropDown = d3.select("#selDataset");

    // Get the names from the JSON to append to dropdown
    var names = data.names;

    // Append each name to the HTML dropdown
    names.forEach(name => {
        var option = dropDown.append("option");
        var selected = option.text(name);
    });












    

    // var dropValue = d3.select(this)
    // console.log(dropValue)

    // // Get metadata from the JSON to build Demographic Info box
    // var metaData = data.metadata;

    // // Select Demo box HTML
    // var demoBox = d3.select("#sample-metadata")
    

    // // Append metadata to the Demo Box
    // metaData.forEach(dataSet, index  => {
    //     if (dataSet.id === dropValue) {
    //         demoBox.append("p");

      //  }

    //});
    

    // Add info to the Demographic Info box
    
    // Select Demograghic Info box 
    /*** ADD THIS BACK AFTER PLOTS

    // var demoBox = d3.select("#sample-metadata")
    // console.log(demoBox);

    // var metaData = data.metadata;
    // console.log(metaData);

    // function createDemoBox(){
    //   //  demoBox.append("ul")
    //     Object.entries(metaData[0]).forEach(([key, value]) => {
    //         console.log(`Key: ${key} Value: ${value}`)
    //         demoBox.append("p").text(`${key}: ${value}`)  
    //     });

    // }
    
    // createDemoBox(metaData);

    // Incorporating the unpack function for building the plots
    /** 
    * @param {array} rows
    * @param {integer} index
    * index 0 - id
    * index 1 - ethnicity
    * index 2 - gender
    * index 3 - age
    * index 4 - location
    * index 5 - bbtype
    * index 6 - wrefq
    */

   function unpack(rows, index) {
    return rows.map(function(row) {
        return row[index];
    });
}



    // Create a function called option changed








    // Build table 
    // function updatePlotly() {
    //     // Use D3 to select the dropdown menu
    //     var dropdownMenu = d3.select("#selDataset");
    //     // Assign the value of the dropdown menu option to a variable
    //     var dataset = dropdownMenu.property("value");
      
    //     // Initialize x and y arrays
    //     var x = [];
    //     var y = [];
      
    //     if (dataset === 'dataset1') {
    //       x = [1, 2, 3, 4, 5];
    //       y = [1, 2, 4, 8, 16];
    //     }
      
    //     else if (dataset === 'dataset2') {
    //       x = [10, 20, 30, 40, 50];
    //       y = [1, 10, 100, 1000, 10000];
    //     }
      
    //     // Note the extra brackets around 'x' and 'y'
    //     Plotly.restyle("plot", "x", [x]);
    //     Plotly.restyle("plot", "y", [y]);
    //   }


    function optionChanged(){
        buildPlot(sample);
        createDemoBox(sample);
        }

});
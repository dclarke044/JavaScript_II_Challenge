//Javascript Plotly Homework

// Read in samples json file using D3
// d3.json("/samples.json").then(function(sample) {
//     var data = sample;
//     console.log(data);
// });

// Filter data through drop down menu
function init() {
  d3.json("/samples.json").then(function(sample) {
    var data = sample;
    console.log(data);
  // Pull the names of the samples
    var subjects = data.names;
  // Select drop down menu using div id 
    var dropDown = d3.select("#selDataset");
    console.log(subjects);
    subjects.forEach(Sub => dropDown.append("option").text(Sub));

    var firstdrop = subjects[0];
    buildCharts(firstdrop);
    getMetadata(firstdrop);
// Build the charts!
    function buildCharts(dropVal) {
  // Pull the sample information we will chart  
    var sampleData = data.samples[dropVal];
    console.log(sampleData)
    // Pull the first ten records of sample values and corresponding labels
    var sample_values = sampleData.sample_values.slice(0, 10);
    var bac_id = sampleData.otu_ids.slice(0, 10).map(id => "OTU " + id.toString());
    var labels = sampleData.otu_labels.slice(0, 10);

    // Plot bar chart with layout
    var chart1 = [{
      x: bac_id,
      y: sample_values,
      text: labels,
      type: "bar",
      orientation: "h"
      }];

    //Create bubble chart data using bar chart data
    Plotly.newPlot("bar", chart1);
    var chart2 = [{
      x: labels,
      y: sample_values,
      text: labels,
      mode: 'markers',
      marker:{
        size: sample_values,
        color: bac_id,
      }        
    }];
    //Create variable to hold chart layout
    var bubble_layout = {
      title: "Top Ten Cultures for Subject",
      showlegend: false,
      height: 800,
      width: 800,
    };
    // Display on site using div tag
    Plotly.newPlot("bubble", chartData, bubble_layout);
    }; 

  // Pull sample metadata
  function getMetadata(sample) {
    var demo = data.metadata;
    console.log(demo);
    var demoInfo = d3.select("#sample-metadata");
    console.log(demoInfo)
    Object.defineProperties(demo).forEach(function(key, value){
    demoInfo.append("p").text('$[key]:$[value]')
      });
    };

  // create map to index sample names
    var map = {};
    for (let i = 0; i < data.names.length; i++) {
      map[data.names[i]] - i;
    };
  // Use map to pull the sample name selected in drop down menu
    var dropID =  dropDown.property("value");
    var dropVal = map[dropID];
    return dropVal
  
    
  });
 
};

init()
// want default sample to be 943

// need to build function to update data
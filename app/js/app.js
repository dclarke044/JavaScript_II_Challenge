//Javascript Plotly Homework

// Read in samples json file using D3
d3.json("/samples.json").then(function (data) {
  var data = data;
  console.log(data);

  // Pull the names of the samples
  var subjects = data.names;
  // Select drop down menu using div id 
  var dropDown = d3.select("#selDataset");
  console.log(subjects);
  subjects.forEach(Sub => dropDown.append("option").text(Sub));
  var sub_id = dropDown.property("selectedIndex");

  init()

  // Filter data through drop down menu
  function init() {
    buildCharts(data, 0);
    getMetadata(data, 0);
  };

  // Build the charts!
  function buildCharts(data, sub_id) {
    // Pull the sample information we will chart  
    var sampleData = data.samples[sub_id];
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
      marker: {
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
    Plotly.newPlot("bubble", chart2, bubble_layout);
  };
 
  // Pull sample metadata
  function getMetadata(data, sub_id) {
    document.getElementById("sample-metadata").innerHTML = "";
    var demo = data.metadata[sub_id];
    console.log(demo);
    var demoInfo = d3.select("#sample-metadata");
    console.log(demoInfo)
    Object.entries(demo).forEach(function (key, value) {
      demoInfo.append("p").text(`${key}:${value}`)
    });
  };
});

d3.selectAll("#selDataset").on("change", optionChanged);
function optionChanged() {
  var dropDown = d3.select("#selDataset");
  var sub_id = dropDown.property("selectedIndex");
  buildCharts(data, sub_id);
  getMetadata(data, sub_id);
};


// // Get Data for All State's Renewable Energy Use
var StateUrl = `/api/v1.0/state_energy`;

d3.json(StateUrl).then(function (data) {
  
  console.log(data);
  // Delete id field in State Data
  delete data[0]._id;

  buildStateSunburstPlot(data);

  // Create List of All States
  var allStateData = data[0];
  var allStates = Object.keys(allStateData);

  // Call function to populate dropdownlist with years in data set
  PopulateDropDownStates(allStates);   

  // Send State Data to State Bar
  buildStateBar();

  // console.log(allStates);
});

function buildStateSunburstPlot(data) {

  console.log(data);

  // delete data[0]._id;

  console.log(data[0]);

  var consumption_data = data[0];

  var consumption_entries = Object.entries(consumption_data);

  console.log(consumption_entries);

  var commonSource = []

  consumption_entries.forEach(function(state){
      
      console.log(state);

      console.log(state[1]);
      var sourceStates = state[1];
      console.log(sourceStates);
      var maxSource = Object.keys(sourceStates).reduce((a, b) => sourceStates[a] > sourceStates[b] ? a : b);
      console.log(`${state[0]}: ${maxSource}`);
      var new_result = {};
      new_result[`${state[0]}`] = maxSource
      new_result['BTU'] = sourceStates[`${maxSource}`]
      commonSource.push(new_result);
    });
  
  console.log(commonSource);
  
  // var traces = []

  var labels = []
  var parents = []
  var values = []
  labels.push("Renewable Sources");

  var bioTotal = 0;
  var hydroTotal = 0;
  var geoTotal = 0;
  var solarTotal = 0;
  var windTotal = 0;
  var woodTotal= 0;

  commonSource.forEach(function(result) {
    if (Object.values(result)[0] === 'Biomass') {
      bioTotal += Object.values(result)[1];
    }
    else if (Object.values(result)[0] === 'Hydro') {
      hydroTotal += Object.values(result)[1];
    }
    else if (Object.values(result)[0] === 'Geothermal') {
      geoTotal += Object.values(result)[1];
    }
    else if (Object.values(result)[0] === 'Solar') {
      solarTotal += Object.values(result)[1];
    }
    else if (Object.values(result)[0] === 'Wood/Waste') {
      woodTotal += Object.values(result)[1];
    }
    else {
      windTotal += Object.values(result)[1];
    }
  })
  
  commonSource.forEach(function (result){
    if (labels.includes(Object.values(result)[0])) {
      
    }
    else {
      labels.push(Object.values(result)[0]);
    }
  });

  parents.push("", "Renewable Sources", "Renewable Sources", "Renewable Sources", "Renewable Sources");
  values.push("", hydroTotal, bioTotal, solarTotal, windTotal);

  commonSource.forEach(function(result) {
        
    labels.push(Object.keys(result)[0]);
    parents.push(Object.values(result)[0]);
    values.push(Object.values(result)[1]);
      
  });
  
  console.log(labels, parents, values)
  
  var data = [
    {
      "type": "sunburst",
      "labels": labels,
      "parents": parents,
      "values":  values,
      "leaf": {"opacity": 0.4},
      "marker": {"line": {"width": 2}},
      "branchvalues": 'total',
      "insidetextorientation": "horizontal"
    }];  
  var layout = {
    "margin": {"l": 0, "r": 0, "b": 0, "t": 30},
    "title": "Most Used Renewable Energy Source by State"
  };

  Plotly.newPlot('totalStateplot', data, layout, {showSendToCloud: true})
  
};

// Populate Dropdown with List of States
function PopulateDropDownStates(statesDropDown) {

// Create variable containing the selected id 
var ddlIDs = document.getElementById("selStateEnergy");

// ddlIDs.options.length = 0;

console.log(statesDropDown);

// Loop through and add each year to the DropDownList
statesDropDown.forEach((state) => {
    // Create an option tag
  var option = document.createElement("OPTION");
  // Set subject ID in text property
  option.innerHTML = state;
  // Set subject ID in value property
  option.value = state;
  // Add the option element to DropDownList
  ddlIDs.options.add(option);
  });
};

// Build Bar Chart for Each State's Usage
function buildStateBar() {

d3.json(StateUrl).then(function (data) {

  // Delete id field in State Data
  delete data[0]._id;

  // Create List of All States
  var allStateData = data[0];

  console.log(allStateData); 

  // D3 select tag
  var dropdownMenu = d3.select("#selStateEnergy");

  // Assign the value of the dropdown menu option to a variable
  var stateSelection = dropdownMenu.property("value");

  console.log(stateSelection);

  var stateEntries = Object.entries(allStateData); 

  console.log(stateEntries);

  var barBio = 0;
  var barGeo = 0;
  var barHydro = 0;
  var barWood = 0;
  var barSolar = 0;
  var barWind = 0;

  stateEntries.forEach(function(state){
      
    var stateData = Object.values(state);

    barBio += Object.values(stateData[1])[0];
    barGeo += Object.values(stateData[1])[1];
    barHydro += Object.values(stateData[1])[2];
    barWood += Object.values(stateData[1])[3];
    barSolar += Object.values(stateData[1])[4];
    barWind += Object.values(stateData[1])[5];
  
  });


  stateEntries.forEach(function(state){
    
    var stateData = Object.values(state);

    if (stateSelection === state[0]) {
 
      console.log(stateData);

      var titleBar = `${state[0]} Renewable Energy Use`
      var trace = {
        type: "bar",
        x: Object.keys(stateData[1]),
        y: Object.values(stateData[1])
      }
      console.log(trace);
      var data = [trace];
      // Create Layout
      var layout = {
        title: titleBar,
        xaxis: {
          title: "Energy Source",
        },
        yaxis: {
          title: 'Trillion BTUs (British Thermal Unit)',
          autorange: true,
        }
      };

      // Add Plot
      Plotly.newPlot("stateBar", data, layout);
    }
    else if (stateSelection === 'All') {

      var titleBar = `All States Renewable Energy Use`
      var trace = {
        type: "bar",
        x: Object.keys(stateData[1]),
        y: [barBio, barGeo, barHydro, barSolar, barWind, barWood]
      }
      var data = [trace];
      // Create Layout
      var layout = {
        title: titleBar,
        xaxis: {
          title: "Energy Source",
        },
        yaxis: {
          title: 'Trillion BTUs (British Thermal Unit)',
          autorange: true,
        }
      };
      // Add Plot
      Plotly.newPlot("stateBar", data, layout);
    }
  })  
});
}
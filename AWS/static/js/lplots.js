
function buildData(currentState)
{
  var dataUrl = '/api/v1.0/energy_prices';
  
  d3.json(dataUrl).then( (data)=>
  {
    var resArray = data[0];
    var comArray = data[1];
    var indArray = data[2];
    var allArray = data[3];

    resData = Object.values(resArray).filter(x => x.state == currentState);
    comData  = Object.values(comArray).filter(x => x.state == currentState);
    indData = Object.values(indArray).filter(x => x.state == currentState);
    allData = Object.values(allArray).filter(x => x.state == currentState);

    console.log(resData);

    var traces = [];

    // Populate Residential Traces & Data

    resKeys = Object.keys(resData);
  
    resKeys.forEach(function(key){
      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: "Residential",
        x: resData[key].data.map(row=> row[0]),
        y: resData[key].data.map(row=> row[1])  
      }
      traces.push(trace1);
    });

    // Populate Commercial Traces & Data  
    comKeys = Object.keys(comData);
  
    comKeys.forEach(function(key){
      var trace2 = {
        type: "scatter",
        mode: "lines",
        name: "Commercial",
        x: comData[key].data.map(row=> row[0]),
        y: comData[key].data.map(row=> row[1])
  
      }
      traces.push(trace2);
    });

    
    // Populate Industrial Traces & Data 
    indKeys = Object.keys(indData);
  
    indKeys.forEach(function(key){
      var trace3 = {
        type: "scatter",
        mode: "lines",
        name: "Industrial",
        x: indData[key].data.map(row=> row[0]),
        y: indData[key].data.map(row=> row[1])
  
      }
      traces.push(trace3);
    });

    // Populate All Traces & Data 
    allKeys = Object.keys(allData);
  
    allKeys.forEach(function(key){
      var trace4 = {
        type: "scatter",
        mode: "lines",
        name: "All",
        x: allData[key].data.map(row=> row[0]),
        y: allData[key].data.map(row=> row[1])
  
      }
      traces.push(trace4);
    });
      
  
    var layout = {
  
      hovermode: 'closest',
      title: `${currentState} Average Electricity Prices`,
      xaxis: {
          title: "Year",
          type: "date",
      },
      yaxis: {
        title: 'Cents Per kWh',
        autorange: true,
        type: "linear"
      }
  
    };
 
    //console.log(allData_filtered);

    //buildChart(indData_filtered);
    Plotly.newPlot("Electricplot", traces, layout);

  });

 

}

function buildChart(data){

  var traces = [];

  keys = Object.keys(data);

  console.log(keys);

  keys.forEach(function(key){
    var trace = {
      type: "scatter",
      mode: "lines",
      name: key,
      x: data[key].data.map(row=> row[0]),
      y: data[key].data.map(row=> row[1])

    }
    traces.push(trace);
  });
    

  var layout = {

    title: "TEST",
    xaxis: {
        title: "Year",
        type: "date",
    },
    yaxis: {
      title: 'Cents Per kWh',
      autorange: true,
      type: "linear"
    }

  };

  Plotly.newPlot("Electricplot", traces, layout);

}



function init() 
{
  var selector = d3.select("#selElectricPrices");
  var dataUrl = '/api/v1.0/energy_prices';

  d3.json(dataUrl).then((data) =>
    {

      delete data[0]._id;

      var states_data = data[0];
      var states = Object.keys(states_data);

      console.log(states);

      states.forEach((state) =>
      {
          selector
            .append("option")
            .text(state)
            .property("value", state);
        });

      var usa = states[44];

      //Will pass USA variable to buildchart function
      //buildCharts(usa);
      buildData(usa);

      console.log(usa);

    });

}


function optionChanged(newState) {
  buildData(newState);
}

init();

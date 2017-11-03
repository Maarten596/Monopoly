function outputData(data) {



	// Occurrences grafiek
	//-----------------------------------------
	var chartDataOccurrences = [ {
	    "straat": "Start", 
	    "occurrences": data[0][0]
	  }, {
	    "straat": "Dorpstraat",
	    "occurrences": data[0][1]
	  }, {
	    "straat": "Algemeen fonds",
	    "occurrences": data[0][2]
	  }, {
	    "straat": "Brink",
	    "occurrences": data[0][3]
	  }, {
	    "straat": "Inkomstenbelasting",
	    "occurrences": data[0][4]
	  }, {
	    "straat": "Station Zuid",
	    "occurrences": data[0][5]
	  }, {
	    "straat": "Steenstraat",
	    "occurrences": data[0][6]
	  }, {
	    "straat": "Kans",
	    "occurrences": data[0][7]
	  }, {
	    "straat": "Ketelstraat",
	    "occurrences": data[0][8]
	  }, {
	    "straat": "Velperplein",
	    "occurrences": data[0][9]
	  }, {
	    "straat": "Gevangenis",
	    "occurrences": data[0][10]
	  }, {
	    "straat": "Barteljorisstraat",
	    "occurrences": data[0][11]
	  }, {
	    "straat": "Elektriciteitsbedrijf",
	    "occurrences": data[0][12]
	  }, {
	    "straat": "Zijlweg",
	    "occurrences": data[0][13]
	  }, {
	    "straat": "Houtstraat",
	    "occurrences": data[0][14]
	  }, {
	    "straat": "Station West",
	    "occurrences": data[0][15]
	  }, {
	    "straat": "Neude",
	    "occurrences": data[0][16]
	  }, {
	    "straat": "Algemeen fonds",
	    "occurrences": data[0][17]
	  }, {
	    "straat": "Biltstraat",
	    "occurrences": data[0][18]
	  }, {
	    "straat": "Vreeburg",
	    "occurrences": data[0][19]
	  }, {
	    "straat": "Vrij parkeren",
	    "occurrences": data[0][20]
	  }, {
	    "straat": "A Kerkhof",
	    "occurrences": data[0][21]
	  }, {
	    "straat": "Kans",
	    "occurrences": data[0][22]
	  }, {
	    "straat": "Grote Markt",
	    "occurrences": data[0][23]
	  }, {
	    "straat": "Heerestraat",
	    "occurrences": data[0][24]
	  }, {
	    "straat": "Station Noord",
	    "occurrences": data[0][25]
	  }, {
	    "straat": "Spui",
	    "occurrences": data[0][26]
	  }, {
	    "straat": "Plein",
	    "occurrences": data[0][27]
	  }, {
	    "straat": "Waterleiding",
	    "occurrences": data[0][28]
	  }, {
	    "straat": "Lange Poten",
	    "occurrences": data[0][29]
	  }, {
	    "straat": "Naar de gevangenis",
	    "occurrences": data[0][30]
	  }, {
	    "straat": "Hofplein",
	    "occurrences": data[0][31]
	  }, {
	    "straat": "Blaak",
	    "occurrences": data[0][32]
	  }, {
	    "straat": "Algemeen fonds",
	    "occurrences": data[0][33]
	  }, {
	    "straat": "Coolsingel",
	    "occurrences": data[0][34]
	  }, {
	    "straat": "Station Oost",
	    "occurrences": data[0][35]
	  }, {
	    "straat": "Kans",
	    "occurrences": data[0][36]
	  }, {
	    "straat": "Leidsestraat",
	    "occurrences": data[0][37]
	  }, {
	    "straat": "Extra belasting",
	    "occurrences": data[0][38]
	  }, {
	    "straat": "Kalverstraat",
	    "occurrences": data[0][39]
	  } ];

	var collors = [];
	
	for(var i = 0; i < 40; i++) {
	  collors.push('grey')
	}

	collors[1] = collors[3] = "brown";
	collors[6] = collors[8] = collors[9] = "lightblue";
	collors[11] = collors[13] = collors[14] = "purple";
	collors[16] = collors[18] = collors[19] = "orange";
	collors[21] = collors[23] = collors[24] = "red";
	collors[26] = collors[27] = collors[29] = "yellow";
	collors[31] = collors[32] = collors[34] = "green";
	collors[37] = collors[39] = "blue"
	collors[5] = collors[15] = collors[25] = collors[35] = "black"
	// var collors = ["#9ebaa0", "#9603af", "#9ebaa0", "#9603af"];

	AmCharts.addInitHandler(function(chart) {
	  // check if there are graphs with autoColor: true set
	  for(var i = 0; i < chart.graphs.length; i++) {
	    var graph = chart.graphs[i];
	    if (graph.autoColor !== true)
	      continue;
	    var colorKey = "autoColor-"+i;
	    graph.lineColorField = colorKey;
	    graph.fillColorsField = colorKey;
	    for(var x = 0; x < chart.dataProvider.length; x++) {
	      var color = chart.colors[x]
	      chart.dataProvider[x][colorKey] = collors[x];
	    }
	  }
	  
	}, ["serial"]);

	AmCharts.makeChart("chartOccurrences", {
	  "type": "serial", 
	  "theme": "light",
	  "dataProvider": chartDataOccurrences,
	  "categoryField": "straat",
	  "categoryAxis": {
	    "autoGridCount": false,
	    "gridCount": chartDataOccurrences.length,
	    "gridPosition": "start",
	    "labelRotation": 90
	  }, 
	  "valueAxes": [ {
    	"title": "Kans (%)",
    	"maximum": 5
  	  } ],
	  "graphs": [ {
	    "autoColor":true,
	    "fillAlphas": 1,
	    "valueField": "occurrences",
	    "type": "column",
	    "balloonText": "[[category]]: <b>[[value]]</b>"
	  } ]
	} );
	//-----------------------------------------

	// StreetsInterest in the end
	//-----------------------------------------
	var chartDataOccurrences = [ {
	    "straat": "Start", 
	    "occurrences": 0
	  }, {
	    "straat": "Dorpstraat",
	    "occurrences": data[1][1]
	  }, {
	    "straat": "Algemeen fonds",
	    "occurrences": 0
	  }, {
	    "straat": "Brink",
	    "occurrences": data[1][3]
	  }, {
	    "straat": "Inkomstenbelasting",
	    "occurrences": 0
	  }, {
	    "straat": "Station Zuid",
	    "occurrences": data[1][5]
	  }, {
	    "straat": "Steenstraat",
	    "occurrences": data[1][6]
	  }, {
	    "straat": "Kans",
	    "occurrences": 0
	  }, {
	    "straat": "Ketelstraat",
	    "occurrences": data[1][8]
	  }, {
	    "straat": "Velperplein",
	    "occurrences": data[1][9]
	  }, {
	    "straat": "Gevangenis",
	    "occurrences": 0
	  }, {
	    "straat": "Barteljorisstraat",
	    "occurrences": data[1][11]
	  }, {
	    "straat": "Elektriciteitsbedrijf",
	    "occurrences": data[1][12]
	  }, {
	    "straat": "Zijlweg",
	    "occurrences": data[1][13]
	  }, {
	    "straat": "Houtstraat",
	    "occurrences": data[1][14]
	  }, {
	    "straat": "Station West",
	    "occurrences": data[1][15]
	  }, {
	    "straat": "Neude",
	    "occurrences": data[1][16]
	  }, {
	    "straat": "Algemeen fonds",
	    "occurrences": 0
	  }, {
	    "straat": "Biltstraat",
	    "occurrences": data[1][18]
	  }, {
	    "straat": "Vreeburg",
	    "occurrences": data[1][19]
	  }, {
	    "straat": "Vrij parkeren",
	    "occurrences": 0
	  }, {
	    "straat": "A Kerkhof",
	    "occurrences": data[1][21]
	  }, {
	    "straat": "Kans",
	    "occurrences": 0
	  }, {
	    "straat": "Grote Markt",
	    "occurrences": data[1][23]
	  }, {
	    "straat": "Heerestraat",
	    "occurrences": data[1][24]
	  }, {
	    "straat": "Station Noord",
	    "occurrences": data[1][25]
	  }, {
	    "straat": "Spui",
	    "occurrences": data[1][26]
	  }, {
	    "straat": "Plein",
	    "occurrences": data[1][27]
	  }, {
	    "straat": "Waterleiding",
	    "occurrences": data[1][28]
	  }, {
	    "straat": "Lange Poten",
	    "occurrences": data[1][29]
	  }, {
	    "straat": "Naar de gevangenis",
	    "occurrences": 0
	  }, {
	    "straat": "Hofplein",
	    "occurrences": data[1][31]
	  }, {
	    "straat": "Blaak",
	    "occurrences": data[1][32]
	  }, {
	    "straat": "Algemeen fonds",
	    "occurrences": 0
	  }, {
	    "straat": "Coolsingel",
	    "occurrences": data[1][34]
	  }, {
	    "straat": "Station Oost",
	    "occurrences": data[1][35]
	  }, {
	    "straat": "Kans",
	    "occurrences": 0
	  }, {
	    "straat": "Leidsestraat",
	    "occurrences": data[1][37]
	  }, {
	    "straat": "Extra belasting",
	    "occurrences": 0
	  }, {
	    "straat": "Kalverstraat",
	    "occurrences": data[1][39]
	  } ];

	var collors = [];
	
	for(var i = 0; i < 40; i++) {
	  collors.push('grey')
	}

	collors[1] = collors[3] = "brown";
	collors[6] = collors[8] = collors[9] = "lightblue";
	collors[11] = collors[13] = collors[14] = "purple";
	collors[16] = collors[18] = collors[19] = "orange";
	collors[21] = collors[23] = collors[24] = "red";
	collors[26] = collors[27] = collors[29] = "yellow";
	collors[31] = collors[32] = collors[34] = "green";
	collors[37] = collors[39] = "blue"
	collors[5] = collors[15] = collors[25] = collors[35] = "black"
	// var collors = ["#9ebaa0", "#9603af", "#9ebaa0", "#9603af"];

	AmCharts.addInitHandler(function(chart) {
	  // check if there are graphs with autoColor: true set
	  for(var i = 0; i < chart.graphs.length; i++) {
	    var graph = chart.graphs[i];
	    if (graph.autoColor !== true)
	      continue;
	    var colorKey = "autoColor-"+i;
	    graph.lineColorField = colorKey;
	    graph.fillColorsField = colorKey;
	    for(var x = 0; x < chart.dataProvider.length; x++) {
	      var color = chart.colors[x]
	      chart.dataProvider[x][colorKey] = collors[x];
	    }
	  }
	  
	}, ["serial"]);

	AmCharts.makeChart("chartStreetsInterest", {
	  "type": "serial", 
	  "theme": "light",
	  "dataProvider": chartDataOccurrences,
	  "categoryField": "straat",
	  "categoryAxis": {
	    "autoGridCount": false,
	    "gridCount": chartDataOccurrences.length,
	    "gridPosition": "start",
	    "labelRotation": 90
	  }, 
	  "valueAxes": [ {
    	"title": "Interest",
  	  } ],
	  "graphs": [{
	    "autoColor":true,
	    "fillAlphas": 0.8,
	    "valueField": "occurrences",
	    "type": "column",
	    "balloonText": "[[category]]: <b>[[value]]</b>"
	  }]
	});
	//-----------------------------------------


	// SetInterest over time
	//-----------------------------------------
	var chartDataSetInterest = []; 

	for(var i = 0; i < data[2].length; i++) {
		chartDataSetInterest.push({
	   		"stap": i, 
	    	"setInterest": data[2][i]
	 	})
	};

	var collors = [];
	
	for(var i = 0; i < data[2].length; i++) {
	  collors.push('blue')
	}
	// var collors = ["#9ebaa0", "#9603af", "#9ebaa0", "#9603af"];

	AmCharts.addInitHandler(function(chart) {
	  // check if there are graphs with autoColor: true set
	  for(var i = 0; i < chart.graphs.length; i++) {
	    var graph = chart.graphs[i];
	    if (graph.autoColor !== true)
	      continue;
	    var colorKey = "autoColor-"+i;
	    graph.lineColorField = colorKey;
	    graph.fillColorsField = colorKey;
	    for(var x = 0; x < chart.dataProvider.length; x++) {
	      var color = chart.colors[x]
	      chart.dataProvider[x][colorKey] = collors[x];
	    }
	  }
	  
	}, ["serial"]);

	AmCharts.makeChart("chartSetInterest", {
	  "type": "serial", 
	  "theme": "light",
	  "dataProvider": chartDataSetInterest,
	  "categoryField": "stap",
	  "categoryAxis": {
	    "autoGridCount": true,
	    "gridPosition": "start",
	    "labelRotation": 90
	  }, 
	  "valueAxes": [ {
    	"title": "Set Interest",
    	"minimum": 0
  	  } ],


	  "graphs": [ {
	    "autoColor":true,
	    "fillAlphas": 0.5,
	    "valueField": "setInterest",
	    "type": "line",
	    "balloonText": "[[category]]: <b>[[value]]</b>"
	  } ]
	} );
	//-----------------------------------------



	// lastSetInterest over time
	//-----------------------------------------
	var chartDataLastSetInterest = []; 

	for(var i = 0; i < data[3].length; i++) {
		chartDataLastSetInterest.push({
	   		"stap": i, 
	    	"lastSetInterest": data[3][i]
	 	})
	};

	var collors = [];
	
	for(var i = 0; i < data[2].length; i++) {
	  collors.push('blue')
	}
	// var collors = ["#9ebaa0", "#9603af", "#9ebaa0", "#9603af"];

	AmCharts.addInitHandler(function(chart) {
	  // check if there are graphs with autoColor: true set
	  for(var i = 0; i < chart.graphs.length; i++) {
	    var graph = chart.graphs[i];
	    if (graph.autoColor !== true)
	      continue;
	    var colorKey = "autoColor-"+i;
	    graph.lineColorField = colorKey;
	    graph.fillColorsField = colorKey;
	    for(var x = 0; x < chart.dataProvider.length; x++) {
	      var color = chart.colors[x]
	      chart.dataProvider[x][colorKey] = collors[x];
	    }
	  }
	  
	}, ["serial"]);

	AmCharts.makeChart("chartLastSetInterest", {
	  "type": "serial", 
	  "theme": "light",
	  "dataProvider": chartDataLastSetInterest,
	  "categoryField": "stap",
	  "categoryAxis": {
	    "autoGridCount": true,
	    "gridPosition": "start",
	    "labelRotation": 90
	  }, 
	  "valueAxes": [ {
    	"title": "Last Set Interest",
    	"minimum": 0
  	  } ],


	  "graphs": [ {
	    "autoColor":true,
	    "fillAlphas": 0.5,
	    "valueField": "lastSetInterest",
	    "type": "line",
	    "balloonText": "[[category]]: <b>[[value]]</b>"
	  } ]
	} );




	// neude over time
	//-----------------------------------------
	var chartDataLastSetInterest = []; 

	for(var i = 0; i < data[4].length; i++) {
		chartDataLastSetInterest.push({
	   		"stap": i, 
	    	"interest": data[4][i]
	 	})
	};

	var collors = [];
	
	for(var i = 0; i < data[4].length; i++) {
	  collors.push('blue')
	}
	// var collors = ["#9ebaa0", "#9603af", "#9ebaa0", "#9603af"];

	AmCharts.addInitHandler(function(chart) {
	  // check if there are graphs with autoColor: true set
	  for(var i = 0; i < chart.graphs.length; i++) {
	    var graph = chart.graphs[i];
	    if (graph.autoColor !== true)
	      continue;
	    var colorKey = "autoColor-"+i;
	    graph.lineColorField = colorKey;
	    graph.fillColorsField = colorKey;
	    for(var x = 0; x < chart.dataProvider.length; x++) {
	      var color = chart.colors[x]
	      chart.dataProvider[x][colorKey] = collors[x];
	    }
	  }
	  
	}, ["serial"]);

	AmCharts.makeChart("chartNeude", {
	  "type": "serial", 
	  "theme": "light",
	  "dataProvider": chartDataLastSetInterest,
	  "categoryField": "stap",
	  "categoryAxis": {
	    "autoGridCount": true,
	    "gridPosition": "start",
	    "labelRotation": 90
	  }, 
	  "valueAxes": [ {
    	"title": "Neude interest",
    	"minimum": 0
  	  } ],


	  "graphs": [ {
	    "autoColor":true,
	    "fillAlphas": 0.5,
	    "valueField": "interest",
	    "type": "line",
	    "balloonText": "[[category]]: <b>[[value]]</b>"
	  } ]
	} );



	//-----------------------------------------
}
//grafico barra
			$(function ()  
			{
			    var dataSource = [
                 { state: "Illinois", year1998: 423.721, year2001: 476.851},
                 { state: "Indiana", year1998: 178.719, year2001: 195.769 },
                 { state: "Michigan", year1998: 308.845, year2001: 335.793 },
                 { state: "Ohio", year1998: 348.555, year2001: 374.771},
                 { state: "Wisconsin", year1998: 160.274, year2001: 182.373}
			    ];

			    $("#chartContainer3").dxChart({
			        dataSource: dataSource,
			        commonSeriesSettings: {
			            argumentField: "state",
			            type: "bar",
			            hoverMode: "allArgumentPoints",
			            selectionMode: "allArgumentPoints",
			            label: {
			                visible: true,
			                format: "fixedPoint",
			                precision: 0
			            }
			        },
			        series: [
                        { valueField: "year2004", name: "2004" },
                        { valueField: "year2001", name: "2001" },
                        { valueField: "year1998", name: "1998" },
			        ],
			        title: "Great Lakes Gross State Product",
			        legend: {
			            verticalAlignment: "bottom",
			            horizontalAlignment: "center"
			        },
			        pointClick: function (point) {
			            this.select();
			        }
			    });
			}

			);
//lineal    
			var dataSource = [
                { state: "Illinois", year1998: 423.721, year2001: 476.851, year2004: 528.904 },
                { state: "Indiana", year1998: 178.719, year2001: 195.769, year2004: 227.271 },
                { state: "Michigan", year1998: 308.845, year2001: 335.793, year2004: 372.576 },
                { state: "Ohio", year1998: 348.555, year2001: 374.771, year2004: 418.258 },
                { state: "Wisconsin", year1998: 160.274, year2001: 182.373, year2004: 211.727 }
			];

			$("#chartContainer").dxChart({
			    dataSource: dataSource,
			    commonSeriesSettings: {
			        argumentField: "state",
			        type: "spline",
			        hoverMode: "includePoints",
			        point: {
			            hoverMode: "allArgumentPoints"
			        }
			    },
			    series: [
                    { valueField: "year2004", name: "2004" },
                    { valueField: "year2001", name: "2001" },
                    { valueField: "year1998", name: "1998" }
			    ],
			    title: {
			        text: "Great Lakes Gross State Product"
			    },
			    legend: {
			        verticalAlignment: "bottom",
			        horizontalAlignment: "center",
			        hoverMode: "excludePoints"
			    }
			});
//hilos
			var dataSource = [
                { country: "USA", hydro: 59.8, oil: 937.6, gas: 582, coal: 564.3, nuclear: 187.9 },
                { country: "China", hydro: 74.2, oil: 308.6, gas: 35.1, coal: 956.9, nuclear: 11.3 },
                { country: "Russia", hydro: 40, oil: 128.5, gas: 361.8, coal: 105, nuclear: 32.4 },
                { country: "Japan", hydro: 22.6, oil: 241.5, gas: 64.9, coal: 120.8, nuclear: 64.8 },
                { country: "India", hydro: 19, oil: 119.3, gas: 28.9, coal: 204.8, nuclear: 3.8 },
                { country: "Germany", hydro: 6.1, oil: 123.6, gas: 77.3, coal: 85.7, nuclear: 37.8 }
			];


			$("#chartContainer2").dxChart({
			    dataSource: dataSource,
			    commonSeriesSettings: {
			        argumentField: "country",
			        type: "spline",
			        point: {
			            hoverMode: 'allArgumentPoints'
			        }
			    },
			    crosshair: {
			        enabled: true
			    },
			    series: [
                    { valueField: "hydro", name: "Hydro-electric" },
                    { valueField: "oil", name: "Oil" },
                    { valueField: "gas", name: "Natural gas" },
                    { valueField: "coal", name: "Coal" },
                    { valueField: "nuclear", name: "Nuclear" }
			    ],
			    legend: {
			        verticalAlignment: "bottom",
			        horizontalAlignment: "center",
			        itemTextPosition: "bottom",
			        equalColumnWidth: true
			    },
			    title: "Energy Consumption in 2004 (Millions of Tons, Oil Equivalent)",
			    tooltip: {
			        enabled: true,
			        shared: true
			    }
			});
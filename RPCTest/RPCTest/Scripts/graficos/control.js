// </script>

        

        
//<script>
    $(document).ready(function () {
        setTimeout(setup, 500);
    });

    function setup() {
        var selectedYear = "Dia";

        var stocksDataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: function () {
                        return "../../content/dataviz/dashboards/stock-data-" + selectedYear + ".json";
                    },
                    dataType: "json"
                }
            },

            group: {
                field: "symbol"
            },

            sort: {
                field: "date",
                dir: "asc"
            },

            schema: {
                model: {
                    fields: {
                        date: {
                            type: "date"
                        }
                    }
                }
            },

            change: function () {
                $("[name=chart-type][value=area]").prop("checked", true);

                var view = this.view(),
                    index = $("#company-filtering-tabs").data("kendoTabStrip").select().index();

                // populate detailed stock prices
                populateStockPrices(view[index], index);
            }
        });

        var defaultSeriesColors = ["#70b5dd", "#1083c7", "#1c638d"];

        $("#yearly-stock-prices").kendoChart({
            renderAs: "canvas",
            dataSource: stocksDataSource,

            autoBind: false,

            seriesDefaults: {
                type: "area",
                overlay: {
                    gradient: "none"
                },
                markers: {
                    visible: false
                },
                majorTickSize: 0,
                opacity: .8
            },

            series: [{
                field: "close"
            }],

            seriesColors: defaultSeriesColors,

            valueAxis: {
                line: {
                    visible: false
                },

                labels: {
                    format: "${0}",
                    skip: 2,
                    step: 2,
                    color: "#727f8e"
                }
            },

            categoryAxis: {
                field: "date",

                labels: {
                    format: "MMM",
                    color: "#727f8e"
                },

                line: {
                    visible: false
                },

                majorTicks: {
                    visible: false
                },

                majorGridLines: {
                    visible: false
                }
            },

            legend: {
                visible: false
            }
        });

        $("[name=chart-type]").on("click", function () {
            var chart = $("#yearly-stock-prices").data("kendoChart"),
                allSeries = chart.options.series,
                newSeriesType = $(this).val();

            chart.options.seriesDefaults.type = newSeriesType;

            for (var series in allSeries) {
                allSeries[series].type = newSeriesType;
                allSeries[series].opacity = newSeriesType == "area" ? .8 : 1;
            }

            chart.redraw();
        });

        var companyInfoTemplate = kendo.template($("#company-info-template").html());

        $(".company-info").each(function () {
            var panel = $(this);
            panel.html(companyInfoTemplate({ name: panel.attr("id") }));
        });

        $("#year-filtering-tabs").kendoTabStrip({
            dataSource: [" ","Ventas", "Bases", "Indicadores"," "],
            change: function (e) {
                selectedYear = this.value();
                $("#tcluster").hide("slow");
                $("#chartContainer33").hide("slow");
                $("#tprovincia").hide("slow");
                $("#chartContainer32").hide("slow");

                if (selectedYear == "Ventas") {
                }
                if (selectedYear == "Bases") {
                }

                $(".selected-year").text(selectedYear);


                stocksDataSource.read();
            }
        }).data("kendoTabStrip").select(1);

        $("#company-filtering-tabs").kendoTabStrip({
            dataSource: ["SPH", "Ventas por cluster", "Ventas lima provincias"],
            change: function (e) {
                selectedYear = this.value();
                //alert(selectedYear);
                if (selectedYear == "SPH") {
                    //TRATAMIENTO DE OBJETO JSON
                    ///funcion que controla el objeto JSON devuelto por el web service
                    $(function rpc(mensaje) {
                            $.ajax({
                                type: "POST",
                                contentType: "Application/Json-Rpc; charset=utf-8",
                                url: "http://localhost:1796/json.rpc?jsonrpc=",
                                data: JSON.stringify({ "jsonrpc": "2.0", "method": "TablaSph", "params": [2014, 2, "ALTASHD"], "id": 1 }),
                                dataType: "json",
                                traditional: true,
                            success: function (msg) {
                               
                               $("#sph").html("");
                                //alert(msg.result[0].FECHA);
                                //alert("hola");
                                for (var i = 0; i < msg.result.length; i++) {
                                    var tr = "<tr>";

                                    var element =  msg.result[i].FECHA.split('T');
                                    var fecha = element[0].split('-');

                                    var td1 = "<td>" +fecha[2]+'/'+fecha[1]+'/'+fecha[0]+ "</td>";
                                    var td2 = "<td>" + msg.result[i].logueados + "</td>";
                                    var td3 = "<td>" + msg.result[i].horas_trabajadas + "</td>";
                                    var td4 = "<td>" + msg.result[i].sph + "</td>";
                                    var td5 = "<td class='alert alert-info'>" + msg.result[i].objetivo + "</td></tr>";

                                    $("#sph").append(tr + td1 + td2 + td3 + td4 + td5);
                                }
                               //// aki grafico de barra

                               //lineal    
                                var dataSource = [], result = msg.result;
                                for (var i = 0; i < msg.result.length; i++) {
                                    var results = result[i];
                                    var element =  results.FECHA.split('T');
                                    var fecha = element[0].split('-');
                                    dataSource.push({ state: fecha[2], year2004: results.sph});
                                }

                                $("#chartContainer21").dxChart({
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
                                        { valueField: "year2004", name: "SPH" }
                                    ],
                                    title: {
                                        text: "S.P.H"
                                    },
                                    legend: {
                                        verticalAlignment: "bottom",
                                        horizontalAlignment: "center",
                                        hoverMode: "excludePoints"
                                    }
                                });

                                //lineal 2  
                                var dataSource = [], result = msg.result;
                                for (var i = 0; i < msg.result.length; i++) {
                                    var results = result[i];
                                    var element =  results.FECHA.split('T');
                                    var fecha = element[0].split('-');
                                    dataSource.push({ state: fecha[2], year2004: results.sph, year2001: results.objetivo});
                                }

                                $("#chartContainer22").dxChart({
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
                                        { valueField: "year2004", name: "SPH" },
                                        { valueField: "year2001", name: "SPH Esperado" }
                                    ],
                                    title: {
                                        text: "S.P.H - S.P.H Esperado"
                                    },
                                    legend: {
                                        verticalAlignment: "bottom",
                                        horizontalAlignment: "center",
                                        hoverMode: "excludePoints"
                                    }
                                });

                                var suma=0;
                                var acum=0; 
                                var dataSource = [], result = msg.result;
                                for (var i = 0; i < msg.result.length; i++) {
                                    var results = result[i];
                                    var results2 = result[i-1];
                                    var element =  results.FECHA.split('T');
                                    var fecha = element[0].split('-');
                                    if (i==0) {
                                        acum = results.TotalPaq;
                                    }else{
                                        acum = results.TotalPaq+acum;
                                    };
                                    if (i!=0) {
                                        suma = (suma + results2.objetivo)- results2.TotalPaq;

                                    };
                                    dataSource.push({ state: fecha[2], year2004: acum, year2001: (results.TotalPaq-(suma+results.objetivo))});
                                }

                                $("#chartContainer23").dxChart({
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
                                        { valueField: "year2004", name: "ACUMULADO" },
                                        { valueField: "year2001", name: "CUMPLIMIENTO" }
                                    ],
                                    title: {
                                        text: "Acumulado - Cumplimeinto"
                                    },
                                    legend: {
                                        verticalAlignment: "bottom",
                                        horizontalAlignment: "center",
                                        hoverMode: "excludePoints"
                                    }
                                });
                                
                                //FIN poblar gráfico barra
                            }

                        });

                    });///END
                    //FIN TRATAMIENTO DE OBJETO JSON



                    $("#tcluster").hide("slow");
                    $("#chartContainer33").hide("slow");//grafico de cluster
                    $("#tprovincia").hide("slow");
                    $("#chartContainer32").hide("slow");//grafico venta por provincia

                    $("#tsph").show("slow");
                    $("#chartContainer21").show("slow");
                    $("#chartContainer22").show("slow");
                    $("#chartContainer23").show("slow");

                }
                if (selectedYear == "Ventas por cluster") {

                    ///funcion que controla el objeto JSON devuelto por el web service
                    $(function rpc(mensaje) {
                            $.ajax({
                                type: "POST",
                                contentType: "Application/Json-Rpc; charset=utf-8",
                                url: "http://localhost:1796/json.rpc?jsonrpc=",
                                data: JSON.stringify({ "jsonrpc": "2.0", "method": "TablaSph", "params": [2014, 2, "ALTASHD"], "id": 1 }),
                                dataType: "json",
                                traditional: true,
                            success: function (msg) {
                               
                               $("#cluster").html("");
                                //alert(msg.result[0].FECHA);
                                //alert("hola");
                                suma=0;
                                acum=0;
                                for (var i = 0; i < msg.result.length; i++) {
                                    var tr = "<tr>";

                                    var element =  msg.result[i].FECHA.split('T');
                                    var fecha = element[0].split('-');

                                    var td1 = "<td>" +fecha[2]+'/'+fecha[1]+'/'+fecha[0]+ "</td>";
                                    var td2 = "<td>" + msg.result[i].regular+ "</td>";
                                    var td3 = "<td>" + 0 + "</td>";
                                    var td4 = "<td>" + msg.result[i].deco + "</td>";
                                    var td5 = "<td>" + msg.result[i].TotalPaq + "</td>";
                                    var td6 = "<td>" + msg.result[i].objetivo + "</td>";
                                    if (i==0) {
                                        acum = msg.result[i].TotalPaq;
                                    }else{
                                        acum = msg.result[i].TotalPaq+acum;
                                    };
                                    var td7 = "<td>" + acum+ "</td>";
                                    if (i!=0) {
                                        suma = (suma + msg.result[i-1].objetivo)- msg.result[i-1].TotalPaq;

                                    };
                                    
                                    var td8 = "<td class='alert alert-info'>" +(msg.result[i].TotalPaq-(suma+msg.result[i].objetivo))+ "</td></tr>";

                                    $("#cluster").append(tr + td1 + td2 + td3 + td4 + td5 + td6 + td7 + td8);
                                }
                               ////inicio grafico barra
                                var dataSource = [], result = msg.result;
                                for (var i = 0; i < msg.result.length; i++) {
                                    var results = result[i];
                                    var element =  results.FECHA.split('T');
                                    var fecha = element[0].split('-');
                                    dataSource.push({ state: fecha[2], year1998: results.deco, year2001: results.regular });
                                }
                               

                                $("#chartContainer33").dxChart({
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
                                        { valueField: "year2001", name: "HD Regular" },
                                        { valueField: "year1998", name: "HD Deco" },
                                    ],
                                    title: "Ventas por cluster",
                                    legend: {
                                        verticalAlignment: "bottom",
                                        horizontalAlignment: "center"
                                    },
                                    pointClick: function (point) {
                                        this.select();
                                    }
                                });
                               
                                //FIN poblar gráfico barra
                            }

                        });

                    });///END
                    //FIN TRATAMIENTO DE OBJETO JSON
                   // alert("estubo Bases");
                    $("#tsph").hide("slow");
                    $("#chartContainer21").hide("slow");//grafico sph 1
                    $("#chartContainer22").hide("slow");//grafico sph2
                    $("#chartContainer23").hide("slow");//grafico sph3
                    $("#tprovincia").hide("slow");
                    $("#chartContainer32").hide("slow");//grafico venta por provincia

                    $("#tcluster").show("slow");
                    $("#chartContainer33").show("slow");//grafico de cluster
                }
                if (selectedYear == "Ventas lima provincias") {

                    ///funcion que controla el objeto JSON devuelto por el web service
                    $(function rpc(mensaje) {
                            $.ajax({
                                type: "POST",
                                contentType: "Application/Json-Rpc; charset=utf-8",
                                url: "http://localhost:1796/json.rpc?jsonrpc=",
                                data: JSON.stringify({ "jsonrpc": "2.0", "method": "TablaSph", "params": [2014, 2, "ALTASHD"], "id": 1 }),
                                dataType: "json",
                                traditional: true,
                            success: function (msg) {
                               
                               $("#lprovincia").html("");
                                //alert(msg.result[0].FECHA);
                                //alert("hola");
                                for (var i = 0; i < msg.result.length; i++) {
                                    var tr = "<tr>";
                                    var element =  msg.result[i].FECHA.split('T');
                                    var fecha = element[0].split('-');

                                    var td1 = "<td>" +fecha[2]+'/'+fecha[1]+'/'+fecha[0]+ "</td>";
                                    var td2 = "<td>" + msg.result[i].lima+ "</td>";
                                    var td3 = "<td>" + msg.result[i].provincia+ "</td>";
                                    var td4 = "<td class='alert alert-info'>" + msg.result[i].tmo+ "</td></tr>";

                                    $("#lprovincia").append(tr + td1 + td2 + td3 + td4);
                                }
                               ////GRAFICO DE BARRA
                               /* var dataSource = [
                                     { state: "Illinois", year1998: 423.721, year2001: 476.851},
                                     { state: "Indiana", year1998: 178.719, year2001: 195.769 },
                                     { state: "Michigan", year1998: 308.845, year2001: 335.793 },
                                     { state: "Ohio", year1998: 348.555, year2001: 374.771},
                                     { state: "Wisconsin", year1998: 160.274, year2001: 182.373}
                                ];*/
                                var dataSource = [], result = msg.result;
                                for (var i = 0; i < msg.result.length; i++) {
                                    var results = result[i];
                                    var element =  results.FECHA.split('T');
                                    var fecha = element[0].split('-');
                                    dataSource.push({ state: fecha[2], year1998: results.lima, year2001: results.provincia });
                                }
                               

                                $("#chartContainer32").dxChart({
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
                                        { valueField: "year2001", name: "Provincia" },
                                        { valueField: "year1998", name: "Lima" },
                                    ],
                                    title: "Ventas Lima provincias",
                                    legend: {
                                        verticalAlignment: "bottom",
                                        horizontalAlignment: "center"
                                    },
                                    pointClick: function (point) {
                                        this.select();
                                    }
                                });
                               
                                //FIN poblar gráfico barra
                            }

                        });

                    });///END
                    //FIN TRATAMIENTO DE OBJETO JSON
                     
                    // alert("estubo Bases");
                    $("#tsph").hide("slow");
                    $("#chartContainer21").hide("slow");//grafico sph 1
                    $("#chartContainer22").hide("slow");//grafico sph2
                    $("#chartContainer23").hide("slow");//grafico sph3
                    $("#tcluster").hide("slow");
                    $("#chartContainer33").hide("slow");//grafico cluster

                    $("#tprovincia").show("slow");
                    $("#chartContainer32").show("slow");//grafico venta por provincia
                }

                $(".selected-year").text(selectedYear);


                stocksDataSource.read();
            }
        }).data("kendoTabStrip").select(0);//selecciona la pestaña 

    }

    ////chart.js
    //codigo grafico lineas canvas1 venta por cluster
    //codigo grafico lineas canvas
   /* var lineChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]

    }

    var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData);
    //codigo grafico lineas canvas2
    var lineChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]

    }

    var myLine = new Chart(document.getElementById("canvas2").getContext("2d")).Line(lineChartData);
    //codigo grafico lineas canvas3
    var lineChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                fillColor: "rgba(218,15,15,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ],
    }

    var myLine = new Chart(document.getElementById("canvas3").getContext("2d")).Line(lineChartData);

    //codigo grafico lineas canvas1 venta por provincia
   /* var barChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]

    }

    var myLine = new Chart(document.getElementById("canvas4").getContext("2d")).Bar(barChartData);*/
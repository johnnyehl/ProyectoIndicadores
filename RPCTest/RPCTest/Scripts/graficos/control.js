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
                $("#canvas1").hide("slow");
                $("#tprovincia").hide("slow");
                $("#canvas4").hide("slow");

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
                            data: JSON.stringify({ "jsonrpc": "2.0", "method": "listaElementos", "params": [], "id": 1 }),
                            dataType: "json",
                            traditional: true,
                            success: function (msg) {
                               
                                //alert(msg.result[2].Nombre);
                               

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
                                //FIN poblar gráfico barra
                            }

                        });

                    });///END
                    //FIN TRATAMIENTO DE OBJETO JSON



                    $("#tcluster").hide("slow");
                    $("#canvas1").hide("slow");//grafico de cluster
                    $("#tprovincia").hide("slow");
                    $("#canvas4").hide("slow");//grafico venta por provincia

                    $("#tsph").show("slow");
                    $("#canvas").show("slow");
                    $("#canvas2").show("slow");
                    $("#canvas3").show("slow");

                }
                if (selectedYear == "Ventas por cluster") {
                   // alert("estubo Bases");
                    $("#tsph").hide("slow");
                    $("#canvas").hide("slow");//grafico sph 1
                    $("#canvas2").hide("slow");//grafico sph2
                    $("#canvas3").hide("slow");//grafico sph3
                    $("#tprovincia").hide("slow");
                    $("#canvas4").hide("slow");//grafico venta por provincia

                    $("#tcluster").show("slow");
                    $("#canvas1").show("slow");//grafico de cluster
                }
                if (selectedYear == "Ventas lima provincias") {
                    // alert("estubo Bases");
                    $("#tsph").hide("slow");
                    $("#canvas").hide("slow");//grafico sph 1
                    $("#canvas2").hide("slow");//grafico sph2
                    $("#canvas3").hide("slow");//grafico sph3
                    $("#tcluster").hide("slow");
                    $("#canvas1").hide("slow");//grafico cluster

                    $("#tprovincia").show("slow");
                    $("#canvas4").show("slow");//grafico venta por provincia
                }

                $(".selected-year").text(selectedYear);


                stocksDataSource.read();
            }
        }).data("kendoTabStrip").select(0);//selecciona la pestaña 

    }

    ////chart.js
    //codigo grafico lineas canvas1 venta por cluster
    var barChartData = {
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

    var myLine = new Chart(document.getElementById("canvas1").getContext("2d")).Bar(barChartData);
    //codigo grafico lineas canvas
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
    var barChartData = {
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

    var myLine = new Chart(document.getElementById("canvas4").getContext("2d")).Bar(barChartData);
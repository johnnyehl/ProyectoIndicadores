
$(document).ready(function () {
                    var myDate = new Date();
                    var displayDate = (myDate.getDate() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getFullYear());
                   // $("#i").html(displayDate);

                    $("#dia").html(myDate.getDate());
                    $("#mes").html(myDate.getMonth() + 1);
                    $("#ano").html(myDate.getFullYear());
    
                    $("#dia").hide("show");
                    $("#mes").hide("show");
                    $("#ano").hide("show");
                    
});
///

$("#i").on("change", function () {
    
}, function () {
    var dias = $("#i").val();
    $("#dia").html(dia);
    var dia = dias.substring(0, 2);
    var mes = dias.substring(3, 4);
    var ano = dias.substring(6);// letra = H
    $("#dia").html(dia);
    $("#mes").html(mes);
    $("#ano").html(ano);
});
/*
$("#seg").click(function () {
    alert($("#dia").html());
});*/
var produc;
var seg;
$("#fijo").click(function () {
    produc = $("#fijo").html();
    $("#prod").text(produc);
    $(function rpc(mensaje) {
        $.ajax({
            type: "POST",
            contentType: "Application/Json-Rpc; charset=utf-8",
            url: "http://localhost:1796/json.rpc?jsonrpc=",
            data: JSON.stringify({ "jsonrpc": "2.0", "method": "ObtenerCampanhas", "params": [$("#prod").html(), $("#seg").html()], "id": 1 }),
            dataType: "json",
            traditional: true,
            success: function (msg) {

                $("#selec").html("");

                for (var i = 0; i < msg.result.length; i++) {
                    var ul = "<option>" + msg.result[i].CODOBJ + "</option>";
                    $("#selec").append(ul);
                }

            }

        });

    });///END
});
$("#movil").click(function () {
    produc = $("#movil").html();
    $("#prod").text(produc);
    $(function rpc(mensaje) {
        $.ajax({
            type: "POST",
            contentType: "Application/Json-Rpc; charset=utf-8",
            url: "http://localhost:1796/json.rpc?jsonrpc=",
            data: JSON.stringify({ "jsonrpc": "2.0", "method": "ObtenerCampanhas", "params": [$("#prod").html(), $("#seg").html()], "id": 1 }),
            dataType: "json",
            traditional: true,
            success: function (msg) {

                $("#selec").html("");

                for (var i = 0; i < msg.result.length; i++) {
                    var ul = "<option>" + msg.result[i].CODOBJ + "</option>";
                    $("#selec").append(ul);
                }

            }

        });

    });///END
});
$("#res").click(function () {
    seg = $("#res").html();
    $("#seg").text(seg);
                    
    $(function rpc(mensaje) {
        $.ajax({
            type: "POST",
            contentType: "Application/Json-Rpc; charset=utf-8",
            url: "http://localhost:1796/json.rpc?jsonrpc=",
            data: JSON.stringify({ "jsonrpc": "2.0", "method": "ObtenerCampanhas", "params": [$("#prod").html(), $("#seg").html()], "id": 1 }),
            dataType: "json",
            traditional: true,
            success: function (msg) {

                $("#selec").html("");

                for (var i = 0; i < msg.result.length; i++) {
                    var ul = "<option>" + msg.result[i].CODOBJ + "</option>";
                    $("#selec").append(ul);
                }

            }

        });

    });///END
});
$("#neg").click(function () {
    seg = $("#neg").html();
    $("#seg").text(seg);
                    
    $(function rpc(mensaje) {
        $.ajax({
            type: "POST",
            contentType: "Application/Json-Rpc; charset=utf-8",
            url: "http://localhost:1796/json.rpc?jsonrpc=",
            data: JSON.stringify({ "jsonrpc": "2.0", "method": "ObtenerCampanhas", "params": [$("#prod").html(), $("#seg").html()], "id": 1 }),
            dataType: "json",
            traditional: true,
            success: function (msg) {

                $("#selec").html("");

                for (var i = 0; i < msg.result.length; i++) {
                    var ul = "<option>" + msg.result[i].CODOBJ + "</option>";
                    $("#selec").append(ul);
                }

            }

        });

    });///END
});
$(function rpc(mensaje) {
    $.ajax({
        type: "POST",
        contentType: "Application/Json-Rpc; charset=utf-8",
        url: "http://localhost:1796/json.rpc?jsonrpc=",
        data: JSON.stringify({ "jsonrpc": "2.0", "method": "ObtenerCampanhas", "params": [$("#prod").html(), $("#seg").html()], "id": 1 }),
        dataType: "json",
        traditional: true,
        success: function (msg) {

            $("#selec").html("");

            for (var i = 0; i < msg.result.length; i++) {
                var ul = "<option>" + msg.result[i].CODOBJ + "</option>";
                $("#selec").append(ul);
            }

        }

    });

});///END

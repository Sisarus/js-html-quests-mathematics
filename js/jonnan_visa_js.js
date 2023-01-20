/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 */
var tulos = 0;
$(document).ready(function(){

    $(".vastaus1").click(function(){
        let vastaus = Number($(this).val());
        if (vastaus === 1) {
            //oikea vastaus
            $(this).parent().addClass("oikea");
            tulos = tulos + 1;
        } else {
           $(this).parent().addClass("väärä"); 

        let attributinArvo = $(this).attr("name");
        let valinta = "[name=" + attributinArvo + "][value=1]";
        $(valinta).parent().addClass("oikea");
        
        }
        $("[name=vastaus1]").prop("disabled", true);
        $("#vas1").show();
    });
        $(".vastaus2").click(function(){
        let vastaus = Number($(this).val());
        if (vastaus === 1) {
            //oikea vastaus
            $(this).parent().addClass("oikea");
             tulos = tulos + 1;
            
        } else {
           $(this).parent().addClass("väärä"); 

        let attributinArvo = $(this).attr("name");
        let valinta = "[name=" + attributinArvo + "][value=1]";
        $(valinta).parent().addClass("oikea");
        
        }
        $("[name=vastaus2]").prop("disabled", true);
        $("#vas2").show();
    });
        $(".vastaus3").click(function(){
        let vastaus = Number($(this).val());
        if (vastaus === 1) {
            //oikea vastaus
            $(this).parent().addClass("oikea");
             tulos = tulos + 1;
            
        } else {
           $(this).parent().addClass("väärä"); 

        let attributinArvo = $(this).attr("name");
        let valinta = "[name=" + attributinArvo + "][value=1]";
        $(valinta).parent().addClass("oikea");
        
        }
        $("[name=vastaus3]").prop("disabled", true);
        $("#vas3").show();
    }); 
    $(".vastaus4").click(function(){
        let vastaus = Number($(this).val());
        if (vastaus === 1) {
            //oikea vastaus
            $(this).parent().addClass("oikea");
             tulos = tulos + 1;
            
        } else {
           $(this).parent().addClass("väärä"); 

        let attributinArvo = $(this).attr("name");
        let valinta = "[name=" + attributinArvo + "][value=1]";
        $(valinta).parent().addClass("oikea");
        
        }
        $("[name=vastaus4]").prop("disabled", true);
        $("#vas4").show();
    });
        $(".vastaus5").click(function(){
        let vastaus = Number($(this).val());
        if (vastaus === 1) {
            //oikea vastaus
            $(this).parent().addClass("oikea");
             tulos = tulos + 1;
            
        } else {
           $(this).parent().addClass("väärä"); 

        let attributinArvo = $(this).attr("name");
        let valinta = "[name=" + attributinArvo + "][value=1]";
        $(valinta).parent().addClass("oikea");
        
        }
        $("[name=vastaus5]").prop("disabled", true);
        $("#vas5").show();
    });
        $(".vastaus6").click(function(){
        let vastaus = Number($(this).val());
        if (vastaus === 1) {
            //oikea vastaus
            $(this).parent().addClass("oikea");
             tulos = tulos + 1;
            
        } else {
           $(this).parent().addClass("väärä"); 

        let attributinArvo = $(this).attr("name");
        let valinta = "[name=" + attributinArvo + "][value=1]";
        $(valinta).parent().addClass("oikea");
        
        }
        $("[name=vastaus6]").prop("disabled", true);
        $("#vas6").show();
    });
        $(".vastaus7").click(function(){
        let vastaus = Number($(this).val());
        if (vastaus === 1) {
            //oikea vastaus
            $(this).parent().addClass("oikea");
             tulos = tulos + 1;
            
        } else {
           $(this).parent().addClass("väärä"); 

        let attributinArvo = $(this).attr("name");
        let valinta = "[name=" + attributinArvo + "][value=1]";
        $(valinta).parent().addClass("oikea");
        
        }
        $("[name=vastaus7]").prop("disabled", true);
        $("#vas7").show();
    });
        $(".vastaus8").click(function(){
        let vastaus = Number($(this).val());
        if (vastaus === 1) {
            //oikea vastaus
            $(this).parent().addClass("oikea");
             tulos = tulos + 1;
            
        } else {
           $(this).parent().addClass("väärä"); 

        let attributinArvo = $(this).attr("name");
        let valinta = "[name=" + attributinArvo + "][value=1]";
        $(valinta).parent().addClass("oikea");
        
        }
        $("[name=vastaus8]").prop("disabled", true);
        $("#vas8").show();
    });
        $(".vastaus9").click(function(){
        let vastaus = Number($(this).val());
        if (vastaus === 1) {
            //oikea vastaus
            $(this).parent().addClass("oikea");
             tulos = tulos + 1;
            
        } else {
           $(this).parent().addClass("väärä"); 

        let attributinArvo = $(this).attr("name");
        let valinta = "[name=" + attributinArvo + "][value=1]";
        $(valinta).parent().addClass("oikea");
        
        }
        $("[name=vastaus9]").prop("disabled", true);
        $("#vas9").show();
    });
        $(".vastaus10").click(function(){
        let vastaus = Number($(this).val());
        if (vastaus === 1) {
            //oikea vastaus
            $(this).parent().addClass("oikea");
             tulos = tulos + 1;
            
        } else {
           $(this).parent().addClass("väärä"); 

        let attributinArvo = $(this).attr("name");
        let valinta = "[name=" + attributinArvo + "][value=1]";
        $(valinta).parent().addClass("oikea");
        
        }
        $("[name=vastaus10]").prop("disabled", true);
        $("#vas10").show();
    });


    
    $("#message").click(function(){
        $("#otsikko").html("Onnittelut visan loppuun saamisesta! Tuloksesi on: " + tulos + "/10!");
        if(tulos ==10) {
        $("#viesti").html("Mahtavaa! Täydet pisteet!");
    } else if (tulos > 7) {
        $("#viesti").html("Melkein täydet pisteet! Olet aikamoinen historian tuntija!");
    } else if (tulos > 4) {
        $("#viesti").html("Hienosti meni! Vähän on vielä kerrattavaa Suomen historiasta.");
    } else if (tulos > 0) {
        $("#viesti").html("Hupsis, pitäisiköhän sinun kerrata taitojasi Suomen historiasta?");
    } else if(tulos == 0) {
        $("#viesti").html("Et saanut yhtään oikein, lukaisehan Suomen historiasta edes jotain!");
    }
        $("#mymessage").modal("show");
    });
    $("#refresh").click(function(){
        location.reload();
        document.documentElement.scrollTop = 0;
    });
});


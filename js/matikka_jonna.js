/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*kysymysten määrä*/
let lista = [];
const maara = 6;
var kysnum = 1;
var oikeat = 0;
let oikein = '<i class="fa fa-check" aria-hidden="true"></i>';
let väärin = '<i class="fa fa-times" aria-hidden="true"></i>'

var l1 = 0;
var l2 = 0;
$(document).ready(function () {

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    /* alun nappien toiminta*/
        $("#btnalku").click(function () {
        $("#alku").css("display", "none");
        $("#lasku1").css("display", "block");
    });
        $("#btnalkuohje").click(function () {
        $("#alku").css("display", "none");
        $("#ohje1").css("display", "block");
    });
    /* ohjeiden nappien funktio*/
    $("#btn1").click(function () {
        $("#ohje1").css("display", "none");
        $("#lasku1").css("display", "block");
        $("#kysymysten_maara").html(kysnum + "/" + maara)
    });
    $("#btn2").click(function () {
        $("#ohje2").css("display", "none");
        $("#lasku1").css("display", "block");
    });
    $("#btn3").click(function () {
        $("#ohje3").css("display", "none");
        $("#lasku1").css("display", "block");
        $("#kysymysten_maara").html(kysnum + "/" + maara)
    });
    $("#btnohje2").click(function () {
        $("#ohje1").css("display", "none");
        $("#ohje2").css("display", "block");
    });
    $("#btnohje3").click(function () {
        $("#ohje2").css("display", "none");
        $("#ohje3").css("display", "block");
    });
    /*ohjeiden esimerkki-laskujen nappien functio*/

    $("#btne1").click(function () {
        var koko = Number($("#esim1").val());
        var prosentti = Number($("#esim2").val());
        var lasku = (koko / 100) * prosentti;

        $("#tulos1").html("Tulos: (" + koko + " / 100) * " + prosentti + "% = " + (lasku).toFixed(2));

    });
    $("#btne2").click(function () {
        var koko = Number($("#esim3").val());
        var luku = Number($("#esim4").val());
        var lasku = (luku / koko) * 100;

        $("#tulos2").html("Tulos: (" + luku + " / " + koko + " * 100 = " + (lasku).toFixed(2) + "%");

    });

    $("#btne3").click(function () {
        var luku1 = Number($("#esim5").val());
        var luku2 = Number($("#esim6").val());
        var lasku = ((luku1 - luku2) / luku1) * 100;

        $("#tulos4").html("Tulos: ((" + luku1 + " - " + luku2 + ") / " + luku1 + ") * 100 = " + (lasku).toFixed(2) + "%");

    });
    /*lasku buttoneiden toiminta ja laskujen tarkistus*/
    $("#btnl2").click(function () {
        $("#lasku1").css("display", "none");
        $("#lasku2").css("display", "block");
        kysnum = kysnum + 1;
       
        var hinta = 156;
        var pros = 35;
        var syotto = Number($("#las1").val());
        var tulos = 101.40;
        if (syotto === tulos) {
            oikeat = oikeat + 1;
          lista.push(oikein);
        } else {
            lista.push(väärin);
        }
        $("#kysymysten_maara2").html(kysnum + "/" + maara + "<br>" + lista.join(''));
        l1 = getRndInteger(200, 400);
        l2 = getRndInteger(100, 200);
        $("#sohva_hinta").html("Sohvan alkuperäinen hinta on: " + l1 + " euroa");
        $("#sohva_uusi_hinta").html("Sohvan hinta alennuksen jälkeen on: " + l2 + " euroa")
    });

    $("#btnl3").click(function () {
        $("#lasku2").css("display", "none");
        $("#lasku3").css("display", "block");
        kysnum = kysnum + 1;
        

        var erotus = l1 - l2;
        var tulos = ((erotus / l1) * 100).toFixed(0);
        var syotto = Number($("#las2").val());

        if (syotto === tulos) {
            oikeat = oikeat + 1;
            lista.push(oikein);

        } else {
            lista.push(väärin);
        }
        $("#kysymysten_maara3").html(kysnum + "/" + maara  + "<br>" + lista.join(''));
    });
    $("#btnl4").click(function () {
        $("#lasku3").css("display", "none");
        $("#lasku4").css("display", "block");
        kysnum = kysnum + 1;
        

        var tulos = 39;
        var syotto = Number($("#las3").val());
        if (syotto === tulos) {
            oikeat = oikeat + 1;
            lista.push(oikein);

        } else {
            lista.push(väärin);
        }
        $("#kysymysten_maara4").html(kysnum + "/" + maara  + "<br>" + lista.join(''));
    });
        $("#btnl5").click(function () {
        $("#lasku4").css("display", "none");
        $("#lasku5").css("display", "block");
        kysnum = kysnum + 1;
        

        var tulos = 2677.50
        var syotto = Number($("#las4").val());
        if (syotto === tulos) {
            oikeat = oikeat + 1;
            lista.push(oikein);

        } else {
            lista.push(väärin);
        }
        $("#kysymysten_maara5").html(kysnum + "/" + maara  + "<br>" + lista.join(''));
    });
            $("#btnl6").click(function () {
        $("#lasku5").css("display", "none");
        $("#lasku6").css("display", "block");
        kysnum = kysnum + 1;
        $("#kysymysten_maara6").html(kysnum + "/" + maara  + "<br>" + lista.join(''));
        

    });
    $(".vastaus4").click(function(){
        let vastaus = Number($(this).val());
         if (vastaus === 1) {
            oikeat = oikeat + 1;
            lista.push(oikein);

        } else {
            lista.push(väärin);
        }

        $("[name=vastaus4]").prop("disabled", true);



    });
                $("#btnl7").click(function () {

        
        var paita = 22.50;
        var housut = 21;
        var kengät = 21.25;
        var tulos = paita + housut + kengät;
        var syotto = Number($("#las5").val());
        
        if (syotto === tulos) {
            oikeat = oikeat + 1;
            lista.push(oikein);

        } else {
            lista.push(väärin);
        }
        $("#lopputulos").html(oikeat + "/" + maara  + "<br>" + lista.join(''));

         if (oikeat > 5) {
            $("#tulosinfo").html("Sait kaikki oikein! Olet oikea matikkavelho!")
        } else if (oikeat > 4) {
            $("#tulosinfo").html("Sait lähes jokaisen vastauksen oikein!")
        } else if (oikeat > 3) {
            $("#tulosinfo").html("Mahtavaa! Sait yli puolet oikein!")
        } else if (oikeat > 2) {
            $("#tulosinfo").html("Sait puolet oikein!")
        } else if (oikeat > 1) {
            $("#tulosinfo").html("Hyvä yritys! Kertaathan vähän prosenttilaskujen laskemista.")
        } else if (oikeat > 0) {
            $("#tulosinfo").html("Sait sentään yhden oikein! Suosittelen prosenttilaskujen kertaamista.")
        } else if (oikeat === 0) {
            $("#tulosinfo").html("Sinulla on vielä paljon harjoiteltavaa prosenttilaskuissa.")
        }
                $("#lasku6").css("display", "none");
        $("#tulos").css("display", "block");


    });
    
    /*lataa sivu uudelleen*/
        $("#refresh").click(function(){
        location.reload();
        document.documentElement.scrollTop = 0;
    });

});
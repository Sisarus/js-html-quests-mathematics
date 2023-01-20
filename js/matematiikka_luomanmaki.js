/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 *      Tekijä: Alisa Luomanmäki
 */

// Numeroiden satunaisarpoja

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Sekoittaa numeroita listan pituuden mukaan ja palauttaa sekalaisen numeron
 * Pienin palautettava luku on vain 0 */
function sekoitaNumerot(listanPituus) {
    let pituus = listanPituus - 1;
    if (pituus < 0) {
        return 0;
    }
    return getRndInteger(0, pituus);
}

let tyttoKuvat = [
    '<img src="../img/luomanmaki_img/matematiikka_tytto/seiso.png" class="img-fluid img" alt=""/>',
    '<img src="../img/luomanmaki_img/matematiikka_tytto/hyppaa.png" class="img-fluid img" alt=""/>',
    '<img src="../img/luomanmaki_img/matematiikka_tytto/voieei.png" class="img-fluid img" alt=""/>'
];

let kertokuvia = [
    '<i class="fas fa-cloud"></i>',
    '<i class="fas fa-moon"></i>',
    '<i class="fas fa-tshirt"></i>',
    '<i class="fas fa-splotch"></i>',
    '<i class="fas fa-carrot"></i>',
    '<i class="fas fa-candy-cane"></i>',
    '<i class="fas fa-bone"></i>',
    '<i class="fas fa-fish"></i>',
    '<i class="fas fa-cat"></i>',
    '<i class="fas fa-kiwi-bird"></i>'
];

let voittoja = [
    '<i class="fas fa-star fa-3x"></i>',
    '<i class="fas fa-star fa-3x fa-spin"></i>',
    '<i class="fas fa-ghost fa-5x"></i>',
    '<i class="fas fa-heart fa-10x"></i>'
];

$(document).ready(function () {

    //Apureita

    let apuriPaalla = 0;

    //Montako tehtävää valittiin
    let valittuMaara = 0;

    //Monestko kysymys menossa
    let kysymysNroMenossa = 1;

    //Lista numeroista määrätyssä järjestyksessä
    let kerroinLista = [];

    // Vuorossa oleva nro
    let valittuNumero = 0;

    //Montako kertaa oikein mennyt koko pelissä
    let oikeitaVastauksia = 0;

    // Montako yhdellä kierroksella
    let oikein = 0;

    /* Tämä funcktio sekoittaa numerot 2-10. Se siirtää globaaliin
     * muuttujalistan halutun määrän lukemia. Kun se on arponut kerran 2-10
     * luvut se sekoittaa listan että se arpoo uudestaan 2-10 lukuja.*/
    function luoNumerot() {
        let apulista = [];
        for (let i = 0; i < valittuMaara; i++) {
            if (apulista.length === 0) {
                for (let i = 2; i <= 10; i++) {
                    apulista.push(i);
                }
            }
            let poista = sekoitaNumerot(apulista.length);
            kerroinLista.push(apulista[poista]);
            apulista.splice(poista, 1);
        }
    }

    // ohjeet jotka on esillä
    function ohjeet() {
        $("#lukuNro").html("<h3>Kertaat nyt " + valittuNumero + " kertotaulua. \n\
            Laske lehtien luvut niin monta kertaa hedelmään kun hedelmässä on luku.</h3>");
    }

    //Luo aina uuden kieroksen harjoittelualueelle
    function luoHarjoittelu() {
        valittuNumero = kerroinLista.splice(0, 1);
        $(".lisaaNainMonta").html("x " + valittuNumero);
        ohjeet();
        $("#nro1").attr("placeholder", valittuNumero);
        $("#nro10").attr("placeholder", (valittuNumero * 10));
    }

    //Nollaa harjoittelun tarkastuksia
    function nollaa() {
        let vastaukset = $("#harjoitus").children().children("input");
        $(vastaukset).each(function () {
            $(this).removeClass("oikeaVastaus");
            $(this).removeClass("vaaraVastaus");
        });
        vastaukset = $("#harjoitus").children().children("div");
        $(vastaukset).each(function () {
            $(this).removeClass("oikeaLehti");
            $(this).removeClass("vaaraLehti");
        });
        $('.muotoa_peliin').val('');
    }

    //Edistymipalkki
    function palkki() {
        let prosentti = 100 / valittuMaara * kysymysNroMenossa;
        let tulosta = "width:" + prosentti + "%";
        $(".progress-bar").attr("style", tulosta);
        $(".progress-bar").attr("aria-valuenow", prosentti);
    }

    //Lopputuloksen paljastaminen
    function loppunaytos() {
        let vastauksia = valittuMaara * 8;
        if (vastauksia === oikeitaVastauksia) {
            voittoja[1];
            $("#kuva").html(tyttoKuvat[1]);
            $("#wauTahtia").html(voittoja[0] + voittoja[1] + voittoja[0]);
            $("#lopputekstit").html('<h3 class="loppu">Mahtavaa! Sait täydet pisteet: '
                    + oikeitaVastauksia + " / " + (valittuMaara * 8) + "</h3>");
            $("#lopetus").addClass("kaunis_taustaLoppuhyva");
        } else if (oikeitaVastauksia >= (vastauksia * 0.75)) {
            $("#wauTahtia").html(voittoja[0] + voittoja[0]);
            $("#kuva").html(tyttoKuvat[0]);
            $("#lopputekstit").html('<h3 class="loppuVaalea">Pärjäsit todella hyvin: '
                    + oikeitaVastauksia + " / " + (valittuMaara * 8) + "</h3>");
        } else if (oikeitaVastauksia >= (vastauksia * 0.5)) {
            $("#kuva").html(tyttoKuvat[0]);
            $("#wauTahtia").html(voittoja[0]);
            $("#lopputekstit").html('<h3 class="loppuVaalea">Sait yli puolet oikein! '
                    + oikeitaVastauksia + " / " + (valittuMaara * 8) + "</h3>");
        } else if (oikeitaVastauksia >= (vastauksia * 0.25)) {
            $("#kuva").html(tyttoKuvat[0]);
            $("#wauTahtia").html("");
            $("#lopputekstit").html('<h3 class="loppuVaalea">Tarvitset lisäharjoittelua: '
                    + oikeitaVastauksia + " / " + (valittuMaara * 8) + "</h3>");
        } else {
            $("#kuva").html(tyttoKuvat[2]);
            $("#wauTahtia").html(voittoja[2]);
            $("#lopputekstit").html('<h3 class="loppu">Et ole vielä ehkä ymmärtänyt kertotauluja: '
                    + oikeitaVastauksia + " / " + (valittuMaara * 8) + "</h3>");
            $("#lopetus").addClass("kaunis_taustaLoppu");
        }
        $("#harjoitusalue").hide();
        $("#lopetus").show();
    }

    //Antaa apurin tulla peliin
    $(".muotoa_peliin").click(function () {
        let paikka = $(this);
        if (apuriPaalla === 1) {
            $("#lukuNro").hide();
            $("#apukuvat").html("");
            let vastausRuutu = $(paikka).attr("placeholder");
            for (let i = 1; i <= vastausRuutu; i++) {
                let tulostaRivi = '<li><h4>' + i + " ";
                let kuva = getRndInteger(0, kertokuvia.length - 1);
                for (let k = 0; k < valittuNumero; k++) {
                    tulostaRivi += kertokuvia[kuva];
                }
                tulostaRivi += '</h4></li>';
                $("#apukuvat").append(tulostaRivi);
            }
            $("#apukuvat").append('<li><h3>' + valittuNumero + " * " + vastausRuutu + " = ??? </h3></li>");
            $("#apukuvat").show();
        }
    });

//    $(".muotoa_peliin").focusout(function () { En tiedä toimiiko tämä oikein kännyllä joten otan pois käytöstä.
//        $("#apukuvat").hide();
//        $("#apukuvat").html("");
//        $("#lukuNro").show();
//    });

    //Palauttaa alkutilanteeseen
    $("#alkutakaisin").click(function () {
        $("#ohjeet").show();
        $("#valitse").show();
        $("#lopetus").hide();
        $("#wauTahtia").html();
        $("#lopetus").removeClass("kaunis_taustaLoppu");
        $("#lopetus").removeClass("kaunis_taustaLoppuhyva");
        apuriPaalla = -1;
        valittuMaara = 0;
        kerroinLista = [];
        valittuNumero = 0;
        oikeitaVastauksia = 0;
        oikein = 0;
        $("#tarkista").parent().show();
    });

    //Aloittaa pelin
    $("#aloita").click(function () {
        valittuMaara = Number($("[name=kysMaara]:checked").val());
        luoNumerot();
        luoHarjoittelu();
        if ($("#apuri").prop("checked") === true) {
            apuriPaalla = 1;
        }
        $("#ohjeet").hide();
        $("#valitse").hide();
        $("#harjoitusalue").show();
        kysymysNroMenossa = 1;
        palkki();
        $("#apukuvat").hide();
        $("#apukuvat").html("");
        $("#lukuNro").show();
    });

    //Tarkistaa onko peli lopussa vai jatkuuko ja jos jatkuu tulostaa uuden harjoittelun
    $("#seuraava").click(function () {
        palkki();
        if (kerroinLista.length === 0) {
            nollaa();
            loppunaytos();
            $("#seuraava").hide();
        } else {
            nollaa();
            luoHarjoittelu();
            $("#seuraava").hide();
            $("#tarkistaTulos").html("Pisteesi: " + oikeitaVastauksia);
            $("#tarkista").parent().show();
        }
        $("#lukuNro").show();
        $("#apukuvat").hide();
    });

    //Tarkistaa inputit että onko vastauksia
    function onkoRuutuTyhja(vastaukset) {
        let kerroin = 0;
        let tarkistus = true;
        $(vastaukset).each(function () {
            let vastaus = Number($(this).val());
            kerroin++;
            if (kerroin === 1 || kerroin === 10) {
                $(this).removeClass("vastaaKaikkiin");
                return;
            } else {
                if (vastaus === "" || vastaus === 0) {
                    tarkistus = false;
                    $(this).addClass("vastaaKaikkiin");
                } else {
                    $(this).removeClass("vastaaKaikkiin");
                }
            }
        });
        return tarkistus;
    }

    function tyhjennaVaarat() {
        let vastaukset = $("#harjoitus").children().children("input");
        $(vastaukset).each(function (){
              $(this).removeClass("vastaaKaikkiin");
        });
    }


    // Tarkistaa vastukset antaa palautteen
    function tarkistaTulokset(vastaukset) {
        oikein = 0;
        let kerroin = 0;
        $(vastaukset).each(function () {
            let vastaus = Number($(this).val());
            kerroin++;
            if (kerroin === 1 || kerroin === 10) {
                return;
            } else {
                let oikeaVastaus = kerroin * valittuNumero;
                if (vastaus === oikeaVastaus) {
                    $(this).addClass("oikeaVastaus");
                    $(this).parent().children("div").html('<i class="fas fa-apple-alt"></i>');
                    $(this).parent().children("div").addClass("oikeaLehti");
                    oikeitaVastauksia++;
                    oikein++;
                } else {
                    $(this).addClass("vaaraVastaus");
                    $(this).parent().children("div").html('<i class="fas fa-ghost"></i>' + oikeaVastaus);
                    $(this).parent().children("div").addClass("vaaraLehti");
                    $(this).addClass("vaaraVastaus");
                }
            }
        });
        kysymysNroMenossa++;
        $("#lukuNro").html("<h3>Muista tärkeintä on että opit uutta!</h3>");
        $("#seuraava").show();
        $("#tarkistaTulos").html("Sait " + oikein + " pistettä");
        $("#tarkista").parent().hide();
    }

    //Tarkistaa onko vastaukset täytetty ja antaa sitten oikeat vastukset
    $("#tarkista").click(function () {
        let huijaus = Number($("#nro2").val());
        if (huijaus === 42) {  //Tämä on estitystä varten pikavoitto
            oikeitaVastauksia = valittuMaara * 8;
            $('.muotoa_peliin').val('');
            tyhjennaVaarat();
            loppunaytos();
        } else if (huijaus === 221) {  //Tämä on estitystä varten pikavoitto
            oikeitaVastauksia = valittuMaara * 6;
            $('.muotoa_peliin').val('');
            tyhjennaVaarat();
            loppunaytos();
        } else if (huijaus === 9001) {  //Tämä on estitystä varten pikavoitto
            oikeitaVastauksia = valittuMaara * 4;
            $('.muotoa_peliin').val('');
            tyhjennaVaarat();
            loppunaytos();
        } else if (huijaus === 1984) {  //Tämä on estitystä varten pikavoitto
            oikeitaVastauksia = valittuMaara * 2;
            $('.muotoa_peliin').val('');
            tyhjennaVaarat();
            loppunaytos();
        } else {
            let vastaukset = $("#harjoitus").children().children("input");
            if (onkoRuutuTyhja(vastaukset) === false) {
                $("#lukuNro").html("<h3>Et vastannut kaikkiin kohtiin.</h3>");
                $("#lukuNro").show();
                $("#apukuvat").hide();
                return;
            } else {
                tarkistaTulokset(vastaukset);
                if (oikein === 8) {
                    $("#lukuNro").html("<h3>Wau! Upeaa kaikki oikein!</h3>"
                            + voittoja[3]);
                } else if (oikein >= 4) {
                    $("#lukuNro").html("<h3>Upeaa! Olet oikeilla jäljillä!</h3>");
                } else {
                    $("#lukuNro").html("<h3>Tärkeintä on että olet oppimassa uutta!</h3>");
                }
                $("#apukuvat").hide();
                $("#lukuNro").show()
            }
        }
    });

});
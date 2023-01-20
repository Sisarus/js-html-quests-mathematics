/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
       
    let oikea_vastaus = 0;
    let teht_nro = 1;
    let oikeinLkm = 0;
    let väärinLkm = 0;
    let lukualueMin = 0;
    let lukualueMax = 0;
    let tehtMäärä = 0;
    let palkinnot = "";
    let monesLamppu = 0;
    
    let lamppu = '<i class="fab fa-medapps" id="oikea"></i>';
    let lamppu2 = '<i class="fab fa-medapps"></i>';
    
    let lamput = [];
    //aloita nappi, lukualue,arvonta,piilotetaan alkusivu,näytetään tehtäväsivu
    $("#aloita").click(function(){
       
       lukualueMin = Number($("[name=alueet]:checked").attr("data-min"));
       lukualueMax = Number($("[name=alueet]:checked").attr("data-max"));
       tehtMäärä = Number($("[name=määrä]:checked").attr("data-max"));
       
       let luku1 = getRndInteger(lukualueMin, lukualueMax);
       let luku2 = getRndInteger(lukualueMin, lukualueMax);
       
       oikea_vastaus = luku1 + luku2;
       
       $("#eka").html(luku1);
       $("#toka").html(luku2);
       $("#tehtNro").html("Kysymys " + teht_nro + " / " + tehtMäärä);
       
       $(".aloitus").hide();
       $(".teht").show();
       $("#tarkista").show();
       
       for (let i = 0;i < tehtMäärä;i++) {
           
           lamput.push(lamppu2);    
       }
       $("#tähti").html(lamput);
       
    });
    //kursori laatikkoon
    $("#vastaus").focusin(function(){
        $("#vastaus").html("");
        $("#vastaus").select();
    });
    //tuloksen tarkistus, pisteet, tehtävät ja lamput lasketaan. Piilotetaan tarkista ja seuraava näkyville,viimesen jälkeen tulostanappi
    $("#tarkista").click(function(){
        let tulos = Number($("#vastaus").val());
        let virhe = isNaN(tulos);
        let luku1 = Number($("#eka").val());
        let luku2 = Number($("#toka").val());
            
        if (tulos === oikea_vastaus) {
            oikeinLkm++;
            teht_nro++;
            palkinnot += lamppu;
            lamput[monesLamppu] = lamppu;
            $("#tähti").html(lamput);
            $("#oikeaVastaus").html("Oikein! ");
            monesLamppu++;
        }else if (tulos !== oikea_vastaus && virhe === false) {
            väärinLkm--;
            teht_nro++;
            monesLamppu++;
            $("#oikeaVastaus").html("Väärin meni, oikea vastaus olisi ollut " + oikea_vastaus + ".");
        }else if (virhe === true){
            $("#herja").html("Syötä jokin luku");
            
        } 
        
        $("#tarkista").hide();
        $("#seuraava").show();
        $("#vastaus").prop("disabled", true);
            
        if (teht_nro === tehtMäärä + 1) {
            $("#tarkista").hide(); 
            $("#seuraava").hide();
            $("#tulosta").show();           
        }
            
    });
    //seuraava piiloon, tarkista esiin,avataan vastausloota,arvotaan seuraavat luvut ym.
    $("#seuraava").click(function(){
        $("#vastaus").prop("disabled", false);
        $("#vastaus").focus();
        $("#vastaus").val("");
        $("#herja").html("");
       if (teht_nro <= tehtMäärä) {
           
           
           lukualueMin = Number($("[name=alueet]:checked").attr("data-min"));
            lukualueMax = Number($("[name=alueet]:checked").attr("data-max"));
            tehtMäärä = Number($("[name=määrä]:checked").attr("data-max"));
       
            let luku1 = getRndInteger(lukualueMin, lukualueMax);
            let luku2 = getRndInteger(lukualueMin, lukualueMax); 
           
            $("#eka").html(luku1);
            $("#toka").html(luku2);
            $("#tehtNro").html("Kysymys " + teht_nro + " / " + tehtMäärä);
            
            oikea_vastaus = luku1 + luku2;
            
            $("#seuraava").hide();
            $("#tarkista").show();  
            $("#oikeaVastaus").html("");
        }
    });
    //tulostetaan vastaukset,tehtäväsivu piiloon, loppusivu esiin, vain oikeiden vastausten lamput esiin
    $("#tulosta").click(function(){
        $("#tulosta").hide();
        $(".teht").hide();
        $("#loppu").show();
        $("#alkuun").show();
        $("#lamput").html(palkinnot);
        
        let tulosProsentti = oikeinLkm / tehtMäärä;
        tulosProsentti = tulosProsentti * 100;
        
        if (tulosProsentti < 30) {
            $("#loppuVastaus").html("Vähän jäi petrattavaa, mutta harjoittelu tekee mestarin! ");
            
        }
        else if(tulosProsentti < 50) {
            $("#loppuVastaus").html("Hyvä, " + oikeinLkm + " / " + tehtMäärä +  ", kokeile uudestaan saisitko parannettua!");
        }
        else if(tulosProsentti < 75) {
            $("#loppuVastaus").html("Hyvä, " + oikeinLkm + " / " + tehtMäärä + ", kokeile uudestaan saisitko parannettua!");
        }
        else if(tulosProsentti < 90) {
            $("#loppuVastaus").html("Lähes täydellistä, " + oikeinLkm + " / " + tehtMäärä + ". Kokeiletko vielä saisitko kaikki oikein?");
        }
        else if (tulosProsentti === 100) {
            $("#loppuVastaus").html("Täydellistä, taidat olla matikkanero?");
        }
    });
    
    $("#alkuun").click(function(){
        location.reload();
    });
    
});

$(document).ready(function() {
  
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  //Pistelaskuri
  let pisteet = 0;
  //Esitetyt kysymykset
  let kysEsi = 0;
  //Lukualueet min/max
  let min_lukuA = 0;
  let max_lukuA = 0;
  //Kysymysten lukumäärä
  let kys_lkm = 0;
  //Oikein/väärin merkit
  let pisteIko = '<i class="fa fa-star fa-2x"></i>'
  let VäärIko = '<i class="fa fa-times fa-2x"></i>'
  //Arvottujen lukujen erotus
  let erotus = "";
  //Laskuun tulostuvat luvut. Luku3 on vain väliaikainen säilö, johon talletetaan luku1:n arvo.
  // Näin vältymme negatiivisilta luvuilta(vastauksilta), koska nyt luku1 on aina suurempi kuin luku2.
  let luku1 = 0;
  let luku2 = 0;
  let luku3 = 0;

  // Laskemaan-painike
  $("#toCal_btn").click(function() {
  //Arvotaan ensimmäiset luvut
    min_lukuA = Number($("[name=ex]:checked").attr("data-min"));
    max_lukuA = Number($("[name=ex]:checked").attr("data-max"));
    luku1 = getRndInteger(min_lukuA, max_lukuA);
    luku2 = getRndInteger(min_lukuA, max_lukuA);
    if (luku1 < luku2) {
      luku3 = luku1;
      luku1 = luku2;
      luku2 = luku3;
    }
  //Oikea vastaus
    erotus = luku1 - luku2;
  //Tulostetaan luvut
    $("#box1").html(luku1);
    $("#box2").html(luku2);
  //Pidetään esitetyt kysymykset ajan tasalla kysymysten kokonaislukumäärästä + tämän tulostus
    kysEsi++;
    kys_lkm = Number($("[name=task]:checked").attr("data-task"));
    $("#q_info").html("Kysymys: " + kysEsi + "/" + kys_lkm);
  //Piilotetaan aloitus divit ja avataan lasku/tulos divit
    $("#cal_div").show();
    $("#score_div").show();
    $("#toCal_div").hide();
    $("#intro_div").hide();
    $("#choice_div").hide();
    $("#next_btn").hide();
  //Kohdistus input kenttään
    $("#answer").focus();
    $("#answer").val("");

  });

  // Tarkista-painike
  $("#check_btn").click(function() {
    //Pelaajan antama vastaus
    let tarkista = Number($("#answer").val());
    //Tarkistettava muuttuja, jotta pelaaja ei jätä tyhjää ruutua
    let tarkista2 = $("#answer").val();
    //Tässä tarkistetaan, että pelaaja vastaa kysymykseen
    if (tarkista2.length == 0) {
      alert ("Syötä vastauksesi");
      $("#answer").focus();
      return;
    }
    //Tarkistetaan vastaus, sekä tulostetaan pisteet/ikonit. Pisteet päivittyvät
    if (erotus === tarkista) {
      pisteet++;
      $("#score").html("Pisteesi: " + pisteet + "/" + kys_lkm);
      $("#icons").append(" " + pisteIko);
    } else {
      pisteet = pisteet;
      $("#score").html("Pisteesi: " + pisteet + "/" + kys_lkm);
      $("#icons").append(" " + VäärIko);
    }
    //Kun on tarkistettu, niin aukeaa Seuraava painike
    $("#next_btn").show();
    $(this).hide();
    
    //Lukitaan vastauskenttä
    $("#answer").prop("disabled", true);
  });

  // Seuraava-painike
  $("#next_btn").click(function() {
    //Kumotaan edelliset muutokset, jotka tehtiin riviltä 83 eteen päin
    $(this).hide();
    $("#check_btn").show();
    $("#answer").prop("disabled", false);
    //Päivitettän esitetyt kysymykset näytölle
    kysEsi++;
    kys_lkm = Number($("[name=task]:checked").attr("data-task"));
    $("#q_info").html("Kysymys: " + kysEsi + "/" + kys_lkm);
    //Jos esitetyt kysymykset eivät ole ylittäneet kysymysten kokonaismäärää, niin peli jatkuu  
    if (kysEsi <= kys_lkm) {
      $("#answer").focus();
      $("#answer").val("");
      //Lasketaan kuten aiemminkin. Kts. Laskemaan painike rivillä 29
      min_lukuA = Number($("[name=ex]:checked").attr("data-min"));
      max_lukuA = Number($("[name=ex]:checked").attr("data-max"));
      luku1 = getRndInteger(min_lukuA, max_lukuA);
      luku2 = getRndInteger(min_lukuA, max_lukuA);
      if (luku1 < luku2) {
        luku3 = luku1;
        luku1 = luku2;
        luku2 = luku3;
      }
      erotus = luku1 - luku2;

      $("#box1").html(luku1);
      $("#box2").html(luku2);
    // Jos esitetyt kysymykset ylittivät kysymysten kokonaislukumäärän, niin peli päättyy.
    // piilotetaan laskentadivi ja tuodaan esille tulosdivi
    } else {
      $("#cal_div").hide();
      $("#gz_div").show();
      //Muutetaan pisteet prosenttimuotoon, jotta tulosten lukeminen helpottuu + tulostetaan tulokset
      let pisteetPros = pisteet / kys_lkm;
      if (pisteetPros < 0.5) {
        $("#gz_text").html("Hyvä yritys! Aina ei voi onnistua, mutta aina voi harjoitella lisää. Yritetäänkö uudelleen?");        
      } else if (pisteetPros >= 0.5 && pisteetPros < 0.8) {
        $("#gz_text").html("Hienoa! Suunta on oikea. Kokeillaan uudelleen.");
      } else if (pisteetPros >= 0.8 && pisteetPros < 1) {
        $("#gz_text").html("Jes! Osaamisesi on lähes kiitettävää tasoa.");
      } else {
        $("#gz_text").html("Onnea!!! Täydet pisteet!");
      }
      //askeleet rakettianimaatiolle
      let askeleet = pisteetPros * 10;
      //animaatiot
      if (screen.width >= 1240) {
        $("#ani2").hide();
        $("#rocket").animate({left: 92 * askeleet}, 3000);        
      } else {
        $("#ani2").show();
        $("#ani").hide();
        $("#measure").hide();
      }

    }
  });
  //Uudestaan painike, jolla ladataan sivu uudelleen
  $("#again_btn").click(function() {
    location.reload();
  });

});
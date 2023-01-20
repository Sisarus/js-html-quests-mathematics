$(document).ready(function () {
    
    $("#aurinko").hover(function () {
        // jos animaatio luokkaa ei ole vielä lisätty, lisätään sellainen ja asetetaan ajastin
        if (!$(this).children().last().children().first().hasClass("fa-spin")) {
            // font awesome luo svg-elementin runtimessa 
            // joten haluttu elementti löytyy vasta lastenlapsista
            $(this).children().last().children().first().addClass("fa-spin");
            let duration = $("#aurinko").children().last().children().first().css("animation-duration"); // tallentuu sisäisesti aina sekunteina vaikka css-tiedostoon ajan voi asettaa myös millisekunteina
            let time = 0;
            let str = duration.slice(0,-1); // parsitaan css-arvo sekunneiksi
            time = Number(str) * 1000; // ja muutetaan se millisekunneiksi
            setTimeout(function () {
                $("#aurinko").children().last().children().first().removeClass("fa-spin");
            }, time);
        }
    });

   
});


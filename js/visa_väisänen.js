/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
let pisteet = 0;
let klikkaukset = 0;
$(document).ready(function(){ 
    //vastausten selitykset esille
    $(".form-check-input").click(function(){
        let arvo = $(this).attr("name"); 
        $("#" + arvo).show();
    });
    //vastausten valinta
    $(".form-check-input").click(function(){
        let vastaus = Number($(this).val()); 
        let tunnus = $(this).siblings().children().attr("id"); 
        
        
        if (vastaus === 1) {
            $(this).parent().addClass("valittu").addClass("oikein");
            $("#" + tunnus).show();
            
        }else {
            $(this).parent().addClass("väärin");
            $("#" + tunnus).show();
        
        let arvo = $(this).attr("name");         
        let valinta = "[name=" + arvo + "][value=1]";
        $(valinta).parent().addClass("oikein");
        
        }
        //estetään uudelleen valinta
        $(this).parent().addClass("valittu");
         
       let arvo = $(this).attr("name");  
        
        let valinta = $("[name=" + arvo + "]").prop("disabled", true); 
            
    });
//pisteet ja tulostus itsestään viimeisen vastauksen jälkeen        
    $("[name=sun]").click(function(){
       
       let vastaus = Number($(this).val());
       
       if (vastaus === 1) {
           pisteet++;
           klikkaukset++;
           $("#tulos").html(pisteet + " / 8 oikein.");
       }else {
           klikkaukset++;
           $("#tulos").html(pisteet + " / 8 oikein.");
       }
       
       if (klikkaukset === 8) {
            if (pisteet <= 4) {
                $("#palkinto").html("Pää pyörällä? Ei hätää, aina voi yrittää uudestaan.");
                $(".fa-meh").show(5000, 50000);
                    
            } else if(pisteet < 8) {
            $("#palkinto").html("Hyvä, melkein kaikki oikein. Haluaisitko yrittää uudestaan?");
            $(".fa-thumbs-up").slideDown(400);
            }
            else if (pisteet === 8) {
            $("#palkinto").html("8 / 8, vastauksesi oli täyttä timanttia!");
            $(".fa-gem").slideDown(400);
            }
        }
    });
    
    $("[name=eläin]").click(function(){
       
       let vastaus = Number($(this).val());
       
       if (vastaus === 1) {
           pisteet++;
           klikkaukset++;
           $("#tulos").html(pisteet + " / 8 oikein.");
       }else {
           klikkaukset++;
           $("#tulos").html(pisteet + " / 8 oikein.");
       }
       
       if (klikkaukset === 8) {
            if (pisteet <= 4) {
                $("#palkinto").html("Pää pyörällä? Ei hätää, aina voi yrittää uudestaan.");
                $(".fa-meh").show(5000, 50000);
                    
            } else if(pisteet < 8) {
            $("#palkinto").html("Hyvä, melkein kaikki oikein. Haluaisitko yrittää uudestaan?");
            $(".fa-thumbs-up").slideDown(400);
            }
            else if (pisteet === 8) {
            $("#palkinto").html("8 / 8, vastauksesi oli täyttä timanttia!");
            $(".fa-gem").slideDown(400);
            }
        }
    });
    
    $("[name=sivu]").click(function(){
       
       let vastaus = Number($(this).val());
       
       if (vastaus === 1) {
           pisteet++;
           klikkaukset++;
           $("#tulos").html(pisteet + " / 8 oikein.");
       }else {
           klikkaukset++;
           $("#tulos").html(pisteet + " / 8 oikein.");
       }
       
       if (klikkaukset === 8) {
            if (pisteet <= 4) {
                $("#palkinto").html("Pää pyörällä? Ei hätää, aina voi yrittää uudestaan.");
                $(".fa-meh").show(5000, 50000);
                    
            } else if(pisteet < 8) {
            $("#palkinto").html("Hyvä, melkein kaikki oikein. Haluaisitko yrittää uudestaan?");
            $(".fa-thumbs-up").slideDown(400);
            }
            else if (pisteet === 8) {
            $("#palkinto").html("8 / 8, vastauksesi oli täyttä timanttia!");
            $(".fa-gem").slideDown(400);
            }
        }
    });
    //kysymys 4
    $("[name=revontulet]").click(function(){
       
       let vastaus = Number($(this).val());
       
       if (vastaus === 1) {
           pisteet++;
           klikkaukset++;
           $("#tulos").html(pisteet + " / 8 oikein.");
       }else {
           klikkaukset++;
           $("#tulos").html(pisteet + " / 8 oikein.");
       }
       
       if (klikkaukset === 8) {
            if (pisteet <= 4) {
                $("#palkinto").html("Pää pyörällä? Ei hätää, aina voi yrittää uudestaan.");
                $(".fa-meh").show(5000, 50000);
                    
            } else if(pisteet < 8) {
            $("#palkinto").html("Hyvä, melkein kaikki oikein. Haluaisitko yrittää uudestaan?");
            $(".fa-thumbs-up").slideDown(400);
            }
            else if (pisteet === 8) {
            $("#palkinto").html("8 / 8, vastauksesi oli täyttä timanttia!");
            $(".fa-gem").slideDown(400);
            }
        }
    });
    
    $("[name=vesi]").click(function(){
       
       let vastaus = Number($(this).val());
       
       if (vastaus === 1) {
           pisteet++;
           klikkaukset++;
           $("#tulos").html(pisteet + " / 8 oikein.");
       }else {
           klikkaukset++;
           $("#tulos").html(pisteet + " / 8 oikein.");
       }
       
       if (klikkaukset === 8) {
            if (pisteet <= 4) {
                $("#palkinto").html("Pää pyörällä? Ei hätää, aina voi yrittää uudestaan.");
                $(".fa-meh").show(5000, 50000);
                    
            } else if(pisteet < 8) {
            $("#palkinto").html("Hyvä, melkein kaikki oikein. Haluaisitko yrittää uudestaan?");
            $(".fa-thumbs-up").slideDown(400);
            }
            else if (pisteet === 8) {
            $("#palkinto").html("8 / 8, vastauksesi oli täyttä timanttia!");
            $(".fa-gem").slideDown(400);
            }
        }
    });
    
    $("[name=nisäkäs]").click(function(){
       
       let vastaus = Number($(this).val());
       
       if (vastaus === 1) {
           pisteet++;
           klikkaukset++;
           $("#tulos").html(pisteet + " / 8 oikein.");
       }else {
           klikkaukset++;
           $("#tulos").html(pisteet + " / 8 oikein.");
       }
       
       if (klikkaukset === 8) {
            if (pisteet <= 4) {
                $("#palkinto").html("Pää pyörällä? Ei hätää, aina voi yrittää uudestaan.");
                $(".fa-meh").show(5000, 50000);
                    
            } else if(pisteet < 8) {
            $("#palkinto").html("Hyvä, melkein kaikki oikein. Haluaisitko yrittää uudestaan?");
            $(".fa-thumbs-up").slideDown(400);
            }
            else if (pisteet === 8) {
            $("#palkinto").html("8 / 8, vastauksesi oli täyttä timanttia!");
            $(".fa-gem").slideDown(400);
            }
        }
    });
    
    $("[name=kalat]").click(function(){
       
       let vastaus = Number($(this).val());
       
       if (vastaus === 1) {
           pisteet++;
           klikkaukset++;
           $("#tulos").html(pisteet + " / 8 oikein.");
       }else {
           klikkaukset++;
           $("#tulos").html(pisteet + " / 8 oikein.");
       }
       
       if (klikkaukset === 8) {
            if (pisteet <= 4) {
                $("#palkinto").html("Pää pyörällä? Ei hätää, aina voi yrittää uudestaan.");
                $(".fa-meh").show(5000, 50000);
                    
            } else if(pisteet < 8) {
            $("#palkinto").html("Hyvä, melkein kaikki oikein. Haluaisitko yrittää uudestaan?");
            $(".fa-thumbs-up").slideDown(400);
            }
            else if (pisteet === 8) {
            $("#palkinto").html("8 / 8, vastauksesi oli täyttä timanttia!");
            $(".fa-gem").slideDown(400);
            }
        }
    });
    
    $("[name=city]").click(function(){
       
       let vastaus = Number($(this).val());
       
       if (vastaus === 1) {
           pisteet++;
           klikkaukset++;
           $("#tulos").html(pisteet + " / 8 oikein.");
       }else {
           klikkaukset++;
           $("#tulos").html(pisteet + " / 8 oikein.");
       }
       
        if (klikkaukset === 8) {
            if (pisteet <= 4) {
                $("#palkinto").html("Pää pyörällä? Ei hätää, aina voi yrittää uudestaan.");
                $(".fa-meh").show(5000, 50000);
                    
            } else if(pisteet < 8) {
            $("#palkinto").html("Hyvä, melkein kaikki oikein. Haluaisitko yrittää uudestaan?");
            $(".fa-thumbs-up").slideDown(400);
            }
            else if (pisteet === 8) {
            $("#palkinto").html("8 / 8, vastauksesi oli täyttä timanttia!");
            $(".fa-gem").slideDown(400);
            }
        }
    });
    
    
    
    //stackoverflow.com/questions/5404839/how-can-i-refresh-a-page-with-jquery
    $("#uudestaan").click(function() {
    location.reload();
    });
    

});



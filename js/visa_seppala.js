$(document).ready(function () {

    // Pisteet + valitut vaihtoehdot
    let clicks = 0;
    let count = 0;

    // Napilla avataan kysymys indeksi
    $("#intro_btn").click(function() {
        $(this).addClass("invisible");
    });

    // Valitut vaihtoehdot + oikein/väärin
    $(".answer").click(function() {
        let attr = $(this).attr("name");
        let choice = "[name=" + attr + "]";
        let ans = Number($(choice).val());

        $(choice).prop("disabled", true);
        
        if (ans === 1) {
            $(choice).css({"background-color": "lightgreen"});
            let wrong_ans = $(choice).parent().find("[value=0]");
            $(wrong_ans).css({"background-color": "red"});
        } else {
            $(choice).css({"background-color": "red"});
            let right_ans = $(choice).parent().find("[value=1]");
            $(right_ans).css({"background-color": "lightgreen"});
        }

        // Lisätietoikkuna avautuu jokaisen kysymysikkunan alle
        if ($(choice).hasClass("q1")) {
            $("#a_info").addClass("visible").removeClass("invisible");
        } else if ($(choice).hasClass("q2")) {
            $("#b_info").addClass("visible").removeClass("invisible");
        }  else if ($(choice).hasClass("q3")) {
            $("#c_info").addClass("visible").removeClass("invisible");
        }  else if ($(choice).hasClass("q4")) {
            $("#d_info").addClass("visible").removeClass("invisible");
        }  else if ($(choice).hasClass("q5")) {
            $("#e_info").addClass("visible").removeClass("invisible");
        }  else if ($(choice).hasClass("q6")) {
            $("#f_info").addClass("visible").removeClass("invisible");
        }  else if ($(choice).hasClass("q7")) {
            $("#g_info").addClass("visible").removeClass("invisible");
        }  else if ($(choice).hasClass("q8")) {
            $("#h_info").addClass("visible").removeClass("invisible");
        }  else if ($(choice).hasClass("q9")) {
            $("#i_info").addClass("visible").removeClass("invisible");
        } else { 
            $("#j_info").addClass("visible").removeClass("invisible");
        }
    });

    // Lasketaan pisteet + vaihtoehdot
    $(".answer").click(function() {
        if ($(this).val() === "1") {
            count++;
        } else {
            count = count;
        }

        clicks++;
        if (clicks === 10) {
            $("#result_btn").addClass("visible").removeClass("invisible");
        }
    });

    // Tulokset -tekstit
    $("#result_btn").click(function() {
        if (count < 5) {
            $("#gz_text").html("Hyvä yritys, mutta ehkäpä aiheen kertaus olisi paikallaan?");
        } else if (count >= 5 && count <= 7) {
            $("#gz_text").html("Perustietämys on hanskassa, mutta pieni kertaus voisi tehdä ihmeitä?");
        } else if (count > 7 && count <= 9) {
            $("#gz_text").html("Hienosti tehty. Pientä viilausta, niin hyvä tulee!!!");
        } else if (count === 10) {
            $("#gz_text").html("Täydet pisteet, onneksi olkoon!!! Nyt voit taputtaa itseäsi olalle."); 
        }

        $("#result_text").html("Pisteet: " + count + "/10");
    });

    // Tulokset -animaatio
    $("#result_btn").click(function() {
        if(screen.width >= 1240) {
        $(".fa-space-shuttle").animate({left: 92 * count}, 3000);
        $(".fa-star").hide();
        } else {
            $(".fa-space-shuttle").hide();
            $(".fa-flag-checkered").hide();
            $("#measure").hide();
            $(".fa-star").show();
        }
    });

    // Resetoi visa
    $("#again_btn").click(function() {
        location.reload();
    });

});
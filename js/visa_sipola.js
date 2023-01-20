// Henri Sipola

$(document).ready(function () {

    let nQuestions = 0; // number of questions
    let questionsShown = 0; 
    let answersRight = 0; 
    let answersWrong = 0;  
    let timerHandle; // handle for the answer-timer    
    let timeLeft = 0;

    // award icon elements
    let rightIcon = '<i class="fa fa-globe-americas fa-2x text-success mr-1" id="right-icon" aria-hidden="true"></i>';
    let allRightIcon = '<i class="fas fa-star fa-2x text-warning" id="palkkio"></i>';
    let wrongIcon = '<i class="fas fa-splotch fa-2x text-danger mr-1" aria-hidden="true"></i>';
    let paddingIcon = '<i class="fas fa-dot-circle gray mr-1" aria-hidden="true"></i>';
    let awards = "";

    // Result printouts
    const Printouts = {
        none: "Harmillista, et saanut yhtään vastausta oikein. Maantieto taitaa olla vieras aihe sinulle. Yritä uudelleen niin opit!",
        some: "Hyvä, sait osan vastauksista oikein. Yritä uudelleen ja kokeile saisitko loputkin!",
        half: "Hienoa, sait yli puolet vastauksista oikein. Yritä uudelleen ja kokeile saisitko loputkin!",
        almost: "Mahtavaa, sait melkein kaikki vastaukset oikein. Yritä vielä uudelleen ja kokeile saada kaikki oikein!",
        all: "Erinomaista, tiesit kaikki vastaukset! Olet maantiedon mestari!"
    };

    // Fisher-Yates shuffle
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let t = array[i];
            array[i] = array[j];
            array[j] = t;
        }
    }

    /**
     * Container to hold question data and process validation.
     */
    class Question {
        /**
         * Class constructor
         * @param {string} question     question
         * @param {array} options       string array of options
         * @param {string} answer       correct answer
         * @param {string} tidbit       extra information about the answer
         */
        constructor(question, options, answer, tidbit) {
            this._question = question;
            this.options = options;
            this.answer = answer;
            this.tidbit = tidbit;
        }

        get question() {
            return this._question;
        }
        get options() {
            return this._options;
        }
        get answer() {
            return this._answer;
        }
        get tidbit() {
            return this._tidbit;
        }

        set question(question) {
            this._question = question;
        }
        set options(options) {
            this._options = options;
        }
        set answer(answer) {
            this._answer = answer;
        }
        set tidbit(tidbit) {
            this._tidbit = tidbit;
        }

        /**
         * Test if string is equal to correct answer.
         * @param {string} selection    string to test
         * @return {boolean}       returns true if answer is correct.
         */
        isCorrectAnswer(selection) {
            return selection === this.answer;
        }
    }

    // all the quiz questions in one place
    let questions = [
        new Question("Mikä seuraavista on Ruotsin pääkaupunki?", ["Oslo", "Tukholma", "Kööpenhamina", "Helsinki"], "Tukholma",
            "Ruotsin pääkaupunki on Tukholma, Suomen pääkaupunki on Helsinki, Norjan pääkaupunki on Oslo ja Tanskan pääkaupunki on Kööpenhamina."),
        new Question("Mikä Seuraavista valtioista ei kuulu pohjoismaihin?", ["Norja", "Suomi", "Viro", "Tanska"], "Viro",
            "Viro kuuluu Baltian maiden joukkoon."),
        new Question("Missä suomen kaupungissa on eniten asukkaita?", ["Helsinki", "Oulu", "Turku", "Rovaniemi"], "Helsinki",
            "Helsingissä asuu yli kaksi kertaa enemmän asukkaita kuin Suomen toiseksi suurimmassa kaupungissa Espoossa."),
        new Question("Mikä seuraavista valtioista ei kuulu Eurooppaan?", ["Espanja", "Egypti", "Norja", "Saksa"], "Egypti",
            "Egypti sijaitsee Pohjois-Afrikassa."),
        new Question("Mikä on pinta-alaltaan maailman suurin valtio?", ["Australia", "Venäjä", "Kiina", "Brasilia"], "Venäjä",
            "Venäjän pinta-ala on lähes kaksi kertaa suurempi kuin seuraavana tulevalla Kanadalla."),
        new Question("Mikä seuraavista kaupungeista sijaitsee pohjoisimpana?", ["Helsinki", "Tampere", "Oulu", "Rovaniemi"], "Rovaniemi",
            "Rovaniemi sijaitsee pohjoisen napapiirin rajalla."),
        new Question("Mikä on pinta-alaltaan Euroopan pienin valtio?", ["Malta", "Vatikaani", "Luxemburg", "Monaco"], "Vatikaani",
            "Vatikaanin pinta-ala on vain 44 hehtaaria."),
        new Question("Minkä kaupungin läpi virtaa Thames-joki?", ["Lontoo", "Berliini", "Budabest", "Tukholma"], "Lontoo",
            "Thamesin kokonaispituus on 335 kilometriä, se virtaa myös muunmuassa Oxfordin läpi."),
    ];

    /**
     * Replaces award section padding icons with right or wrong icon.
     */
    function updateAwards() {
        let questionsLeft = nQuestions - questionsShown;
        let padding = "";
        for (let i = 0; i < questionsLeft; i++) {
            padding += paddingIcon;
        }
        let output = awards + padding;
        $("#awards").html(output);
    }

    /**
     * Resets quiz for a new game.
     */
    function setupQuiz() {
        shuffle(questions);
        answersRight = 0;
        answersWrong = 0;
        questionsShown = 0;
        nQuestions = questions.length;
        awards = "";
        updateAwards();
    }

    /**
     * Starts and resets answer-time timer.
     */
    function startTimer() {
        clearTimeout(timerHandle);
        updateProgressBar(100);
        timeLeft = 10;
        timerHandle = setInterval(timer, 1000);
    }

    /**
     * Locks empty answer when timer finishes.
     */
    function timesUp() {
        clearTimeout(timerHandle);
        lockAnswer("");
    }

    /**
     * Lock-down and process user answer.
     * @param {html-element} selection  answer-element
     */
    function lockAnswer(selection) {
        let answer = $(selection).attr("data-value"); // extract answer from element
        if (questions[questionsShown - 1].isCorrectAnswer(answer) && answer !== "") { // test answer
            answersRight++;
            awards += rightIcon;
        }
        else {
            answersWrong++;
            awards += wrongIcon;
            $(selection).parent().addClass("wrongAnswer");
        }
        // update visuals
        updateAwards();
        $("#tidbit").html(questions[questionsShown - 1].tidbit);
        $("#tidbit-box").show();

        // disable options
        let children = $(".options-area").children();
        $(children).each(function () {
            $(this).children().first().prop("disabled", true);

            if (questions[questionsShown - 1].isCorrectAnswer($(this).children().first().attr("data-value"))) {
                $(this).addClass("rightAnswer");
            }
        });
        clearTimeout(timerHandle); // stop timer
        if (questionsShown < nQuestions) {
            $("#seuraava").show();
        }
        else {
            $("#show-tulos").show();
        }
    }

    /**
     * Updates progress-bar animation and changes bar color.
     * @param {Number} value    current progress-bar value between 0 and 100
     */
    function updateProgressBar(value) {
        $(".progress-bar").attr("aria-valuenow", value);
        $(".progress-bar").css("width", value + "%");
        switch (value) {
            case 100:
                $(".progress-bar").removeClass("warning");
                $(".progress-bar").removeClass("danger");
                $(".progress-bar").addClass("ok");
                break;
            case 70:
                $(".progress-bar").removeClass("ok");
                $(".progress-bar").removeClass("danger");
                $(".progress-bar").addClass("warning");
                break;
            case 30:
                $(".progress-bar").removeClass("ok");
                $(".progress-bar").removeClass("warning");
                $(".progress-bar").addClass("danger");
                break;
            case 0:
                timesUp();
                break;
        }
    }

    /**
     * Timer function to tick down time and call progress-bar update.
     */
    function timer() {
        timeLeft--;
        updateProgressBar(timeLeft * 10);
    }

    /**
     * Selects random question from question-pool and prints it to screen.
     */
    function getNextQuestion() {
        $(".options-area").html(""); // clear old question
        let currentQuestion = questions[questionsShown];
        let question = currentQuestion.question;
        $("#question").html(question);

        // shuffle options for current question
        shuffle(currentQuestion.options);
        // print options
        for (let i = 0; i < currentQuestion.options.length; i++) {
            let option =
                "<div class='col-12 display-inline custom-control custom-radio m-2'>" +
                "<input type='radio' id='option_" + i + "' name='options' class='custom-control-input' data-value='" + currentQuestion.options[i] + "'>" +
                "<label class='custom-control-label m-1' id='label_" + i + "' for='option_" + i + "'>" +
                currentQuestion.options[i] + "</label></div>";
            $(".options-area").append(option);
        }
        startTimer(); // start answer timer
        questionsShown++;
        $("#tidbit").html(""); // clear old answer
        $(".questions").show();
    }

    /**
     * Start a new quiz.
     */
    $("#aloita").click(function () {
        $(".intro").hide(); // hide intro
        setupQuiz();
        getNextQuestion();
    });

    /**
     * Process selected option. On body element, because options added on runtime. 
     */
    $("body").on("click", "[name=options]", function () {
        let answer = $(this).attr("data-value");
        let selection = $(this);
        lockAnswer(selection);
    });

    /**
     * Move to next question.
     */
    $("#seuraava").click(function () {
        $("#seuraava").hide();
        $("#tidbit").html("");
        $("#tidbit-box").hide();
        getNextQuestion();
    });

    /**
     * Show results screen, hides questions screen.
     */
    $("#show-tulos").click(function () {
        $(".questions").hide();
        $("#tidbit-box").hide();
        $("#show-tulos").hide();
        $("#tulos-awards").html(awards);
        let prosentti = answersRight / nQuestions;
        let tuloste = "";
        if (prosentti == 0) {
            tuloste = Printouts.none;
        }
        else if (prosentti <= .5) {
            tuloste = Printouts.some;
        }
        else if (prosentti <= .75) {
            tuloste = Printouts.half;
        }
        else if (prosentti < 1) {
            tuloste = Printouts.almost;
        }
        else if (prosentti == 1) {
            tuloste = Printouts.all;
            awards = allRightIcon;
        }
        $("#tulos-awards").html(awards);
        $("#tulos-info").html(tuloste);
        $(".tulos").show();
    });

    /**
     * Start a new quiz.
     */
    $("#uudestaan").click(function () {
        $(".tulos").hide();
        setupQuiz();
        getNextQuestion();
    });
});
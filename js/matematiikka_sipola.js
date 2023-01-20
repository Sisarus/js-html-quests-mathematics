// Henri Sipola

$(document).ready(function () {

    // levels objects
    let easy = {
        min: 1,
        max: 5,
        highScore: 0,
        color: "#07ce03",
        name: "Helppo"
    };

    let medium = {
        min: 3,
        max: 7,
        highScore: 0,
        color: "#46afff",
        name: "Keskitaso"
    }

    let hard = {
        min: 5,
        max: 10,
        highScore: 0,
        color: "#d90502",
        name: "Vaikea"
    }

    // global variables
    let currentLevel;
    let correctAnswer;
    let lastDenominator;
    let timerHandle;
    let score = 0;
    const answerTime = 30;

    // price icons
    let icon = '<i class="far fa-gem fa-3x grayed-out"></i>';
    let fullIcon = '<i class="fas fa-gem fa-3x"></i>';

    // set level to easy by default at startup
    updateSelectionIcons($(".level").first()); 

    /**
     * Creates random new question based on the currently selected level.
     */
    function newQuestion() {
        $("#answer").html("");
        let denominator = 0;
        let failure;
        do {
            failure = false;
            denominator = getRndInteger(currentLevel.min, currentLevel.max);
            if (denominator === lastDenominator) { // no same question twice in a row (atleast not in the same order)
                failure = true;
            }
        } while (failure);
        lastDenominator = denominator; // store last used denominator
        correctAnswer = getRndInteger(currentLevel.min, currentLevel.max);
        let numerator = denominator * correctAnswer;
        $("#numerator").html(numerator);
        $("#denominator").html(denominator);
    }

    // from: https://www.w3schools.com/js/js_random.asp
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
   * Starts and resets answer-time timer.
   */
    function startTimer() {
        clearTimeout(timerHandle);
        updateProgressBar(100);
        timeLeft = answerTime;
        timerHandle = setInterval(timer, 1000);
    }

    /**
     * Updates stored highscores if new score is greater.
     */
    function updateScores() {
        if (currentLevel.highScore < score) {
            currentLevel.highScore = score;
            $(".new-highscore").show();
        }
        else {
            $(".new-highscore").hide();
        }
        $("#easy-score").html("Paras tulos " + easy.highScore);
        $("#medium-score").html("Paras tulos " + medium.highScore);
        $("#hard-score").html("Paras tulos " + hard.highScore);
    }

    /**
     * Reset game by resetting score and animations.
     * Start timer and fetch first question.
     */
    function initGame() {
        score = 0;
        $("#points").html(score);
        $(".question").removeClass("correct");
        $(".question").removeClass("incorrect");
        $("#points").removeClass("correct");
        $("#points").removeClass("incorrect");
        startTimer();
        newQuestion();
    }

    /**
     * Finishes game, updates scores and shows result screen.
     */
    function timesUp() {
        clearTimeout(timerHandle);
        updateScores();
        $("#result-gem").css("color", currentLevel.color);
        $("#new-highscore-lvl").html(currentLevel.name);
        $("#new-highscore-lvl").css("color", currentLevel.color);
        let resultText;
        if (score > 0) {
            resultText = "Sait " + score + " pistettä!"
        }
        else {
            resultText = "Sait " + score + " pistettä. Ei hätää, pelaa uudestaan!"
        }
        $("#game-result").html(resultText);
        $(".game").hide();
        $(".results").show();
    }

    /**
     * Timer function to tick down once every second.
     */
    function timer() {
        timeLeft--;
        updateProgressBar(timeLeft / answerTime * 100);
    }

    /**
     * Update level selection icons. Reset all to default and update 
     * selected to full-icon.
     * @param {html-element} element    html-element that was clicked. 
     */
    function updateSelectionIcons(element) {
        $(".level").html(icon);
        $(element).html(fullIcon);
        currentLevel = checkSelection($(element).attr("data-value"));
        $(element).children().first().css("color", currentLevel.color);
    }

    /**
     * Updates progress-bar animation.
     * @param {Number} value    current progress-bar value between 0 and 100
     */
    function updateProgressBar(value) {
        $(".progress-bar").attr("aria-valuenow", value);
        $(".progress-bar").css("width", value + "%");
        if (value <= 0) {
            timesUp();
        }
    }

    /**
     * Finds level object by input data name.
     * @param {String} name    name to check
     * @returns {Object}       returns matching object or null if not found
     */
    function checkSelection(name) {
        switch (name) {
            case "easy":
                return easy;
            case "medium":
                return medium;
            case "hard":
                return hard;
        }
        return null;
    }

    /**
     * Start a new game.
     * Hide intro and init game.
     */
    $("#start-btn").click(function () {
        $(".intro").hide();
        initGame();
        $(".game").show();
    });

    /**
     * Keypad number press.
     * Checks input against lengt-limit and prints it to screen.
     */
    $(".keyboard-number-btn").click(function () {
        let number = Number($(this).val());
        let answer = $("#answer");
        if ($(answer).html().length < 2) { // maximum two digit number areas
            $(answer).append(number);
        }
    });

    /**
     * Keyboard cancel press.
     * Removes last input if any.
     */
    $("#keyboard-cancel-btn").click(function () {
        let read = $("#answer").html();
        let length = read.length;
        if (length > 1) {
            read = read.substr(0, length - 1);
        }
        else {
            read = "";
        }
        $("#answer").html(read);
    });

    /**
     * Keyboard return press.
     * Process answer and play animations.
     */
    $("#keyboard-return-btn").click(function () {
        let answer = Number($("#answer").html());
        $(".question").removeClass("correct");
        $(".question").removeClass("incorrect");
        $("#points").removeClass("incorrect-text");
        $("#points").removeClass("correct-text");
        $(".question").width(); // trigger page reflow, needed to reset animations

        if (answer === correctAnswer) {
            $(".question").addClass("correct");
            $("#points").addClass("correct-text");
            score += 50;
            newQuestion();
        }
        else {
            $(".question").addClass("incorrect");
            $("#points").addClass("incorrect-text");
            score -= 5;
        }
        $("#points").html(score);
    });

    /**
     * Back to start.
     * Hide results screen and reveal intro screen.
     */
    $("#back-btn").click(function () {
        $(".results").hide();
        $(".intro").show();
    });

    /**
     * Select level.
     * Store selected level and update visuals.
     */
    $(".level").click(function () {
        currentLevel = checkSelection($(this).attr("data-value"));
        updateSelectionIcons(this);
    });

    /**
     * Hover level selection.
     * Add and remove dropdown shadow to selection on mouse enter and exit.
     */
    $(".level").hover(function () {
        let color = checkSelection($(this).attr("data-value")).color;
        $(this).children().first().css("filter", "drop-shadow(0px 0px 1.5em " + color + ")");
    },
        function () {
            $(this).children().first().css("filter", "");
        });
});
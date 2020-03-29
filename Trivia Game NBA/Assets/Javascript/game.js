let questionslist = {};
let trivia = {};

let questions;
let answers = ["B", "D", "A", "B", "D", "A", "B", "D"];

let intervalID;
timer = {

    time: 120,

    start: function () {
        $("#timer-display").text("02:00");
        intervalID = setInterval(timer.countdown, 1000);
    },

    countdown: function () {
        timer.time--;
        let currentTime = timer.timeConverter(timer.time);
        $("#timer-display").text(currentTime);

        if (timer.time === 0) {
            $("#timer-display").text("You Fail!");
            clearInterval(intervalID);
            $(".done, .question-block").hide();
            score();
            $(".results, .reset").show();
        } else {

        }
    },

    reset: function () {
        timer.time = 120;
        $("#timer-display").text("02:00");
        clearInterval(intervalID);
    },

    timeConverter: function (t) {
        let minutes = Math.floor(t / 60);
        let seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },

};


function startTrivia() {
    questionslist = resetQuestions();
    trivia = resetTrivia();

    showQuestions();

}

function resetTrivia() {
    return {
        correct: 0,
        incorrect: 0,
        blank: 0,
    }
}

function resetQuestions() {
    return {
        q0: {
            question: "What NBA team has the most NBA Champiosnhips?",
            A: "Boston Celtics",
            B: "Los Angelas Lakers",
            C: "Golden State Warriors",
            D: "Chicago Bulls",
        },
        q1: {
            question: "How many NBA teams are there?",
            A: "28",
            B: "25",
            C: "32",
            D: "30",
        },
        q2: {
            question: "Who has the most points in a single game, at 100?",
            A: "Wilt Chamberlain",
            B: "Kobe Bryant",
            C: "Lebron James",
            D: "Michael Jordan",
        },
        q3: {
            question: "Who is the all time leader in assists?",
            A: "Jason Kidd",
            B: "John Stockton",
            C: "Steve Nash",
            D: "Chris Paul",
        },
        q4: {
            question: "Who is the NBA logo?",
            A: "Larry Bird.",
            B: "Magic Johnson.",
            C: "Michael Jordan.",
            D: "Jerry West.",
        },
        q5: {
            question: "How many NBA Finals appearances does Lebron James have?",
            A: "9",
            B: "8",
            C: "7",
            D: "6",
        },
        q6: {
            question: "What player has the most MVP awards, with 6?",
            A: "Michael Jordan",
            B: "Kareem Abdul-Jabbar",
            C: "Lebron James",
            D: "Steve Nash",
        },
        q7: {
            question: "Which players has the record for most 3pt makes in a game?",
            A: "Larry Bird",
            B: "Ray Allen",
            C: "Steph Curry",
            D: "Klay Thompson",
        }
    }
}

function showQuestions() {
    questions = Object.keys(questionslist);
    for (var i = 0; i < questions.length; i++) {
        var questiontitle = questions[i];
        var question = questionslist[questiontitle];
        var questionblocks = createQuestions(question, questiontitle);
        $(".question-block").append(questionblocks).show();
    }
}

function createQuestions(question, key) {
    var block = $("<div class='question' name='" + key + "'>" + question.question + "" +
        "<ul>" +
        "<li><input type='radio' name='" + key + "' value='A'><label>" + question.A + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='B'><label>" + question.B + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='C'><label>" + question.C + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='D'><label>" + question.D + "</label></li>" +
        "</ul>");

    return block;
}

function score() {
    let playeranswers = [$("input:radio[name='q0']:checked").val(),
        $("input:radio[name='q1']:checked").val(),
        $("input:radio[name='q2']:checked").val(),
        $("input:radio[name='q3']:checked").val(),
        $("input:radio[name='q4']:checked").val(),
        $("input:radio[name='q5']:checked").val(),
        $("input:radio[name='q6']:checked").val(),
        $("input:radio[name='q7']:checked").val()];

    console.log(playeranswers);
    console.log(answers);

    for (k = 0; k < questions.length; k++) {
        if (playeranswers[k] === undefined) {
            trivia.blank++;
        } else if (playeranswers[k] === answers[k]) {
            trivia.correct++;
        } else {
            trivia.incorrect++;
        }

    }

    $("#correct").text("Correct: " + trivia.correct);
    $("#incorrect").text("Incorrect: " + trivia.incorrect);
    $("#unanswered").text("Unanswered: " + trivia.blank);

    console.log(trivia.correct);
    console.log(trivia.incorrect);
    console.log(trivia.blank);
}


$(document).ready(function () {

    $(".start").on("click", function () {
        $(".start").hide();
        startTrivia();
        timer.start();
        $(".done").show();

    });

    $(".done").on("click", function () {
        score();
        $(".done, .question-block").hide();
        timer.reset();
        $(".results, .reset").show();
    });

    $(".reset").on("click", function () {
        $(".question-block").empty();
        $(".start").show();
        $(".reset, .results").hide();
        timer.reset();
    });
});
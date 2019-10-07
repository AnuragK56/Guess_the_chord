(function() {
  var allQuestions = [
    {
      question: "Guess the  which chord is playing",
      options: ["A minor ", "A major", "B major", "B minor"],
      audio: "A_major_chord.mp3",
      answer: 2
    },
    {
      question: "Guess the  which chord is playing",
      options: ["D minor ", "D major", "G minor", "G major"],
      audio: "G_major_chord.mp3",
      answer: 3
    },
    {
      question: "Guess the  which chord is playing",
      options: ["C major ", "G major", "A minor", "C minor"],
      audio: "C_minor_chord.mp3",
      answer: 3
    },
    {
      question: "Guess the  which chord is playing",
      options: ["D minor ", "D major", "G minor", "G major"],
      audio: "D_major_chord.mp3",
      answer: 1
    },
    {
      question: "Guess the  which chord is playing",
      options: ["E minor ", "E major", "F minor", "F major"],
      audio: "E_major_chord.mp3",
      answer: 1
    }
  ];

  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $("#quiz");

  nextQuestion();

  $("#next").click(function() {
    chooseOption();
    if (isNaN(selectOptions[quesCounter])) {
      alert("Please select an option !");
    } else {
      quesCounter++;
      nextQuestion();
    }
  });

  $("#prev").click(function() {
    chooseOption();
    quesCounter--;
    nextQuestion();
  });

  function createElement(index) {
    var element = $("<div>", { id: "question" });
    var header = $("<h2>Question No. " + (index + 1) + " :</h2>");
    element.append(header);
    var audio = new Audio(allQuestions[index].audio);
    audio.play();
    var question = $("<p>").append(allQuestions[index].question);
    element.append(question);

    var radio = radioButtons(index);
    element.append(radio);

    return element;
  }

  function radioButtons(index) {
    var radioItems = $("<ul>");
    var item;
    var input = "";
    for (var i = 0; i < allQuestions[index].options.length; i++) {
      item = $("<li>");
      input = '<input type="radio" name="answer" value=' + i + " />";
      input += allQuestions[index].options[i];
      item.append(input);
      radioItems.append(item);
    }
    return radioItems;
  }

  function chooseOption() {
    selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
  }

  function nextQuestion() {
    quizSpace.fadeOut(function() {
      $("#question").remove();
      if (quesCounter < allQuestions.length) {
        var nextQuestion = createElement(quesCounter);
        quizSpace.append(nextQuestion).fadeIn();
        if (!isNaN(selectOptions[quesCounter])) {
          $("input[value=" + selectOptions[quesCounter] + "]").prop(
            "checked",
            true
          );
        }
        if (quesCounter === 1) {
          $("#prev").show();
        } else if (quesCounter === 0) {
          $("#prev").hide();
          $("#next").show();
        }
      } else {
        var scoreRslt = displayResult();
        quizSpace.append(scoreRslt).fadeIn();
        $("#next").hide();
        $("#prev").hide();
      }
    });
  }

  function displayResult() {
    var score = $("<p>", { id: "question" });
    var correct = 0;
    for (var i = 0; i < selectOptions.length; i++) {
      if (selectOptions[i] === allQuestions[i].answer) {
        correct++;
      }
    }
    score.append("You scored " + correct + " out of " + allQuestions.length);
    return score;
  }
})();

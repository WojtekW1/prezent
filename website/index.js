const questions = [
    {
      question: "Jakie jest tradycyjne świąteczne danie w Polsce?",
      answers: ["Barszcz z uszkami", "Pierogi z mięsem", "Bigos", "Rosół"],
      correct: 0,
    },
    {
      question: "Ile jest nóg reniferów ciągnących sanie Świętego Mikołaja?",
      answers: ["4", "6", "8", "12"],
      correct: 2,
    },
    {
      question: "Jak nazywa się największy pomocnik Świętego Mikołaja?",
      answers: ["Rudolph", "Elf", "Frosty", "Śnieżynka"],
      correct: 1,
    },
    {
      question: "Czy byłaś grzeczna w tym roku?",
      answers: ["Tak", "Nie", "Może", "Nie wiem"],
      isFinal: true,
      dialogs: [
        {
          text: "Brawo! Święty Mikołaj Cię chwali! 🎉",
          option1: { text: "Przyjmuję nagrodę", isCorrect: true },
          option2: { text: "Nie zasługuję", isCorrect: false },
        },
        {
          text: "Ojej, musisz się poprawić! 🎅",
          option1: { text: "Zacznę od nowa", isCorrect: false },
          option2: { text: "Może jednak coś dostanę?", isCorrect: true },
        },
        {
          text: "Może... a może nie? 🎁",
          option1: { text: "Spróbuję ponownie", isCorrect: false },
          option2: { text: "Przekonaj mnie", isCorrect: true },
        },
        {
          text: "Nie wiem, ale warto próbować! 🤔",
          option1: { text: "Nie chcę nagrody", isCorrect: false },
          option2: { text: "Wezmę szansę!", isCorrect: true },
        },
      ],
    },
  ];
  
  let currentQuestionIndex = 0;
  
  const questionElement = document.getElementById("question");
  const answersElement = document.getElementById("answers");
  const nextButton = document.getElementById("next-button");
  const resultContainer = document.getElementById("result-container");
  const quizContainer = document.getElementById("quiz-container");
  const resultMessage = document.getElementById("result-message");
  const restartButton = document.getElementById("restart-button");
  const downloadButton = document.getElementById("download-button");
  const dialogContainer = document.getElementById("dialog-container");
  const dialogText = document.getElementById("dialog-text");
  const dialogOption1 = document.getElementById("dialog-option1");
  const dialogOption2 = document.getElementById("dialog-option2");
  
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = "";
  
    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.addEventListener("click", () => selectAnswer(index));
      answersElement.appendChild(button);
    });
  
    nextButton.classList.add("hidden");
  }
  
  function selectAnswer(index) {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (currentQuestion.isFinal) {
      showDialog(index); // Wywołanie unikalnego dialogu dla ostatniego pytania
      return;
    }
  
    const isCorrect = index === currentQuestion.correct;
  
    Array.from(answersElement.children).forEach((button, i) => {
      button.disabled = true;
      if (i === currentQuestion.correct) {
        button.classList.add("correct");
      } else {
        button.classList.add("wrong");
      }
    });
  
    if (!isCorrect) {
      endQuiz(false);
      return;
    }
  
    if (currentQuestionIndex < questions.length - 1) {
      nextButton.classList.remove("hidden");
    } else {
      endQuiz(true);
    }
  }
  
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    loadQuestion();
  });
  
  restartButton.addEventListener("click", restartQuiz);
  
  function showDialog(index) {
    const dialog = questions[currentQuestionIndex].dialogs[index];
    dialogContainer.classList.remove("hidden");
    dialogText.textContent = dialog.text;
    dialogOption1.textContent = dialog.option1.text;
    dialogOption2.textContent = dialog.option2.text;
  
    dialogOption1.onclick = () => handleDialogOption(dialog.option1.isCorrect);
    dialogOption2.onclick = () => handleDialogOption(dialog.option2.isCorrect);
  }
  
  function handleDialogOption(isCorrect) {
    dialogContainer.classList.add("hidden");
  
    if (isCorrect) {
      endQuiz(true);
    } else {
      endQuiz(false);
    }
  }
  
  function endQuiz(success) {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
  
    if (success) {
      resultMessage.textContent = "Gratulacje! Odpowiedziałeś poprawnie na wszystkie pytania! 🎄";
      downloadButton.classList.remove("hidden"); // Pokaż przycisk pobierania
      restartButton.classList.remove("hidden");
      restartButton.textContent = "🎉 Zagraj ponownie 🎉";
    } else {
      resultMessage.textContent = "Niestety, coś poszło nie tak. Spróbuj ponownie! 🎅";
      restartButton.classList.remove("hidden");
      downloadButton.classList.add("hidden"); // Ukryj przycisk pobierania
    }
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    downloadButton.classList.add("hidden");
    dialogContainer.classList.add("hidden");
    loadQuestion();
  }
  
  loadQuestion();
  
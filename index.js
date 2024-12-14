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
        question: "Co było pierwsze?",
        answers: ["Prada Milano", "Egzamin Lech", "Torba Max", "Szkolenie Online"],
        correct: 2,
    },
    {
        question: "Dokąd prowadzą wszystkie drogi?",
        answers: ["Do Rzymu", "Na Czereśniową", "Do Legendii", "Na Wawel"],
        correct: 3,
    },
    {
        question: "Twój dom to...",
        answers: ["Olio", "KFC", "Max Burgers", "Kebab King"],
        correct: 0,
    },
    {
        question: "Kto następnym razem gasi światło i otwiera i zamyka okno na wyjeździe?",
        answers: ["Duch", "Maja", "Wojtek", "Obydwoje"],
        correct: 2,
    },
    {
        question: "Co jest moim żywiołem?",
        answers: ["Woda", "Powietrze", "Ziemia", "Ogień"],
        correct: 1,
    },
    {
      question: "Czy byłaś grzeczna w tym roku?",
      answers: ["Tak", "Nie", "Może", "Nie wiem"],
      isFinal: true,
      dialogs: [
        {
          text: "Brawo! Gwiazdka jest z Ciebie dumna! 🎉",
          option1: { text: "Przyjmuję prezent", isCorrect: true },
          option2: { text: "Nie zasługuję", isCorrect: false },
        },
        {
          text: "Ojej, musisz się poprawić! 🎅",
          option1: { text: "Zacznę quiz od nowa", isCorrect: false },
          option2: { text: "Może jednak coś dostanę?", isCorrect: true },
        },
        {
          text: "Może... a może nie? 🎁",
          option1: { text: "Spróbuję ponownie", isCorrect: false },
          option2: { text: "Przekonaj mnie", isCorrect: true },
        },
        {
          text: "Nie wiem, ale warto próbować! 🤔",
          option1: { text: "Nie chcę prezentu", isCorrect: false },
          option2: { text: "Chcę prezent!", isCorrect: true },
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
  downloadButton.style.display = "none";
  downloadButton.classList.add("hidden");

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
    showDialog(index);
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
  endQuiz(isCorrect);
}

function endQuiz(success) {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  downloadButton.style.display = "none";
  downloadButton.classList.add("hidden");

  if (success) {
    resultMessage.textContent = "Gratulacje! Odpowiedziałeś poprawnie na wszystkie pytania! 🎄";
    downloadButton.style.display = "inline-block";
    downloadButton.classList.remove("hidden");
    restartButton.classList.remove("hidden");
    restartButton.textContent = "🎉 Zagraj ponownie 🎉";
  } else {
    resultMessage.textContent = "Nic się nie stało, spróbuj ponownie!";
    restartButton.classList.remove("hidden");
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  resultContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  dialogContainer.classList.add("hidden");
  
  downloadButton.style.display = "none";
  downloadButton.classList.add("hidden");
  
  loadQuestion();
}

loadQuestion();

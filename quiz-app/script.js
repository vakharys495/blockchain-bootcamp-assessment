const questions = [
  {
    text: "What is Ethereum?",
    options: ["A cryptocurrency", "A blockchain platform", "A wallet"],
    correct: 1 // Index of correct option
  },
  {
    text: "What language is used for Ethereum smart contracts?",
    options: ["JavaScript", "Solidity", "Python"],
    correct: 1
  },
  {
    text: "What does '0x' indicate in an Ethereum address?",
    options: ["Hexadecimal format", "Binary format", "Encrypted key"],
    correct: 0
  },
  {
    text: "What colour is the Ethereum logo? ",
    options: ["chartreuse", "magnolia", "blue"],
    correct: 2
  }
];

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];
let shuffledOptions = [];

// Shuffle array function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  shuffledQuestions = shuffle([...questions]);
  document.getElementById("quizContainer").style.display = "block";
  document.getElementById("result").style.display = "none";
  loadQuestion();
}

function loadQuestion() {
  const question = shuffledQuestions[currentQuestionIndex];
  document.getElementById("question").textContent = `${currentQuestionIndex + 1}. ${question.text}`;
  
  // Shuffle options
  shuffledOptions = shuffle([...question.options]);
  const correctIndex = question.options[question.correct];
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  document.getElementById("feedback").textContent = "";
  
  shuffledOptions.forEach((option, index) => {
    const label = document.createElement("div");
    label.classList.add("option");
    label.textContent = option;
    label.onclick = () => selectOption(label, option, correctIndex);
    optionsDiv.appendChild(label);
  });

  document.getElementById("nextButton").disabled = true;
}

function selectOption(label, selectedOption, correctOption) {
  // Remove previous selections
  document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
  label.classList.add("selected");
  
  // Show feedback
  const feedback = document.getElementById("feedback");
  if (selectedOption === correctOption) {
    feedback.textContent = "Correct!";
    feedback.classList.add("correct");
    feedback.classList.remove("incorrect");
    if (!label.dataset.scored) {
      score++;
      label.dataset.scored = "true";
    }
  } else {
    feedback.textContent = `Incorrect! Correct answer: ${correctOption}`;
    feedback.classList.add("incorrect");
    feedback.classList.remove("correct");
  }
  
  document.getElementById("nextButton").disabled = false;
}

document.getElementById("nextButton").onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.getElementById("quizContainer").style.display = "none";
  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  document.getElementById("score").textContent = `You scored ${score} out of ${questions.length}!`;
}

document.getElementById("restartButton").onclick = startQuiz;

// Start the quiz on page load
startQuiz();
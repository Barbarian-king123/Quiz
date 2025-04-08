const questions = [
    {
        question: "Which solution to Einstein’s field equations describes a non-rotating, uncharged black hole?",
        answers: [
            { text: "Reissner-Nordström metric", correct: false },
            { text: "Schwarzschild metric", correct: true },
            { text: "Kerr metric", correct: false },
            { text: "Kerr-Newman metric", correct: false }
        ]
    },
    {
        question: "What is the name of the effect where light is bent around a massive object?",
        answers: [
            { text: "Gravitational lensing", correct: true },
            { text: "Gravitational redshift", correct: false },
            { text: "Time dilation", correct: false },
            { text: "Frame dragging", correct: false }
        ]
    },
    {
        question: "What is the term for the boundary surrounding a black hole beyond which nothing can escape?",
        answers: [
            { text: "Event horizon", correct: true },
            { text: "Singularity", correct: false },
            { text: "Photon sphere", correct: false },
            { text: "Accretion disk", correct: false }
        ]
    },
    {
        question: "What key discovery provided direct evidence for the Big Bang Theory?",
        answers: [
            { text: "Cosmic microwave background radiation", correct: true },
            { text: "Hubble's Law", correct: false },
            { text: "Redshift of galaxies", correct: false },
            { text: "Nucleosynthesis", correct: false }
        ]
    },
    {
        question: "According to Einstein’s General Relativity, what happens to time near the event horizon of a black hole, as observed from a distant observer?",
        answers: [
            { text: "Time speeds up", correct: false },
            { text: "Time slows down", correct: true },
            { text: "Time stops", correct: false },
            { text: "Time reverses", correct: false }
        ]
    },
    {
        question: "What is the term for the hypothetical region of spacetime where gravity is so strong that nothing, not even light, can escape?",
        answers: [
            { text: "Singularity", correct: true },
            { text: "Event horizon", correct: false },
            { text: "Photon sphere", correct: false },
            { text: "Accretion disk", correct: false }
        ]
    },
    {
        question: "What is the term for the hypothetical particles that are thought to mediate the force of gravity in quantum field theory?",
        answers: [
            { text: "Gravitons", correct: true },
            { text: "Photons", correct: false },
            { text: "Gluons", correct: false },
            { text: "W and Z bosons", correct: false }
        ]
    },
    {
        question: "What is the name of the effect where time appears to pass more slowly in a strong gravitational field compared to a weaker field?",
        answers: [
            { text: "Gravitational time dilation", correct: true },
            { text: "Lorentz contraction", correct: false },
            { text: "Time paradox", correct: false },
            { text: "Quantum entanglement", correct: false }
        ]
    },
    {
        question: "Which of the following theories attempts to unify General Relativity and Quantum Mechanics to explain the singularity inside a black hole?",
        answers: [
            { text: "String theory", correct: true },
            { text: "Loop quantum gravity", correct: false },
            { text: "Quantum field theory", correct: false },
            { text: "M-theory", correct: false }
        ]
    },
    {
        question: "Which theory suggests that the universe's expansion will continue accelerating indefinitely due to dark energy?",
        answers: [
            { text: "Big Crunch", correct: false },
            { text: "Big Freeze", correct: true },
            { text: "Oscillating Universe", correct: false },
            { text: "Steady State", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById("answer-button");
const nextButton = document.querySelector(".next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none"; 
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;  
    } else {
        selectedButton.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Restart") {
        startQuiz();
    } else {
        handleNextButton();
    }
});

startQuiz();

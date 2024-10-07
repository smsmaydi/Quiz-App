const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "New York", correct: false },
            { text: "London", correct: false },
            { text: "Paris", correct: true },
            { text: "Dublin", correct: false }
        ]
    },
    {
        question: "Who is CEO of Tesla?",
        answers: [
            { text: "Jeff Bezos", correct: false },
            { text: "Elon Musk", correct: true },
            { text: "Bill Gates", correct: false },
            { text: "Tony Stark", correct: false }
        ]
    },
    {
        question: "The iPhone was created by which company?",
        answers: [
            { text: "Apple", correct: true },
            { text: "Intel", correct: false },
            { text: "Amazon", correct: false },
            { text: "Microsoft", correct: false }
        ]
    },
    {
        question: "How many Harry Potter books are there?",
        answers: [
            { text: "1", correct: false },
            { text: "4", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true }
        ]
    }   
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

console.log(questionElement);

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex<questions.length-1) {
        handleNextButton();
    }else{
        startQuiz();
    }
});


function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if(correct) {
        selectedButton.classList.add("correct");
        score++;
    }
    else{
        selectedButton.classList.add("incorrect");
        
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerText = `Your Score is: " + ${score}`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}

startQuiz();
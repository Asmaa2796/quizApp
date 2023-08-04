// questions 
const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark",correct:false},
            {text: "Blue whale",correct:true},
            {text: "Elephant",correct:false},
            {text: "Giraffe",correct:false}
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Kalahari",correct:false},
            {text: "Gobi",correct:false},
            {text: "Sahara",correct:false},
            {text: "Antarctica",correct:true}
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Vatican City",correct:true},
            {text: "Bhutan",correct:false},
            {text: "Nepal",correct:false},
            {text: "Sri Lanka",correct:false}
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia",correct:false},
            {text: "Australia",correct:true},
            {text: "Antarctica",correct:false},
            {text: "Africa",correct:false}
        ]
    }
]

// declare vars
const question = document.querySelector('.question');
const answerBtns = document.querySelector('.answer-btns');
const next = document.querySelector('.next');
var arrow = document.createElement('img');
arrow.src = 'images/right-arrow.png';
var trueA = document.createElement('b');
trueA.innerHTML = '✔';
var falseA = document.createElement('b');
falseA.innerHTML = '×';
var correctSound = document.querySelector('.correctSound');
var inCorrectSound = document.querySelector('.inCorrectSound');
var win = document.querySelector('.win');
var congs = document.querySelector('.congs');

// qusetion index
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    next.innerHTML = "Next";
    next.appendChild(arrow);
    document.querySelector('.quiz-app h3').style.display = "block";
    document.querySelector('.quiz-app hr').style.display = "block";
    showQuestion();   
}

function showQuestion() {
    question.style.textAlign = "left";
    question.style.fontSize = "16px";
    congs.style.display = "none";
    resetPrevQuestion();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    question.innerHTML = questionNum + ". " + currentQuestion.question;
    
    // display answers
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerBtns.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click',selectanswer);
    });
}

function resetPrevQuestion() {
    next.style.display = "none";
    while(answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectanswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect) {
        selectBtn.classList.add('correct');
        selectBtn.appendChild(trueA);
        correctSound.play();
        score++;
    }
    else {
        selectBtn.classList.add('inCorrect');
        selectBtn.appendChild(falseA);
        inCorrectSound.play();
    }
    Array.from(answerBtns.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add('correct');
            button.appendChild(trueA);
        }
        else {
            button.disabled = true;
        }
        next.style.display = "block";
        next.appendChild(arrow);
    });
}

function showScore() {
    resetPrevQuestion();
    document.querySelector('.quiz-app h3').style.display = "none";
    document.querySelector('.quiz-app hr').style.display = "none";
    question.innerHTML = `Your score ${score} out of ${questions.length} !`;
    next.innerHTML = 'Restart quiz';
    arrow.remove();
    next.style.display = "block";
    congs.style.display = "block";
    question.style.textAlign = "center";
    question.style.fontSize = "20px";
    win.play();
}

function handleNextBtn() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

next.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length) {
        handleNextBtn();
    }
    else {
        startQuiz();
    }
});

startQuiz();

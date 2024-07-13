const quiz = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let user = {};

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const question = quiz[currentQuestionIndex];

    questionElement.innerText = question.question;
    optionsElement.innerHTML = "";

    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.className = "option-button";
        button.onclick = () => checkAnswer(option);
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const question = quiz[currentQuestionIndex];
    const resultElement = document.getElementById("result");

    if (selectedOption === question.answer) {
        score++;
        resultElement.innerText = "Correct!";
        resultElement.className = "correct";
    } else {
        resultElement.innerText = `Incorrect! The correct answer is ${question.answer}.`;
        resultElement.className = "incorrect";
    }

    document.getElementById("next-button").style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quiz.length) {
        displayQuestion();
        document.getElementById("result").innerText = "";
        document.getElementById("next-button").style.display = "none";
    } else {
        displayCompletionMessage();
    }
}

function displayCompletionMessage() {
    const quizContainer = document.getElementById("quiz-container");
    const percentage = (score / quiz.length) * 100;
    quizContainer.innerHTML = `<h2>${user.name}, you completed the quiz!</h2>
                               <p>Your score: ${score}/${quiz.length}</p>
                               <p>Percentage: ${percentage.toFixed(2)}%</p>`;
}

function signup() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (name && email && password) {
        user = { name, email, password };
        localStorage.setItem("user", JSON.stringify(user));
        alert("Signup successful! Please log in.");
        displayLogin();
    } else {
        alert("Please fill out all fields.");
    }
}

function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && email === storedUser.email && password === storedUser.password) {
        user = storedUser;
        displayQuiz();
    } else {
        alert("Invalid email or password.");
    }
}

function displaySignup() {
    document.getElementById("auth-container").innerHTML = `
        <h2>Signup</h2>
        <input type="text" id="signup-name" placeholder="Name">
        <input type="email" id="signup-email" placeholder="Email">
        <input type="password" id="signup-password" placeholder="Password">
        <button onclick="signup()">Signup</button>
        <p>Already have an account? <a href="#" onclick="displayLogin()">Login</a></p>
    `;
}

function displayLogin() {
    document.getElementById("auth-container").innerHTML = `
        <h2>Login</h2>
        <input type="email" id="login-email" placeholder="Email">
        <input type="password" id="login-password" placeholder="Password">
        <button onclick="login()">Login</button>
        <p>Don't have an account? <a href="#" onclick="displaySignup()">Signup</a></p>
    `;
}

function displayQuiz() {
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    displayQuestion();
    document.getElementById("next-button").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    displayLogin();
});

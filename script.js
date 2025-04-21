document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const quizStart = document.getElementById('quiz-start');
    const quizQuestions = document.getElementById('quiz-questions');
    const quizEnd = document.getElementById('quiz-end');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const questionNumber = document.getElementById('question-number');
    const scoreElement = document.getElementById('score');
    const finalScore = document.getElementById('final-score');
    const totalQuestions = document.getElementById('total-questions');
    const resultsContainer = document.getElementById('results-container');

    // Quiz variables
    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];
    let userAnswers = [];

    // Sample questions - you can replace with your own or fetch from an API
    const sampleQuestions = [
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            answer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            answer: "Mars"
        },
        {
            question: "What is the largest mammal?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
            answer: "Blue Whale"
        },
        {
            question: "Which language runs in a web browser?",
            options: ["Java", "C", "Python", "JavaScript"],
            answer: "JavaScript"
        },
        {
            question: "What year was JavaScript launched?",
            options: ["1996", "1995", "1994", "None of the above"],
            answer: "1995"
        }
    ];

    // Initialize the quiz
    function initQuiz() {
        questions = [...sampleQuestions];
        totalQuestions.textContent = questions.length;
        showStartScreen();
    }

    // Show start screen
    function showStartScreen() {
        quizStart.classList.remove('hidden');
        quizQuestions.classList.add('hidden');
        quizEnd.classList.add('hidden');
    }

    // Start the quiz
    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        quizStart.classList.add('hidden');
        quizQuestions.classList.remove('hidden');
        showQuestion();
    }

    // Show current question
    function showQuestion() {
        resetState();
        const currentQuestion = questions[currentQuestionIndex];
        questionNumber.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
        scoreElement.textContent = `Score: ${score}`;
        questionText.textContent = currentQuestion.question;
        
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => selectAnswer(option));
            optionsContainer.appendChild(button);
        });
    }

    // Reset question state
    function resetState() {
        nextBtn.classList.add('hidden');
        while (optionsContainer.firstChild) {
            optionsContainer.removeChild(optionsContainer.firstChild);
        }
    }

    // Handle answer selection
    function selectAnswer(selectedOption) {
        const currentQuestion = questions[currentQuestionIndex];
        const correct = selectedOption === currentQuestion.answer;
        
        // Store user answer
        userAnswers.push({
            question: currentQuestion.question,
            userAnswer: selectedOption,
            correctAnswer: currentQuestion.answer,
            isCorrect: correct
        });
        
        // Update UI
        Array.from(optionsContainer.children).forEach(button => {
            if (button.textContent === currentQuestion.answer) {
                button.classList.add('correct');
            }
            if (button.textContent === selectedOption && !correct) {
                button.classList.add('incorrect');
            }
            button.disabled = true;
        });
        
        // Update score if correct
        if (correct) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
        }
        
        nextBtn.classList.remove('hidden');
    }

    // Show next question or end quiz
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }

    // End the quiz
    function endQuiz() {
        quizQuestions.classList.add('hidden');
        quizEnd.classList.remove('hidden');
        finalScore.textContent = score;
        
        // Display results
        resultsContainer.innerHTML = '';
        userAnswers.forEach((item, index) => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.classList.add(item.isCorrect ? 'correct' : 'incorrect');
            
            resultItem.innerHTML = `
                <strong>Question ${index + 1}:</strong> ${item.question}<br>
                <strong>Your answer:</strong> ${item.userAnswer}<br>
                <strong>Correct answer:</strong> ${item.correctAnswer}
            `;
            
            resultsContainer.appendChild(resultItem);
        });
    }

    // Event listeners
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', initQuiz);

    // Initialize the quiz
    initQuiz();
});
document.addEventListener('DOMContentLoaded', () => {
    // Element references
    const userInput = document.querySelector('.input-field');
    const submitBtn = document.getElementById('submit-btn');
    const restartBtn = document.getElementById('restart-btn');
    const wordsTypedSpan = document.getElementById('words-typed');
    const accuracySpan = document.getElementById('accuracy');
    const timeTakenSpan = document.getElementById('time-taken');

    // Constants
    const targetSentence = "The quick brown fox jumps over the lazy dog.";
    let startTime, timerInterval;

    // Initialize test
    function initTest() {
        userInput.value = '';
        wordsTypedSpan.textContent = '0';
        accuracySpan.textContent = '100%';
        timeTakenSpan.textContent = '0s';
        userInput.disabled = false;
        submitBtn.disabled = false;
        clearInterval(timerInterval);
        startTime = null;
    }

    // Start timer
    function startTimer() {
        if (!startTime) {
            startTime = Date.now();
            timerInterval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                timeTakenSpan.textContent = `${elapsed}s`;
            }, 1000);
        }
    }

    // Calculate accuracy
    function calculateAccuracy(input) {
        let correctChars = 0;
        const target = targetSentence.toLowerCase();
        const user = input.toLowerCase();

        for (let i = 0; i < Math.min(target.length, user.length); i++) {
            if (user[i] === target[i]) correctChars++;
        }

        const accuracy = (correctChars / target.length) * 100;
        return Math.round(accuracy);
    }

    // Event listeners
    userInput.addEventListener('input', () => {
        startTimer();
        const words = userInput.value.trim().split(/\s+/);
        wordsTypedSpan.textContent = words.length;
    });

    submitBtn.addEventListener('click', () => {
        if (!userInput.value.trim()) {
            alert('Please type something before submitting!');
            return;
        }

        clearInterval(timerInterval);
        const accuracy = calculateAccuracy(userInput.value);
        accuracySpan.textContent = `${accuracy}%`;
        userInput.disabled = true;
        submitBtn.disabled = true;
    });

    restartBtn.addEventListener('click', () => {
        initTest();
        userInput.focus();
    });

    // Initialize on load
    initTest();
});
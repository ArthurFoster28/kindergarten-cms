const askQuestionBtn = document.getElementById('askQuestionBtn');

askQuestionBtn.addEventListener('click', () => {
    // Вызывает звонок
    window.location.href = 'tel:+79991234567';
});
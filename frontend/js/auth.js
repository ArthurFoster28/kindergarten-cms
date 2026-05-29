function toggleForms() {
    const loginForm = document.querySelector('.auth-box');
    const registerBox = document.getElementById('registerBox');
    
    if (registerBox.style.display === 'none') {
        loginForm.style.display = 'none';
        registerBox.style.display = 'block';
    } else {
        loginForm.style.display = 'block';
        registerBox.style.display = 'none';
    }
}

// Вход
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    alert(`Добро пожаловать, ${email}!`);
    window.location.href = 'profile.html';
});

// Регистрация
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    alert(`Спасибо за регистрацию, ${name}!`);
    window.location.href = 'profile.html';
});
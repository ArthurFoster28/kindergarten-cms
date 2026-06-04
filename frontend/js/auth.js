function toggleForms() {
    const loginBox = document.querySelector('.auth-box'); // Первая коробка (Вход)
    const registerBox = document.getElementById('registerBox'); // Вторая коробка (Регистрация)
    
    if (registerBox.style.display === 'none') {
        loginBox.style.display = 'none';
        registerBox.style.display = 'block';
    } else {
        loginBox.style.display = 'block';
        registerBox.style.display = 'none';
    }
}

// --- Настоящий ВХОД ---
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Останавливаем перезагрузку страницы
    
    // Берем данные из полей формы входа
    const username = document.getElementById('email').value; 
    const password = document.getElementById('password').value;

    try {
        // Отправляем запрос на наш бэкенд
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            alert('Вход выполнен успешно! Добро пожаловать.');
            
            // ПРОВЕРЯЕМ РОЛЬ: если сервер вернул роль admin - кидаем в админку
            if (data.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                // Иначе - в профиль родителя
                window.location.href = 'profile.html';
            }
        } else {
            alert(data.message); // Покажет "Неверный логин или пароль"
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка соединения с сервером');
    }
});

// --- Регистрация (пока заглушка) ---
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    alert(`Спасибо за регистрацию, ${name}! (Пока работает в тестовом режиме)`);
    window.location.href = 'profile.html';
});
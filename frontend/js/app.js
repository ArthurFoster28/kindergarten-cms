// Меню гамбургер
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Модальное окно заявки
const applyBtn = document.getElementById('applyBtn');
const applicationModal = document.getElementById('applicationModal');
const closeModal = document.getElementById('closeModal');
const applicationForm = document.getElementById('applicationForm');

if (applyBtn) {
    applyBtn.addEventListener('click', () => {
        applicationModal.style.display = 'block';
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        applicationModal.style.display = 'none';
    });
}

// Закрытие модали при клике вне окна
window.addEventListener('click', (event) => {
    if (event.target === applicationModal) {
        applicationModal.style.display = 'none';
    }
});

// Отправка формы
if (applicationForm) {
    applicationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(applicationForm);
        const data = Object.fromEntries(formData);
        
        // Имитация отправки
        console.log('Заявка отправлена:', data);
        
        // Показываем сообщение об успехе
        applicationForm.style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        
        // Через 2 секунды закрываем модаль
        setTimeout(() => {
            applicationModal.style.display = 'none';
            applicationForm.style.display = 'block';
            document.getElementById('successMessage').style.display = 'none';
            applicationForm.reset();
        }, 2000);
    });
}

// Функция для активной ссылки в меню
function setActiveLink() {
    const currentLocation = location.pathname;
    const links = document.querySelectorAll('.nav-menu a');
    
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentLocation || 
            (currentLocation === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

setActiveLink();
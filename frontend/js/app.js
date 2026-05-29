// Меню гамбургер
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Модальное окно заявки
const applyBtn = document.getElementById('applyBtn');
const applicationModal = document.getElementById('applicationModal');
const closeModal = document.getElementById('closeModal');
const applicationForm = document.getElementById('applicationForm');

applyBtn.addEventListener('click', () => {
    applicationModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    applicationModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === applicationModal) {
        applicationModal.style.display = 'none';
    }
});

// Отправка формы
applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    applicationForm.style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
    
    setTimeout(() => {
        applicationModal.style.display = 'none';
        applicationForm.style.display = 'block';
        document.getElementById('successMessage').style.display = 'none';
        applicationForm.reset();
    }, 2000);
});
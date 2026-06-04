// Меню гамбургер
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Модальное окно заявки
const applyBtn = document.getElementById('applyBtn');
const applicationModal = document.getElementById('applicationModal');
const closeModal = document.getElementById('closeModal');
const applicationForm = document.getElementById('applicationForm');

// Проверяем, находимся ли мы на главной странице (есть ли эти элементы)
if (applyBtn && applicationModal && applicationForm) {
    applyBtn.addEventListener('click', () => {
        applicationModal.style.display = 'block';
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            applicationModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === applicationModal) {
            applicationModal.style.display = 'none';
        }
    });

    // Отправка формы ЗАЯВКИ В БАЗУ ДАННЫХ
    applicationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Собираем данные из формы
        const parentName = document.getElementById('parentName').value;
        const phone = document.getElementById('phone').value;
        const childAge = document.getElementById('childAge').value;
        const childName = document.getElementById('childName').value;
        const email = document.getElementById('email').value;

        try {
            // Отправляем на сервер
            const response = await fetch('/api/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ parentName, phone, childAge, childName, email })
            });

            const data = await response.json();

            if (data.success) {
                // Показываем сообщение об успехе
                applicationForm.style.display = 'none';
                document.getElementById('successMessage').style.display = 'block';
                
                setTimeout(() => {
                    applicationModal.style.display = 'none';
                    applicationForm.style.display = 'block';
                    document.getElementById('successMessage').style.display = 'none';
                    applicationForm.reset();
                }, 2000);
            } else {
                alert('Ошибка при отправке заявки');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка соединения с сервером');
        }
    });
}
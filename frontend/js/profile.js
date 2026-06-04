// Здесь можно добавить функциональность для профиля
console.log('Profile page loaded');

// Редактирование профиля
document.querySelector('.btn-primary').addEventListener('click', () => {
    alert('Функция редактирования профиля будет добавлена позже');
});
// --- Загрузка услуг из базы данных ---
async function loadPricing() {
    try {
        const response = await fetch('/api/pricing');
        if (!response.ok) throw new Error('Ошибка загрузки');
        
        const services = await response.json();
        
        // Находим контейнеры на странице (убедитесь, что id совпадают с вашим HTML)
        const mainServices = document.getElementById('main-services');
        const clubs = document.getElementById('clubs');
        const addServices = document.getElementById('add-services');

        if (mainServices) mainServices.innerHTML = '';
        if (clubs) clubs.innerHTML = '';
        if (addServices) addServices.innerHTML = '';

        services.forEach(service => {
            const serviceCard = `
                <div class="pricing-card">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <p class="price"><strong>${service.price}</strong></p>
                </div>
            `;

            // Раскидываем по категориям
            if (service.category === 'Основные услуги' && mainServices) {
                mainServices.innerHTML += serviceCard;
            } else if (service.category === 'Дополнительные кружки' && clubs) {
                clubs.innerHTML += serviceCard;
            } else if (service.category === 'Дополнительные услуги' && addServices) {
                addServices.innerHTML += serviceCard;
            }
        });

    } catch (error) {
        console.error('Ошибка при загрузке прайса:', error);
    }
}

// Загружаем при старте
document.addEventListener('DOMContentLoaded', loadPricing);
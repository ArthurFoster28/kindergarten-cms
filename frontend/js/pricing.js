// Кнопка звонка
const askQuestionBtn = document.getElementById('askQuestionBtn');
if (askQuestionBtn) {
    askQuestionBtn.addEventListener('click', () => {
        window.location.href = 'tel:+79991234567';
    });
}

// --- Загрузка услуг из базы данных ---
async function loadPricing() {
    try {
        const response = await fetch('/api/pricing');
        if (!response.ok) throw new Error('Ошибка загрузки');
        
        const services = await response.json();
        
        // Находим тело таблицы
        const tbody = document.querySelector('.pricing-table tbody');
        if (!tbody) return;

        // Очищаем таблицу от старых статичных данных
        tbody.innerHTML = '';

        // Группируем услуги по категориям
        const categories = {};
        services.forEach(service => {
            if (!categories[service.category]) {
                categories[service.category] = [];
            }
            categories[service.category].push(service);
        });

        // Вставляем данные в таблицу по категориям
        for (const [categoryName, items] of Object.entries(categories)) {
            // Добавляем заголовок категории
            tbody.innerHTML += `
                <tr class="category-header">
                    <td colspan="3">${categoryName}</td>
                </tr>
            `;
            
            // Добавляем услуги этой категории
            items.forEach(item => {
                tbody.innerHTML += `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.description}</td>
                        <td>${item.price}</td>
                    </tr>
                `;
            });
        }

    } catch (error) {
        console.error('Ошибка при загрузке прайса:', error);
    }
}

// Загружаем при старте
document.addEventListener('DOMContentLoaded', loadPricing);
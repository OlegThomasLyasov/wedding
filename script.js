function scrollToBlock(id) {
    document.getElementById(id).scrollIntoView({ block: "start", behavior: "smooth" });
}

// Инициализация карты после загрузки страницы
ymaps.ready(init);

function init() {
    // Создание карты
    const myMap = new ymaps.Map("map", {
        center: [54.665427, 55.863362],
        zoom: 15,
    });

    // Добавление метки
    const myPlacemark = new ymaps.Placemark([54.665427, 55.863362], {
        hintContent: 'Свадьба тут!',
        balloonContent: '<div class="flex gap-3"><img src="./images/smallShater.webp" width="126px" height="96px"><div class="flex flex-col gap-2"><h3 class="font-bold">Малый шатер (шатер №2)</h3> <p>Уфа, Красивая поляна 4/1</p>  </div></div>'
    });

    myMap.geoObjects.add(myPlacemark);
}

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const checkbox = document.querySelector(`input[onchange*="${sectionId}"]`);
    section.classList.toggle('hidden', !checkbox.checked);
}

function toggleDrinksSection() {
    const drinksSection = document.getElementById('main-drinks-section');
    const isAttending = document.getElementById('yes').checked;
    
    if (isAttending) {
        drinksSection.classList.remove('hidden');
    } else {
        drinksSection.classList.add('hidden');
    }
}

// форма
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Отправка данных через Fetch API
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Заявка успешно отправлена. Спасибо!');
                    location.reload();
                } else {
                    throw new Error('Не удалось отправить форму');
                }
            })
            .catch(error => {
                alert('Ошибка отправки формы');
            });
        });
    }
});

// таймер
function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
}

// Устанавливаем дату окончания
const countdownDate = new Date("September 6, 2025 00:00:00").getTime();

// Обновляем таймер каждую секунду
const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Вычисляем время
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Отображаем результат
    const dayTag = document.getElementById("days");
    const daysP = document.getElementById("daysP");
    dayTag.innerText = days;
    daysP.innerHTML = getNoun(days, 'день', 'дня', 'дней');
    
    const hourTag = document.getElementById("hours");
    const hoursP = document.getElementById("hoursP");
    hourTag.innerText = hours;
    hoursP.innerHTML = getNoun(hours, 'час', 'часа', 'часов');

    const minutesTag = document.getElementById("minutes");
    const minP = document.getElementById("minP");
    minutesTag.innerText = minutes;
    minP.innerHTML = getNoun(minutes, 'минута', 'минуты', 'минут');

    const secundTag = document.getElementById("secunds");
    const secP = document.getElementById("secP");
    secundTag.innerText = seconds;
    secP.innerHTML = getNoun(seconds, 'секунда', 'секунды', 'секунд');

    // Если отсчет завершен, выводим сообщение
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Время вышло!";
    }
}, 1000);

// анимации

document.addEventListener('DOMContentLoaded', () => {
    const animationBlocks = document.querySelectorAll('.animation-block');
    
    // Функция для проверки видимости элемента
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        && rect.bottom >= 0
      );
    };
    
    // Функция для запуска анимации
    const runAnimation = () => {
        animationBlocks.forEach(el => {
            if (isElementInViewport(el)) {
              const animationType = el.getAttribute('data-animation');
              if (!el.classList.contains(`animate-${animationType}`)) {
                el.classList.add(`animate-${animationType}`);
                el.style.opacity = '1';
              }
            }
        });
    };
    
    // Запускаем при загрузке и при прокрутке
    runAnimation();
    window.addEventListener('scroll', runAnimation);
});
function scrollMain() {
    document.getElementById("main").scrollIntoView({ block: "start", behavior: "smooth" });
}
function scrollMap() {
    document.getElementById("mapTitle").scrollIntoView({ block: "start", behavior: "smooth" });
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
        hintContent: 'Свадьба тут:)',
        balloonContent: '<div class="flex gap-3"><img src="./images/smallShater.webp" width="126px" height="96px"><div class="flex flex-col gap-2"><h3 class="font-bold">Малый шатер (шатер №2)</h3> <p>Уфа, Красивая поляна 4/1</p>  </div></div>'
    });

    myMap.geoObjects.add(myPlacemark);
}

// форма
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Получаем значения полей формы
            const nameInput = document.querySelector('input[name="name"]');
            const nameText = nameInput.value;

            const attendanceInput = document.querySelector('input[name="attendance"]');
            const attendanceText = attendanceInput.value;

            // Отправка данных через Fetch API
            fetch('https://formspree.io/f/manevaze', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameText,
                    attendance: attendanceText
                })
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
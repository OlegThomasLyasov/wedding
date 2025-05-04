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
    const allergic = document.getElementById('allergic-section');
    const isAttending = document.getElementById('yes').checked;
    
    if (isAttending) {
        drinksSection.classList.remove('hidden');
        allergic.classList.remove('hidden');
    } else {
        drinksSection.classList.add('hidden');
        allergic.classList.add('hidden')
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
  const flipElements = document.querySelectorAll('.animation-block');
  
  // Более надежная функция проверки видимости
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  };
  
  // Функция для обработки анимаций
  const handleAnimations = () => {
    flipElements.forEach(el => {
      if (isElementInViewport(el)) {
        const animationType = el.getAttribute('data-animation');
        if (!el.classList.contains(`animate-${animationType}`)) {
          el.classList.add(`animate-${animationType}`);
          el.style.opacity = '1';
        }
      } else {
        // Опционально: сброс анимации при выходе из viewport
        const animationType = el.getAttribute('data-animation');
        el.classList.remove(`animate-${animationType}`);
        el.style.opacity = '0';
      }
    });
  };
  
  // Запускаем при загрузке и при скролле
  handleAnimations();
  window.addEventListener('scroll', handleAnimations);
  window.addEventListener('resize', handleAnimations);
});

// проверка на заполнение формы
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submitBtn');
  const requiredInputs = form.querySelectorAll('input[required], .radio-group[required]');

  form.addEventListener('input', checkFormValidity);

  function checkFormValidity() {
    let allValid = true;
    requiredInputs.forEach(field => {
      if (field.classList.contains('radio-group')) {
        // Проверка radio-группы
        const radioChecked = field.querySelector('input[type="radio"]:checked');
        if (!radioChecked) allValid = false;
      } else {
        // Проверка обычных полей
        if (!field.value.trim()) allValid = false;
      }
    });
  
    submitBtn.disabled = !allValid;
    submitBtn.classList.toggle('bg-[#8456b3]', allValid);
    submitBtn.classList.toggle('hover:bg-[#523982]', allValid);
    submitBtn.classList.toggle('bg-[#ded3f5]', !allValid);
  }
});

// Открытие модального окна
function openModal(img) {
  if (window.innerWidth >= 1000) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImage');
    const nodes = img.childNodes;
  
    modal.classList.remove('hidden');
    modalImg.src = nodes[1].src;
  
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
  }
}

// Закрытие модального окна
function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto'; // Возвращаем скролл
}

// Закрытие по клику вне изображения
document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') closeModal();
});
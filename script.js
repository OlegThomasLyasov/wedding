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
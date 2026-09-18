
feedButton.addEventListener('click', openCloseFoodMenu);

catElement.addEventListener('click', (event) => {
    event.stopPropagation();
    openCloseCatSats();
    if (catStats.classList.contains('open')) {
        updateCatStats(cat);
    }
});

document.addEventListener('click', (event) => {

    if (catStats.classList.contains('open') &&
        !catStats.contains(event.target)) {

        catStats.classList.remove('open');
    }

});

let foodList = [
    new Food("Fish", 20, 10, "./assets/food/fish.png"),
    new Food("Chicken", 15, 5, "./assets/food/chicken.png"),
    new Food("Cake", 10, 20, "./assets/food/cake.png")
];

function openCloseFoodMenu() {
    foodMenu.classList.toggle('open');
}

function openCloseCatSats() {
    catStats.classList.toggle('open');
}

function updateCatStats(cat) {
    document.getElementById('cat-age').innerText = "Age : " + cat.age;

    updateBar(cat.happiness, 'cat-happiness');
    updateBar(100-cat.hunger, 'cat-hunger');
    updateBar(cat.energy, 'cat-energy');


}

function createCatStats(cat) {

    const catName = document.createElement('input');
    catName.type = 'text';
    catName.name = 'Cat name';
    catName.value = cat.name;
    catStats.appendChild(catName);

    const catAge = document.createElement('p');
    catAge.innerText = "Age : " + cat.age;
    catAge.id = 'cat-age';
    catStats.appendChild(catAge);

    const statsContent = document.createElement('div');
    statsContent.id = 'stats-content';

    const catStatsImg = document.createElement('img');
    catStatsImg.alt = "cat";
    catStatsImg.id = 'cat-stats-img';
    catStatsImg.src = catElement.src;

    statsContent.appendChild(catStatsImg);

    const statsBars = document.createElement('div');
    statsBars.id = 'stats-bars';

    statsBars.appendChild(createBar(cat.happiness, 'cat-happiness', 'happiness'));
    statsBars.appendChild(createBar(100-cat.hunger, 'cat-hunger', 'fulness'));
    statsBars.appendChild(createBar(cat.energy, 'cat-energy', 'energy'));

    statsContent.appendChild(statsBars);
    catStats.appendChild(statsContent);
}

function createBar(barValue, barId, barName) {
    let barContainer = document.createElement('div');
    barContainer.id = barId;
    barContainer.innerText = barName;
    barContainer.classList.add('bar-container');



    barContainer.style.backgroundImage = 'url("./assets/UI/bars.png")';

    if (barValue === 0)
        barContainer.style.backgroundPositionY = '-120px';
    else if (barValue <= 25)
        barContainer.style.backgroundPositionY = '-90px';
    else if (barValue <= 50)
        barContainer.style.backgroundPositionY = '-60px';
    else if (barValue <= 75)
        barContainer.style.backgroundPositionY = '-30px';
    else
        barContainer.style.backgroundPositionY = '0';

    return barContainer;

}

function updateBar(barValue, barId) {
    let barContainer = document.getElementById(barId);

    if (barValue === 0)
        barContainer.style.backgroundPositionY = '-120px';
    else if (barValue <= 25)
        barContainer.style.backgroundPositionY = '-90px';
    else if (barValue <= 50)
        barContainer.style.backgroundPositionY = '-60px';
    else if (barValue <= 75)
        barContainer.style.backgroundPositionY = '-30px';
    else
        barContainer.style.backgroundPositionY = '0';

}

function createFoodMenu() {
    foodList.forEach(food => {
        const foodItem = document.createElement('div');
        foodItem.classList.add('food-item');

        const foodImage = document.createElement('img');
        foodImage.src = food.imageUrl;
        foodImage.alt = food.name;

        const foodName = document.createElement('p');
        foodName.innerText = food.name;

        const foodHappy = document.createElement('p');
        foodHappy.innerText = "Happiness : " + food.happiness;

        const foodHunger = document.createElement('p');
        foodHunger.innerText = "Hunger value : " + food.hungerValue;

        foodItem.appendChild(foodName);
        foodItem.appendChild(foodImage);
        foodItem.appendChild(foodHappy);
        foodItem.appendChild(foodHunger);

        foodItem.addEventListener('pointerdown', () => {
            food.dragFood();
        })

        foodMenu.appendChild(foodItem);
    });
}

let cat = new Cat();

catElement.style.left = cat.x + 'px';
catElement.style.top = cat.y + 'px';
createCatStats(cat);
createFoodMenu();
cat.idleCat();

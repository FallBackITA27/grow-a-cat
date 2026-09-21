
feedButton.addEventListener('click', openCloseFoodMenu);
petButton.addEventListener('click', openClosePetMenu);

catElement.addEventListener('click', (event) => {
    event.stopPropagation();
    openCloseCatSats();
    if (catStats.classList.contains('open')) {
        updateCatStats(cat);
    }
});

catElement.addEventListener('mouseenter', (event) => {
    catNameHover.innerText = cat.name;
});

catElement.addEventListener('mouseleave', (event) => {
    catNameHover.innerText = "";
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

let petActionList = [
    new PetAction("Cuddle", 25, 5, "./assets/items/cuddleHand.png"),
    new PetAction("Brush", 0, 20, "./assets/items/brush.png"),
    new PetAction("Wash", -10, 100, "./assets/items/sponge.png"),
]


function openCloseFoodMenu() {
    foodMenu.classList.toggle('open');
}

function openClosePetMenu() {
    petMenu.classList.toggle('open');
}

function openCloseCatSats() {
    catStats.classList.toggle('open');
}

function updateCatStats(cat) {
    document.getElementById('cat-age').innerText = "Age : " + cat.age;

    document.getElementsByClassName('name-of-cat')[0].value = cat.name

    updateBar(cat.happiness, 'cat-happiness');
    updateBar(100 - cat.hunger, 'cat-hunger');
    updateBar(cat.energy, 'cat-energy');


}

function createCatStats(cat) {

    const catName = document.createElement('input');
    catName.classList.add('name-of-cat');
    catName.type = 'text';
    catName.name = 'Cat name';
    catName.value = cat.name;
    catStats.appendChild(catName);

    catName.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            cat.name = catName.value;
            catName.blur();
        }
    })

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
    statsBars.appendChild(createBar(100 - cat.hunger, 'cat-hunger', 'fulness'));
    statsBars.appendChild(createBar(cat.energy, 'cat-energy', 'energy'));
    statsBars.appendChild(createBar(cat.cleanliness, 'cat-cleanliness', 'cleanliness'));

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

function createPetMenu() {

    const catPetImg = document.createElement('img');
    catPetImg.alt = "cat";
    catPetImg.id = 'cat-pet-img';
    catPetImg.src = catElement.src;
    petMenu.appendChild(catPetImg);

    const petActions = document.createElement('div');
    petActions.id = 'pet-actions';

    petActionList.forEach(petAction => {
        const petActionItem = document.createElement('div');
        petActionItem.classList.add('pet-action-item');

        const petActionImage = document.createElement('img');
        petActionImage.src = petAction.imageUrl;
        petActionImage.alt = petAction.name;

        const petActionName = document.createElement('p');
        petActionName.innerText = petAction.name;

        const petActionHappy = document.createElement('p');
        petActionHappy.innerText = "Happiness : " + petAction.happiness;

        const petActionClean = document.createElement('p');
        petActionClean.innerText = "Cleanliness: " + petAction.cleanliness;

        petActionItem.appendChild(petActionName);
        petActionItem.appendChild(petActionImage);
        petActionItem.appendChild(petActionHappy);
        petActionItem.appendChild(petActionClean);

        petActionItem.addEventListener('pointerdown', (event) => {
            event.preventDefault();
            petAction.dragPetAction();
        })

        petActions.appendChild(petActionItem);
    });

    petMenu.appendChild(petActions);
}

function minsToMillisecs(mins) {
    return mins * 60 * 1000;
}

function hoursToMillisecs(hours) {
    return hours * 60 * 60 * 1000;
}

let hungerInterval = null;
let energyInterval = null;

function checkCatStats(cat) {

    if (cat.energy < 50 && hungerInterval === null) {
        hungerInterval = setInterval(() => {
            cat.getsHungry();
            updateCatStats();
        }, minsToMillisecs(30));
    }

    if (cat.energy >= 50 && hungerInterval !== null) {
        clearInterval(hungerInterval);
        hungerInterval = null;
    }

    if (cat.hunger === 0 && energyInterval === null) {
        setInterval(() => {
            cat.tires();
            updateCatStats();
        }, minsToMillisecs(30));
    }

    if (cat.hunger > 0 && energyInterval !== null) {
        clearInterval(energyInterval);
        energyInterval = null;
    }
}

let cat = new Cat();

catElement.style.left = cat.x + 'px';
catElement.style.top = cat.y + 'px';

createCatStats(cat);
createFoodMenu();
createPetMenu();

setInterval(() => {
    cat.tires();
    updateCatStats();
}, minsToMillisecs(30));

setInterval(() => {
    cat.getsSad();
    updateCatStats();
}, minsToMillisecs(30) + hoursToMillisecs(1));

setInterval(() => {
    checkCatStats(cat);
}, 1000);

cat.idleCat();

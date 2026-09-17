const catElement = document.getElementById('cat');
const feedButton = document.getElementById('feed-button');
const gameArea = document.getElementById('cat-container');
const foodMenu = document.getElementById('food-menu');
const catStats = document.getElementById('cat-stats');

feedButton.addEventListener('click', openCloseFoodMenu);


class Cat {
    constructor() {
        // Velocità espressa in pixel al secondo
        this.speed = 0.3 * gameArea.clientWidth;

        this.x = Math.floor(gameArea.clientWidth / 2);
        this.y = Math.floor(gameArea.clientHeight / 2);
        this.hunger = 0;
        this.happiness = 100;
        this.energy = 100;
        this.age = 0;
        this.name = "Unknown Cat";
    }
}

class Food {
    constructor(name, hungerValue, happiness, imageUrl) {
        this.name = name;
        this.hungerValue = hungerValue;
        this.happiness = happiness;
        this.imageUrl = imageUrl;
    }
}

let foodList = [
    new Food("Fish", 20, 10, "./assets/food/fish.png"),
    new Food("Chicken", 15, 5, "./assets/food/chicken.png"),
    new Food("Cake", 10, 20, "./assets/food/cake.png")
];

function moveCat(cat) {

    let oldCoordinates = {
        x: cat.x,
        y: cat.y
    };

    let destination = {
        x: Math.floor(
            Math.random() *
            (gameArea.clientWidth - catElement.clientWidth)
        ),
        y: Math.floor(
            Math.random() *
            (gameArea.clientHeight - catElement.clientHeight)
        )
    };

    return new Promise((resolve) => {

        let lastTime = performance.now();

        function move(timestamp) {

            // Tempo trascorso dall'ultimo frame, in secondi
            let deltaTime = (timestamp - lastTime) / 1000;
            lastTime = timestamp;

            let dx = destination.x - oldCoordinates.x;
            let dy = destination.y - oldCoordinates.y;

            let dir = Math.sqrt(dx * dx + dy * dy);

            // Se siamo abbastanza vicini alla destinazione,
            // posizioniamo il gatto esattamente lì e terminiamo il movimento.
            if (dir <= cat.speed * deltaTime) {

                cat.x = destination.x;
                cat.y = destination.y;

                catElement.style.left = cat.x + 'px';
                catElement.style.top = cat.y + 'px';

                resolve();
                return;
            }

            let directionX = dx / dir;
            let directionY = dy / dir;

            // La distanza percorsa dipende dal tempo trascorso.
            let movement = cat.speed * deltaTime;

            cat.x = oldCoordinates.x + directionX * movement;
            cat.y = oldCoordinates.y + directionY * movement;

            catElement.style.left = cat.x + 'px';
            catElement.style.top = cat.y + 'px';

            oldCoordinates.x = cat.x;
            oldCoordinates.y = cat.y;

            requestAnimationFrame(move);
        }

        requestAnimationFrame(move);
    });
}

function idleCat() {

    let waitTime = Math.floor(Math.random() * 5000);

    moveCat(cat).then(() => {

        setTimeout(() => {

            idleCat();

        }, waitTime);

    });
}

function openCloseFoodMenu() {
    foodMenu.classList.toggle('open');
}

/*function openCloseCatSats() {
    catStats.classList.toggle('open');
}

function updateCatStats(){

}

function createCatStats(){

    const catName = document.createElement('input');
    catName.type = 'text';
    catName.name = 'Cat name';
    catName.value = cat.name;

    const catStatsImg = document.createElement('img');
    catStatsImg.alt = "cat";
    catStatsImg.id = 'cat-stats-img';


    
}

function createBar(barValue, barId){
    let barContainer = document.createElement('div');
    barContainer.id = barId;
    barContainer.classList.add('bar-container');

}

function updateBar(barValue, barId){

}*/

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
            dragFood(food);
        })

        foodMenu.appendChild(foodItem);
    });
}

function dragFood(food) {
    //let selectedFood = new Food(food.name, food.hungerValue, food.happiness, food.imageUrl);
    foodMenu.classList.remove('open');

    const foodPlaceHolder = document.createElement('img');
    foodPlaceHolder.src = food.imageUrl;
    foodPlaceHolder.alt = food.name;
    foodPlaceHolder.classList.add('food-placeholder');
    document.body.appendChild(foodPlaceHolder);

    document.addEventListener("pointermove", (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        let foodRect = foodPlaceHolder.getBoundingClientRect();

        foodPlaceHolder.style.left = (mouseX - foodRect.width / 2) + 'px';
        foodPlaceHolder.style.top = (mouseY - foodRect.height / 2) + 'px';
    })
    document.addEventListener("pointerup", (event) => {
        const catRect = catElement.getBoundingClientRect();
        if (event.clientX > catRect.left &&
            event.clientX < (catRect.left + catRect.width) &&
            event.clientY > catRect.top &&
            event.clientY < (catRect.top + catRect.height)
        ) {
            foodPlaceHolder.remove();
            feedCat(food);
        }
        foodPlaceHolder.remove();
    })
}

function feedCat(food) {
    cat.hunger -= food.hungerValue;
    cat.happiness += food.happiness;
    if (cat.happiness > 100) cat.happiness = 100;
}

let cat = new Cat();

catElement.style.left = cat.x + 'px';
catElement.style.top = cat.y + 'px';
createFoodMenu();
idleCat();
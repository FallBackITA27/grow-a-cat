let foodList = [
    new Food("Fish", 20, 10, "./assets/food/fish.png"),
    new Food("Chicken", 15, 5, "./assets/food/chicken.png"),
    new Food("Cake", 10, 20, "./assets/food/cake.png"),
];

function createFoodMenu() {
    foodList.forEach((food) => {
        const foodItem = document.createElement("div");
        foodItem.classList.add("food-item");

        const foodImage = document.createElement("img");
        foodImage.src = food.imageUrl;
        foodImage.alt = food.name;

        const foodName = document.createElement("p");
        foodName.innerText = food.name;

        const foodHappy = document.createElement("p");
        foodHappy.innerText = "Happiness : " + food.happiness;

        const foodHunger = document.createElement("p");
        foodHunger.innerText = "Hunger value : " + food.hungerValue;

        foodItem.appendChild(foodName);
        foodItem.appendChild(foodImage);
        foodItem.appendChild(foodHappy);
        foodItem.appendChild(foodHunger);

        foodItem.addEventListener("pointerdown", () => {
            food.dragFood();
        });

        foodMenu.appendChild(foodItem);
    });
}

function openCloseFoodMenu() {
    foodMenu.classList.toggle("open");
}

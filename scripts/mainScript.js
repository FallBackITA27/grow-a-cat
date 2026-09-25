const catElement = document.getElementById("cat");
const catBox = document.getElementById("cat-box");
const feedButton = document.getElementById("feed-button");
const petButton = document.getElementById("pet-button");
const gameArea = document.getElementById("cat-container");
const sleepButton = document.getElementById("go-to-sleep");
const foodMenu = document.getElementById("food-menu");
const catStats = document.getElementById("cat-stats");
const petMenu = document.getElementById("pet-menu");
const catNameHover = document.getElementById("cat-name");

const catRect = catElement.getBoundingClientRect();

let cat = loadCat();
//let cat = new Cat();
catNameHover.innerText = cat.name;

sleepButton.addEventListener("click", () => {
    cat.isAsleep = true;
});
feedButton.addEventListener("click", openCloseFoodMenu);
petButton.addEventListener("click", openClosePetMenu);
catElement.addEventListener("click", (event) => {
    event.stopPropagation();
    openCloseCatSats();
    if (catStats.classList.contains("open")) {
        updateCatStats(cat);
    }
});
document.addEventListener("click", (event) => {
    if (
        catStats.classList.contains("open") &&
        !catStats.contains(event.target)
    ) {
        catStats.classList.remove("open");
    }
});

createCatStats(cat);
createFoodMenu();
createPetMenu();

setInterval(() => {
    if (!cat.isAsleep) {
        cat.tires();
        cat.getsDirty();
        updateCatStats(cat);
    }
}, minsToMillisecs(30));
setInterval(
    () => {
        if (!cat.isAsleep) {
            cat.getsSad();
            updateCatStats(cat);
        }
    },
    minsToMillisecs(30) + hoursToMillisecs(1),
);
setInterval(() => {
    if (cat.isAsleep) {
        cat.rests();
        updateCatStats(cat);
    }
}, minsToMillisecs(30));
setInterval(() => {
    checkCatStats(cat);
}, 1000);
setInterval(() => {
    cat.updateAge();
    updateCatStats(cat);
    saveCatStats(cat);
    lastSavedTime = Date.now();
    localStorage.setItem("lastSavedTime", lastSavedTime);
}, minsToMillisecs(1));

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
const nameOfCat = document.getElementById("name-of-cat");
const catAge = document.getElementById("cat-age");

const catRect = catElement.getBoundingClientRect();

let cat = loadCat();
//let cat = new Cat();

sleepButton.addEventListener("click", () => {
    cat.isAsleep = true;
});
feedButton.addEventListener("click", openCloseFoodMenu);
petButton.addEventListener("click", openClosePetMenu);
catElement.addEventListener("click", (event) => {
    event.stopPropagation();
    openCloseCatSats();
});
document.addEventListener("click", (event) => {
    if (
        catStats.classList.contains("open") &&
        !catStats.contains(event.target)
    ) {
        catStats.classList.remove("open");
    }
});

createFoodMenu();
createPetMenu();

setInterval(() => {
    if (!cat.isAsleep) {
        cat.tires();
        cat.getsDirty();
    }
}, minsToMillisecs(30));
setInterval(
    () => {
        if (!cat.isAsleep) {
            cat.getsSad();
        }
    },
    minsToMillisecs(30) + hoursToMillisecs(1),
);
setInterval(() => {
    if (cat.isAsleep) {
        cat.rests();
    }
}, minsToMillisecs(30));
setInterval(() => {
    checkCatStats(cat);
}, 1000);
setInterval(() => {
    cat.updateAge();
    saveCatStats(cat);
    lastSavedTime = Date.now();
    localStorage.setItem("lastSavedTime", lastSavedTime);
}, minsToMillisecs(1));

document.addEventListener("close", () => {
    const lastSavedTime = Date.now();
    localStorage.setItem("lastSavedTime", lastSavedTime);
    saveCatStats(cat);
});

document.addEventListener("DOMContentLoaded", () => {
    const lastSavedTime = localStorage.getItem("lastSavedTime");
    if (lastSavedTime == null) return;
    const timeAway = Date.now() - Number(lastSavedTime);
    updateStatsAfterTimeAway(cat, timeAway);
});

nameOfCat.addEventListener("change", async (e) => (cat.name = e.target.value));
nameOfCat.addEventListener("keypress", (e) => {
    if (e.key === "Enter") catName.blur();
});

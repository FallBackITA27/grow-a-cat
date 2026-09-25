let hungerInterval = null;
let energyInterval = null;

function minsToMillisecs(mins) {
    return mins * 60 * 1000;
}
function hoursToMillisecs(hours) {
    return hours * 60 * 60 * 1000;
}
function millisecsToMinutes(millisecs) {
    return millisecs / 1000 / 60;
}

function checkCatStats(cat) {
    if (cat.energy < 50 && hungerInterval === null) {
        hungerInterval = setInterval(() => {
            cat.getsHungry();
            updateCatStats(cat);
        }, minsToMillisecs(30));
    }

    if (cat.energy >= 50 && hungerInterval !== null) {
        clearInterval(hungerInterval);
        hungerInterval = null;
    }

    if (cat.hunger === 100 && energyInterval === null) {
        energyInterval = setInterval(() => {
            cat.tires();
            updateCatStats(cat);
        }, minsToMillisecs(30));
    }

    if (cat.hunger < 100 && energyInterval !== null) {
        clearInterval(energyInterval);
        energyInterval = null;
    }

    if (cat.energy <= 0) {
        cat.isAsleep = true;
    }

    if (cat.energy >= 100 && cat.isAsleep) cat.isAsleep = false;

    if (cat.energy > 100) cat.energy = 100;
    if (cat.energy < 0) cat.energy = 0;
    if (cat.happiness < 0) cat.happiness = 0;
    if (cat.happiness > 100) cat.happiness = 100;
    if (cat.cleanliness > 100) cat.cleanliness = 100;
    if (cat.cleanliness < 0) cat.cleanliness = 0;
    if (cat.hunger < 0) cat.hunger = 0;
    if (cat.hunger > 100) cat.hunger = 100;
}

let minutesAway = 0;
let halfHoursAway = 0;

function updateStatsAfterTimeAway(cat, timeAway) {
    if (isNaN(timeAway)) return;
    minutesAway = millisecsToMinutes(timeAway);
    halfHoursAway = Math.floor(minutesAway / 30);
    if (cat.isAsleep) {
        cat.energy += 10 * halfHoursAway;
        halfHoursAway = Math.floor((cat.energy - 100) / 10);
        if (cat.energy > 100) cat.energy = 100;
        if (cat.energy === 100) cat.isAsleep = false;
    } else {
        cat.energy -= 5 * halfHoursAway;
        cat.cleanliness -= 5 * halfHoursAway;
        cat.happiness -= 10 * Math.floor(halfHoursAway / 3);

        if (cat.energy < 50) {
            cat.hunger += 10 * halfHoursAway;
        }

        if (cat.hunger === 100) {
            cat.energy -= 5 * halfHoursAway;
        }

        if (cat.energy < 0) cat.energy = 0;
        if (cat.cleanliness < 0) cat.cleanliness = 0;
        if (cat.happiness < 0) cat.happiness = 0;
        if (cat.hunger > 100) cat.hunger = 100;

        if (cat.energy === 0) {
            cat.isAsleep = true;
        }
    }

    saveCatStats(cat);
    updateCatStats(cat);
}

let lastSavedTime = Date.now();
let timeAway = 0;

document.addEventListener("close", () => {
    lastSavedTime = Date.now();
    localStorage.setItem("lastSavedTime", lastSavedTime);
    saveCatStats(cat);
});

document.addEventListener("DOMContentLoaded", () => {
    lastSavedTime = localStorage.getItem("lastSavedTime");
    if (lastSavedTime !== null) {
        timeAway = Date.now() - Number(lastSavedTime);
        updateStatsAfterTimeAway(cat, timeAway);
        lastSavedTime = undefined;
    }
});

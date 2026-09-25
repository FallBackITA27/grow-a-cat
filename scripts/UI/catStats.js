function createCatStats(cat) {
    const catName = document.createElement("input");
    catName.classList.add("name-of-cat");
    catName.type = "text";
    catName.name = "Cat name";
    catName.value = cat.name;
    catStats.appendChild(catName);

    catName.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            cat.name = catName.value;
            saveCatStats(cat);
            catName.blur();
        }
    });

    const catAge = document.createElement("p");
    catAge.innerText = "Age : " + cat.age;
    catAge.id = "cat-age";
    catStats.appendChild(catAge);

    const statsContent = document.createElement("div");
    statsContent.id = "stats-content";

    const catStatsImg = document.createElement("img");
    catStatsImg.alt = "cat";
    catStatsImg.id = "cat-stats-img";
    catStatsImg.src = catElement.src;

    statsContent.appendChild(catStatsImg);

    const statsBars = document.createElement("div");
    statsBars.id = "stats-bars";

    statsBars.appendChild(
        createBar(cat.happiness, "cat-happiness", "happiness"),
    );
    statsBars.appendChild(createBar(100 - cat.hunger, "cat-hunger", "fulness"));
    statsBars.appendChild(createBar(cat.energy, "cat-energy", "energy"));
    statsBars.appendChild(
        createBar(cat.cleanliness, "cat-cleanliness", "cleanliness"),
    );

    statsContent.appendChild(statsBars);
    catStats.appendChild(statsContent);
}

function updateCatStats(cat) {
    document.getElementById("cat-age").innerText = "Age : " + cat.age;

    document.getElementsByClassName("name-of-cat")[0].value = cat.name;

    updateBar(cat.happiness, "cat-happiness");
    updateBar(100 - cat.hunger, "cat-hunger");
    updateBar(cat.energy, "cat-energy");
    updateBar(cat.cleanliness, "cat-cleanliness");
}

function createBar(barValue, barId, barName) {
    let barContainer = document.createElement("div");
    barContainer.id = barId;
    barContainer.innerText = barName;
    barContainer.classList.add("bar-container");

    barContainer.style.backgroundImage = 'url("./assets/UI/bars.png")';

    if (barValue === 0) barContainer.style.backgroundPositionY = "-120px";
    else if (barValue <= 25) barContainer.style.backgroundPositionY = "-90px";
    else if (barValue <= 50) barContainer.style.backgroundPositionY = "-60px";
    else if (barValue <= 75) barContainer.style.backgroundPositionY = "-30px";
    else barContainer.style.backgroundPositionY = "0";

    return barContainer;
}

function updateBar(barValue, barId) {
    let barContainer = document.getElementById(barId);

    if (barValue === 0) barContainer.style.backgroundPositionY = "-120px";
    else if (barValue <= 25) barContainer.style.backgroundPositionY = "-90px";
    else if (barValue <= 50) barContainer.style.backgroundPositionY = "-60px";
    else if (barValue <= 75) barContainer.style.backgroundPositionY = "-30px";
    else barContainer.style.backgroundPositionY = "0";
}

function openCloseCatSats() {
    catStats.classList.toggle("open");
}

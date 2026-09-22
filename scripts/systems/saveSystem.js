function saveCatStats(cat) {
    localStorage.setItem("cat", JSON.stringify(cat));
}

function loadCat() {
    let loadedCat = JSON.parse(localStorage.getItem("cat"));

    console.log("SALVATAGGIO:", loadedCat);

    if (loadedCat) {
        return Object.assign(new Cat(), loadedCat);
    }

    return new Cat();
}




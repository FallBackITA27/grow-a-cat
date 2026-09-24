function saveCatStats(cat) {
    localStorage.setItem("cat", JSON.stringify(cat));
}

function loadCat() {
	const catString = localStorage.getItem("cat");
	if (catString == undefined) return new Cat();

    let loadedCat = JSON.parse(catString);
    console.log("SALVATAGGIO:", loadedCat);
    return Object.assign(new Cat(), loadedCat);
}




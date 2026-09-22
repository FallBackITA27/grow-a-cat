let petActionList = [
    new PetAction("Cuddle", 25, 5, "./assets/items/cuddleHand.png"),
    new PetAction("Brush", 0, 20, "./assets/items/brush.png"),
    new PetAction("Wash", -10, 100, "./assets/items/sponge.png"),
]

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

function openClosePetMenu() {
    petMenu.classList.toggle('open');
}
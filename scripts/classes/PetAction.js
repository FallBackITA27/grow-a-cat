class PetAction {
    constructor(name, happiness, cleanliness, imageUrl) {
        this.name = name;
        this.happiness = happiness;
        this.cleanliness = cleanliness;
        this.imageUrl = imageUrl;
    }

    dragPetAction() {


        const petPlaceHolder = document.createElement('img');
        petPlaceHolder.src = this.imageUrl;
        petPlaceHolder.alt = this.name;
        petPlaceHolder.classList.add('pet-action-placeholder');
        document.body.appendChild(petPlaceHolder);

        const pMove = (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const petRect = petPlaceHolder.getBoundingClientRect();

            petPlaceHolder.style.left = (mouseX - petRect.width / 2) + 'px';
            petPlaceHolder.style.top = (mouseY - petRect.height / 2) + 'px';
        }

        const pUp = (event) => {
            const catRect = document.getElementById('cat-pet-img').getBoundingClientRect();
            if (event.clientX > catRect.left &&
                event.clientX < (catRect.left + catRect.width) &&
                event.clientY > catRect.top &&
                event.clientY < (catRect.top + catRect.height)
            ) {
                cat.pet(this);
            }
            petPlaceHolder.remove();
            document.removeEventListener('pointermove', pMove);
            document.removeEventListener('pointerup', pUp);
        }


        document.addEventListener("pointermove", pMove)
        document.addEventListener("pointerup", pUp)
    }
}
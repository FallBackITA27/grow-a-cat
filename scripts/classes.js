
class Cat {
    constructor() {
        // Velocità espressa in pixel al secondo
        this.speed = 0.3 * gameArea.clientWidth;

        const catRect = catElement.getBoundingClientRect();

        this.x = Math.floor(gameArea.clientWidth / 2) - Math.floor(catRect.width / 2);
        this.y = Math.floor(gameArea.clientHeight / 2) - Math.floor(catRect.height / 2);
        this.hunger = 0;
        this.happiness = 100;
        this.energy = 100;
        this.cleanliness = 100;
        this.age = 0;
        this.name = "Unknown Cat";
    }

    async moveCat() {

        let oldCoordinates = {
            x: this.x,
            y: this.y
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

            const move = (timestamp) => {

                // Tempo trascorso dall'ultimo frame, in secondi
                let deltaTime = (timestamp - lastTime) / 1000;
                lastTime = timestamp;

                let dx = destination.x - oldCoordinates.x;
                let dy = destination.y - oldCoordinates.y;

                let dir = Math.sqrt(dx * dx + dy * dy);

                if (dir <= this.speed * deltaTime) {

                    this.x = destination.x;
                    this.y = destination.y;

                    catElement.style.left = this.x + 'px';
                    catElement.style.top = this.y + 'px';

                    catNameHover.style.left = this.x + catElement.clientWidth / 2 + 'px';
                    catNameHover.style.top = this.y + 'px';

                    resolve();
                    return;
                }

                let directionX = dx / dir;
                let directionY = dy / dir;

                // La distanza percorsa dipende dal tempo trascorso.
                let movement = this.speed * deltaTime;

                this.x = oldCoordinates.x + directionX * movement;
                this.y = oldCoordinates.y + directionY * movement;

                catElement.style.left = this.x + 'px';
                catElement.style.top = this.y + 'px';

                catNameHover.style.left = this.x + catElement.clientWidth / 2 + 'px';
                catNameHover.style.top = this.y + 'px';

                oldCoordinates.x = this.x;
                oldCoordinates.y = this.y;

                requestAnimationFrame(move);
            }

            requestAnimationFrame(move);
        });
    }

    idleCat() {

        let waitTime = Math.floor(Math.random() * 5000);

        this.moveCat().then(() => {

            setTimeout(() => {

                this.idleCat();

            }, waitTime);

        });
    }

    feed(food) {
        this.hunger -= food.hungerValue;
        this.happiness += food.happiness;
        if (this.happiness > 100) this.happiness = 100;
        if (this.hunger < 0) this.hunger = 0;

        console.log(this.hunger);
        console.log(this.happiness);
    }

    pet(petAction) {
        this.happiness += petAction.happiness;
        this.cleanliness += petAction.cleanliness;
        if (this.happiness > 100) this.happiness = 100;
        if (this.cleanliness > 100) this.cleanliness = 100;

        console.log(this.happiness);
        console.log(this.cleanliness);
    }

    tires() {
        this.energy -= 5;
        if (this.energy < 0) this.energy = 0;
    }

    getsSad() {
        this.happiness -= 10;
        if (this.happiness < 0) this.happiness = 0;
    }

    getsHungry() {
        this.hunger += 10;
        if (this.hunger > 100) this.hunger = 100;
    }

}

class Food {
    constructor(name, hungerValue, happiness, imageUrl) {
        this.name = name;
        this.hungerValue = hungerValue;
        this.happiness = happiness;
        this.imageUrl = imageUrl;
    }

    dragFood() {

        foodMenu.classList.remove('open');


        const foodPlaceHolder = document.createElement('img');
        foodPlaceHolder.src = this.imageUrl;
        foodPlaceHolder.alt = this.name;
        foodPlaceHolder.classList.add('food-placeholder');
        document.body.appendChild(foodPlaceHolder);

        const pMove = (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const foodRect = foodPlaceHolder.getBoundingClientRect();

            foodPlaceHolder.style.left = (mouseX - foodRect.width / 2) + 'px';
            foodPlaceHolder.style.top = (mouseY - foodRect.height / 2) + 'px';
        }

        const pUp = (event) => {
            const catRect = catElement.getBoundingClientRect();
            if (event.clientX > catRect.left &&
                event.clientX < (catRect.left + catRect.width) &&
                event.clientY > catRect.top &&
                event.clientY < (catRect.top + catRect.height)
            ) {
                foodPlaceHolder.remove();
                document.removeEventListener('pointermove', pMove);
                document.removeEventListener('pointerup', pUp);
                cat.feed(this);
            }
            foodPlaceHolder.remove();
            document.removeEventListener('pointermove', pMove);
            document.removeEventListener('pointerup', pUp);
        }


        document.addEventListener("pointermove", pMove)
        document.addEventListener("pointerup", pUp)
    }

}

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
                petPlaceHolder.remove();
                document.removeEventListener('pointermove', pMove);
                document.removeEventListener('pointerup', pUp);
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
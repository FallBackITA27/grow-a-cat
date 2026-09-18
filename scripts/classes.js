
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

                // Se siamo abbastanza vicini alla destinazione,
                // posizioniamo il gatto esattamente lì e terminiamo il movimento.
                if (dir <= this.speed * deltaTime) {

                    this.x = destination.x;
                    this.y = destination.y;

                    catElement.style.left = this.x + 'px';
                    catElement.style.top = this.y + 'px';

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

}

class Food {
    constructor(name, hungerValue, happiness, imageUrl) {
        this.name = name;
        this.hungerValue = hungerValue;
        this.happiness = happiness;
        this.imageUrl = imageUrl;
    }

    dragFood() {
        //let selectedFood = new Food(food.name, food.hungerValue, food.happiness, food.imageUrl);
        foodMenu.classList.remove('open');

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

        const foodPlaceHolder = document.createElement('img');
        foodPlaceHolder.src = this.imageUrl;
        foodPlaceHolder.alt = this.name;
        foodPlaceHolder.classList.add('food-placeholder');
        document.body.appendChild(foodPlaceHolder);

        document.addEventListener("pointermove", pMove)
        document.addEventListener("pointerup", pUp)
    }

}
class Cat {
    constructor() {
        // Velocità espressa in pixel al secondo
        this.speed = 0.3 * gameArea.clientWidth;
        this.x = Math.floor(gameArea.clientWidth / 2) - Math.floor(catRect.width / 2);
        this.y = Math.floor(gameArea.clientHeight / 2) - Math.floor(catRect.height / 2);
        this.hunger = 0;
        this.happiness = 100;
        this.energy = 100;
        this.cleanliness = 100;
        this.age = 0;
        this.lastBirthday = Date.now();
        this.name = "Unknown Cat";
        this.isAsleep = false;
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

        if (!this.isAsleep) {
            this.moveCat().then(() => {

                setTimeout(() => {

                    this.idleCat();

                }, waitTime);

            });
        }
    }

    feed(food) {
        if (!this.isAsleep) {
            this.hunger -= food.hungerValue;
            this.happiness += food.happiness;
            if (this.happiness > 100) this.happiness = 100;
            if (this.hunger < 0) this.hunger = 0;
        }

        console.log(this.hunger);
        console.log(this.happiness);
    }

    pet(petAction) {
        if (!this.isAsleep) {
            this.happiness += petAction.happiness;
            this.cleanliness += petAction.cleanliness;
            if (this.happiness > 100) this.happiness = 100;
            if (this.cleanliness > 100) this.cleanliness = 100;
        }
        console.log(this.happiness);
        console.log(this.cleanliness);
    }

    tires() {
        this.energy -= 5;
        if (this.energy < 0) this.energy = 0;

    }

    rests() {
        this.energy += 5;
        if (this.energy > 100) this.energy = 100;
    }

    getsSad() {

        this.happiness -= 10;
        if (this.happiness < 0) this.happiness = 0;

    }

    getsHungry() {
        this.hunger += 10;
        if (this.hunger > 100) this.hunger = 100;
    }

    getsDirty() {
        this.cleanliness -= 5;
        if (this.cleanliness < 0) this.cleanliness = 0;
    }


    updateAge() {
        let now = Date.now();
        let daysPassed = (now - this.lastBirthday) / (24 * 60 * 60 * 1000);

        if (daysPassed >= 15) {

            let ageInc = Math.floor(daysPassed / 15);

            this.age += ageInc;
            this.lastBirthday += ageInc * 15 * 24 * 60 * 60 * 1000;

        }

        saveCatStats(this);
        updateCatStats(this);


    }

}
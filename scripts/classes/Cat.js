class Cat {
    constructor() {
        this.x = Math.floor(catRect.width / 2);
        this.y = Math.floor(catRect.height / 2);
        this.hunger = 0;
        this.happiness = 100;
        this.energy = 100;
        this.cleanliness = 100;
        this.age = 0;
        this.lastBirthday = Date.now();
        this.name = "Unknown Cat";
        this.isAsleep = false;

        this.updateGraphics();

        let _isRunningMovingLoop = false;
        setInterval(async () => {
            if (this.isAsleep || _isRunningMovingLoop) return;

            const delay = (ms) => new Promise((res) => setTimeout(res, ms));
            const waitTime = Math.floor(Math.random() * 5000);

            _isRunningMovingLoop = true;
            await delay(waitTime);
            _isRunningMovingLoop = false;

            this.x = Math.random() * 100;
            this.y = Math.random() * 100;

            this.updateGraphics();
        }, 1100); // Questa attesa deve essere più dell'animazione in CSS.
    }

    updateGraphics() {
        catBox.style.top = `min(${this.x}%, calc(100% - ${catBox.offsetWidth}px))`;
        catBox.style.left = `min(${this.y}%, calc(100% - ${catBox.offsetHeight}px))`;
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

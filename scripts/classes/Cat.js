class Cat {
    constructor() {
        // X and Y are a percentage relative to the width and height of catRect
        // 50,50 means the top left corner of catBox is in the center of catRect.
        this.x = 50;
        this.y = 50;
        this.hunger = 0;
        this.happiness = 100;
        this.energy = 100;
        this.cleanliness = 100;
        this.age = 0;
        this.lastBirthday = Date.now();
        this._name = "Unknown Cat";
        this.isAsleep = false;
        this._timeToMove = 1;

        this.updateGraphics();

        let _isRunningMovingLoop = false;
        setInterval(async () => {
            if (this.isAsleep || _isRunningMovingLoop) return;
            _isRunningMovingLoop = true;

            const delay = (ms) => new Promise((res) => setTimeout(res, ms));
            const waitTime = Math.floor(Math.random() * 5000);

            const [nextX, nextY] = [Math.random() * 100, Math.random() * 100];
            // 33% / 1 rapporto distanza/tempo
            // 33 : 1 = DIST : TEMPO
            // (1*DIST) / 33 = TEMPO
            const [percentageX, percentageY] = [nextX - this.x, nextY - this.y];
            const distanceInPercentage = Math.sqrt(
                Math.pow(percentageX, 2) + Math.pow(percentageY, 2),
            );
            this._timeToMove = distanceInPercentage / 33;

            await delay(waitTime + this._timeToMove);
            _isRunningMovingLoop = false;

            this.x = nextX;
            this.y = nextY;

            this.updateGraphics();
        }, 1100); // Questa attesa deve essere più dell'animazione in CSS.
    }

    updateGraphics() {
        catBox.style.transition = `all ${this._timeToMove}s linear`;
        catBox.style.top = `min(${this.x}%, calc(100% - ${catBox.offsetWidth}px))`;
        catBox.style.left = `min(${this.y}%, calc(100% - ${catBox.offsetHeight}px))`;
        catNameHover.textContent = this._name;
        catAge.textContent = `Age: ${this.age}`;

        const updBar = (id, val) => {
            const element = document.getElementById(id);
            element.classList.remove("l1", "l2", "l3", "l4", "l5");
            element.classList.add(
                val === 0
                    ? "l5"
                    : val <= 25
                      ? "l4"
                      : val <= 50
                        ? "l3"
                        : val <= 75
                          ? "l2"
                          : "l1",
            );
        };
        updBar("cat-happiness", this.happiness);
        updBar("cat-hunger", 100 - this.hunger);
        updBar("cat-energy", this.energy);
        updBar("cat-cleanliness", this.cleanliness);
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
    }

    set name(v) {
        this._name = v;
        this.updateGraphics();
        saveCatStats(this);
    }

    get name() {
        return this._name;
    }
}

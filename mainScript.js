const catElement = document.getElementById('cat');
const gameArea = document.getElementById('cat-container');

class Cat {
    constructor() {
        // Velocità espressa in pixel al secondo
        this.speed = 0.3 * gameArea.clientWidth;

        this.x = Math.floor(gameArea.clientWidth/2);
        this.y = Math.floor(gameArea.clientHeight/2);
        this.hunger = 100;
        this.happiness = 100;
        this.energy = 100;
        this.age = 0;
        this.name = "Unknown Cat";
    }
}

function moveCat(cat) {

    let oldCoordinates = {
        x: cat.x,
        y: cat.y
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

        function move(timestamp) {

            // Tempo trascorso dall'ultimo frame, in secondi
            let deltaTime = (timestamp - lastTime) / 1000;
            lastTime = timestamp;

            let dx = destination.x - oldCoordinates.x;
            let dy = destination.y - oldCoordinates.y;

            let dir = Math.sqrt(dx * dx + dy * dy);

            // Se siamo abbastanza vicini alla destinazione,
            // posizioniamo il gatto esattamente lì e terminiamo il movimento.
            if (dir <= cat.speed * deltaTime) {

                cat.x = destination.x;
                cat.y = destination.y;

                catElement.style.left = cat.x + 'px';
                catElement.style.top = cat.y + 'px';

                resolve();
                return;
            }

            let directionX = dx / dir;
            let directionY = dy / dir;

            // La distanza percorsa dipende dal tempo trascorso.
            let movement = cat.speed * deltaTime;

            cat.x = oldCoordinates.x + directionX * movement;
            cat.y = oldCoordinates.y + directionY * movement;

            catElement.style.left = cat.x + 'px';
            catElement.style.top = cat.y + 'px';

            oldCoordinates.x = cat.x;
            oldCoordinates.y = cat.y;

            requestAnimationFrame(move);
        }

        requestAnimationFrame(move);
    });
}

function idleCat() {

    let waitTime = Math.floor(Math.random() * 5000);

    moveCat(cat).then(() => {

        setTimeout(() => {

            idleCat();

        }, waitTime);

    });
}

let cat = new Cat();

catElement.style.left = cat.x + 'px';
catElement.style.top = cat.y + 'px';

idleCat();
class Food {
    constructor(name, hungerValue, happiness, imageUrl) {
        this.name = name;
        this.hungerValue = hungerValue;
        this.happiness = happiness;
        this.imageUrl = imageUrl;
    }

    dragFood() {
        foodMenu.classList.remove("open");

        const foodPlaceHolder = document.createElement("img");
        foodPlaceHolder.src = this.imageUrl;
        foodPlaceHolder.alt = this.name;
        foodPlaceHolder.classList.add("food-placeholder");
        document.body.appendChild(foodPlaceHolder);

        const pMove = (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const foodRect = foodPlaceHolder.getBoundingClientRect();

            foodPlaceHolder.style.left = mouseX - foodRect.width / 2 + "px";
            foodPlaceHolder.style.top = mouseY - foodRect.height / 2 + "px";
        };

        const pUp = (event) => {
            const catRect = catElement.getBoundingClientRect();
            if (
                event.clientX > catRect.left &&
                event.clientX < catRect.left + catRect.width &&
                event.clientY > catRect.top &&
                event.clientY < catRect.top + catRect.height
            ) {
                cat.feed(this);
            }
            foodPlaceHolder.remove();
            document.removeEventListener("pointermove", pMove);
            document.removeEventListener("pointerup", pUp);
        };

        document.addEventListener("pointermove", pMove);
        document.addEventListener("pointerup", pUp);
    }
}

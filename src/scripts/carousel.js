// SETTINGS
const back_class = ".card-carousel-back";
const forward_class = ".card-carousel-forward";

/* Function returns a new carousel object */
export function Carousel(element, items, createCard) {
    const carousel = {
        items: items,
        element: element,
        get maxItems() {
            return Math.floor(
                (this.element.clientWidth - 32) / this.ITEM_WIDTH
            );
        },
        get lastPage() {
            return Math.ceil(this.items.length / this.maxItems);
        },
        page: 0,
        lastMaxItems: 0,
        createCard: createCard,
        setPage(change) {
            if (change >= 0)
                this.page = this.page === this.lastPage - 1 ? 0 : this.page + 1;
            else
                this.page = this.page === 0 ? this.lastPage - 1 : this.page - 1;
            this.update();
        },
        update() {
            const item_amount = this.items.length;
            const start =
                item_amount - this.page * this.maxItems < this.maxItems
                    ? this.page * this.maxItems -
                      (item_amount - this.page * this.maxItems) -
                      1
                    : this.page * this.maxItems;
            let html = "";
            for (let i = start; i < start + carousel.maxItems; i++) {
                html += this.createCard(this.items[i]);
            }
            carousel.element.innerHTML = html;
        },
    };

    Object.defineProperty(carousel, "ITEM_WIDTH", {
        value: 141,
        writable: false,
    });

    const parent = element.parentElement;
    const back_button = parent.querySelector(back_class);
    const forward_button = parent.querySelector(forward_class);

    if (back_button) {
        back_button.addEventListener("click", () => {
            carousel.setPage(-1);
        })
    }

    if (forward_button) {
        forward_button.addEventListener("click", () => {
            carousel.setPage(1);
        })
    }

    return carousel;
}

export function updateAllCarousels(carousels) {
    for (let carousel of carousels) {
        if (carousel.lastMaxItems !== carousel.maxItems) {
            carousel.lastMaxItems = carousel.maxItems;
            carousel.update();
        }
    }
}
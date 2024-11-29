const mangaList = [
    {
        id: 0,
        title: "I have reincarnated as a cute girl",
        type: "Manga",
        last_chapter: 127.2,
    },
    {
        id: 1,
        title: "Let the whole world burn",
        type: "Manga",
        last_chapter: 5,
    },
    {
        id: 2,
        title: "Konosuba",
        type: "Manga",
        last_chapter: 12,
    },
    {
        id: 3,
        title: "Re: Fantazio",
        type: "Manhwa",
        last_chapter: 13.1,
    },
    {
        id: 4,
        title: "S-Class raised heroes are too strong",
        type: "Manga",
        last_chapter: 7,
    },
    {
        id: 5,
        title: "Devil's wish",
        type: "Manga",
        last_chapter: 99,
    },
    {
        id: 6,
        title: "Super puper mega good manga",
        type: "Manhwa",
        last_chapter: 108,
    },
    {
        id: 7,
        title: "Cool dad has even cooler abilities",
        type: "Manhwa",
        last_chapter: 213.1,
    },
    {
        id: 8,
        title: "What the F is the kilometer",
        type: "Manhwa",
        last_chapter: 1,
    },
    {
        id: 9,
        title: "My dog is acting very suspicious",
        type: "Manga",
        last_chapter: 57,
    },
];

function createMangaCard(item) {
    let title = item.title;
    const maxLineLength = 18;
    if (item.title.replaceAll(" ", "").length > 36) {
        title = item.title.slice(0, Math.min(item.title.length, 36));
    }
    if (title.length > maxLineLength) {
        const words = title.split(" ");
        let lines = [];
        let currentLine = "";
        let idx = -1;

        for (let word of words) {
            if (
                (currentLine + word).length + (currentLine ? 1 : 0) <=
                maxLineLength
            ) {
                // Add word to current line with space if it's not empty
                currentLine += word + " ";
            } else {
                // If the word doesn't fit, push the current line and start a new one
                if (currentLine) {
                    lines.push(currentLine);
                    currentLine = "";
                    idx += 1;
                }

                // If the word itself is longer than maxLineLength, break it with a hyphen
                let left = lines[idx].length;
                if (left >= 2 && word.length >= maxLineLength - left) {
                    lines[idx] += word.slice(0, maxLineLength - left - 2) + "-";
                    word = word.slice(maxLineLength - left - 2);
                }
                currentLine = word + " "; // Start a new line with the remaining part
            }
        }

        // Add the last line if it exists
        if (currentLine) {
            if (lines.length < 2) {
                lines.push(currentLine);
            } else {
                lines[1] =
                    lines[1].slice(0, Math.min(item.title.length, 15)) + "...";
            }
        }

        // Join lines with a line break
        title = lines.join(" ");
    }
    return `
    <div class="card-item">
        <a href="#" class="card-item__cover">
            <img class="card-item__image" alt="" />
            <div class="image"></div>
            <div class="card-item__chapter">
                <span>Chapter ${item.last_chapter}</span>
            </div>
        </a>
        <div class="card-item__caption">
            <a class="card-item__caption-name">${title}</a>
            <span class="card-item__caption-type">${item.type}</span>
        </div>
    </div>
    `;
}

const carousel = {
    element: document.querySelector(".card-carousel"),
    get maxItems() {
        return Math.floor((this.element.clientWidth - 32) / this.ITEM_WIDTH);
    },
    get lastPage() {
        return Math.ceil(mangaList.length / this.maxItems);
    },
    page: 0,
    lastMaxItems: 0,
};

Object.defineProperty(carousel, "ITEM_WIDTH", {
    value: 141,
    writable: false,
});

function fillCarousel() {
    const start =
        mangaList.length - carousel.page * carousel.maxItems < carousel.maxItems
            ? carousel.page * carousel.maxItems -
              (mangaList.length - carousel.page * carousel.maxItems) -
              1
            : carousel.page * carousel.maxItems;
            console.log(`Page: ${start} | ${start + carousel.maxItems-1}`)
    let html = "";
    for (let i = start; i < start + carousel.maxItems; i++) {
        html += createMangaCard(mangaList[i]);
    }
    carousel.element.innerHTML = html;
}

function setPage(change) {
    if (change >= 0)
        carousel.page =
            carousel.page === carousel.lastPage - 1 ? 0 : carousel.page + 1;
    else
        carousel.page =
            carousel.page === 0 ? carousel.lastPage - 1 : carousel.page - 1;
    console.log(carousel.page)
            fillCarousel();
}

window.addEventListener("resize", (e) => {
    if (carousel.lastMaxItems !== carousel.maxItems) {
        carousel.lastMaxItems = carousel.maxItems;
        fillCarousel();
    }
});

fillCarousel();
carousel.lastMaxItems = carousel.maxItems;

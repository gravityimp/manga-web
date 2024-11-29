import { Carousel, updateAllCarousels } from "./carousel";

import { mangaList } from "./data";
import { MangaCard } from "./carousel_items/manga";

const carousels = [
    Carousel(document.querySelector("#manga-carousel"), mangaList, MangaCard),
];

window.addEventListener("resize", (e) => {
    updateAllCarousels(carousels);
});

updateAllCarousels(carousels);

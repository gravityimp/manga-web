export function MangaCard(item) {
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

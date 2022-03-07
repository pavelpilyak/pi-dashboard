const {
    config,
    entities,
} = window;

const tilesContainer = document.querySelector('.tiles');

const getTile = ({
    entityName,
    name,
    image,
    info,
}) => {
    let infoHtml = '';
    if (info) {
        info.forEach(data => {
            const {
                color,
                image,
                isFull,
                isMain,
                name,
                value,
            } = data;

            const className = isMain ? 'tile-info-main' : '';
            const nameHtml = name ? `${name}:` : '';
            const imageHtml = image 
                ? `<img src="${image}" class="${isFull ? 'full-tile-image' : ''}" />` 
                : '';

            infoHtml += `
                <p class="${className}">
                    ${nameHtml}
                    <span class="${color || ''}">
                        ${value || ''}
                    </span>
                    ${imageHtml}
                </p>
            `;
        });
    }

    const imageHtml = image
        ? `
            <div class="tile-image">
                <img src="${image}" />
            </div>
        ` : '';

    return `
        <div class="tile" data-entity-name="${entityName}">
            <div class="tile-title">${name}</div>
            ${imageHtml}
            <div class="tile-info">${infoHtml}</div>
        </div>
    `
};

config.tiles.forEach(tile => {
    const addTile = (isNew = false) => {
        const Entity = entities[tile];

        Entity.getInfo().then(data => {
            const html = getTile(data);

            if (isNew) {
                tilesContainer.insertAdjacentHTML('afterbegin', html);
            } else {
                const tileElement = document.querySelector(`[data-entity-name="${tile}"]`);

                tileElement.insertAdjacentHTML('beforebegin', html);
                tileElement.remove();
            }
        });
    };

    addTile(true);
    
    setInterval(addTile, config.intervals[tile]);
});
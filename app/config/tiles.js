(function () {    
    /**
     * Options: weather
     */
    const tiles = [
        'bored',
        'crypto',
        'dogs',
        'exchange',
        'weather',
    ];

    if (!window.config) {
        window.config = {};
    }

    window.config.tiles = tiles;
})();
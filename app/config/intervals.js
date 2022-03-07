(function () {
    const intervals = {
        bored: 1000 * 60 * 30, // thirty minutes
        crypto: 1000 * 60 * 60, // one hour
        dogs: 1000 * 60 * 5, // five minutes
        exchange: 1000 * 60 * 60 * 3, // three hour because of free pricing plan
        weather: 1000 * 60 * 60, // one hour
    };

    if (!window.config) {
        window.config = {};
    }

    window.config.intervals = intervals;
})();
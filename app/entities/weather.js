(function () {
    const URL = 'https://weatherdbi.herokuapp.com';

    class Weather {
        constructor(location) {
            this.location = location;
        }

        getInfo() {
            return fetch(`${URL}/data/weather/${this.location}`)
                .then(response => response.json())
                .then(response => this.transformData(response))
                .catch(error => {
                    const {message} = error;

                    alert(`Weather error: ${message}`);
                });
        }
        
        transformData = (data) => ({
            entityName: 'weather',
            name: 'Weather',
            info: [
                {
                    isMain: true,
                    image: data.currentConditions.iconURL,
                    value: data.currentConditions.comment,
                },
                {
                    name: 'Humidity',
                    value: data.currentConditions.humidity,
                },
                {
                    name: 'Temp',
                    value: `${data.currentConditions.temp[TEMP_TYPE]}&deg;${TEMP_TYPE.toUpperCase()}`,
                },
                {
                    name: 'Wind',
                    value: `${data.currentConditions.wind[WIND_TYPE]}${WIND_TYPE}`,
                },
                {
                    name: 'Region',
                    value: data.region,
                },
            ],
        });
    }

    if (!window.entities) {
        window.entities = {};
    }

    window.entities.weather = new Weather(LOCATION);
})();
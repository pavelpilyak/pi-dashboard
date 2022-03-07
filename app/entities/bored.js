(function () {
    const URL = 'https://www.boredapi.com/api/activity';

    class Bored {
        getInfo() {
            return fetch(URL)
                .then(response => response.json())
                .then(response => this.transformData(response))
                .catch(error => {
                    const {message} = error;

                    alert(`Bored error: ${message}`);
                });
        }
        
        transformData = (data) => ({
            entityName: 'bored',
            name: 'Activity Suggestions',
            info: [
                {
                    isMain: true,
                    value: data.activity,
                },
                {
                    name: 'Participants number',
                    value: data.participants,
                },
                {
                    name: 'Price',
                    value: data.price.toString(),
                },
                {
                    name: 'Type',
                    value: data.type,
                },
            ],
        });
    }

    if (!window.entities) {
        window.entities = {};
    }

    window.entities.bored = new Bored;
})();
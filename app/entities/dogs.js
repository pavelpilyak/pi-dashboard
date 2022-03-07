(function () {
    const URL = 'https://dog.ceo/api/breeds/image/random';

    class Dogs {
        getInfo() {
            return fetch(URL)
                .then(response => response.json())
                .then(response => this.transformData(response))
                .catch(error => {
                    const {message} = error;

                    alert(`Dogs error: ${message}`);
                });
        }
        
        transformData = (data) => ({
            entityName: 'dogs',
            name: 'Dogs',
            info: [
                {
                    image: data.message,
                    isFull: true,
                },
            ],
        });
    }

    if (!window.entities) {
        window.entities = {};
    }

    window.entities.dogs = new Dogs;
})();
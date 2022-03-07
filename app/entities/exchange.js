(function () {
    const URL = 'https://open.er-api.com/v6/latest';

    class Exchange {
        constructor(currencies, currency) {
            this.currencies = currencies;
            this.currency = currency;
        }

        getInfo() {
            return fetch(`${URL}/${this.currency}`)
                .then(response => response.json())
                .then(response => this.transformData(response))
                .catch(error => {
                    const {message} = error;

                    alert(`Exchange error: ${message}`);
                });
        }
        
        transformData(data) {
            const transformedData = {
                entityName: 'exchange',
                name: `${this.currency} Exchange Rate`,
            };
            const info = [];
            
            this.currencies.forEach(currency => {
                if (data.rates[currency]) {
                    info.push(
                        {
                            isMain: true,
                            value: currency,
                        },
                        {
                            name: 'Rate',
                            value: data.rates[currency],
                        },
                        {
                            value: '<hr>',
                        }
                    );
                }
            });

            transformedData.info = info;

            return transformedData;
        };
    }

    if (!window.entities) {
        window.entities = {};
    }

    window.entities.exchange = new Exchange(CURRENCIES, CURRENCY);
})();
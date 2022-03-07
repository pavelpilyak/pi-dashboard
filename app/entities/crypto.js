(function () {
    const URL = 'https://api2.binance.com/api/v3/ticker/24hr';

    class Crypto {
        constructor(tickers) {
            this.tickers = tickers;
        }

        getInfo() {
            return fetch(URL)
                .then(response => response.json())
                .then(response => this.transformData(response))
                .catch(error => {
                    const {message} = error;

                    alert(`Crypto error: ${message}`);
                });
        }
        
        transformData(data) {
            const transformedData = {
                entityName: 'crypto',
                name: 'Crypto',
            };
            const info = [];
            
            data.forEach(ticker => {
                if (this.tickers.has(ticker.symbol)) {
                    info.push(
                        {
                            isMain: true,
                            value: ticker.symbol,
                        },
                        {
                            name: 'Price change',
                            color: ticker.priceChange[0] === '-' ? 'red' : 'green',
                            value: `${ticker.priceChangePercent}%`,
                        },
                        {
                            name: 'Low price',
                            value: `${ticker.lowPrice}`,
                        },
                        {
                            name: 'High price',
                            value: `${ticker.highPrice}`,
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

    window.entities.crypto = new Crypto(TICKERS);
})();
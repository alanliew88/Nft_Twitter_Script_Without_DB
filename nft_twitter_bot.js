const axios = require('axios');
const twitterApi = require('twitter-api-v2');
const cron = require('node-cron');

// Initialize Twitter API client
// Initialize Twitter API client
const twitterClient = new twitterApi.TwitterApi({
    appKey:'your-app-key',
    appSecret:'your-app-secret',
    accessToken: 'your-access-token',
    accessSecret:'your-access-secret',
  });

// Read+Write level
const rwClient = twitterClient.readWrite;

async function getTopNFT() {
    let topNFT = [];
    const url = 'https://pro-api.coingecko.com/api/v3/nfts/list?x_cg_pro_api_key=???order=h24_volume_usd_desc&per_page=5&page=1';
    await axios.get(url)
        .then(function (response) {
            topNFT = topNFT.concat(response.data.map(key => key.id));
        })
        .catch(function (error) { console.log(error) })

    console.log(topNFT);

    let NftData = [];
    for (let i = 0; i < topNFT.length; i++) {
        const url2 = 'https://pro-api.coingecko.com/api/v3/nfts/' + topNFT[i] + '?x_cg_pro_api_key=???';
        await axios.get(url2)
            .then(function (response) {
                var x = response.data;
                NftData.push({
                    "name": x.name,
                    "floor_price": x.floor_price.native_currency,
                    "native_currency_symbol": x.native_currency_symbol,
                    "floor_price_24h_change": x.floor_price_24h_percentage_change.native_currency
                });
            })
            .catch(function (error) { console.log(error) })
    }

    const logMessagesArray = [];

    for (let i = 0; i < NftData.length; i++) {
        const { name, floor_price, native_currency_symbol, floor_price_24h_change } = NftData[i];
        let changeSymbol = '';

        // Limiting floor_price_24h_change to 2 decimal places
        const formattedChange = parseFloat(floor_price_24h_change).toFixed(5);


        if (floor_price_24h_change > 0) {
            changeSymbol = '🟢\u{2191}'; // Green arrow up emoji
        } else if (floor_price_24h_change < 0) {
            changeSymbol = '🔴\u{2193}'; // Red arrow down emoji
        } else {
            changeSymbol = '⚫️'; // Black circle emoji for no change
        }

        const logMessage = `${name} -> ${floor_price} ${native_currency_symbol} | ${changeSymbol} ${formattedChange}%`;
        logMessagesArray.push(logMessage); // Push each log message to the array
    }

    console.log(logMessagesArray); // Log the entire array after the loop finishes

    try{
        await tweetMultipleNFTs(logMessagesArray);
    }catch(error){
        console.error('Error posting tweet:', error);
    }
}

async function tweetMultipleNFTs(logMessages) {
    try {
        if (logMessages && logMessages.length > 0) {
            const header = 'Top 5 NFT'; // Define your header here
            const footer = '\n\nBased on the last 24 hour\n#Coingecko #NFT '; // Define your footer here
            
            // Join log messages while considering character limit
            let combinedLogMessages = `${header}\n\n`;
            let currentLength = combinedLogMessages.length;
            const maxTweetLength = 280; // Maximum characters for a tweet

            for (const message of logMessages) {
                if (currentLength + message.length + footer.length <= maxTweetLength) {
                    combinedLogMessages += `${message}\n`;
                    currentLength += message.length;
                } else {
                    break; // Break loop if exceeding character limit
                }
            }

            combinedLogMessages += footer;

            await rwClient.v2.tweet({
                text: combinedLogMessages,
            });

            console.log('Tweeted the post:', combinedLogMessages);
        } else {
            console.error('Error: logMessages array is empty or undefined.');
        }
    } catch (error) {
        console.error('Error posting tweet:', error);
    }
}


getTopNFT();

# NFT Twitter Bot
This Node.js application fetches data for the top NFTs from the Coingecko API and posts the information as a tweet using the Twitter API.


## Overview

The application is designed to perform the following tasks:

- Retrieve the top NFTs data from the Coingecko API.
- Process the fetched data to generate log messages for each NFT, including name, floor price, native currency symbol, and 24-hour price change.
- Construct a tweet containing information about the top NFTs and post it on Twitter using the Twitter API.

## Prerequisites

- Node.js installed on your machine.
- Access to Coingecko and Twitter API keys for authentication.

## Setup

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Update the Twitter API and Coingecko API credentials in the script file (`new_nft.js`) with your own keys.
4. Run the script using `node new_nft.js` to execute the process.

## Replace the ??? with your CG Pro API Key

Line 19 : const url = 'https://pro-api.coingecko.com/api/v3/nfts/list?x_cg_pro_api_key=???order=h24_volume_usd_desc&per_page=5&page=1';

Line 30 : const url2 = 'https://pro-api.coingecko.com/api/v3/nfts/' + topNFT[i] + '?x_cg_pro_api_key=???';


## Dependencies

- Axios: Used for making HTTP requests to the Coingecko API.
- Twitter-API-v2: A Twitter API client for Node.js used to post tweets.

## Usage

- Running the `new_nft.js` script will trigger the process:
  - Fetching the top NFTs data from Coingecko.
  - Generating log messages for each NFT.
  - Constructing a tweet with NFT information.
  - Posting the tweet using the Twitter API.

## Important Notes

- The script includes error handling for API requests and tweet posting.
- Twitter character limits are taken into account when constructing the tweet.
- Ensure your API keys are kept secure and not shared publicly.

## References

- [Coingecko API Documentation](https://www.coingecko.com/api/documentation)
- [Twitter API v2 Documentation](https://developer.twitter.com/en/docs/twitter-api)

Feel free to modify and enhance the script according to your requirements.


// Netlify Serverless Function for real crypto data
// This is optional - you can use the mock data in script.js

exports.handler = async function(event, context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        // Get API key from Netlify environment variables
        const API_KEY = process.env.COINGECKO_API_KEY || '';
        
        // Fetch real data from CoinGecko
        const response = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true',
            {
                headers: API_KEY ? { 'x-cg-demo-api-key': API_KEY } : {}
            }
        );

        if (!response.ok) throw new Error('API request failed');

        const data = await response.json();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                btc: { price: data.bitcoin.usd, change: data.bitcoin.usd_24h_change },
                eth: { price: data.ethereum.usd, change: data.ethereum.usd_24h_change },
                sol: { price: data.solana.usd, change: data.solana.usd_24h_change }
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};

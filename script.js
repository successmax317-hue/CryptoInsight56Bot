// ============================================
// TELEGRAM INITIALIZATION
// ============================================

const tg = window.Telegram.WebApp;
tg.expand();

// ============================================
// CRYPTO DATA (Mock - Replace with real API)
// ============================================

const cryptoData = {
    btc: {
        name: 'Bitcoin',
        symbol: 'BTC',
        icon: '₿',
        price: '$67,432.50',
        change: '+2.45%',
        changeValue: 2.45,
        volume: '$28.4B'
    },
    eth: {
        name: 'Ethereum',
        symbol: 'ETH',
        icon: '⟠',
        price: '$3,521.80',
        change: '+1.82%',
        changeValue: 1.82,
        volume: '$15.2B'
    },
    sol: {
        name: 'Solana',
        symbol: 'SOL',
        icon: '◎',
        price: '$172.35',
        change: '+4.12%',
        changeValue: 4.12,
        volume: '$3.8B'
    }
};

const marketStats = {
    marketCap: '$2.41T',
    totalVolume: '$68.7B',
    btcDominance: '51.2%',
    fearGreed: '72 🟢'
};

const gainers = [
    { name: 'PEPE', change: '+12.34%' },
    { name: 'DOGE', change: '+8.76%' },
    { name: 'AVAX', change: '+6.54%' }
];

const losers = [
    { name: 'WIF', change: '-5.67%' },
    { name: 'BONK', change: '-4.32%' },
    { name: 'ARB', change: '-3.21%' }
];

const newsItems = [
    {
        badge: '🔥',
        headline: 'Bitcoin ETF Inflows Reach Record High',
        summary: 'Institutional investors pour $2.1B into BTC ETFs this week.',
        source: 'CoinDesk',
        time: '2h ago'
    },
    {
        badge: '📈',
        headline: 'Ethereum Layer 2 Activity Surges',
        summary: 'Arbitrum and Optimism see 40% increase in daily transactions.',
        source: 'The Block',
        time: '4h ago'
    },
    {
        badge: '🏦',
        headline: 'SEC Delays Decision on Spot Ethereum ETF',
        summary: 'Regulator extends review period for several ETH ETF applications.',
        source: 'Reuters',
        time: '6h ago'
    }
];

// ============================================
// RENDER FUNCTIONS
// ============================================

function renderMarketData() {
    // Bitcoin
    document.getElementById('btc-price').textContent = cryptoData.btc.price;
    const btcChange = document.getElementById('btc-change');
    btcChange.textContent = cryptoData.btc.change;
    btcChange.className = 'market-change ' + (cryptoData.btc.changeValue >= 0 ? 'positive' : 'negative');
    document.querySelector('#btc-card .market-volume').textContent = `Volume: ${cryptoData.btc.volume}`;

    // Ethereum
    document.getElementById('eth-price').textContent = cryptoData.eth.price;
    const ethChange = document.getElementById('eth-change');
    ethChange.textContent = cryptoData.eth.change;
    ethChange.className = 'market-change ' + (cryptoData.eth.changeValue >= 0 ? 'positive' : 'negative');
    document.querySelector('#eth-card .market-volume').textContent = `Volume: ${cryptoData.eth.volume}`;

    // Solana
    document.getElementById('sol-price').textContent = cryptoData.sol.price;
    const solChange = document.getElementById('sol-change');
    solChange.textContent = cryptoData.sol.change;
    solChange.className = 'market-change ' + (cryptoData.sol.changeValue >= 0 ? 'positive' : 'negative');
    document.querySelector('#sol-card .market-volume').textContent = `Volume: ${cryptoData.sol.volume}`;
}

function renderStats() {
    document.getElementById('market-cap').textContent = marketStats.marketCap;
    document.getElementById('total-volume').textContent = marketStats.totalVolume;
    document.getElementById('btc-dominance').textContent = marketStats.btcDominance;
    document.getElementById('fear-greed').textContent = marketStats.fearGreed;
}

function renderGainersLosers() {
    const gainersList = document.getElementById('gainers-list');
    gainersList.innerHTML = gainers.map(item => `
        <div class="gl-item positive">
            <span>${item.name}</span>
            <span>${item.change}</span>
        </div>
    `).join('');

    const losersList = document.getElementById('losers-list');
    losersList.innerHTML = losers.map(item => `
        <div class="gl-item negative">
            <span>${item.name}</span>
            <span>${item.change}</span>
        </div>
    `).join('');
}

function renderNews() {
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = newsItems.map(item => `
        <div class="news-item">
            <span class="news-badge">${item.badge}</span>
            <div class="news-content">
                <h4>${item.headline}</h4>
                <p>${item.summary}</p>
                <span class="news-meta">${item.source} · ${item.time}</span>
            </div>
        </div>
    `).join('');
}

// ============================================
// REFRESH FUNCTION
// ============================================

function refreshData() {
    const btn = document.getElementById('refresh-btn');
    btn.classList.add('loading');
    btn.innerHTML = '<span class="fab-icon">⟳</span> Updating...';

    // Simulate API call delay
    setTimeout(() => {
        // Randomize some data for demo
        const randomPrice = (min, max) => {
            return '$' + (Math.random() * (max - min) + min).toFixed(2);
        };
        const randomChange = () => {
            const change = (Math.random() * 10 - 5);
            return change.toFixed(2);
        };

        // Update BTC
        const btcPrice = randomPrice(65000, 69000);
        document.getElementById('btc-price').textContent = btcPrice;
        const btcChange = parseFloat(randomChange());
        const btcChangeEl = document.getElementById('btc-change');
        btcChangeEl.textContent = (btcChange >= 0 ? '+' : '') + btcChange + '%';
        btcChangeEl.className = 'market-change ' + (btcChange >= 0 ? 'positive' : 'negative');

        // Update ETH
        const ethPrice = randomPrice(3400, 3700);
        document.getElementById('eth-price').textContent = ethPrice;
        const ethChange = parseFloat(randomChange());
        const ethChangeEl = document.getElementById('eth-change');
        ethChangeEl.textContent = (ethChange >= 0 ? '+' : '') + ethChange + '%';
        ethChangeEl.className = 'market-change ' + (ethChange >= 0 ? 'positive' : 'negative');

        // Update SOL
        const solPrice = randomPrice(160, 185);
        document.getElementById('sol-price').textContent = solPrice;
        const solChange = parseFloat(randomChange());
        const solChangeEl = document.getElementById('sol-change');
        solChangeEl.textContent = (solChange >= 0 ? '+' : '') + solChange + '%';
        solChangeEl.className = 'market-change ' + (solChange >= 0 ? 'positive' : 'negative');

        // Update stats with slight randomness
        const fearGreedValues = ['72 🟢', '65 🟡', '78 🟢', '55 🟡', '45 🔴'];
        document.getElementById('fear-greed').textContent = fearGreedValues[Math.floor(Math.random() * fearGreedValues.length)];

        // Randomize gainers and losers
        const cryptoList = ['BTC', 'ETH', 'SOL', 'AVAX', 'DOGE', 'PEPE', 'ARB', 'WIF', 'BONK'];
        const shuffled = cryptoList.sort(() => 0.5 - Math.random());
        const newGainers = shuffled.slice(0, 3).map(name => ({
            name: name,
            change: '+' + (Math.random() * 15 + 2).toFixed(2) + '%'
        }));
        const newLosers = shuffled.slice(3, 6).map(name => ({
            name: name,
            change: '-' + (Math.random() * 8 + 1).toFixed(2) + '%'
        }));
        renderGainersLosers();

        // Haptic feedback
        if (tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }

        btn.classList.remove('loading');
        btn.innerHTML = '<span class="fab-icon">⟳</span> Refresh Data';
    }, 800);
}

// ============================================
// INITIALIZATION
// ============================================

renderMarketData();
renderStats();
renderGainersLosers();
renderNews();

// Event Listeners
document.getElementById('refresh-btn').addEventListener('click', refreshData);

// Telegram Close Button
tg.MainButton.setText('Close');
tg.MainButton.onClick(() => tg.close());

// Back Button
tg.onEvent('backButtonClicked', () => {
    tg.close();
});

// ============================================
// AUTO-REFRESH EVERY 60 SECONDS
// ============================================

setInterval(refreshData, 60000);

// ============================================
// CONSOLE WELCOME
// ============================================

console.log('%c📊 CryptoInsight Mini App', 'font-size: 20px; font-weight: bold; color: #f7931a;');
console.log('%cLive crypto data at your fingertips!', 'font-size: 14px; color: #94a3b8;');

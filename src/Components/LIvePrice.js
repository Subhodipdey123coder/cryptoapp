
import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import axios from 'axios';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws/!ticker@arr';
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets';
 
function LIvePrice() {
    const [coins, setCoins] = useState([]);
  const [coinImages, setCoinImages] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch top 20 coins data (including images) from CoinGecko
  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(COINGECKO_API_URL, {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 20, // Fetch top 20 coins
            page: 1,
          },
        });

        const imageMap = {};
        response.data.forEach((coin) => {
          imageMap[coin.symbol.toUpperCase()] = {
            name: coin.name,
            image: coin.image,
          };
        });

        setCoinImages(imageMap); // Store coin images and names
      } catch (error) {
        console.error('Error fetching coin data from CoinGecko:', error);
      }
    };

    fetchCoinData();
  }, []);

  // WebSocket connection using Binance API
  const { lastMessage } = useWebSocket(BINANCE_WS_URL, {
    onOpen: () => console.log('WebSocket connection established'),
    shouldReconnect: (closeEvent) => true, // Auto-reconnect on disconnection
  });

  // Updating coins list on receiving WebSocket data
  useEffect(() => {
    if (lastMessage !== null) {
      const updatedCoins = JSON.parse(lastMessage.data);

      // Only include coins present in the top 20 fetched from CoinGecko
      const allCoins = updatedCoins
        .filter((coin) => coinImages[coin.s.replace('USDT', '')]) // Filter top 20 coins
        .map((coin) => ({
          symbol: coin.s.replace('USDT', ''),
          price: parseFloat(coin.c).toFixed(2),
          change: parseFloat(coin.P).toFixed(2),
          marketCap: parseFloat(coin.q).toLocaleString(),
        }));

      setCoins(allCoins);
    }
  }, [lastMessage, coinImages]);

  // Filter coins based on search term
  const filteredCoins = coins.filter((coin) =>
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Live Cryptocurrency Prices with Search</h1>
      
      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a coin..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price (USD)</th>
            <th>24h Change (%)</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin) => (
            <tr key={coin.symbol}>
              <td>
                <img
                  src={coinImages[coin.symbol]?.image}
                  alt={coinImages[coin.symbol]?.name || coin.symbol}
                  style={{ width: '25px', marginRight: '10px' }}
                />
                {coinImages[coin.symbol]?.name || coin.symbol}
              </td>
              <td>${coin.price}</td>
              <td style={{ color: coin.change > 0 ? 'lightgreen' : 'lightred' }}>
                {coin.change}%
              </td>
              <td>${coin.marketCap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LIvePrice

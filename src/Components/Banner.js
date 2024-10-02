import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Banner() {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [currentCoin, setCurrentCoin] = useState(0);
  const [coinPrices, setCoinPrices] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState('inr'); // Default currency: INR
  const coinsPerPage = 5; // Number of coins per page
  const [currentPage, setCurrentPage] = useState(1); // Current page

  const currencySymbols = {
    inr: '₹',
    usd: '$',
    eur: '€',
  };

  // Fetch trending coins and prices in the selected currency
  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/search/trending'
        );
        const coins = response.data.coins.map((coin) => ({
          id: coin.item.id, // CoinGecko ID needed for fetching prices
          name: coin.item.name,
          symbol: coin.item.symbol,
          image: coin.item.large,
        }));
        setTrendingCoins(coins);

        // Fetch the prices in the selected currency for these coins
        const coinIds = coins.map((coin) => coin.id).join(',');
        const priceResponse = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=${selectedCurrency}`
        );
        setCoinPrices(priceResponse.data);
      } catch (error) {
        console.error('Error fetching trending coins or prices:', error);
      }
    };

    fetchTrendingCoins();
  }, [selectedCurrency]); // Refetch prices when currency changes


    // Pagination logic: determine the coins to display based on current page
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = trendingCoins.slice(indexOfFirstCoin, indexOfLastCoin);

    // Handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

  // Update the current coin being shown every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCoin((prevCoin) => (prevCoin + 1) % trendingCoins.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [trendingCoins.length]);

  if (trendingCoins.length === 0) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  const currentTrendingCoin = trendingCoins[currentCoin];

  // Handle currency selection change
  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const totalPages = Math.ceil(trendingCoins.length / coinsPerPage);

  return (
    <div className='Banner-pos'>
      <div className='banner-header'>
        <h1>Crypto Hunter</h1>
        <p>Get all the info regarding your favourite Crypto Currency</p>

        {/* Currency Selector */}
        </div>
      {/* Display current coin and its price in selected currency */}
      <div className={`icon-display slide-in-${currentCoin % 2 === 0 ? 'left' : 'right'}`}>
        <img
          src={currentTrendingCoin.image}
          alt={currentTrendingCoin.name}
          style={{ width: '80px', height: '80px' }}
        />
        <h2>{currentTrendingCoin.name}</h2>
        <p>Symbol: {currentTrendingCoin.symbol.toUpperCase()}</p>
        <p>
          Price: {currencySymbols[selectedCurrency]}{' '}
          {coinPrices[currentTrendingCoin.id]
            ? coinPrices[currentTrendingCoin.id][selectedCurrency]
            : 'Loading...'}
        </p>
      </div>


      
    </div>
  );
}

export default Banner;

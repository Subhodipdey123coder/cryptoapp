import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CoinTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10; // Number of coins per page

  useEffect(() => {
    // Fetch trending cryptocurrency data from CoinGecko API
    const fetchTrendingCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 100, // Increase the number of coins to fetch (e.g., 100)
              page: 1,
            },
          }
        );
        setCoins(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the coins data:', error);
      }
    };

    fetchTrendingCoins();
  }, []);

  // Get current coins for the current page
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = coins.slice(indexOfFirstCoin, indexOfLastCoin);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(coins.length / coinsPerPage);

  return (
    <div className="App">
      <h1>Trending Cryptocurrencies</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Coin</th>
                <th>Symbol</th>
                <th>Price (USD)</th>
                <th>24h Change (%)</th>
                <th>Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {currentCoins.map((coin) => (
                <tr key={coin.id}>

                  <td className='coin'>
                    <img src={coin.image} alt={coin.name} style={{ marginRight: '10px' }} />
                    {coin.name}
                  </td>
                  <td>{coin.symbol.toUpperCase()}</td>
                  <td>${coin.current_price.toLocaleString()}</td>
                  <td
                    style={{
                      color: coin.price_change_percentage_24h > 0 ? 'lightgreen' : 'red',
                    }}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td>${coin.market_cap.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`} // Fixed className syntax
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            {/* Show Next Button if currentPage is less than totalPages */}
            {currentPage < totalPages && (
              <button className="next" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            )}
          </div>

        </>
      )}
    </div>
  );
}

export default CoinTable;

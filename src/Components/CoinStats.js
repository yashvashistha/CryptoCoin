/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import react, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './CoinStats.css';

export default function CoinStats() {
  const location = useLocation();
  const coinName = location.pathname.toString().split('/')[1].toLowerCase();

  const [coin, setCoin] = react.useState();
  const fetchData = async (id) => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    setCoin(data);
  };

  useEffect(() => {
    fetchData(coinName);
  }, []);

  return (
    <div>
      {coin && (
        <div>
          <div className="coin-name">
            <img src={coin?.image.thumb} alt={coin.name} />
            <p>{coin?.name}</p>
          </div>
          <div className="table-row">
            <div>Market Price</div>
            <div>${coin?.market_data?.current_price?.usd}</div>
          </div>
          <div className="table-row">
            <div>Volume</div>
            <div>{coin?.market_data?.total_volume?.usd}</div>
          </div>
          <div className="table-row">
            <div>24H High</div>
            <div>{coin?.market_data.high_24h.usd}</div>
          </div>
          <div className="table-row">
            <div>24H Low</div>
            <div>{coin?.market_data.low_24h.usd}</div>
          </div>
          <div className="table-row">
            <div>All Time High</div>
            <div>{coin?.market_data.ath.usd}</div>
          </div>
          <div className="table-row">
            <div>Mkt Cap Rank</div>
            <div>{coin?.market_cap_rank}</div>
          </div>
        </div>
      )}
    </div>
  );
}

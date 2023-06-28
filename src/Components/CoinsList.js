import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';
import './CoinsList.css';

export default function CoinsList() {
  const [coinsList, setCoinsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [noOfPosts, setNoOfPosts] = useState(1);

  const fetchList = async () => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    setCoinsList(data);
    setNoOfPosts(data.length);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="body">
      <tr className="header">
        <th className="table-head"></th>
        <th className="table-head">Coins</th>
        <th className="table-head">Price</th>
        <th className="table-head">Change Pct.</th>
        <th className="table-head mobile">Mkt. Cap</th>
        <th className="table-head mobile">Volume</th>
      </tr>
      {coinsList && (
        <div>
          {coinsList.slice(indexOfFirstPost, indexOfLastPost).map((coin) => {
            const changePercent = coin.price_change_percentage_24h >= 0;
            return (
              <Link
                to={`/${coin.id}`}
                style={{ textDecoration: 'none' }}
                key={coin.id}
              >
                <tr className="table-container" key={coin.id}>
                  <th className="table-item">
                    <img src={coin.image} alt={coin.name} />
                  </th>
                  <th className="table-item txt">{coin.name}</th>
                  <th className="table-item txt">
                    <span>${coin.current_price}</span>
                  </th>
                  <th className="table-item txt">
                    <span
                      style={{
                        color: changePercent > 0 ? 'green' : 'red',
                        textDecoration: 'none',
                      }}
                    >
                      {changePercent && '+'}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </th>
                  <th className="table-item txt mobile">
                    <span>{coin.market_cap.toString().slice(0, -6)}</span>
                  </th>
                  <th className="table-item txt mobile">
                    <span>{coin.total_volume.toString().slice(0, -2)}</span>
                  </th>
                </tr>
              </Link>
            );
          })}
        </div>
      )}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={noOfPosts}
        paginate={paginate}
      />
    </div>
  );
}

import React from 'react';
import CoinsList from './CoinsList';
import './Home.css';

export default function Home() {
  return (
    <div className="main-coin">
      <CoinsList className="coins-list" />
    </div>
  );
}

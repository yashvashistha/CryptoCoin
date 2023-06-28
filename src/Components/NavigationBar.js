import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

export default function NavigationBar() {
  return (
    <nav className="main-container">
      <Link style={{ textDecoration: 'none' }} to="/">
        <div className="logo">CryptoCoin</div>
      </Link>
    </nav>
  );
}

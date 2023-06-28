/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Button } from 'react-bootstrap';
import CoinStats from './CoinStats';
import './ChartDisplay.css';

export default function ChartDisplay() {
  const location = useLocation();
  const coinName = location.pathname.toString().split('/')[1].toLowerCase();
  const [prices, setPrices] = useState([]);
  const [days, setDays] = useState(1);

  const fetchData = async () => {
    const id = coinName;
    console.log(id);
    const currency = 'usd';
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    );
    setPrices(data.prices);
  };
  useEffect(() => {
    fetchData();
  }, [days]);

  const changeChartDuration = (numberOfDays) => {
    setDays(numberOfDays);
  };

  return (
    <div className="body">
      <div>
        <div className="daysButtons">
          <Button variant="dark" onClick={() => changeChartDuration(1)}>
            1D
          </Button>
          <Button variant="dark" onClick={() => changeChartDuration(7)}>
            7D
          </Button>
          <Button variant="dark" onClick={() => changeChartDuration(30)}>
            1M
          </Button>
          <Button variant="dark" onClick={() => changeChartDuration(365)}>
            1Y
          </Button>
        </div>
        {!prices ? (
          <div>Loading...</div>
        ) : (
          <Line
            data={{
              labels: prices.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: prices.map((coin) => coin[1]),
                  label: `Past ${days} Days Price Chart in USD}`,
                  borderColor: '#ffffff',
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        )}
      </div>
      <div className="coin-stats">
        <CoinStats />
      </div>
    </div>
  );
}

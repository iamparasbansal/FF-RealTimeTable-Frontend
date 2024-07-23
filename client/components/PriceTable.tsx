import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { fetchPrices } from '../store/pricesAndCoinsSlice';

const PriceTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const coinId = useSelector((state: RootState) => state.selectedCoin.coinId);
  const symbol = useSelector((state: RootState) => state.selectedCoin.symbol);
  const { prices, status, error } = useSelector((state: RootState) => state.pricesAndCoins.pricesOfSelectedCoin);

  useEffect(() => {
    console.log("coinId", coinId);
    dispatch(fetchPrices(coinId));
    // Here you can set the wait time before next refresh
    // Currently its 30000 ms or 30 seconds
    const interval = setInterval(() => {
      dispatch(fetchPrices(coinId));
    }, 30000);
    console.log("prices", prices);
    return () => clearInterval(interval);
  }, [dispatch, coinId]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>{error}</p>;
  }

  return (
    <table className="price-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Price</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {prices.map((price) => (
          <tr key={price.timestamp}>
            <td>{symbol}</td>
            <td>{price.price}</td>
            <td>{new Date(price.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PriceTable;
import React from 'react';
import dynamic from 'next/dynamic';
import SymbolSelector from '../components/SymbolSelector';
import PriceTable from '../components/PriceTable';

const Home: React.FC = () => {
  return (
    <div className="container">
      <h1>Price Tracker</h1>
      <SymbolSelector />
      <PriceTable />
    </div>
  );
};

export default Home;
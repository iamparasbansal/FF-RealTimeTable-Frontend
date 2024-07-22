import React from 'react';
import dynamic from 'next/dynamic';
import PriceTable from '../components/PriceTable';

const SymbolSelector = dynamic(() => import('../components/SymbolSelector'), { ssr: false });

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
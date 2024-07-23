import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCoinId, setSymbol } from '../store/coinSlice';
import { RootState, useAppDispatch } from '../store';
import { fetchCoins } from '../store/pricesAndCoinsSlice';

const SymbolSelector: React.FC = () => {
  const myDispatch = useAppDispatch();
  const { coins, status, error } = useSelector((state: RootState) => state.pricesAndCoins.allCoins);

  // Create memoized values for symbols and map
  const { symbolsArray, symbolToCoinIdMap } = useMemo(() => {
    const map: { [key: string]: string } = {};
    const symbols: string[] = [];

    coins.forEach((coin: { symbol: string; coinId: string }) => {
      symbols.push(coin.symbol);
      map[coin.symbol] = coin.coinId;
    });

    return { symbolsArray: symbols, symbolToCoinIdMap: map };
  }, [coins]);

  useEffect(() => {
    console.log("Dispatching fetchCoins");
    myDispatch(fetchCoins());
  }, [myDispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>{error}</p>;
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSymbol = event.target.value;
    console.log("event.target.value", selectedSymbol);
    console.log("Map Value", symbolToCoinIdMap[selectedSymbol]);
    myDispatch(setSymbol(selectedSymbol));
    myDispatch(setCoinId(symbolToCoinIdMap[selectedSymbol]));
  };

  // Render the select element only if coins data is available
  return (
    <select className="symbol-selector" onChange={handleChange}>
      {symbolsArray.length > 0 ? (
        symbolsArray.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))
      ) : (
        <option value="">No symbols available</option>
      )}
    </select>
  );
};

export default SymbolSelector;
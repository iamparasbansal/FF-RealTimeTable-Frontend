import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSymbol } from '../store/symbolSlice';
import { setCoinId } from '../store/coinIdSlice';

// Define an interface for the API response object
interface CoinData {
  coinId: string;
  symbol: string;
  name: string;
}

// Define a map to store coinId and symbol
const symbolToCoinIdMap: { [key: string]: string } = {};
const symbolsArray: string[] = [];

symbolsArray.push("zcn");
symbolsArray.push("zoc");
symbolToCoinIdMap["zoc"] = "01coin";
symbolToCoinIdMap["zcn"] = "0chain";

const SymbolSelector: React.FC = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchSymbols = async () => {
  //       try {
  //           const response = await fetch('https://realtimepricedatabackend-2.onrender.com/coin');
  //           if (!response.ok) {
  //               throw new Error('Failed to fetch');
  //           }
  //           const data: CoinData[] = await response.json();
  //           // Populate the map with coinId as key and symbol as value
  //           data.forEach(coin => {
  //             symbolsArray.push(coin.symbol);
  //             symbolToCoinIdMap[coin.symbol] = coin.coinId;
  //           });

  //           // Log to check if the map is populated correctly
  //           console.log(symbolsArray);
  //       } catch (error) {
  //           console.error('Error fetching data:', error);
  //       }
  //   };
  
  //   fetchSymbols();
  // }, []); // Empty dependency array means this effect runs only once

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSymbol(event.target.value));
    dispatch(setCoinId(symbolToCoinIdMap[event.target.value]));
  };

  return (
    <select className="symbol-selector" onChange={handleChange}>
      {symbolsArray.map((symbol) => (
        <option key={symbol} value={symbol}>
          {symbol}
        </option>
      ))}
    </select>
  );
};

export default SymbolSelector;
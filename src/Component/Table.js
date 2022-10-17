import React, { useState } from "react";
import TableLine from "./TableLine";
import ToTop from "./ToTop";

const Table = ({ coinsData }) => {
  const [rangeNumber, setRangeNumber] = useState(100);
  const [orderBy, setOrderBy] = useState("");

  const tableHeader = [
    "Prix",
    "MarketCap",
    "Volume",
    "1h",
    "1j",
    "1s",
    "1m",
    "1a",
    "ATH",
  ];

  return (
    <div className="table-container">
      <ul className="table-header">
        <div className="range-container">
          <span>
            Top{" "}
            <input
              type="text"
              value={rangeNumber}
              onChange={(e) => setRangeNumber(e.target.value)}
            />
          </span>
          <input
            type="range"
            min="1"
            max="250"
            value={rangeNumber}
            onChange={(e) => setRangeNumber(e.target.value)}
          />
          <ToTop />
        </div>
        {tableHeader.map((el) => (
          <li key={el}>
            <input
              type="radio"
              name="header-el"
              id={el}
              defaultChecked={
                el === orderBy || el === orderBy + "reverse" ? true : false
              }
              onClick={() => {
                if (orderBy === el) {
                  setOrderBy(el + "reverse");
                } else {
                  setOrderBy(el);
                }
              }}
            />
            <label htmlFor={el}>{el}</label>
          </li>
        ))}
      </ul>
      {coinsData &&
        coinsData
          .slice(0, rangeNumber)
          .sort((a, b) => {
            switch (orderBy) {
              case "Prix":
                return b.current_price - a.current_price;
              case "Prixreverse":
                return a.current_price - b.current_price;
              case "MarketCap":
                return b.market_cap - a.market_cap;
              case "MarketCapreverse":
                return a.market_cap - b.market_cap;
              case "1h":
                return (
                  b.price_change_percentage_1h_in_currency -
                  a.price_change_percentage_1h_in_currency
                );
              case "1hreverse":
                return (
                  a.price_change_percentage_1h_in_currency -
                  b.price_change_percentage_1h_in_currency
                );
              case "1j":
                return (
                  b.price_change_percentage_24h_in_currency -
                  a.price_change_percentage_24h_in_currency
                );
              case "1jreverse":
                return (
                  a.price_change_percentage_24h_in_currency -
                  b.price_change_percentage_24h_in_currency
                );
            }
          })
          .map((coin, index) => (
            <TableLine coin={coin} index={index} key={index} />
          ))}
    </div>
  );
};

export default Table;

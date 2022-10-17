import React, { useEffect, useState } from "react";
import { Tooltip, Treemap } from "recharts";
import colors from "../styles/_settings.scss";

const GlobalChart = ({ coinsData }) => {
  const [dataArray, setDataArray] = useState([]);

  const colorPicker = (number) => {
    if (number >= -20) {
      return colors.red2;
    } else if (number >= -5) {
      return colors.red1;
    } else if (number >= 0) {
      return colors.green1;
    } else if (number >= 5) {
      return colors.green2;
    } else {
      return colors.red1;
    }
  };

  const excludesCoin = (coin) => {
    if (
      coin === "usdt" ||
      coin === "usdc" ||
      coin === "busd" ||
      coin === "dai" ||
      coin === "ust" ||
      coin === "min"
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    let chartData = [];

    if (coinsData.length > 0) {
      for (let i = 0; i < 45; i++) {
        if (excludesCoin(coinsData[i].symbol))
          chartData.push({
            name:
              coinsData[i].symbol.toUpperCase() +
              "" +
              coinsData[i].market_cap_change_percentage_24h.toFixed(1) +
              "%",
            size: coinsData[i].market_cap,
            fill: colorPicker(coinsData[i].price_change_24h),
          });
      }
    }
    setDataArray(chartData);
  }, [coinsData]);

  const TreemapToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.name}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="global-chart">
      <Treemap
        width={730}
        height={300}
        data={dataArray}
        dataKey="size"
        stroke="rgb(51,51,51)"
        fill="black"
        aspectRatio="1"
      >
        <Tooltip content={<TreemapToolTip />} />
      </Treemap>
    </div>
  );
};

export default GlobalChart;

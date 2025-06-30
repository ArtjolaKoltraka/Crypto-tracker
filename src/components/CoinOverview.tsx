import { useEffect, useRef, useState } from "react";
import { fetchOverview } from "../api/apiRequests";
import { CoinOverviewProps } from "../utils/validators";

const formatNum = (num: number) =>
  `$${Number(num).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export default function CoinOverview() {
  const [data, setData] = useState<CoinOverviewProps | null>(null);
  const [colors, setColors] = useState({
    cap: "text-red-400",
    volume: "text-red-400",
    liquidity: "text-red-400",
  });

  const previous = useRef<CoinOverviewProps | null>(null);

  const getColor = (curr: number, prev: number | null) => {
    if (prev === null) return "text-white";
    return curr >= prev ? "text-green-400" : "text-red-400";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchOverview();

        setColors({
          cap: getColor(res.cap, previous.current?.cap ?? null),
          volume: getColor(res.volume, previous.current?.volume ?? null),
          liquidity: getColor(
            res.liquidity,
            previous.current?.liquidity ?? null
          ),
        });

        previous.current = res;
        setData(res);
      } catch (err) {
        console.error("Failed to fetch overview", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 px-4 py-2 bg-container rounded-md mb-5 w-4/5">
      <div className=" bg-sub-container">
        <h3 className="title">Market Cap</h3>
        <p className={`text-sm font-bold ${colors.cap}`}>
          {formatNum(data.cap)}
        </p>
      </div>
      <div className="bg-sub-container">
        <h3 className="title">24h Volume</h3>
        <p className={`text-sm font-bold ${colors.volume}`}>
          {formatNum(data.volume)}
        </p>
      </div>
      <div className="bg-sub-container">
        <h3 className="title">BTC Dominance</h3>
        <p className={`text-sm font-bold`}>
          {(data.btcDominance * 100).toFixed(2)}%
        </p>
      </div>
      <div className="bg-sub-container">
        <h3 className="title">Liquidity</h3>
        <p className={`text-sm font-bold ${colors.liquidity}`}>
          {formatNum(data.liquidity)}
        </p>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCoinDetail, fetchCoinHistory } from "../../api/apiRequests";
import CoinDescription from "./CoinDescription";
import Loading from "../../helpers/Loading";
import { geckoIdMap } from "../../utils/geckoIdMap";
import ChangeCell from "./ChangeCell";
import Stat from "./Stat";
import PriceChart from "./PriceChart";
import { CoinHistoryEntry } from "../../utils/validators";

const timeOptions = [
  { label: "1D", days: 1 },
  { label: "7D", days: 7 },
  { label: "30D", days: 30 },
  { label: "90D", days: 90 },
  { label: "1Y", days: 365 },
];

const formatNumber = (num: number): string =>
  num.toLocaleString("en-US", { maximumFractionDigits: 0 });
export default function CoinDetail() {
  const { code } = useParams<{ code: string | undefined }>();
  const [coin, setCoin] = useState<any>(null);
  const [history, setHistory] = useState<CoinHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDays, setSelectedDays] = useState(30);

  const geckoId = code ? geckoIdMap[code.toUpperCase()] : undefined;

  useEffect(() => {
    if (!code) return;
    setLoading(true);
    const upper = code.toUpperCase();
    const end = Date.now();
    const start = end - selectedDays * 24 * 60 * 60 * 1000;

    Promise.all([fetchCoinDetail(upper), fetchCoinHistory(upper, start, end)])
      .then(([detail, hist]) => {
        setCoin(detail);
        setHistory(hist);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [code, selectedDays]);

  const chartData = history.map((h) => {
    const d = new Date(h.date);

    let format: string;

    if (selectedDays <= 1) {
      format = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (selectedDays <= 90) {
      format = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } else {
      format = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    return { date: format, rate: h.rate };
  });

  if (!coin || !coin.png64)
    return (
      <div className="flex items-center justify-center h-[340px]">
        <Loading />
      </div>
    );
  return (
    <>
      <div className="bg-container rounded-xl shadow-lg p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-center gap-4">
          {coin.png64 && (
            <img src={coin.png64} alt={coin.name} className="w-10 h-10" />
          )}
          <h2 className="text-2xl font-bold">
            {coin.name}{" "}
            <span className="text-slate-400 text-lg font-medium">
              (Rank #{coin.rank})
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-y-4 text-sm text-center">
          <ChangeCell label="1H" rawValue={coin.delta.hour} />
          <ChangeCell label="24H" rawValue={coin.delta.day} />
          <ChangeCell label="7D" rawValue={coin.delta.week} />
          <ChangeCell label="30D" rawValue={coin.delta.month} />
          <ChangeCell label="90D" rawValue={coin.delta.quarter} />
          <ChangeCell label="1Y" rawValue={coin.delta.year} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 text-sm text-center">
          <Stat label="Market Cap" value={`$${formatNumber(coin.cap)}`} />
          <Stat label="Volume (24h)" value={`$${formatNumber(coin.volume)}`} />
          <Stat label="Current Price" value={`$${coin.rate.toFixed(2)}`} />
          <Stat
            label="All-Time High"
            value={`$${coin.allTimeHighUSD.toFixed(2)}`}
          />
          <Stat
            label="Circulating Supply"
            value={formatNumber(coin.circulatingSupply)}
          />
          {coin.totalSupply && (
            <Stat label="Total Supply" value={formatNumber(coin.totalSupply)} />
          )}
          {coin.maxSupply && (
            <Stat label="Max Supply" value={formatNumber(coin.maxSupply)} />
          )}
          {coin.markets && <Stat label="Active Markets" value={coin.markets} />}
        </div>
        {coin.links?.website && (
          <div className="text-center pt-4">
            <span className="text-gray-400">Website: </span>
            <a
              href={coin.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline break-all"
            >
              {coin.links.website}
            </a>
          </div>
        )}
      </div>
      <div className="bg-container rounded-xl shadow-lg p-6 max-w-6xl mx-auto mt-8">
        <h2 className="text-xl font-bold mb-4 text-center">
          Day Price Chart (USD)
        </h2>
        <div className="flex justify-end gap-2 mb-4">
          {timeOptions.map(({ label, days }) => (
            <button
              key={label}
              className={`px-3 py-1 rounded ${
                selectedDays === days
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 dark:bg-slate-700"
              }`}
              onClick={() => setSelectedDays(days)}
            >
              {label}
            </button>
          ))}
        </div>
        <PriceChart data={chartData} />
      </div>
      <div>{geckoId ? <CoinDescription coinId={geckoId} /> : ""}</div>
    </>
  );
}

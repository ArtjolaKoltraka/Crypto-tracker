import React from "react";
import CoinCard from "./CoinCard";
import { CoinMarketTableProps } from "../../api/apiRequests";
import Loading from "../../helpers/Loading";
import CoinOverview from "../CoinOverview";

interface CoinTableProps {
  coins: CoinMarketTableProps[];
  loading?: boolean;
  error?: Error | null;
}

const CoinTable: React.FC<CoinTableProps> = ({ coins, loading, error }) => {
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <CoinOverview />
      <div className="w-full h-[350px] overflow-y-auto rounded-md bg-neutral-50 dark:bg-slate-800 shadow-md mt-4">
        <table
          role="table"
          className="table-fixed min-w-[600px] w-full text-sm"
        >
          <thead className="hidden md:table-header-group">
            <tr>
              <th
                style={{ width: "30%" }}
                className="table-header px-12 text-left"
              >
                Name
              </th>
              <th style={{ width: "20%" }} className="table-header text-left">
                Price USD
              </th>
              <th style={{ width: "15%" }} className="table-header text-left">
                24h %
              </th>
              <th style={{ width: "20%" }} className="table-header text-left">
                Market Cap
              </th>
              <th
                style={{ width: "15%" }}
                className="table-header text-center last:rounded-tr-md"
              >
                Add to Watchlist
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-neutral-500 bg-container h-[300px]"
                >
                  <div className="flex justify-center items-center h-full">
                    <Loading />
                  </div>
                </td>
              </tr>
            ) : (
              coins.map((coin) => (
                <CoinCard
                  key={coin.code}
                  coin={{
                    code: coin.code!,
                    symbol: coin.code!,
                    name: coin.name!,
                    price_usd: coin.rate,
                    percent_change_24h: Number(coin.delta?.day ?? 0),
                    image: coin.png64,
                    market_cap_usd: coin.cap,
                  }}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default CoinTable;

import React from "react";
import CoinCard from "./CoinCard";
import useCoinIcons from "../hooks/useCoinIcons";
import { CoinLoreProps } from "../api/coinLore";
import Loading from "../helpers/Loading";

interface CoinTableProps {
  coins: CoinLoreProps[];
  loading?: boolean;
  error?: Error | null;
}

const CoinTable: React.FC<CoinTableProps> = ({ coins, loading, error }) => {
  const { icons } = useCoinIcons();

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full h-[350px] overflow-y-auto rounded-md bg-neutral-50 dark:bg-neutral-800 shadow-md">
      <table role="table" className="table-fixed min-w-[600px] w-full text-sm">
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
                className="text-center text-neutral-500 dark:bg-neutral-800 bg-white h-[300px]"
              >
                <div className="flex justify-center items-center h-full">
                  <Loading />
                </div>
              </td>
            </tr>
          ) : (
            coins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={{
                  id: coin.id!,
                  symbol: coin.symbol!,
                  name: coin.name!,
                  price_usd: coin.price_usd,
                  percent_change_24h: Number(coin.percent_change_24h),
                  image: icons[coin.symbol!.toLowerCase()],
                  market_cap_usd: coin.market_cap_usd,
                }}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default CoinTable;

import React from "react";
import WatchlistButton from "../button/WatchlistButton";
import { useNavigate } from "react-router-dom";
import ChangeCell from "../coin_detail/ChangeCell";

export interface CoinCardProps {
  coin: {
    code: string;
    symbol: string;
    name: string;
    image?: string;
    price_usd?: number;
    percent_change_24h?: number;
    market_cap_usd?: number;
  };
}

const CoinCard: React.FC<CoinCardProps> = ({ coin }) => {
  const navigation = useNavigate();
  const handleRowClick = (coinsId: string) => {
    navigation(`/coins/${coinsId}`);
  };

  if (!coin) return <div>Loading...</div>;

  return (
    <tr
      key={coin.code}
      className="group border-t border-neutral-150 last:border-b  "
    >
      <td
        onClick={() => handleRowClick(coin.code)}
        className="table-cell-text cursor-pointer px-12"
      >
        <div className="flex row gap-3 py-2 rounded-md">
          <img src={coin.image} alt="" className="w-8 h-8" />
          <span className="hover:text-blue-400 hover:underline transition duration-200 rounded">
            {coin.name} ({coin.symbol.toUpperCase()})
          </span>
        </div>
      </td>
      <td className="table-cell-price">${coin.price_usd}</td>
      <td className={"table-cell-24h"}>
        <ChangeCell label="" rawValue={coin.percent_change_24h ?? 0} />
      </td>
      <td className="table-cell-price">${coin.market_cap_usd}</td>
      <td className="table-cell-watchlist">
        <WatchlistButton coinId={coin.code} />
      </td>
    </tr>
  );
};

export default CoinCard;

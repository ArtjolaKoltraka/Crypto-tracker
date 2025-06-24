import React, { useState } from "react";
import WatchlistButton from "./watchlistButton";
import placeholderUrl from "../assets/images/placeholder-icon.png";

export interface CoinCardProps {
  coin: {
    id: string;
    symbol: string;
    name: string;
    image?: string;
    price_usd?: string;
    percent_change_24h?: number;
    market_cap_usd?: string;
  };
}

const CoinCard: React.FC<CoinCardProps> = ({ coin }) => {
  const staticIconUrl = `https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.0/svg/color/${coin.symbol.toLowerCase()}.svg`;
  const initialSrc = coin.image ?? staticIconUrl;
  const [src, setSrc] = useState(initialSrc);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    if (img.src === initialSrc && initialSrc === coin.image) {
      img.onerror = null;
      img.src = staticIconUrl;
      return;
    }
    if (img.src === staticIconUrl) {
      img.onerror = null;
      img.src = placeholderUrl;
    }
  };

  return (
    <tr key={coin.id} className=" border-t border-neutral-150 last:border-b">
      <td className="table-cell-text px-12">
        <div className="flex row gap-3 py-2">
          <img src={src} alt="" className="w-8 h-8" onError={handleError} />{" "}
          {coin.name} ({coin.symbol.toUpperCase()})
        </div>
      </td>
      <td className="table-cell-price">${coin.price_usd}</td>
      <td
        className={`px-3 py-2 bg-white dark:bg-neutral-800 dark:text-white font-semibold text-xs text-left  ${
          (coin.percent_change_24h ?? 0) >= 0
            ? "text-positive"
            : "text-negative"
        }`}
      >
        {coin.percent_change_24h ?? 0}%
      </td>
      <td className="table-cell-price">${coin.market_cap_usd}</td>
      <td className="table-cell-watchlist">
        <WatchlistButton coinId={coin.id} />
      </td>
    </tr>
  );
};

export default CoinCard;

import React, { useState } from "react";
import WatchlistButton from "./watchlistButton";

export interface CoinCardProps {
  coin: {
    id: string;
    symbol: string;
    name: string;
    image?: string;
    price_usd?: string;
    percent_change_24h?: number;
  };
}

const CoinCard: React.FC<CoinCardProps> = ({ coin }) => {
  const staticIconUrl = `https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.0/svg/color/${coin.symbol.toLowerCase()}.svg`;
  const placeholderUrl = "/placeholder-icon.svg";
  const initialSrc = coin.image ?? staticIconUrl;
  const [src, setSrc] = useState(initialSrc);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    if (img.src === initialSrc && initialSrc === coin.image) {
      img.onerror = null;
      img.src = staticIconUrl;
      return;
    }
    // If we then tried the CDN and it failed, go to placeholder
    if (img.src === staticIconUrl) {
      img.onerror = null;
      img.src = placeholderUrl;
    }
  };

  return (
    <tr className=" border-t border-neutral-150 last:border-b">
      <td className="bg-white text-right font-semibold text-neutral-900 px-3 py-2 flex justify-center items-center">
        <img src={src} alt="" className="w-8 h-8" onError={handleError} />
      </td>
      <td className="bg-white text-left text-neutral-700 px-3 py-2 leading-tight">
        {coin.name} ({coin.symbol.toUpperCase()})
      </td>
      <td className="bg-white text-left font-semibold text-neutral-900 px-3 py-2 leading-tight">
        ${coin.price_usd}
      </td>
      <td
        className={`px-3 py-2 bg-white font-semibold text-xs text-left  ${
          (coin.percent_change_24h ?? 0) >= 0
            ? "text-green-500"
            : "text-red-400"
        }`}
      >
        {coin.percent_change_24h ?? 0}%
      </td>
      <td className="bg-white text-center px-3 py-2">
        <WatchlistButton coinId={coin.id} />
      </td>
    </tr>
  );
};

export default CoinCard;

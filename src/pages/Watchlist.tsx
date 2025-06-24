import React, { useEffect, useState } from "react";
import { fetchCoinsByIds, CoinLoreProps } from "../api/coinLore";
import useWatchlistStore from "../store/watchlistStore";
import CoinTable from "../components/CoinTable";

const Watchlist: React.FC = () => {
  const watchlist = useWatchlistStore((s) => s.watchlist);
  const [coins, setCoins] = useState<CoinLoreProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchCoinsByIds(watchlist)
      .then(setCoins)
      .catch((e) => setError(e as Error))
      .finally(() => setLoading(false));
  }, [watchlist]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="flex flex-col items-center px-12 mb-5">
        <p className="text-blue-600 dark:text-white text-lg mb-2">
          Keep track of your favorite Crypto Coins
        </p>
        <CoinTable coins={coins} loading={loading} />
      </div>
    </>
  );
};

export default Watchlist;

import React, { useEffect, useState } from "react";
import { fetchCoinsByIds, CoinMarketTableProps } from "../api/apiRequests";
import useWatchlistStore from "../store/watchlistStore";
import CoinTable from "../components/coin_table/CoinTable";
import { useSearchStore } from "../store/useSearchStore";

const Watchlist: React.FC = () => {
  const watchlist = useWatchlistStore((s) => s.watchlist);
  const [coins, setCoins] = useState<CoinMarketTableProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const search = useSearchStore((s) => s.search.trim().toLowerCase());
  const [filteredCoins, setFilteredCoins] = useState<CoinMarketTableProps[]>(
    []
  );
  useEffect(() => {
    setLoading(true);
    fetchCoinsByIds(watchlist)
      .then(setCoins)
      .catch((e) => setError(e as Error))
      .finally(() => setLoading(false));
  }, [watchlist]);

  useEffect(() => {
    if (!search) {
      setFilteredCoins(coins);
    } else {
      setFilteredCoins(
        coins.filter(
          (c) =>
            c.name?.toLowerCase().includes(search) ||
            c.code?.toLowerCase().includes(search)
        )
      );
    }
  }, [search, coins]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="flex flex-col items-center px-12 mb-5">
        <p className="text-blue-600 dark:text-white text-lg mb-2">
          Keep track of your favorite Crypto Coins
        </p>
        <CoinTable coins={filteredCoins} loading={loading} />
      </div>
    </>
  );
};

export default Watchlist;

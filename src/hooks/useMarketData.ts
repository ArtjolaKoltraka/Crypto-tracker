import { useState, useEffect, useMemo } from "react";
import { useSearchStore } from "../store/useSearchStore";
import { fetchMarketData, CoinLoreProps } from "../api/coinLore";

export default function useMarketData(perPage = 20, page = 1) {
  const search = useSearchStore((s) => s.search.trim().toLowerCase());
  const [allCoins, setAllCoins] = useState<CoinLoreProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchMarketData()
      .then(({ coins }) => {
        setAllCoins(coins);
        setError(null);
      })
      .catch((e) => setError(e as Error))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (loading || !allCoins.length) return [];
    if (!search) return allCoins;
    return allCoins.filter(
      (c) =>
        c.name?.toLowerCase().includes(search) ||
        c.symbol?.toLowerCase().includes(search)
    );
  }, [allCoins, search, loading]);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  const total = filtered.length;

  return {
    data: paginated,
    total,
    loading,
    error,
  };
}

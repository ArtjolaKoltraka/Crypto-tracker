import { useState, useEffect } from "react";
import { useSearchStore } from "../store/useSearchStore";
import { CoinMarketTableProps, fetchMarketData } from "../api/apiRequests";

export default function useMarketData(perPage = 20, page = 1) {
  const search = useSearchStore((s) => s.search.trim().toLowerCase());
  const [allCoins, setAllCoins] = useState<CoinMarketTableProps[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<CoinMarketTableProps[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      fetchMarketData()
        .then(({ coins }) => {
          setAllCoins(coins);
          setError(null);
        })
        .catch((e) => setError(e))
        .finally(() => setLoading(false));
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredCoins(allCoins);
    } else {
      setFilteredCoins(
        allCoins.filter(
          (c) =>
            c.name?.toLowerCase().includes(search) ||
            c.code?.toLowerCase().includes(search)
        )
      );
    }
  }, [search, allCoins]);

  const start = (page - 1) * perPage;
  const paginated = filteredCoins.slice(start, start + perPage);
  const total = filteredCoins.length;

  const pagination = {
    total: filteredCoins.length,
    current_page: page,
    per_page: perPage,
    last_page: Math.ceil(total / perPage),
  };

  return {
    data: paginated,
    pagination,
    loading,
    error,
  };
}

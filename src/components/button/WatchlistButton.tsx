import React from "react";
import useWatchlistStore from "../../store/watchlistStore";

interface Props {
  coinId: string;
}

const WatchlistButton: React.FC<Props> = ({ coinId }) => {
  const { watchlist, add, remove } = useWatchlistStore();
  const inList = watchlist.includes(coinId);

  return (
    <button
      onClick={() => (inList ? remove(coinId) : add(coinId))}
      className="px-2 py-1 border rounded"
    >
      {inList ? "★ Remove" : "☆ Watch"}
    </button>
  );
};

export default WatchlistButton;

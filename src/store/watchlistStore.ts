import { create } from "zustand";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

interface WatchlistState {
  watchlist: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
}

const useWatchlistStore = create<WatchlistState>((set, get) => ({
  watchlist: getLocalStorage<string[]>("watchlist") ?? [],
  add: (id) => {
    set((state) => {
      const updated = Array.from(new Set([...state.watchlist, id]));
      setLocalStorage("watchlist", updated);
      return { watchlist: updated };
    });
  },
  remove: (id) => {
    set((state) => {
      const updated = state.watchlist.filter((x) => x !== id);
      setLocalStorage("watchlist", updated);
      return { watchlist: updated };
    });
  },
}));

export default useWatchlistStore;

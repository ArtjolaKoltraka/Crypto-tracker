import { create } from "zustand";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

interface WatchlistState {
  watchlist: string[];
  add: (code: string) => void;
  remove: (code: string) => void;
}

const useWatchlistStore = create<WatchlistState>((set, get) => ({
  watchlist: getLocalStorage<string[]>("watchlist") ?? [],
  add: (code) => {
    set((state) => {
      const updated = Array.from(new Set([...state.watchlist, code]));
      setLocalStorage("watchlist", updated);
      return { watchlist: updated };
    });
  },
  remove: (code) => {
    set((state) => {
      const updated = state.watchlist.filter((x) => x !== code);
      setLocalStorage("watchlist", updated);
      return { watchlist: updated };
    });
  },
}));

export default useWatchlistStore;

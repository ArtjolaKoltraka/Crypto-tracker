import { create } from "zustand";

interface SearchState {
  search: string;
  setSearch: (s: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  search: "",
  setSearch: (s) => set({ search: s }),
}));

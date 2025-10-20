import { create } from "zustand";

interface DashboardState {
  searchInput: string;
  searchOption: string;
  activeItem: number | null;

  setSearchInput: (value: string) => void;
  setSearchOption: (value: string) => void;
  setActiveItem: (id: number | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  searchInput: "",
  searchOption: "name",
  activeItem: null,

  setSearchInput: (value) => set({ searchInput: value }),
  setSearchOption: (value) => set({ searchOption: value, searchInput: "" }),
  setActiveItem: (id) => set({ activeItem: id }),
}));

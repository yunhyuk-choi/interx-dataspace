import { create } from "zustand";

interface DashboardState {
  searchInput: string;
  searchOption: string;
  activeItem: number | null;
  sortOption: string;
  sortOrientation: string;

  setSearchInput: (value: string) => void;
  setSearchOption: (value: string) => void;
  setActiveItem: (id: number | null) => void;
  setSortOption: (value: string) => void;
  toggleSortOrientation: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  searchInput: "",
  searchOption: "name",
  activeItem: null,
  sortOption: "id",
  sortOrientation: "asc",

  setSearchInput: (value) => set({ searchInput: value }),
  setSearchOption: (value) => set({ searchOption: value, searchInput: "" }),
  setActiveItem: (id) => set({ activeItem: id }),
  setSortOption: (value) => set({ sortOption: value }),
  toggleSortOrientation: () =>
    set({ sortOrientation: get().sortOrientation === "asc" ? "desc" : "asc" }),
}));

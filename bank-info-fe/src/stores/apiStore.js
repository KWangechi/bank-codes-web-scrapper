import { create } from "zustand";
import axios from "axios";

export const useApiStore = create((set) => ({
  //state
  searchTerm: "",
  banks: [],
  branches: [],
  result: [],
  isLoading: false,
  isFetching: false,
  error: null,
  pagination: {},

  // setters
  setSearchTerm: (searchTerm) => set({ searchTerm }),

  // Do a global search of information
  searchInfo: async (bank_name, page = 1) => {
    const { searchTerm } = useApiStore.getState();

    console.log(bank_name, "iN THE SOTRE")

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get("http://localhost:8000/search", {
        params: {
          q: searchTerm,
          bank_name,
          page,
          page_size: 20,
        },
      });

      set({ result: response.data.data });
      set({ isLoading: false });
      set({
        pagination: {
          total: response.data.total,
          page_size: response.data.page_size,
          page: response.data.page,
        },
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Something went wrong",
        isLoading: false,
      });
    }
  },

  // Fetch all banks
  fetchAllBanks: async (query) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get("http://localhost:8000/banks", {
        params: {
          q: query,
        },
      });

      set({ banks: response.data, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Something went wrong",
        isLoading: false,
      });
    }
  },

  // Fetch all branches for a specific bank
  fetchAllBankBranches: async (bank_id, query, page = 1) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `http://localhost:8000/banks/${bank_id}/branches`,
        {
          params: {
            q: query,
            page,
            page_size: 20,
          },
        }
      );

      set({ branches: response.data.data, isLoading: false });
      set({
        pagination: {
          total: response.data.total,
          page_size: response.data.page_size,
          page: response.data.page,
        },
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Something went wrong",
        isLoading: false,
      });
    }
  },

  // Fetch
}));

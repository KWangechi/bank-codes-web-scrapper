import {create} from "zustand";
import axios from "axios";

export const useApiStore = create((set) => ({
  //state
  searchTerm: "",
  banks: [],
  branches: [],
  result: [],
  isLoading: false,
  error: null,

  // setters
  setSearchTerm: (searchTerm) => set({ searchTerm }),

  // Do a global search of information
  searchInfo: async (bank_name = null) => {
    const { searchTerm } = useApiStore.getState();

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get("http://localhost:8000/search", {
        params: {
          q: searchTerm,
          bank_name
        },
      });

      set({ result: response.data, isLoading: false });
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

  // Fetch all banks
  fetchAllBankBranches: async (bank_id, query) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `http://localhost:8000/banks/${bank_id}/branches`,
        {
          params: {
            q: query,
          },
        }
      );

      set({ branches: response.data, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Something went wrong",
        isLoading: false,
      });
    }
  },
}));

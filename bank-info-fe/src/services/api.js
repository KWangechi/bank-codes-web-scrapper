import axios from "axios";

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// API endpoints
export const api = {
  // Search information
  searchInfo: async (searchTerm, bankName, page = 1, pageSize = 20) => {
    const response = await apiClient.get("/search", {
      params: {
        q: searchTerm,
        bank_name: bankName,
        page,
        page_size: pageSize,
      },
    });
    return response.data;
  },

  // Fetch all banks
  fetchAllBanks: async (query) => {
    const response = await apiClient.get("/banks", {
      params: { q: query },
    });
    return response.data;
  },

  // Fetch all branches for a specific bank
  fetchAllBankBranches: async (bankId, query, page = 1, pageSize = 20) => {
    const response = await apiClient.get(`/banks/${bankId}/branches`, {
      params: {
        q: query,
        page,
        page_size: pageSize,
      },
    });
    return response.data;
  },

  // Download data as Excel
  downloadDataAsExcel: async (searchTerm, bankName) => {
    const response = await apiClient.get("/download/asExcel", {
      params: {
        q: searchTerm,
        bank_name: bankName,
      },
      responseType: "blob",
    });
    return response.data;
  },

  // Download data as JSON
  downloadDataAsJson: async (searchTerm, bankName) => {
    const response = await apiClient.get("/download/asJson", {
      params: {
        q: searchTerm,
        bank_name: bankName,
      },
      responseType: "blob",
    });
    return response.data;
  },

  // Submit bank location suggestion
  submitBankLocationSuggestion: async (suggestionData) => {
    const response = await apiClient.post("/suggestions", suggestionData);
    return response.data;
  },
};

export default apiClient;

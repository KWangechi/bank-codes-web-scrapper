import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "services/api";
import { generateExcelFilename, generateJsonFilename } from "utils/filenameUtils";

// Query keys for cache management
export const QUERY_KEYS = {
  banks: ["banks"],
  bankBranches: (bankId) => ["bankBranches", bankId],
  search: (searchTerm, bankName) => ["search", searchTerm, bankName],
};


// Fetch Banks
export const useBanks = (query = "") => {
  return useQuery({
    queryKey: [...QUERY_KEYS.banks, query],
    queryFn: () => api.fetchAllBanks(query),
    enabled: true, // Always fetch banks
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};


// Fetch Bank Brances
export const useBankBranches = (
  bankId,
  query = "",
  page = 1,
  pageSize = 20,
) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.bankBranches(bankId), query, page, pageSize],
    queryFn: () => api.fetchAllBankBranches(bankId, query, page, pageSize),
    enabled: !!bankId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};


// global search
export const useSearch = (
  searchTerm,
  bankName = "",
  page = 1,
  pageSize = 20,
) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.search(searchTerm, bankName), page, pageSize],
    queryFn: () => api.searchInfo(searchTerm, bankName, page, pageSize),
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });
};


// Download Results as Excel
export const useDownloadExcel = () => {
  return useMutation({
    mutationFn: ({ searchTerm, bankName }) =>
      api.downloadDataAsExcel(searchTerm, bankName),
    onSuccess: (data, variables) => {
      const { bankName } = variables;
      const filename = generateExcelFilename(bankName);
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error("Failed to download Excel file:", error);
    },
  });
};


// Download Results as JSON
export const useDownloadJson = () => {
  return useMutation({
    mutationFn: ({ searchTerm, bankName }) =>
      api.downloadDataAsJson(searchTerm, bankName),
    onSuccess: (data, variables) => {
      const { bankName } = variables;
      const filename = generateJsonFilename(bankName);
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error("Failed to download JSON file:", error);
    },
  });
};

// Utility hook for cache management
export const useCacheUtils = () => {
  const queryClient = useQueryClient();

  const invalidateSearch = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.search });
  };

  const invalidateBanks = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.banks });
  };

  const invalidateBankBranches = (bankId) => {
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.bankBranches(bankId),
    });
  };

  const clearCache = () => {
    queryClient.clear();
  };

  return {
    invalidateSearch,
    invalidateBanks,
    invalidateBankBranches,
    clearCache,
  };
};

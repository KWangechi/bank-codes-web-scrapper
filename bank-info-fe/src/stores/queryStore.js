import { useQuery, useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants";
import toast from "react-hot-toast";
import { api } from "services/api";
import {
  generateExcelFilename,
  generateJsonFilename,
} from "utils/filenameUtils";

// Fetch Banks
export const useBanks = (query = "") => {
  return useQuery({
    queryKey: [...QUERY_KEYS.banks, query],
    queryFn: () => api.fetchAllBanks(query),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
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

// Submit Bank Location Suggestion
export const useSubmitBankLocationSuggestion = () => {
  return useMutation({
    mutationFn: (suggestionData) =>
      api.submitBankLocationSuggestion(suggestionData),
    onSuccess: (data) => {
      toast.success(
        data.message,
        {
          position: "top-center",
          duration: 5000,
        },
      );
    },
    onError: (error) => {
      toast.error("Failed to submit suggestion", {
        position: "top-center",
        duration: 5000,
      });
      console.error("Failed to submit suggestion:", error);
    },
  });
};

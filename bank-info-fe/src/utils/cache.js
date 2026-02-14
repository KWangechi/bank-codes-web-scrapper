import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants";

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

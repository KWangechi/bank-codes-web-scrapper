// Query keys for cache management
export const QUERY_KEYS = {
  banks: ["banks"],
  bankBranches: (bankId) => ["bankBranches", bankId],
  search: (searchTerm, bankName) => ["search", searchTerm, bankName],
};
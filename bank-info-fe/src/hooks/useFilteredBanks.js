import { useMemo, useEffect } from "react";

/**
 * Filters and maps the banks based on the debounced search term.
 *
 * @param {string} searchTerm - The debounced search term.
 * @param {Array} banks - The list of banks to filter.
 * @param {Function} setFilteredBanks - Function to set the new filtered banks.
 * @param {Function} setLoading - Function to set the loading state.
 * @param {Object} totalResults - Ref object to store the total results count.
 */
function useFilteredBanks(
  banks,
  searchTerm,
  setLoading,
  totalResults,
  setFilteredBanks,
) {
  const filteredBanks = useMemo(() => {
    if (!searchTerm) {
      return banks;
    }
    const search = searchTerm.toLowerCase();

    function matchedAlias(bank) {
      return bank?.aliases?.some(function (alias) {
        return alias?.toLowerCase().includes(search);
      });
    }

    function matchedBank(bank) {
      return bank?.bank_name?.toLowerCase().includes(search);
    }

    const filtered = banks.filter(function (bank) {
      const matchedBranch = bank?.branches?.some(function (branch) {
        return branch?.branch_name?.toLowerCase().includes(search);
      });
      return matchedBank(bank) || matchedAlias(bank) || matchedBranch;
    });

    const formatted = filtered.map(function (bank) {
      let branches = bank?.branches?.filter(function (branch) {
        return branch?.branch_name?.toLowerCase().includes(search);
      });
      if (matchedBank(bank) || matchedAlias(bank)) {
        branches = bank.branches;
      }
      return { ...bank, branches };
    });

    return formatted;
  }, [banks, searchTerm]);

  useEffect(() => {
    setFilteredBanks(filteredBanks);
    const total = filteredBanks.reduce(function (acc, bank) {
      return acc + (bank?.branches?.length || 0);
    }, 0);
    totalResults.current = total;
    setLoading(false);
  }, [setLoading, filteredBanks, setFilteredBanks, totalResults]);
}

export default useFilteredBanks;

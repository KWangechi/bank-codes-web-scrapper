import { useMemo } from "react";

export default function usePagination(totalResults, rowsPerPage, currentPage) {
  return useMemo(() => {
    const totalPages = Math.ceil(totalResults / rowsPerPage);

    return {
      currentPage,
      rowsPerPage,
      totalResults,
      totalPages,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
      startIndex: (currentPage - 1) * rowsPerPage,
      endIndex: Math.min(currentPage * rowsPerPage - 1, totalResults - 1),
    };
  }, [totalResults, rowsPerPage, currentPage]);
}

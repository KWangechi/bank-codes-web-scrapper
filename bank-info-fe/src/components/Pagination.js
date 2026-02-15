export default function Pagination({ pagination, onPageChange }) {
  const { page, page_size, total } = pagination;

  const totalPages = Math.ceil(total / page_size);
  if (!totalPages) return null;

  function getPageRange(current, total, delta = 2) {
    const range = [];
    const rangeWithDots = [];
    let last;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }

    for (const page of range) {
      if (last) {
        if (page - last === 2) {
          rangeWithDots.push(last + 1);
        } else if (page - last > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(page);
      last = page;
    }

    return rangeWithDots;
  }

  const pages = getPageRange(page, totalPages);

  return (
    <nav className="flex items-center justify-center pt-10 mb-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Prev
      </button>

      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={`ellipsis-${idx}`} className="font-bold">
            ...
          </span>
        ) : (
          <button
            key={`page-${p}-${idx}`}
            onClick={() => onPageChange(p)}
            className={
              p === page
                ? "bg-primary text-white px-4 py-2 rounded-md font-medium ml-2 mr-2"
                : "px-4 py-2"
            }
          >
            {p}
          </button>
        ),
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Next
      </button>
    </nav>
  );
}

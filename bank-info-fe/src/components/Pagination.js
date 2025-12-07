import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

/**
 * Navigate to the previous Page and go to the next route
 * @param {*} element
 */

export default function Pagination({ pagination, onPageChange }) {
  const { currentPage, totalPages, prevPage, nextPage } = pagination;

  // iterate through the totalPages and display the current page on a button
  const pageButtons = [];

  for (let i = 1; i <= totalPages.current; i++) {
    const minLength = 3;
    const maxLength = 7;
    // try and truncate this pageButtons by adding ... if the pages exceed till length 7 and then it continues at the last 3 buttons

    if (
      i <= minLength ||
      i > totalPages.current - maxLength ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageButtons.push(
        <button
          key={i}
          className={`rounded-xl space-x-4 relative z-10 inline-flex items-center px-4 py-2 text-gray-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
            currentPage === i ? "bg-[#D0BB95]" : ""
          } transition duration-150 ease-in-out`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    } else if (i === minLength + 1 && currentPage > minLength + 2) {
      // this should only show one but when it is clicked, it goes to the next page
      pageButtons.push(
        <button
          key="ellipsis-start"
          className="rounded-xl relative z-10 inline-flex items-center px-4 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-default"
        >
          ...
        </button>
      );
      i = currentPage - 2;
    } else if (
      i === minLength + 2 &&
      currentPage < totalPages.current - minLength - 1
    ) {
      pageButtons.push(
        <button
          key="ellipsis-end"
          className="rounded-xl relative z-10 inline-flex items-center px-4 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-default"
        >
          ...
        </button>
      );
      i = totalPages.current - minLength - 1;
    }
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={currentPage - 1}
        >
          Previous
        </button>

        <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{pagination.startIndex}</span>{" "}
            to <span className="font-medium">{pagination.endIndex}</span> of{" "}
            <span className="font-medium">{pagination.totalElements}</span>{" "}
            result(s)
          </p>
        </div>

        <div className="bg-none rounded-none border-none">
          <nav
            aria-label="Pagination"
            className="isolate inline-flex space-x-3 rounded-xl shadow-sm"
          >
            <button
              onClick={onPageChange(prevPage)}
              className="rounded-xl relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={!prevPage}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {/** iterate the totalResultCount loop through the length and display buttons with the page number */}

            {pageButtons}

            <button
              onClick={onPageChange(nextPage)}
              className="rounded-xl relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={!nextPage}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

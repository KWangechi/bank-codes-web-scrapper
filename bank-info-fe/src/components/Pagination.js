import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useRef, useState } from "react";
// import { Navigate, useNavigation, useParams } from "react-router-dom";

/**
 * Navigate to the previous Page and go to the next route
 * @param {*} element
 */

export default function Pagination({
  rowsPerPage,
  totalResultsCount,
  setPagination,
}) {
  // const rowsPerPage = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useRef(0);
  const buttonIsDisabled = useRef(false);

  totalPages.current = Math.ceil(totalResultsCount / rowsPerPage.current);

  useEffect(() => {
    const pagination = {
      currentPage: currentPage,
      rowsPerPage: 20,
      totalElements: totalResultsCount,
    };

    setPagination(pagination);
    console.log(pagination);
  }, [currentPage, rowsPerPage, totalResultsCount, setPagination]);

  function toPreviousPage() {
    if (currentPage >= 1) {
      setCurrentPage(currentPage - 1);
    }
    buttonIsDisabled.current = true;
  }

  /**
   * Navigate to the next Page by going to the next route
   */
  function toNextPage() {
    // console.log(pagination);

    if (currentPage >= 1 && currentPage < totalPages.current) {
      setCurrentPage(currentPage + 1);
      // console.log(currentPage);
      const pagination = {
        currentPage: currentPage + 1,
        rowsPerPage: rowsPerPage.current,
        totalElements: totalResultsCount,
      };
      setPagination(pagination);
      console.log(pagination);
    }
    buttonIsDisabled.current = true;
  }

  // iterate through the totalPages and display the current page on a button
  const pageButtons = [];

  for (let i = 1; i <= totalPages.current; i++) {
    const minLength = 3;
    const maxLength = 7;
    // try and trunate this pageButtons by adding ... if the pages exceed till length 7 and then it continues at the last 3 buttons

    if (
      i <= minLength ||
      i > totalPages.current - maxLength ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageButtons.push(
        <button
          key={i}
          className={`relative z-10 inline-flex items-center px-4 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
            currentPage === i ? "bg-[#B6C8A9]" : ""
          } transition duration-150 ease-in-out`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    } else if (i === minLength + 1 && currentPage > minLength + 2) {
      // this should only show one but when it is clicked, it goes to the next page
      pageButtons.push(
        <button
          key="ellipsis-start"
          className="relative z-10 inline-flex items-center px-4 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-default"
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
          className="relative z-10 inline-flex items-center px-4 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-default"
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
        <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Previous
        </button>

        <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">
              {totalResultsCount > rowsPerPage.current
                ? rowsPerPage.current
                : totalResultsCount}
            </span>{" "}
            of <span className="font-medium">{totalResultsCount}</span>{" "}
            result(s)
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              onClick={toPreviousPage}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {/** iterate the totalResultCount loop through the length and display buttons with the page number */}

            {pageButtons}

            <button
              onClick={toNextPage}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={currentPage === totalPages.current}
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

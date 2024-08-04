import React from "react";

function Search({ searchTerm, setSearchTerm }) {
  function onClearSearch() {
    setSearchTerm("");
  }

  function onSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="header h-90 bg-gray-100 pb-4">
      <div className="font-semibold text-4xl text-center text-[#695958] pt-5">
        Kenya Bank Code Search
      </div>
      <div className="bg-[#B6C8A9] text-center py-8 mt-5 shadow-sm">
        <h4 className="italic text-md mt-4 text-[#695958] mx-[5%]">
          Search for all the Banks in Kenya, their codes, their branches info,
          and additional details such as Opening Hours. You can filter by Bank
          Name and Location.
        </h4>
        <div className="mt-6 flex justify-center">
          <div className="relative w-2/3 md:w-1/2 items-center w-full sm:w-auto mx-[5%]">
            <div className="absolute right-0 inset-y-0 flex items-center pr-3">
              {searchTerm ? (
                <button onClick={onClearSearch}>
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              ) : null}
            </div>
            <div className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                fill="none"
                viewBox="0 0 26 26"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 hover:text-gray-500 cursor-pointer"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="username"
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Search Bank/Branch Name... e.g KCB"
              className="appearance-none border-2 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-4 px-3 pl-10 pr-10 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-[#695958] focus:border-[#695958] focus:shadow-outline"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;

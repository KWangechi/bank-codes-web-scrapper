import React from "react";

function Search({ searchTerm, setSearchTerm }) {
  function onClearSearch() {
    setSearchTerm("");
  }

  function onSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="header h-90 pb-4 pt-2">
      <div className="text-center pt-5">
        <h1 className="font-bold text-3xl">Find Bank Branches in Kenya</h1>
        <p className="mt-2 text-gray-600 max-w-lg mx-auto text-md">
          Easily search for bank and branch information, including SWIFT codes,
          across the country.
        </p>
      </div>
      <div className="mx-4 pb-5 pt-4 mt-8 text-center shadow-sm bg-white rounded-2xl">
        <div className="mt-6 flex items-center">
          <div className="relative md:w-full items-center w-full sm:w-auto mx-6">
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
              placeholder="Search Bank, Branch Name, or SWIFT Code..."
              className="bg-[#F0F1F5] appearance-none border-2 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-10 text-gray-800 leading-tight focus:outline-none focus:shadow-outline border-none"
            />
          </div>

          <div className="flex items-center justify-between mx-6 gap-x-8">
            <div className="flex gap-x-4">
              <select className="bg-[#F0F1F5] py-2 rounded-md border-2 border-gray-300 hover:border-gray-400 transition-colors border-none text-sm font-medium px-3">
                <option value="ALL">Filter By Bank</option>
                <option value="KE">KE</option>
                <option value="US">US</option>
                <option value="UK">UK</option>
              </select>


              <select className="bg-[#F0F1F5] py-2 rounded-md border-2 border-gray-300 hover:border-gray-400 transition-colors border-none text-sm font-medium px-3">
                <option value="ALL">Sort by Bank Name(A-Z)</option>
                <option value="KE">KE</option>
                <option value="US">US</option>
                <option value="UK">UK</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;

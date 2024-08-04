import React, { useState, useEffect, useMemo, useRef } from "react";
import { NoResultCard } from "./components/NoResultCard";
import SkeletonCard from "./components/SkeletonCard";
import banks from "./banks_info.json";
import { ResultCard } from "./components/ResultCard";
import Pagination from "./components/Pagination";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newFilteredBanks, setNewFilteredBanks] = useState([]);
  const totalResults = useRef(0);
  const [loading, setLoading] = useState(true);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const rowsPerPage = useRef(0);
  rowsPerPage.current = 30;

  const handleClearSearch = () => {
    setSearchTerm("");
    document.getElementById("username").value = "";
  };

  const filteredBanks = useMemo(() => {
    if (!searchTerm) return banks;

    return banks
      .filter(
        (bank) =>
          bank?.bank_name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          bank?.aliases?.some((alias) =>
            alias?.toLowerCase().includes(searchTerm?.toLowerCase())
          ) ||
          bank?.branches?.some((branch) =>
            branch?.branch_name
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase())
          )
      )
      .map((bank) => {
        let filteredBranches = bank?.branches?.filter((branch) =>
          branch?.branch_name?.toLowerCase().includes(searchTerm?.toLowerCase())
        );

        if (
          bank?.bank_name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          bank?.aliases?.some((alias) =>
            alias?.toLowerCase().includes(searchTerm?.toLowerCase())
          )
        ) {
          filteredBranches = bank.branches;
        }

        return {
          ...bank,
          branches: filteredBranches,
        };
      })
      ;
  }, [searchTerm]);

  console.log(filteredBanks.length);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setNewFilteredBanks(filteredBanks);
      totalResults.current = filteredBanks?.reduce(
        (acc, bank) => acc + bank.branches.length,
        0
      );
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [filteredBanks]);

  return (
    <div>
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
                {searchTerm && (
                  <button onClick={handleClearSearch}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600 hover:text-gray-500 cursor-pointer"
                  fill="none"
                  viewBox="0 0 26 26"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                type="text"
                placeholder="Search Bank/Branch Name... e.g KCB"
                className="appearance-none border-2 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-4 px-3 pl-10 pr-10 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-[#695958] focus:border-[#695958] focus:shadow-outline"
                id="username"
                onChange={handleSearchTermChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 h-full">
        <span className="font-semibold text-xl italic text-[#695958]">
          {totalResults.current > 0 ? (
            `${totalResults.current} Results Found`
          ) : !loading ? (
            <NoResultCard query={searchTerm} />
          ) : (
            ""
          )}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 ms-4 me-4 sm:grid-cols-1">
        {loading ? (
          <SkeletonCard />
        ) : (
          newFilteredBanks.map((bank) =>
            bank.branches.map((branch) => (
              <ResultCard
                key={`${bank.bank_code}-${branch.branch_code}`}
                bank={bank}
                branch={branch}
              />
            ))
          )
        )}
      </div>

      <div>
        <Pagination
          rowsPerPage={rowsPerPage}
          totalResultsCount={totalResults.current}
        />
      </div>
    </div>
  );
}

export default App;

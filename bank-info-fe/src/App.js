import React, { useRef, useState } from "react";

import Search from "components/Search";
import { useDebounce, useFilteredBanks } from "hooks/";
import { NoResultCard } from "./components/NoResultCard";
import SkeletonCard from "./components/SkeletonCard";
import banks from "./banks_info.json";
import { ResultCard } from "./components/ResultCard";
// import Pagination from "./components/Pagination";
import Header from "components/Header";
import Footer from "components/Footer";
import usePagination from "hooks/usePagination";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { downloadAsJson } from "hooks/useFilteredBanks";

function App() {
  const totalResults = useRef(0);
  const [search, setSearch] = useState("");
  const searchTerm = useDebounce(search, 5);
  const [loading, setLoading] = useState(true);
  const [newFilteredBanks, setNewFilteredBanks] = useState([]);

  // pagination

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  const totalResultsCount = totalResults.current;
  const pagination = usePagination(totalResultsCount, rowsPerPage, currentPage);

  useFilteredBanks(
    banks,
    searchTerm,
    setLoading,
    totalResults,
    setNewFilteredBanks,
    pagination,
    currentPage
  );

  return (
    <div className="flex flex-col h-screen">
      <Header></Header>
      <div className="bg-[#f7f7f5] flex flex-col flex-1">
        <Search searchTerm={search} setSearchTerm={setSearch} />
        <div
          className={`flex ${
            totalResults.current > 0 ? "justify-between" : "justify-center"
          } items-center mx-4 mt-4`}
        >
          {loading ? null : (
            <span className="font-semibold text-xl text-black">
              {totalResults.current > 0 ? (
                <div>Showing {totalResults.current} Result(s)</div>
              ) : (
                <div className="text-center">
                  <NoResultCard query={search} />
                </div>
              )}
            </span>
          )}

          {totalResults.current > 0 && (
            <div className="flex gap-x-4">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors text-sm">
                List View
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors text-sm">
                Map View
              </button>
              <button
                className="bg-gray-200 hover:bg-[#D0BB95] text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors flex gap-x-4 align-middle text-sm"
                onClick={downloadAsJson}
              >
                <ArrowDownTrayIcon height="17" width="17" />
                Download as JSON
              </button>
            </div>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-6 ms-4 me-4 sm:grid-cols-1 overflow-y-auto mt-5 flex-1 max-h-[calc(100vh-200px)]">
          {loading ? (
            <SkeletonCard />
          ) : (
            newFilteredBanks
              // .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
              .map((bank) =>
                bank.branches.map((branch) => (
                  <ResultCard
                    key={`${bank.bank_code}-${branch.branch_code}`}
                    bank={bank}
                    branch={branch}
                    searchTerm={searchTerm}
                  />
                ))
              )
          )}
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;

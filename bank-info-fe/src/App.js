import React, { useEffect, useState } from "react";

import Search from "components/Search";
import { useDebounce } from "hooks/";
import { NoResultCard } from "./components/NoResultCard";
import SkeletonCard from "./components/SkeletonCard";
import { ResultCard } from "./components/ResultCard";
import Pagination from "./components/Pagination";
import Header from "components/Header";
import Footer from "components/Footer";
import { useApiStore } from "stores/apiStore";

function App() {
  const { searchTerm, pagination } = useApiStore();
  const search = useDebounce(searchTerm, 100);

  // use the banks in the store instead as a test
  const { isLoading, result, searchInfo } = useApiStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isFetching] = useState(false);

  const downloadAsJSON = () => {
    // your logic here
  };

  const downloadAsExcel = () => {
    // your logic here
  };


  return (
    <div className="flex flex-col h-screen flex-1">
      <Header></Header>
      <div className="bg-[#f7f7f5] flex flex-col flex-1">
        <Search searchTerm={search} />

        {/* Result Count Heading */}
        <div
          className={`flex ${
            result.length > 0 ? "justify-between" : "justify-center"
          } items-center mx-4 mt-4 min-h-[40px]`}
        >
          <span className="font-semibold text-xl text-black">
            {result.length > 0 && <>Showing {result.length} Result(s)</>}
          </span>

          {/* No results */}
          {!isLoading && result.length === 0 && search && (
            <NoResultCard query={search} />
          )}

          {result.length > 0 && (
            <div className="flex gap-x-4">
              {/* <button className="bg-white hover:bg-gray-300 py-2 px-4 rounded-md">
                List View
              </button>
              <button className="bg-white hover:bg-gray-300 py-2 px-4 rounded-md">
                Map View
              </button> */}
              <div className="relative">
                <button
                  onClick={() => setIsOpen((p) => !p)}
                  className="bg-white hover:bg-gray-300 py-2 px-4 rounded-md"
                >
                  Download
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                    <button
                      // onClick={downloadAsExcel}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Excel
                    </button>
                    <button
                      // onClick={downloadAsJSON}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      JSON
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Result Grid */}
        <div className="grid md:grid-cols-2 gap-6 ms-4 me-4 sm:grid-cols-1 overflow-y-auto flex-1 mt-4 relative">
          {/* Initial load */}
          {result.length === 0 && !search && <SkeletonCard />}

          {/* Results (also shown while refetching) */}
          {result.length > 0 &&
            result.map((branch, index) => (
              <ResultCard
                key={`${index}`}
                bank={branch.bank}
                branch={branch}
                searchTerm={search}
              />
            ))}

          {/* Dim overlay during refetch */}
          {isFetching && result.length > 0 && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10">
              <span className="text-sm text-gray-600">Updating results…</span>
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          pagination={pagination}
          onPageChange={(page) => searchInfo(null, page)}
        />

        <div className="mt-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;

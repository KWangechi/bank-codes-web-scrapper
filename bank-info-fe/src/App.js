import React, { useState } from "react";

import Search from "components/Search";
import { useDebounce } from "hooks/";
import { NoResultCard } from "./components/NoResultCard";
import SkeletonCard from "./components/SkeletonCard";
import { ResultCard } from "./components/ResultCard";
import Pagination from "./components/Pagination";
import Header from "components/Header";
import Footer from "components/Footer";
import { useSearch } from "stores/queryStore";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const search = useDebounce(searchTerm, 800);
  const [currentPage, setCurrentPage] = useState(1);

  // Use React Query for search
  const { data, isLoading, isFetching } = useSearch(
    search,
    selectedBank,
    currentPage,
    20,
  );

  const result = data?.data || [];
  const pagination = {
    total: data?.total || 0,
    page_size: data?.page_size || 20,
    page: data?.page || 1,
  };

  return (
    <div className="flex flex-col h-screen flex-1">
      <Header></Header>
      <div className="bg-[#f7f7f5] flex flex-col flex-1">
        <Search
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onBankChange={setSelectedBank}
          selectedBank={selectedBank}
        />

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
          {result.length === 0 && search && !isLoading && (
            <NoResultCard query={search} />
          )}

          {/* Error handling */}
          {/* {error && (
            <div className="text-red-500 text-center">
              Error loading data: {error.message}
            </div>
          )} */}

          
            <div className="flex gap-x-4">
              {/* <button className="bg-white hover:bg-gray-300 py-2 px-4 rounded-md">
                List View
              </button>
              <button className="bg-white hover:bg-gray-300 py-2 px-4 rounded-md">
                Map View
              </button> */}
            </div>
         
        </div>

        {/* Result Grid */}
        <div className="grid md:grid-cols-2 gap-6 ms-4 me-4 sm:grid-cols-1 overflow-y-auto flex-1 mt-4 relative">
          {/* Loading state - show skeleton only when initially loading */}
          {isFetching && <SkeletonCard />}

          {/* No search term and no results */}
          {/* {!isLoading && result.length === 0 && !search && <SkeletonCard />} */}
  

          {/* Results grid */}
          {result.length > 0 &&
            result.map((branch, index) => (
              <ResultCard
                key={`${index}`}
                bank={branch.bank}
                branch={branch}
                searchTerm={search}
              />
            ))}
        </div>

        {/* Pagination */}
        <Pagination
          pagination={pagination}
          onPageChange={(page) => setCurrentPage(page)}
        />

        <div className="mt-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;

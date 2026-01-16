import React, { Suspense, useEffect } from "react";

import Search from "components/Search";
import { useDebounce } from "hooks/";
import { NoResultCard } from "./components/NoResultCard";
import SkeletonCard from "./components/SkeletonCard";
import { ResultCard } from "./components/ResultCard";
// import Pagination from "./components/Pagination";
import Header from "components/Header";
import Footer from "components/Footer";
// import usePagination from "hooks/usePagination";
import { useApiStore } from "stores/apiStore";

function App() {
  const { searchTerm } = useApiStore();
  const search = useDebounce(searchTerm, 5);

  // use the banks in the store instead as a test
  const { isLoading, result, searchInfo } = useApiStore();

  // load the banks on loading this component
  useEffect(() => {
    searchInfo();
  }, []);

  return (
    <div className="flex flex-col h-screen">
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
            {result.length > 0 ? (
              <>Showing {result.length} Result(s)</>
            ) : !isLoading && search ? (
              <NoResultCard query={search} />
            ) : null}
          </span>

          {result.length > 0 && (
            <div className="flex gap-x-4">
              <button className="bg-white hover:bg-gray-300 py-2 px-4 rounded-md">
                List View
              </button>
              <button className="bg-white hover:bg-gray-300 py-2 px-4 rounded-md">
                Map View
              </button>
            </div>
          )}
        </div>

        {/* Result Grid */}
        <div className="grid md:grid-cols-2 gap-6 ms-4 me-4 sm:grid-cols-1 overflow-y-auto flex-1">
          <Suspense fallback={<SkeletonCard />}>
            {result?.map((branch, index) => (
              <ResultCard
                key={`${index}`}
                bank={branch.bank}
                branch={branch}
                searchTerm={search}
              />
            ))}
          </Suspense>
        </div>
        {/* {totalResults.current ? (
          <div>
            <Pagination pagination={pagination} onPageChange={setCurrentPage} />
          </div>
        ) : null} */}

        <div className="mt-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;

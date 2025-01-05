import React, { useRef, useState } from "react";

import Search from "components/Search";
import { useDebounce, useFilteredBanks } from "hooks/";
import { NoResultCard } from "./components/NoResultCard";
import SkeletonCard from "./components/SkeletonCard";
import banks from "./banks_info.json";
import { ResultCard } from "./components/ResultCard";
import Pagination from "./components/Pagination";
import Header from "components/Header";
import Footer from "components/Footer";

function App() {
  const rowsPerPage = useRef(0);
  const totalResults = useRef(0);
  const [search, setSearch] = useState("");
  const searchTerm = useDebounce(search, 5);
  const [loading, setLoading] = useState(true);
  const [newFilteredBanks, setNewFilteredBanks] = useState([]);

  useFilteredBanks(
    banks,
    searchTerm,
    setLoading,
    totalResults,
    setNewFilteredBanks
  );
  rowsPerPage.current = 30;

  return (
    <div className="min-h-screen h-full w-full bg-slate-200">
      <Header></Header>
      <Search searchTerm={search} setSearchTerm={setSearch} />

      <div className="flex justify-center mt-4 h-full ">
        {!loading && totalResults.current > 0 ? (
          <>
            <span className="font-semibold text-xl  text-[#212121]">
              [{totalResults.current}] Results Found
            </span>
          </>
        ) : (
          <NoResultCard query={search} />
        )}
      </div>

      <div className="min-h-screen h-[70vh] overflow-y-auto max-w-full w-[98%] mx-auto  my-4">
        <div className="grid md:grid-cols-3 gap-6 ms-4 me-4 sm:grid-cols-1">
          {loading ? (
            <SkeletonCard />
          ) : (
            newFilteredBanks.map((bank) =>
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
      </div>

      {totalResults.current ? (
        <div>
          <Pagination
            rowsPerPage={rowsPerPage}
            totalResultsCount={totalResults.current}
          />
        </div>
      ) : null}

      <Footer />
    </div>
  );
}

export default App;

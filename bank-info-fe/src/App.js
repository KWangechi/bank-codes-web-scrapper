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
import { Link } from "react-router-dom";

function App() {
  const rowsPerPage = useRef(0);
  const totalResults = useRef(0);
  const [search, setSearch] = useState("");
  const searchTerm = useDebounce(search, 10);
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
    <div>
      <Header></Header>
      {/* <div>
        <Link to={`test`}></Link>
        View test page
      </div> */}
      <Search searchTerm={search} setSearchTerm={setSearch} />
      <div className="flex justify-center mt-6 h-full">
        {loading ? null : (
          <span className="font-semibold text-xl italic text-[#695958]">
            {totalResults.current > 0 ? (
              `${totalResults.current} Results Found`
            ) : !loading ? (
              <NoResultCard query={search} />
            ) : (
              ""
            )}
          </span>
        )}
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
                searchTerm={searchTerm}
              />
            ))
          )
        )}
      </div>
      {totalResults.current ? (
        <div>
          <Pagination
            rowsPerPage={rowsPerPage}
            totalResultsCount={totalResults.current}
          />
        </div>
      ) : null}

      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./index.css";
import { banks, getAllBanks } from "./api/bank-store";
import { ResultCard } from "./components/ResultCard";
import { NoResultCard } from "./components/NoResultCard";
import SkeletonCard from "./components/SkeletonCard";

function App() {
  getAllBanks();

  const [searchTerm, setSearchTerm] = useState(null);
  const [filterTerm, setFilterTerm] = useState(null);

  let [newFilteredBanks, setNewFilteredBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const changeBankNameFilter = (e) => {
    setFilterTerm(e.target.value);
  };

  // handles the search
  useEffect(() => {
    if (banks.length === 0) {
      setLoading(true);
      return;
    }

    let filteredBanks = banks.filter(
      (bank) =>
        searchTerm?.length >= 3 && (
        (bank?.bank_name?.toLowerCase().includes(searchTerm?.toLowerCase())  ||
          bank?.aliases?.some((alias) =>
            alias?.toLowerCase().includes(searchTerm?.toLowerCase())
          ) ||
          bank?.branches?.some((branch) =>
            branch?.branch_name
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase())
          ))
        ) &&
        (bank?.bank_name?.toLowerCase().includes(filterTerm?.toLowerCase()))
    );

    if (filteredBanks && filteredBanks.length > 0) {
      const updatedFilteredBanks = filteredBanks.map((bank) => {
        let filteredBranches = bank?.branches?.filter((branch) =>
          branch?.branch_name?.toLowerCase().includes(searchTerm?.toLowerCase())
        );

        // If bank name or aliases match, include all branches
        if (
          bank?.bank_name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          bank?.aliases?.some((alias) =>
            alias?.toLowerCase().includes(searchTerm?.toLowerCase())
          )
        ) {
          filteredBranches = bank.branches;
        }

        return filteredBranches.map((branch) => {
          return (
            <ResultCard
              bank={bank}
              branch={branch}
              key={`${bank.bank_code}-${branch.branch_code}`}
            ></ResultCard>
          );
        });
      });
      setNewFilteredBanks(updatedFilteredBanks.flat());
      setLoading(false);
    }
    // If no search term is provided, display all banks
    else if (searchTerm && filteredBanks.length === 0) {
      setNewFilteredBanks([]);
      setLoading(false);
    } else if (!searchTerm && filteredBanks.length === 0) {
      setNewFilteredBanks([<SkeletonCard></SkeletonCard>]);
    } else {
      const allBanks = banks.map((bank) =>
        bank.branches.map((branch) => (
          <ResultCard
            bank={bank}
            branch={branch}
            key={`${bank.bank_code}-${branch.branch_code}`}
          ></ResultCard>
        ))
      );
      setNewFilteredBanks(allBanks);
    }
  }, [searchTerm, filterTerm]);


  // define another useEffect() to chunk results for faster loading time
  useEffect(() => {
    if (!searchTerm) {
      const timeout = setTimeout(() => {
        setLoading(false);
        setNewFilteredBanks(
          banks.flatMap((bank) =>
            bank.branches.map((branch) => (
              <ResultCard
                bank={bank}
                branch={branch}
                key={`${bank.bank_code}-${branch.branch_code}`}
              ></ResultCard>
            ))
          )
        );
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [searchTerm]);

  return (
    <div className="header h-90 bg-gray-100 pb-4">
      <div className="font-semibold text-4xl text-center text-[#695958] pt-5">
        Kenya Bank Code Search
      </div>
      <div className="bg-[#B6C8A9] text-center py-8 mt-5 shadow-sm">
        <h4 className="italic text-md mt-4 text-[#695958]">
          Search for all the Banks in Kenya, their codes, their branches info,
          and additional details such as Opening Hours. You can filter by Bank
          Name and Location.
        </h4>
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Search Bank/Branch Name... e.g KCB"
            className="rounded-md w-2/3 md:w-1/2 shadow-lg px-4 py-3 text-md outline-none focus:ring-2 focus:ring-[#695958]"
            onChange={handleSearchTermChange}
          />
          <button className="flex items-center ml-3 bg-[#695958]/80 rounded-lg text-lg px-4 py-2 text-white shadow hover:bg-[#5a4d4d] transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 mr-2 items-center"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            Filter
          </button>
        </div>

        <div className="mt-6 flex justify-center">
          <select
            name="banks"
            id="banks"
            className="rounded-md w-1/3 md:w-1/3 shadow-md px-4 py-3 text-md outline-none focus:ring-2 focus:ring-[#695958]"
            onChange={changeBankNameFilter}
            disabled={!searchTerm ? true : false}
          >
            <option disabled defaultChecked>Filter By Bank Name</option>
            {searchTerm?.length > 0
              ? banks.map((bank) => (
                  <option value={bank?.bank_name} label={bank?.bank_name}>
                    {bank?.bank_name}
                  </option>
                ))
              : "null"}
          </select>
          {/* <select
            type="text"
            placeholder="Filter By Bank Name"
            className="rounded-md w-1/3 md:w-1/3 shadow-md px-4 py-3 text-md outline-none focus:ring-2 focus:ring-[#695958]"
            onChange={changeBankNameFilter}
          /> */}
        </div>
      </div>

      <div className="flex justify-center mt-8 h-full">
        <span className="font-semibold text-xl italic text-[#695958]">
          {newFilteredBanks.length > 0 ? (
            `${newFilteredBanks.length} Results Found`
          ) : loading ? (
            <SkeletonCard />
          ) : (
            <NoResultCard query={searchTerm} />
          )}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 ms-4 me-4 mt-6 sm:grid-cols-1">
        {loading ? <SkeletonCard /> : newFilteredBanks}
      </div>
    </div>
  );
}

export default App;

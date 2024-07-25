import { useState, useEffect } from "react";
import "./index.css";
import { banks, getAllBanks } from "./api/bank-store";
import { ResultCard } from "./components/ResultCard";
import { NoResultCard } from "./components/NoResultCard";
import SkeletonCard from "./components/SkeletonCard";

function App() {
  getAllBanks();

  const [searchTerm, setSearchTerm] = useState(null);
  // const [filterTerm, setFilterTerm] = useState(null);

  let [newFilteredBanks, setNewFilteredBanks] = useState([]);
  // let [dummyData, setDummyData] = useState([]);

  const [loading, setLoading] = useState(true);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    document.getElementById("username").value = ""
  };

  // const changeBankNameFilter = (e) => {
  //   setFilterTerm(e.target.value);

  //   console.log(dummyData);

  //   let bankNameFilterResults = dummyData.filter((bank) => {
  //     return bank?.bank_name === e.target.value;
  //   });

  //   console.log(bankNameFilterResults);

  //   setNewFilteredBanks(
  //     bankNameFilterResults.map((bankNameFilter) => {
  //       return bankNameFilter.branches.map((branchNameFilter) => {
  //         return (
  //           <ResultCard
  //             bank={bankNameFilter}
  //             branch={branchNameFilter}
  //             key={`${bankNameFilter.bank_code}-${branchNameFilter.branch_code}`}
  //           ></ResultCard>
  //         );
  //       });
  //     })
  //   );
  //   setLoading(false);
  // };

  // handles the search
  useEffect(() => {
    if (banks.length === 0) {
      setLoading(true);
      return;
    }

    let filteredBanks = banks.filter(
      (bank) =>
        searchTerm?.length >= 3 &&
        (bank?.bank_name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          bank?.aliases?.some((alias) =>
            alias?.toLowerCase().includes(searchTerm?.toLowerCase())
          ) ||
          bank?.branches?.some((branch) =>
            branch?.branch_name
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase())
          ))
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

        // setDummyData(filteredBanks);

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
  }, [searchTerm]);

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
          <div class="relative w-2/3 md:w-1/2 items-center">
            <div class="absolute right-0 inset-y-0 flex items-center pr-3">
              {searchTerm && <button type=""onClick={handleClearSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              </button>}
              
            </div>

            <div class="absolute left-0 inset-y-0 flex items-center pl-3">
              <button></button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-600 hover:text-gray-500 cursor-pointer"
                fill="none"
                viewBox="0 0 26 26"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search Bank/Branch Name... e.g KCB"
              class="appearance-none border-2 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-4 px-3 pl-10 pr-10 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-[#695958] focus:border-[#695958] focus:shadow-outline"
              id="username"
              onChange={handleSearchTermChange}
            />
          </div>

          {/* <div class="relative text-gray-600 focus-within:text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                class="p-1 focus:outline-none focus:shadow-outline"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  class="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="q"
              class="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
              placeholder="Search..."
              autocomplete="off"
            />
          </div> */}
          {/* <select
              name="banks"
              id="banks"
              className="rounded-md w-1/3 md:w-1/6 shadow-md ml-4 px-4 py-3 text-md outline-none focus:ring-2 focus:ring-[#695958]"
              onChange={changeBankNameFilter}
              disabled={!searchTerm ? true : false}
            >
              <option disabled selected>
                Filter By Bank Name
              </option>
              {searchTerm?.length > 0
                ? banks.map((bank) => (
                    <option value={bank?.bank_name} label={bank?.bank_name}>
                      {bank?.bank_name}
                    </option>
                  ))
                : "null"}
            </select> */}
          {/* <select
            type="text"
            placeholder="Filter By Bank Name"
            className="rounded-md w-1/3 md:w-1/3 shadow-md px-4 py-3 text-md outline-none focus:ring-2 focus:ring-[#695958]"
            onChange={changeBankNameFilter}
          /> */}

          {/* <button className="flex items-center ml-3 bg-[#695958]/80 rounded-lg text-lg px-4 py-2 text-white shadow hover:bg-[#5a4d4d] transition duration-300">
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
          </button> */}
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
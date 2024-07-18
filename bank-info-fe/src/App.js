import { useState } from "react";
import "./index.css";
import { banks, getAllBanks } from "./api/bank-store";
import { ResultCard } from "./components/ResultCard";
import { NoResultCard } from "./components/NoResultCard";

function App() {
  getAllBanks();
  // console.log(banks.length);

  const [searchTerm, setSearchTerm] = useState(null);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // console.log(searchTerm);

  let filteredBanks = banks.filter(
    (bank) =>
      bank?.bank_name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      bank?.branch_name?.toLowerCase().includes(searchTerm?.toLowerCase()) || (
      bank?.aliases?.some((alias) =>
        alias?.toLowerCase().includes(searchTerm?.toLowerCase())
      )
    )
  );

  let newFilteredBanks;

  if (filteredBanks && filteredBanks.length > 0) {
    newFilteredBanks = filteredBanks.map((bank) =>
      bank.branches.map((branch) => (
        <ResultCard bank={bank} branch={branch}></ResultCard>
      ))
    );
  }
  // If no search term is provided, display all banks

  else if(searchTerm && filteredBanks.length === 0) {
    <NoResultCard></NoResultCard>
  }
  else {
    newFilteredBanks = banks.map((bank) =>
      bank.branches.map((branch) => (
        <ResultCard bank={bank} branch={branch}></ResultCard>
      ))
    );
  }

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
          {/* <button className="ml-3 bg-[#695958] rounded-lg text-lg px-4 py-2 text-white shadow hover:bg-[#5a4d4d] transition duration-300">
            Search
          </button> */}
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
      </div>

      <div className="flex justify-center mt-8">
        <span className="font-semibold text-xl italic text-[#695958]">
          {newFilteredBanks && newFilteredBanks.length > 0
            ? newFilteredBanks.length + " Result(s) Found"
            : "No Result(s) Found"}
        </span>
      </div>

      {/* <div className="grid grid-cols-3 gap-4">
        <div className="h-10 border-dashed border-gray-100 w-10">1</div>
        <div className="h-6 border-dashed border-gray-100 w-6">2</div>
        <div className="h-6 border-dashed border-gray-100 w-6">3</div>
      </div> */}
      <div className="grid md:grid-cols-2 gap-6 ms-4 me-4 mt-2 sm:grid-cols-1">
        {newFilteredBanks}
      </div>
    </div>
  );
}

export default App;

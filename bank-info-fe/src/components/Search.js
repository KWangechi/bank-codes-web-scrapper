import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useApiStore } from "stores/apiStore";
import { Option } from "./BankSelectOption";

function Search() {
  const {
    banks,
    fetchAllBanks,
    searchInfo,
    setSearchTerm,
    searchTerm,
    isLoading,
  } = useApiStore();

  const [bankName, setBankName] = useState(null);

  function onClearSearch() {
    setSearchTerm("");
  }

  function onSelectBankChange(selectedValue) {
    setBankName(selectedValue);
    searchInfo(selectedValue);
  }

  function onSearchChange(e) {
    setSearchTerm(e.target.value);

    // make a call to the backendR
    searchInfo(bankName);
    // if (searchTerm.length > 3) {
    // }
  }

  // load the banks on loading this component
  useEffect(() => {
    fetchAllBanks();
    searchInfo();
  }, []);

  return (
    <div className="header h-90 pb-4 pt-2">
      <div className="text-center pt-5">
        <h1 className="font-bold text-3xl">
          Find Bank and Branch Info in Kenya
        </h1>
        <p className="mt-2 text-gray-600 max-w-lg mx-auto text-md">
          Easily search for bank and branch information, including SWIFT codes,
          across the country.
        </p>
      </div>

      <div className="bg-white py-6 rounded-md mx-4 mt-6 flex items-center gap-x-6">
        {/* Search Input */}
        <div className="relative md:w-[60%] w-full mx-6">
          <div className="absolute right-0 inset-y-0 flex items-center pr-3">
            {searchTerm && (
              <button onClick={onClearSearch}>
                <XCircleIcon className="h-6 w-6 text-gray-600 hover:text-gray-500" />
              </button>
            )}
          </div>

          <div className="absolute left-0 inset-y-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
          </div>

          <input
            id="search-bank"
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search Bank, Branch Name, or SWIFT Code..."
            className="bg-[#F0F1F5] w-full py-2 px-10 rounded-md focus:outline-none focus:border-gray-900 focus:border hover:border-gray-900 hover:border"
          />
        </div>

        {/* Bank Select */}
        <div className="w-full max-w-[320px] flex-shrink-0">
          <Select
            isClearable
            options={banks.map((bank) => ({
              value: bank.name,
              label: bank.name,
              logo: bank.logo_url,
            }))}
            placeholder="Filter by Bank"
            isLoading={isLoading}
            onChange={(e) => onSelectBankChange(e?.value)}
            components={{ Option }}
            classNamePrefix="react-select"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                padding: "3px 3px",
                backgroundColor: "#F0F1F5",
                borderColor: state.isFocused ? "gray" : "#D1D5DB",
                boxShadow: state.isFocused ? "0 0 0 1px gray" : "none",
                "&:hover": {
                  borderColor: "gray",
                },
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;

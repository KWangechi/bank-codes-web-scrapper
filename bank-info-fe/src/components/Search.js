import { MagnifyingGlassIcon, XCircleIcon, CloudArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { useMemo, useState } from "react";
import Select from "react-select";
import { useBanks, useDownloadExcel, useDownloadJson } from "stores/queryStore";
import { Option } from "./BankSelectOption";

function Search({ searchTerm, onSearchChange, onBankChange, selectedBank }) {
  const { data: banksData, isLoading: isLoadingBanks } = useBanks();
  const { mutate: downloadExcel, isPending: isDownloadingExcel } = useDownloadExcel();
  const { mutate: downloadJson, isPending: isDownloadingJson } = useDownloadJson();

  const [sortOrder, setSortOrder] = useState("asc");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const banks = banksData || [];

  function onClearSearch() {
    onSearchChange("");
    onBankChange(null);
  }

  function onSelectBankChange(selectedValue) {
    onBankChange(selectedValue);
  }

  function onSearchChangeHandler(e) {
    onSearchChange(e.target.value);
  }

  function handleDownloadExcel() {
    downloadExcel({ searchTerm, bankName: selectedBank });
  }

  function handleDownloadJson() {
    downloadJson({ searchTerm, bankName: selectedBank });
  }

  const sortedOptions = useMemo(() => {
    return [...banks]
      .map((bank) => ({
        value: bank.name,
        label: bank.name,
        logo: bank.logo_url,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [banks]);


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
            onChange={onSearchChangeHandler}
            placeholder="Search Bank, Branch Name, or SWIFT Code..."
            className="bg-[#F0F1F5] w-full py-2 px-10 rounded-md focus:outline-none focus:border-gray-900 focus:border hover:border-gray-900 hover:border"
          />
        </div>

        {/* Bank Select */}
        <div className="w-full max-w-[320px] flex-shrink-0">
          <Select
            isClearable
            options={sortedOptions}
            placeholder="Filter by Bank"
            isLoading={isLoadingBanks}
            onChange={(e) => onSelectBankChange(e?.value)}
            value={selectedBank ? { value: selectedBank, label: selectedBank } : null}
            components={{ Option }}
            classNamePrefix="react-select"
            isSortable={true}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
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

        {/* Download Dropdown */}
        <div className="relative pr-2">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-[#D0BB95] text-white rounded-md hover:bg-[#b8a378] focus:outline-none focus:ring-2 focus:ring-[#D0BB95] focus:ring-opacity-50"
          >
            <CloudArrowDownIcon className="h-5 w-5" />
            Download
            <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
              <div className="py-1">
                <button
                  onClick={() => {
                    handleDownloadExcel();
                    setIsDropdownOpen(false);
                  }}
                  disabled={isDownloadingExcel}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CloudArrowDownIcon className="h-4 w-4 text-green-600" />
                  Download Excel
                </button>
                <button
                  onClick={() => {
                    handleDownloadJson();
                    setIsDropdownOpen(false);
                  }}
                  disabled={isDownloadingJson}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CloudArrowDownIcon className="h-4 w-4 text-blue-600" />
                  Download JSON
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;

import {
  MagnifyingGlassIcon,
  XCircleIcon,
  CloudArrowDownIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import React, { useMemo, useState } from "react";
import Select from "react-select";
import { useBanks, useDownloadExcel, useDownloadJson } from "stores/queryStore";
import { Option } from "./BankSelectOption";

function Search({ searchTerm, onSearchChange, onBankChange, selectedBank }) {
  const { data: banksData, isLoading: isLoadingBanks } = useBanks();
  const { mutate: downloadExcel, isPending: isDownloadingExcel } =
    useDownloadExcel();
  const { mutate: downloadJson, isPending: isDownloadingJson } =
    useDownloadJson();

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
    <section className="relative py-16 z-0 px-4 overflow-hidden bg-primary/5 dark:bg-primary/10">
      <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div class="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary filter blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary filter blur-3xl"></div>
      </div>

      <div class="relative max-w-4xl mx-auto text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          Find Bank and Branch Info in Kenya
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Quickly locate bank codes, swift codes, paybill numbers, and contact
          details for any bank branch nationwide.
        </p>
      </div>

      {/* Search Input, Bank Select and Download Button */}
      <div className="relative max-w-5xl mx-auto">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl flex flex-col md:flex-row gap-4">
          {/* Input Text */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
              className="w-full py-3.5 pl-10 pr-3 rounded-lg focus:outline-none focus:border-primary focus:ring-primary focus:border hover:border-primary hover:border border border-slate-200 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          {/* Bank Select */}
          <div className="relative w-full max-w-[320px] ">
            <Select
              isClearable
              options={sortedOptions}
              placeholder="Filter by Bank"
              isLoading={isLoadingBanks}
              onChange={(e) => onSelectBankChange(e?.value)}
              value={
                selectedBank
                  ? { value: selectedBank, label: selectedBank }
                  : null
              }
              components={{ Option }}
              classNamePrefix="react-select"
              isSortable={true}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  padding: "7px 3px",
                  borderColor: state.isFocused ? "none" : "primary",
                  boxShadow: state.isFocused ? "0 0 0 1px gray" : "none",
                  "&:hover": {
                    borderColor: "primary",
                  },
                  zIndex: 1
                }),
              }}
            />
          </div>

          {/* Download Dropdown */}
          <div className=" pr-2">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-primary text-white font-bold px-4 py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              <CloudArrowDownIcon className="h-5 w-5" />
              Download
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
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
    </section>
  );
}

export default Search;

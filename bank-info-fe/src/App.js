// import React, { useState } from "react";

// import Search from "components/Search";
// import BankLocationSuggestion from "components/BankLocationSuggestion";
// import { useDebounce } from "hooks/";
// import { NoResultCard } from "./components/NoResultCard";
// import SkeletonCard from "./components/SkeletonCard";
// import { ResultCard } from "./components/ResultCard";
// import Pagination from "./components/Pagination";
// import Header from "components/Header";
// import Footer from "components/Footer";
// import { useSearch } from "stores/queryStore";

// function App() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBank, setSelectedBank] = useState(null);
//   const [showSuggestionForm, setShowSuggestionForm] = useState(false);
//   const search = useDebounce(searchTerm, 800);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Use React Query for search
//   const { data, isLoading, isFetching } = useSearch(
//     search,
//     selectedBank,
//     currentPage,
//     20,
//   );

//   const result = data?.data || [];
//   const pagination = {
//     total: data?.total || 0,
//     page_size: data?.page_size || 20,
//     page: data?.page || 1,
//   };

//   const handleShowSuggestionForm = () => {
//     setShowSuggestionForm(true);
//   };

//   const handleBackToSearch = () => {
//     setShowSuggestionForm(false);
//   };

//   return (
//     <div className="flex flex-col h-screen flex-1">
//       <Header onShowSuggestion={handleShowSuggestionForm} />
//       <div className="bg-[#f7f7f5] flex flex-col flex-1">
//         {showSuggestionForm ? (
//           <BankLocationSuggestion onBack={handleBackToSearch} />
//         ) : (
//           <>
//             <Search
//               searchTerm={searchTerm}
//               onSearchChange={setSearchTerm}
//               onBankChange={setSelectedBank}
//               selectedBank={selectedBank}
//             />

//             {/* Result Count Heading */}
//             <div
//               className={`flex ${
//                 result.length > 0 ? "justify-between" : "justify-center"
//               } items-center mx-4 mt-4 min-h-[40px]`}
//             >
//               < className="font-semibold text-xl text-black">
//                 {result.length > 0 && <>Showing {result.length} Result(s)</>}
//               </

//             <div className="flex gap-x-4">
//               {/* <button className="bg-white hover:bg-gray-300 py-2 px-4 rounded-md">
//                 List View
//               </button>
//               <button className="bg-white hover:bg-gray-300 py-2 px-4 rounded-md">
//                 Map View
//               </button> */}
//             </div>

//         </div>

//         {/* Result Grid */}
//         <div className="grid md:grid-cols-2 gap-6 ms-4 me-4 sm:grid-cols-1 overflow-y-auto flex-1 mt-4 relative">
//           {/* Loading state - show skeleton only when initially loading */}
//           {isFetching && <SkeletonCard />}

//           {/* No search term and no results */}
//           {/* {!isLoading && result.length === 0 && !search && <SkeletonCard />} */}

//           {/* Results grid */}
//           {result.length > 0 &&
//             result.map((branch, index) => (
//               <ResultCard
//                 key={`${index}`}
//                 bank={branch.bank}
//                 branch={branch}
//                 searchTerm={search}
//               />
//             ))}
//         </div>

//         {/* Pagination */}
//         <Pagination
//           pagination={pagination}
//           onPageChange={(page) => setCurrentPage(page)}
//         />

//         <div className="mt-6">
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import { useState } from "react";

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
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <Header></Header>
      <Search
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onBankChange={setSelectedBank}
        selectedBank={selectedBank}
      />

      <div className="bg-[#f7f7f5] flex flex-col flex-1 mt-5 mx-10">
        {/* Result Count Heading */}
        <div
          className={`flex ${
            result.length > 0 ? "justify-between" : "justify-center"
          } items-center mx-4 mt-4 min-h-[40px]`}
        >
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
            Featured Branches
          </h2>

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
            <span className="text-sm text-slate-500 font-medium">
              {result.length > 0 && <>Showing {result.length} Branches</>}
            </span>
          </div>
        </div>

        {/* Result Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
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

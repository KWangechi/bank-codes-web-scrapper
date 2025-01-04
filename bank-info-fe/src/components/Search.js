import { Input } from "@nextui-org/react";
import React from "react";

function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="    my-4 py-4">
      <p className="font-bold text-5xl text-center text-slate-700 ">
        Kenya Bank Code Search
      </p>
      <div className=" text-center py-4 my-6 w-full ">
        <p className="my-4 w-[80%]  mx-auto">
          Search for all the Banks in Kenya, their codes, their branches info,
          and additional details such as Opening Hours. You can filter by Bank
          Name and Location.
        </p>

        <div className="w-full  my-4 mt-8">
          <Input
            placeholder="Search Bank/Branch Name... e.g KCB"
            type="search"
            startContent={<i className="fa-solid fa-magnifying-glass"></i>}
            size="lg"
            radius="sm"
            className="w-[60%] mx-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;

export function NoResultCard({ query }) {
  return (
    <div className="mx-auto text-center h-full bg-slate-300 rounded-lg my-4">
      <div className="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-10 lg:px-12">
        <i className="fa-solid fa-database text-4xl text-slate-500 mb-2"></i>
        <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-500 lg:mb-6 md:text-3xl ">
          No Results
        </h1>
        <p className="font-light text-gray-500 md:text-lg xl:text-sm dark:text-gray-400">
          No results were found with the search query :{" "}
          <b className="font-semibold underline underline-offset "> {query} </b>
        </p>
      </div>
    </div>
  );
}

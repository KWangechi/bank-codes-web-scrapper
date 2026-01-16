import { NoSymbolIcon } from "@heroicons/react/24/solid";

export function NoResultCard({ query}) {
  return (
    <section className="mx-auto text-center h-full">
      <div className="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12">
      <NoSymbolIcon className="mx-auto mb-4 w-12 h-12 text-gray-400" />
        <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-500 lg:mb-6 md:text-5xl xl:text-6xl">
          No Results
        </h1>
        <p className="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">
          No Results were found with the search query: <span className="font-bold italic">{query}</span>
        </p>
      </div>
    </section>
  );
}

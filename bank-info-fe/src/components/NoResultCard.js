export function NoResultCard() {
  return (
    <section class="mx-auto text-center">
      <div class="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12">
      <svg
          class="mx-auto mb-4 w-10 h-10 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 416c-92.635 0-168-75.365-168-168 0-32.11 9.017-62.075 24.682-87.433l231.75 231.751C318.075 414.983 288.11 424 256 424zm143.318-56.567L167.567 167.682C193.925 152.017 223.89 143 256 143c92.635 0 168 75.365 168 168 0 32.11-9.017 62.075-24.682 87.433z"
          />
        </svg>
        <h1 class="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-500 lg:mb-6 md:text-5xl xl:text-6xl">
          No Results
        </h1>
        <p class="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">
          No Results were found with the search query
        </p>
      </div>
    </section>
  );
}

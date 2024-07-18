export function NoResultCard() {
  return (
    <div className="flex items-center justify-center h-full bg-[#F8F9FA] text-center text-[#695958]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="black"
        viewBox="0 0 124 124"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-16"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
      <h1 className="font-semibold text-2xl">No Results Found</h1>
    </div>
  );
}

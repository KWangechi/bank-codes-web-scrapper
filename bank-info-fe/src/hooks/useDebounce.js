import { useState, useEffect } from "react";

/**
 * Custom hook that debounces a value by a specified delay.
 *
 * @param {string} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {string} - The debounced value.
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = window.setTimeout(function () {
      setDebouncedValue(value);
    }, delay);

    return function () {
      window.clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

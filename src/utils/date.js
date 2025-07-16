/**
 * Formats a Date object into a `YYYY-MM-DD` string, with leading zeros.
 *
 * @param {Date} date - The Date object to format.
 * @returns {string} The formatted date string, e.g. `"2025-07-16"`.
 *
 * @example
 * const someDate = new Date(2025, 6, 16); // July 16, 2025 (months are 0-based)
 * const formatted = formatDate(someDate);
 * console.log(formatted); // "2025-07-16"
 */
export const formatDate = date => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

/**
 * Returns the current date in `YYYY-MM-DD` format (with leading zeros).
 *
 * @returns {string} The current date string, e.g. `"2025-07-16"` for July 16, 2025.
 *
 * @example
 * const today = getCurrentDate();
 * console.log(today); // "2025-07-16"
 */
export const getCurrentDate = () => {
  return formatDate(new Date());
};

/**
 * Returns a date string `YYYY-MM-DD` for a date N years from today.
 *
 * @param {number} years - The number of years to add to the current date.
 * @returns {string} The resulting future date in `YYYY-MM-DD` format.
 *
 * @example
 * const fiveYearsLater = getYearDate(5);
 * console.log(fiveYearsLater); // e.g. "2030-07-16"
 */
export const getYearDate = years => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + years);
  return formatDate(date);
};

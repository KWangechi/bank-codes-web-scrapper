import {
  parseTimeStringToDate,
  isWeekend,
  formattedCurrentDateTime,
} from "../utils/dateUtils";
import { highlightText } from "utils/";
import {
  MapPinIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";

export function ResultCard({ bank, branch, searchTerm }) {
  const startingTimeEveryday = "8:00am";
  const endingTimeWeekdays = "4:00pm";
  const endingTimeWeekends = "12:00pm";
  const isSunday = new Date().getDay() === 0;

  const startingDateTime = parseTimeStringToDate(startingTimeEveryday);
  const endingDateTime = !isWeekend
    ? parseTimeStringToDate(endingTimeWeekdays)
    : parseTimeStringToDate(endingTimeWeekends);

  const isOpen = () => {
    if (isSunday) {
      return "Closed";
    }
    return formattedCurrentDateTime > startingDateTime &&
      formattedCurrentDateTime < endingDateTime
      ? "Open"
      : "Closed";
  };

  // This helps: When user clicks the div, the bank code is automatically copied to the clipboard
  const copyToClipboard = (bank) => {
    const branchDetails = {
      bank_name: bank.bank_name,
      bank_code: bank.bank_code,
      branch_name: branch.branch_name,
      branch_code: branch.branch_code,
      swift_code: bank.swift_code,
    };

    navigator.clipboard
      .writeText(JSON.stringify(branchDetails))
      .then(() => {
        console.log("Branch Details copied to clipboard");
        // alert(`Branch Details Copied to Clipboard`);
      })
      .catch((err) => {
        console.log(`Error, failed to copy to clipboard: ${err}`);
      });
  };

  return (
    <div className="grow shrink mt-6 mb-2 w-auto md:w-full mx-auto gap-x-4 rounded-2xl">
      <div className="grow rounded-2xl shadow-lg bg-white p-6 shadow-[#D0BB95]-500/40 ">
        <div className="flex flex-col sm:flex-row items-center mb-4 ">
          <img
            src={bank?.icon}
            alt="Bank Logo"
            className="h-10 w-15 rounded-lg bg-none"
          />
          <div className="ml-4 flex-grow">
            <h2 className="italic text-lg text-[#D0BB95] font-bold">
              {highlightText(branch?.branch_name, searchTerm)}
            </h2>
            <div className="flex items-center text-gray-600 gap-x-2">
              <span className="text-md font-bold">
                Branch Code: {highlightText(branch?.branch_code, searchTerm)}
              </span>
              <ClipboardDocumentIcon
                className="h-5 w-5 text-gray-500 cursor-pointer"
                onClick={() => copyToClipboard(bank)}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex">
              <MapPinIcon className="h-5 w-5 text-gray-500" />
              <span className="ml-1 text-gray-500">
                {highlightText(branch.branch_name, searchTerm)}
              </span>
            </div>
            <div className="flex mx-auto">
              <span
                className="font-bold text-md"
                style={{
                  color: isOpen() === "Open" ? "#16a34a" : "#dc2626",
                  fontWeight: "bold",
                }}
              >
                {isOpen()}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-start mb-4 flex-col sm:flex-row">
            <div>
              <p className="font-semibold text-[#D0BB95]">
                {highlightText(bank.bank_name, searchTerm)}
              </p>
              <span className="text-gray-600">Bank Code: {bank.bank_code}</span>
              <p className="text-gray-600 mt-2">
                Swift Code: {bank.swift_code}
              </p>
            </div>
            <div className="text-left sm:text-right mt-1.5 sm:mt-0">
              <p className="font-semibold text-[#D0BB95]">Working Hours</p>
              <span className="text-gray-600">
                {startingTimeEveryday} - {endingTimeWeekdays} - Weekdays
              </span>
              <p>
                <span className="text-gray-600">
                  {startingTimeEveryday} - {endingTimeWeekends} - Saturdays
                </span>
              </p>
              <p className="mt-1.5 sm:mt-0">
                <span className="text-red-600 text-base">
                  Closed - Sundays and Public Holidays
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 mt-4">
            <div>
              <p className="font-semibold text-[#D0BB95]">Contact Info</p>
              <div className="flex justify-between">
                <span className="flex justify-between items-center mt-1 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  <span className="ml-2">
                    {bank?.contactInfo?.phone1}{" "}
                    {bank?.contactInfo?.phone2 ? "|" : ""}{" "}
                    {bank?.contactInfo?.phone2}
                  </span>
                </span>
              </div>
              <div className="flex justify-between ">
                <span className="flex justify-between items-center mt-1 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                  <span className="ml-2">{bank?.contactInfo?.email}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

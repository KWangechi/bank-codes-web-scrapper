import {
  parseTimeStringToDate,
  isWeekend,
  formattedCurrentDateTime,
} from "../utils/dateUtils";
import { highlightText } from "utils/";
import {
  MapPinIcon,
  ClipboardDocumentIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { useApiStore } from "stores/apiStore";

export function ResultCard({ bank, branch }) {
  const startingTimeEveryday = "8:00am";
  const endingTimeWeekdays = "4:00pm";
  const endingTimeWeekends = "12:00pm";
  const isSunday = new Date().getDay() === 0;

  const { searchTerm } = useApiStore();

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
      branch_name: branch.name,
      branch_code: branch.code,
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
      <div className="grow rounded-2xl shadow-md bg-white p-6">
        <div className="flex flex-col sm:flex-row items-center mb-4 ">
          <img
            src={`/logos/${bank?.logo_url}`}
            alt={bank.logo_url}
            className="h-10 w-15 rounded-lg bg-none"
          />
          <div className="ml-4 flex-grow">
            <h2 className="italic text-lg text-[#D0BB95] font-bold">
              {highlightText(branch?.name, searchTerm)}
            </h2>
            <div className="flex items-center text-gray-600 gap-x-2">
              <span className="text-md font-bold">
                Branch Code: {highlightText(branch?.code, searchTerm)}
              </span>
              <ClipboardDocumentIcon
                className="h-4 w-4 text-gray-500 cursor-pointer"
                onClick={() => copyToClipboard(bank)}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex max-w-sm text-wrap text-sm items-center">
              <MapPinIcon className="h-3 w-3 text-gray-500" />
              <span className="ml-1 text-gray-500">
                {highlightText(branch?.name, searchTerm)}
              </span>
            </div>

            <div
              className="font-semibold text-sm text-right italic"
              style={{
                color: isOpen() === "Open" ? "#16a34a" : "#dc2626",
                fontWeight: "semibold",
              }}
            >
              <span className="text-right">{isOpen()}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-start mb-4 flex-col sm:flex-row">
            <div className="space-y-1">
              <p className="font-semibold text-[#D0BB95]">
                {highlightText(bank?.bank_name, searchTerm)}
              </p>
              <span className="text-gray-600">
                <span className="font-semibold">Bank Code:</span>
                &nbsp;
                {bank.bank_code}
              </span>
              <p className="text-gray-600">
                <span className="text-md font-semibold">Swift Code:</span>
                &nbsp;
                {bank.swift_code}
              </p>
              <p className="text-gray-600">
                <span className="text-md font-semibold">Paybill No:</span>
                &nbsp;
                {bank.mpesa_paybill_no || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="text-md font-semibold">Swift Code:</span>
                &nbsp;
                {bank.ussd_code || "N/A"}
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
                  <PhoneIcon className="h-4 w-4" />
                  <span className="ml-2">
                    {bank?.telephone1}{" "}
                    {bank?.contactInfo?.telephone2 ? "|" : ""}{" "}
                    {/* {bank?.contactInfo?.phone2} */}
                  </span>
                </span>
              </div>
              <div className="flex justify-between ">
                <span className="flex justify-between items-center mt-1 text-gray-600">
                  <EnvelopeIcon className="h-4 w-4" />
                  <span className="ml-2">{bank?.email}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

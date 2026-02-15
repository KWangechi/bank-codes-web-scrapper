import {
  parseTimeStringToDate,
  formattedCurrentDateTime,
} from "../utils/dateUtils";
import { highlightText } from "utils/";
import {
  // MapPinIcon,
  // ClipboardDocumentIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
// import toast from "react-hot-toast";

export function ResultCard({ bank, branch, searchTerm }) {
  const operatingHours = branch?.operating_hours;

  const defaultWeekdays = "8:30am - 4:00pm";
  const defaultSaturdays = "8:30am - 12:00pm";
  const defaultWeekends = "Closed";

  // Extract times from operating_hours or use defaults
  const weekdaysHours = operatingHours?.weekdays || defaultWeekdays;
  const saturdaysHours = operatingHours?.saturdays || defaultSaturdays;
  const sundaysHours = operatingHours?.sundays || defaultWeekends;
  // const holidaysHours = operatingHours?.holidays || defaultWeekends;

  const parseHours = (hoursString) => {
    if (!hoursString || hoursString.toLowerCase() === "closed") {
      return { start: null, end: null };
    }

    const timeMatch = hoursString.match(
      /(\d{1,2}:\d{2}(?:am|pm))\s*-\s*(\d{1,2}:\d{2}(?:am|pm))/i,
    );

    if (timeMatch) {
      return {
        start: parseTimeStringToDate(timeMatch[1]),
        end: parseTimeStringToDate(timeMatch[2]),
      };
    }
    return { start: null, end: null };
  };

  const isSunday = new Date().getDay() === 0;
  const isWeekend = isSunday || new Date().getDay() === 6;

  const { start: startingDateTime, end: endingDateTime } = isSunday
    ? { start: null, end: null }
    : isWeekend
      ? parseHours(saturdaysHours)
      : parseHours(weekdaysHours);

  const isOpen = () => {
    if (isSunday || !startingDateTime || !endingDateTime) {
      return "Closed";
    }
    return formattedCurrentDateTime > startingDateTime &&
      formattedCurrentDateTime < endingDateTime
      ? "Open"
      : "Closed";
  };

  const isClosingSoon = () => {
    if (isSunday || !startingDateTime || !endingDateTime) {
      return false;
    }

    // Check if currently open and within 30 minutes of closing
    const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
    const timeUntilClosing = endingDateTime - formattedCurrentDateTime;

    return (
      formattedCurrentDateTime > startingDateTime &&
      formattedCurrentDateTime < endingDateTime &&
      timeUntilClosing <= thirtyMinutes
    );
  };

  const statusConfig = {
    closing: {
      label: "Closes Soon",
      classes: "bg-orange-100 text-accent-orange",
    },
    open: {
      classes: "bg-primary text-accent-green",
    },
    closed: {
      classes: "bg-red-100 text-accent-red",
    },
  };

  let config;

  if (isClosingSoon()) {
    config = statusConfig.closing;
  } else if (isOpen() === "Open") {
    config = { ...statusConfig.open, label: "Open" };
  } else {
    config = { ...statusConfig.closed, label: isOpen() };
  }

  // const copyToClipboard = (bank) => {
  //   const branchDetails = {
  //     bank_name: bank.bank_name,
  //     bank_code: bank.bank_code,
  //     branch_name: branch.name,
  //     branch_code: branch.code,
  //     swift_code: bank.swift_code,
  //   };

  //   navigator.clipboard
  //     .writeText(JSON.stringify(branchDetails))
  //     .then(() => {
  //       toast.success("Branch Details Copied to ClipBoard", {
  //         position: "top-center",
  //         duration: 3000,
  //       });
  //     })
  //     .catch((err) => {
  //       toast.error(`Error, failed to copy to clipboard: ${err}`, {
  //         position: "top-center",
  //         duration: 3000,
  //       });
  //     });
  // };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div class="p-6">

        {/* Card Header - Icon, Branch Name, Branch Name, Opening Status */}
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-lg flex items-center justify-center">
              <img
                src={`/logos/${bank?.logo_url}`}
                alt={bank.name}
                className="h-10 w-auto rounded-lg bg-none"
              />
            </div>
            <div>
              <h3 class="font-bold text-lg text-slate-900 dark:text-white flex gap-x-2 items-center">
                {highlightText(branch?.name, searchTerm)}

                {/* <ClipboardDocumentIcon
                  className="h-4 w-4 text-gray-500 cursor-pointer"
                  onClick={() => copyToClipboard(bank)}
                /> */}
              </h3>
              <p class="text-xs text-slate-500 uppercase font-semibold">
                {highlightText(bank?.name, searchTerm)}
              </p>
            </div>
          </div>

          <div className="">
            {/* <div className="flex max-w-sm text-wrap text-sm items-center">
              <MapPinIcon className="h-4 w-4 text-gray-500" />
              <span className="ml-1 text-gray-500">
                {branch.location_name
                  ? highlightText(branch?.location_name, searchTerm)
                  : highlightText(branch?.name, searchTerm)}
              </span>
            </div> */}
            <span
              className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full tracking-wider ${config.classes}`}
            >
              {config.label}
            </span>
          </div>
        </div>

        {/* Bank and Branch Details */}
        <div class="grid grid-cols-2 gap-y-4 gap-x-2 border-t border-slate-100 dark:border-slate-700 pt-4 mb-6">
          <div>
            <p class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
              Bank Code
            </p>
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {bank?.bank_code}
            </p>
          </div>
          <div>
            <p class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
              Branch Code
            </p>
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {branch?.code}
            </p>
          </div>
          <div>
            <p class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
              Swift Code
            </p>
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {bank?.swift_code ?? "N/A"}
            </p>
          </div>
          <div>
            <p class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
              Paybill No
            </p>
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {bank?.mpesa_paybill_no ?? "N/A"}
            </p>
          </div>
          <div class="col-span-2">
            <p class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
              USSD
            </p>
            <p class="text-sm font-semibold text-primary">
              {bank?.ussd_code ?? "N/A"}
            </p>
          </div>
        </div>

        {/* Working Hours */}
        <div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 mb-4">
          <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase mb-3 flex items-center gap-2">
            <i class="fa-regular fa-clock"></i>
            Working Hours
          </h4>
          <div class="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <div class="flex justify-between">
              <span>Weekdays</span>
              <span class="font-medium text-slate-900 dark:text-slate-200">
                {weekdaysHours}
              </span>
            </div>
            <div class="flex justify-between">
              <span>Saturdays</span>
              <span class="font-medium text-slate-900 dark:text-slate-200">
                {saturdaysHours}
              </span>
            </div>
            <div class="flex justify-between">
              <span>Sundays</span>
              <span class="font-medium text-slate-400">{sundaysHours}</span>
            </div>
          </div>
        </div>
        <div class="border-t border-slate-100 dark:border-slate-700 pt-4">
          <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase mb-3 flex items-center gap-2">
            <UserCircleIcon className="h-5 w-5"/>
            Contact Information
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3">
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <PhoneIcon className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <p class="text-xs text-slate-500 uppercase font-semibold">
                    Phone
                  </p>
                  <p class="text-sm font-semibold text-slate-900 dark:text-white">
                    {bank?.telephone1 || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3">
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <EnvelopeIcon className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <p class="text-xs text-slate-500 uppercase font-semibold">
                    Email
                  </p>
                  <p class="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {bank?.email || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

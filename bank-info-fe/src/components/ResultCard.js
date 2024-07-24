import {
  parseTimeStringToDate,
  isWeekend,
  formattedCurrentDateTime,
} from "../utils/dateUtils";
export function ResultCard({ bank, branch }) {
  const startingTimeEveryday = "8:00am";
  const endingTimeWeekdays = "4:00pm";
  const endingTimeWeekends = "12:00pm";

  const startingDateTime = parseTimeStringToDate(startingTimeEveryday);
  const endingDateTime = !isWeekend
    ? parseTimeStringToDate(endingTimeWeekdays)
    : parseTimeStringToDate(endingTimeWeekends);

  return (
    <div className="grow shrink mt-4 mb-2 w-auto md:w-11/12 mx-auto">
      <div className="grow rounded-lg shadow-lg bg-gray-50 p-6 shadow-[#695958]-500/40 ">
        <div className="flex items-center mb-4">
          <img
            src={bank?.icon}
            alt="Bank Logo"
            className="h-16 w-17 rounded-lg bg-none"
          />
          <div className="ml-4 flex-grow">
            <h2 className="font-bold text-xl text-[#695958]">
              {branch?.branch_name}
            </h2>
            <div className="flex items-center text-gray-600">
              <span className="text-lg italic">
                Branch Code: {branch?.branch_code}
              </span>
              <span className="mx-2">•</span>
              <span
                className="font-bold"
                style={{
                  color:
                    formattedCurrentDateTime > startingDateTime &&
                    formattedCurrentDateTime < endingDateTime
                      ? "#16a34a"
                      : "#dc2626",
                  fontWeight: "bold",
                }}
              >
                {formattedCurrentDateTime > startingDateTime &&
                formattedCurrentDateTime < endingDateTime
                  ? "Open"
                  : "Closed"}
              </span>
            </div>
          </div>
          <div className="flex text-right">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.14 2 5 5.14 5 9c0 4.69 7 13 7 13s7-8.31 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
            <span className="ml-1 text-gray-500">{branch.branch_name}</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-semibold text-[#695958]">{bank.bank_name}</p>
              <span className="text-gray-600">Bank Code: {bank.bank_code}</span>
            </div>
            <div className="text-right">
              <p className="font-semibold text-[#695958]">Working Hours</p>
              <span className="text-gray-600">
                {startingTimeEveryday} - {endingTimeWeekdays} - Weekdays
              </span>
              <p>
                <span className="text-gray-600">
                  {startingTimeEveryday} - {endingTimeWeekends} - Saturdays
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4 mt-4">
            <div>
              <p className="font-semibold text-[#695958]">Contact Info</p>
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
                  <span className="ml-2">{bank?.contactInfo?.phone1} {bank?.contactInfo?.phone2 ? "|" : ""} {bank?.contactInfo?.phone2}</span>
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

            <div>
              <span className="text-red-600 text-base">
                Closed - Sundays and Public Holidays
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

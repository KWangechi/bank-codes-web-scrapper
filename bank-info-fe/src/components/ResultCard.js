import {
  Alert,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Snippet,
} from "@nextui-org/react";
import {
  parseTimeStringToDate,
  isWeekend,
  formattedCurrentDateTime,
} from "../utils/dateUtils";
import { highlightText } from "utils/";
import { useState } from "react";

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

  return (
    <>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3 justify-between items-center">
          <Image
            height={40}
            radius="sm"
            src={bank?.icon}
            alt="Bank Logo"
            width={50}
            className="object-cover"
          />
          <div className="flex flex-col">
            <p className="text-md font-semibold">
              {highlightText(branch?.branch_name, searchTerm)}
            </p>
            <span className="flex items-center gap-1">
              <p className="text-small text-default-500">
                {" "}
                Branch Code: {highlightText(branch?.branch_code, searchTerm)}
              </p>
              <i className="fa-solid fa-copy text-slate-500 cursor-pointer"></i>
            </span>
          </div>

          <div className="flex flex-col items-start  gap-1 justify-start">
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-location-dot text-slate-600"></i>
              <p className="text-xs">
                {highlightText(branch.branch_name, searchTerm)}
              </p>
            </span>

            <Chip
              color={isOpen() === "Open" ? "success" : "danger"}
              size="small"
            >
              {isOpen()}
            </Chip>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="w-full flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-col items-start gap-1">
              <p className="font-semibold text-md">
                {highlightText(bank.bank_name, searchTerm)}
              </p>
              {/* <p className="text-small text-default-500 font-bold underline underline-offset-2">
                Bank Code:  {bank.bank_code}
              </p> */}
              <Snippet size="sm" className="w-full" symbol="">
                <p className="font-semibold">Bank Code: {bank.bank_code}</p>{" "}
              </Snippet>
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="font-semibold">Working Hours</p>
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-clock text-sm"></i>
                <p className="text-sm text-default-500">
                  {startingTimeEveryday} - {endingTimeWeekdays} - Weekdays
                </p>
              </span>
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-clock text-sm"></i>
                <p className="text-sm text-default-500">
                  {startingTimeEveryday} - {endingTimeWeekends} - Saturdays
                </p>
              </span>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex flex-wrap items-center justify-between gap-2 w-full">
            <div className="flex flex-col items-start gap-1 w-full  ">
              <p className="font-semibold">Contact Info</p>
              {(bank?.contactInfo && bank?.contactInfo?.phone1) ||
              bank?.contactInfo?.phone2 ||
              bank?.contactInfo?.phone3 ? (
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-phone"></i>
                  <p className="text-small text-default-500">
                    {bank?.contactInfo?.phone1}{" "}
                    {bank?.contactInfo?.phone2 ? "|" : ""}{" "}
                    {bank?.contactInfo?.phone2}
                  </p>
                </div>
              ) : (
                <span className="flex items-center gap-2 text-xs text-slate-500">
                  <i className="fa-solid fa-phone-slash"></i>
                  <p> No contact info available</p>
                </span>
              )}
              {bank?.contactInfo && bank?.contactInfo?.email ? (
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-envelope"></i>
                  <p className="text-small text-default-500">
                    {bank?.contactInfo?.email}
                  </p>
                </div>
              ) : (
                <span className="flex items-center gap-2 text-xs text-slate-500">
                  <i className="fa-solid fa-envelope"></i>
                  <p> No email available</p>
                </span>
              )}
            </div>
            <div className="flex flex-col items-start gap-1 w-full  ">
              <p className="text-rose-700 text-sm">
                Closed - Sundays and Public Holidays
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

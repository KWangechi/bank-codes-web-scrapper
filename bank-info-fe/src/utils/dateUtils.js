export function parseTimeStringToDate(timeString) {
  const [time, modifier] = timeString.split(/(am|pm)/i);
  const [hours, minutes] = time.split(":").map(Number);

  let hours24 = hours;
  if (modifier.toLowerCase() === "pm" && hours !== 12) {
    hours24 += 12;
  } else if (modifier.toLowerCase() === "am" && hours === 12) {
    hours24 = 0;
  } else {
    hours24 = hours;
  }

  const currentDate = new Date();
  currentDate.setHours(hours24, minutes, 0, 0);
  return currentDate;
}

export function getFormattedCurrentTime() {
  const currentDate = new Date();
  const currentDateTime = currentDate
    .toLocaleTimeString([], {
      hour12: true,
      minute: "2-digit",
      hour: "numeric",
    })
    .toLowerCase()
    .replace(" ", "");

  // formattedCurrentDateTime = ;
  return parseTimeStringToDate(currentDateTime);
}

const currentDate = new Date();
export const formattedCurrentDateTime = getFormattedCurrentTime(currentDate);
export const isWeekend = currentDate.getDay() === 6 || currentDate.getDay() === 0;


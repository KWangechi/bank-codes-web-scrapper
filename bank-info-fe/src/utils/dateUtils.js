let isWeekend;
function parseTimeStringToDate(timeString) {
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

    isWeekend = currentDate.getDay() === 6 || currentDate.getDay() === 0;
    currentDate.setHours(hours24, minutes, 0, 0);
    return currentDate;
  }

  export {isWeekend, parseTimeStringToDate}
const timeDifferenceFun = (...timeStr) => {
  const oldTime = new Date(...timeStr);
  const timeNow = new Date();

  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const divisionForSec = 1000;
  const divisionForMin = 60 * divisionForSec;
  const divisionForHour = 60 * divisionForMin;
  const divisionForDay = 24 * divisionForHour;
  const divisionForMonth = monthDays[oldTime.getMonth()] * divisionForDay;
  const divisionForYear = 365 * divisionForDay;

  const differenceTime = timeNow.getTime() - oldTime.getTime();

  const timeDifferenceSec = differenceTime / divisionForSec;
  const timeDifferenceMin = differenceTime / divisionForMin;
  const timeDifferenceHour = differenceTime / divisionForHour;
  const timeDifferenceDay = differenceTime / divisionForDay;
  const timeDifferenceMonth = differenceTime / divisionForMonth;
  const timeDifferenceYear = differenceTime / divisionForYear;

  if (timeDifferenceSec !== 0 && timeDifferenceSec < 60) {
    return Math.floor(timeDifferenceSec) === 1
      ? `${Math.floor(timeDifferenceSec)} second ago`
      : `${Math.floor(timeDifferenceSec)} seconds ago`;
  }

  if (
    Math.floor(timeDifferenceMin) !== 0 &&
    Math.floor(timeDifferenceMin) < 60
  ) {
    return Math.floor(timeDifferenceMin) === 1
      ? `${Math.floor(timeDifferenceMin)} minute ago`
      : `${Math.floor(timeDifferenceMin)} minutes ago`;
  }

  if (
    Math.floor(timeDifferenceHour) !== 0 &&
    Math.floor(timeDifferenceHour) < 24
  ) {
    return Math.floor(timeDifferenceHour) === 1
      ? `${Math.floor(timeDifferenceHour)} hour ago`
      : `${Math.floor(timeDifferenceHour)} hours ago`;
  }

  if (
    Math.floor(timeDifferenceDay) !== 0 &&
    Math.floor(timeDifferenceDay) < monthDays[oldTime.getMonth()]
  ) {
    return Math.floor(timeDifferenceDay) === 1
      ? `${Math.floor(timeDifferenceDay)} day ago`
      : `${Math.floor(timeDifferenceDay)} days ago`;
  }

  if (
    Math.floor(timeDifferenceMonth) !== 0 &&
    Math.floor(timeDifferenceMonth) < 12
  ) {
    return Math.floor(timeDifferenceMonth) === 1
      ? `${Math.floor(timeDifferenceMonth)} month ago`
      : `${Math.floor(timeDifferenceMonth)} months ago`;
  }

  if (Math.floor(timeDifferenceYear) !== 0) {
    return Math.floor(timeDifferenceYear) === 1
      ? `${Math.floor(timeDifferenceYear)} year ago`
      : `${Math.floor(timeDifferenceYear)} years ago`;
  }
};

export { timeDifferenceFun };

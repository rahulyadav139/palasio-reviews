const timeDifferenceFun = timeStr => {
  const oldTime = new Date(timeStr);
  const timeNow = new Date();

  const timeDifferenceData = {
    year: timeNow.getFullYear() - oldTime.getFullYear(),
    month: timeNow.getMonth() - oldTime.getMonth(),
    day: timeNow.getDate() - oldTime.getDate(),
    hour: timeNow.getHours() - oldTime.getHours(),
    min: timeNow.getMinutes() - oldTime.getMinutes(),
    sec: timeNow.getSeconds() - oldTime.getSeconds(),
  };

  if (timeDifferenceData.year !== 0) {
    return timeDifferenceData.year === 1
      ? `${timeDifferenceData.year} year ago`
      : `${timeDifferenceData.year} years ago`;
  }

  if (timeDifferenceData.month !== 0) {
    return timeDifferenceData.month === 1
      ? `${timeDifferenceData.month} month ago`
      : `${timeDifferenceData.month} months ago`;
  }

  if (timeDifferenceData.day !== 0) {
    return timeDifferenceData.day === 1
      ? `${timeDifferenceData.day} day ago`
      : `${timeDifferenceData.day} days ago`;
  }

  if (timeDifferenceData.hour !== 0) {
    return timeDifferenceData.hour === 1
      ? `${timeDifferenceData.hour} hour ago`
      : `${timeDifferenceData.hour} hours ago`;
  }

  if (timeDifferenceData.min !== 0) {
    return timeDifferenceData.min === 1
      ? `${timeDifferenceData.min} minute ago`
      : `${timeDifferenceData.min} minutes ago`;
  }
  if (timeDifferenceData.sec !== 0) {
    return timeDifferenceData.sec === 1
      ? `${timeDifferenceData.sec} second ago`
      : `${timeDifferenceData.sec} seconds ago`;
  }
};

export { timeDifferenceFun };

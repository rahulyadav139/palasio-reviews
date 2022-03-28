const textFormatter = str => {
  const formattedStr = str
    .trim()
    .split(' ')
    .map(el => el.split('')[0].toUpperCase() + el.slice(1).toLowerCase())
    .join(' ');

  return formattedStr;
};

const dateFormatter = date => {
  const formattedDate = new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return formattedDate;
};

const numberFormatter = number => {
  return Math.abs(Number(number)) >= 1.0e9
    ? (Math.abs(Number(number)) / 1.0e9).toFixed(2) + 'B'
    : Math.abs(Number(number)) >= 1.0e6
    ? (Math.abs(Number(number)) / 1.0e6).toFixed(2) + 'M'
    : Math.abs(Number(number)) >= 1.0e3
    ? (Math.abs(Number(number)) / 1.0e3).toFixed(2) + 'K'
    : Math.abs(Number(number));
};
export { textFormatter, dateFormatter, numberFormatter };

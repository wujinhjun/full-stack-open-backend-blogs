const reverse = (str) => {
  return str.split("").reverse().join("");
};

const average = (array) => {
  return array.length === 0
    ? 0
    : array.reduce((acc, item) => acc + item, 0) / array.length;
};

module.exports = {
  reverse,
  average,
};

const getNumber = (begin, end) => {
  return (begin >= 0 && end >= begin) ? Math.floor(Math.random() * (begin - end + 1)) + end : 'Ошибка';
}
console.log(getNumber(1, 6));
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getStringLength = (verifiedString, maxLine) => {
  return (verifiedString.length <= maxLine) ? true : false;
}
console.log(getStringLength("Кекс", 6));
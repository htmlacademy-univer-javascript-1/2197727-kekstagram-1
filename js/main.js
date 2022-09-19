const getNumber = (begin, end) => (begin >= 0 && end >= begin) ? Math.floor(Math.random() * (begin - end + 1)) + end : 'Ошибка';
getNumber(1, 6);
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const checkMaXLengthString = (string, maxCountSymbol) => string.length < maxCountSymbol;
checkMaXLengthString('Кекс', 7);

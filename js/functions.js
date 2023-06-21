function checkLength (string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  } else {
    return false;
  }
}

console.log(checkLength ('На улице идет сильный дождь', 27));


function checkPallindrom (string) {
  let normalString = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let i = normalString.length - 1; i >= 0; i--) {
    reverseString = reverseString + normalString[i];
  }
  return normalString === reverseString;
}
// Строка является палиндромом
console.log(checkPallindrom('Лёша на полке клопа нашёл ')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(checkPallindrom('ДовОд')); // true
// Это не палиндром
console.log(checkPallindrom('Кекс'));// false

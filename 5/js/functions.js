function checkLength (string, maxLength) {
  return (string.length <= maxLength);
}

checkLength ('На улице идет сильный дождь', 27);


function checkPallindrom (string) {
  let normalString = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let i = normalString.length - 1; i >= 0; i--) {
    reverseString = reverseString + normalString[i];
  }
  return normalString === reverseString;
}
// Строка является палиндромом
checkPallindrom('Лёша на полке клопа нашёл '); // true
// Несмотря на разный регистр, тоже палиндром
checkPallindrom('ДовОд'); // true
// Это не палиндром
checkPallindrom('Кекс');// false

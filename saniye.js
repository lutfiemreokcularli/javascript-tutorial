let second = 1400;
let minute = (second / 60).toPrecision(2);
var secondAfterDivide = second % 60;

console.log(`${second} saniye değeri = ${minute} dakika ve ${secondAfterDivide} saniyedir.`)
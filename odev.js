let saniye = prompt(`Bir sayı giriniz`);

let dakika = parseInt(saniye)/60


let artikSaniye = parseInt(saniye) % 60;
console.log(`dakika değeri : ${dakika} ve de saniye değer: ${artikSaniye}`);
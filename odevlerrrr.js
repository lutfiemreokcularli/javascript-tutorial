
//soru bir
/* let firstNumber = parseInt(prompt("Lütfen ilk sayıyı giriniz"));
let secondnumber = parseInt(prompt("Lütfen ikinci sayıyı giriniz"));
let thirdNumber = parseInt(prompt("lütfen ücüncü sayıyı giriniz"));

console.log(`${firstNumber} , ${secondnumber} ve ${thirdNumber} sayılarının toplamı: ${firstNumber + secondnumber + thirdNumber}`); */

//soru 2
/* let side1 = parseInt(prompt("üçgenin birinci kenarı"));
let side2 = parseInt(prompt("üçgenin ikinci kenarı"));
let side3 = parseInt(prompt("üçgenin üçüncü kenarını giriniz"));

if(side1 === side2 && side1 === side3 ){
    console.log("Seçilen kenarlarla üçgen eşkenar üçgendir");
}else if(side1 === side2 || side2 === side3 || side1 === side3){
    console.log("seçilen kenarlar ile oluşan üçgen ikizkenardır");
}else if(side1 != side2 && side1 != side3 && side2 != side3){
    console.log("seçilen kenarlarla oluşan üçgen çeşitkenardır");
} */

//soru 3
/* let ilkVize = parseInt(prompt("ilk vize notunu giriniz"));
let ikinciVize = parseInt(prompt("ikinci vize notunu giriniz:"));
let finalnot = parseInt(prompt("finali giriniz"));

let not = ((ilkVize + ikinciVize) * 20 / 100) + finalnot * 60 / 100;
if (not >= 50) {
    console.log(`tabrikler ${not} ile geçtiniz`)
} else
    console.log("kadınız"); */
//soru4
/* for (let index = 0; index < 5; index++) {
    console.log("for emre okcularlı");
}

let i = 0;
do {
    console.log("do while emre okcularlı")
    i++;
} while (i < 5);

let k = 0
while(k<5){
    console.log("while emre okcularlı");
    k++;
} */

//soru 5

/* let sayilarToplam = 0;
let counter = 0;
while(counter < 101){
    counter++;
    sayilarToplam = sayilarToplam + counter;
}
console.log(`1 den 100 e kadar olans ayıların toplamı ${sayilarToplam}`); */

//soru 6

/* let sira = "";
for(let  i =1;i<=10; i++){
    sira += `${i}` + ","; 
}
console.log(sira); */

//soru7

/* let sayi = parseInt(prompt("faktöriyeli alınacak sayıyı giriniz"));
let sonuc = 1;
for (sayi; sayi > 1; sayi--) {
    sonuc *= sayi;
}
console.log(sonuc); */

//soru 8
/* let x = parseInt(prompt("ilk sayıyı giriniz"));
let y = parseInt(prompt("ikinci sayıyı girniz"));
let fxy = 0;
if(x>0 && y<0){
    fxy = (4*x) +(2*y) + 4;
}else if(x > 0 && y == 0){
    fxy = (2*x) -y +3;
}else if(x<0 && y>0){
    fxy = (3*x) + (4*y) + 3;
}

console.log(fxy); */

//soru9
//AA,BA,BB,CC,CD,DD,FD,FF

/* let not = parseInt(prompt("not giriniz"));
if (not >= 90) {
    console.log("AA");
} else if (not >= 80 && not < 90) {
    console.log("Ba");
} else if (not >= 70 && not < 80) {
    console.log("bb");
} else if (not >= 60 && not < 70) {
    console.log('cb');
} else if (not >= 50 && not < 60) {
    console.log("cc");
} else if (not >= 40 && not < 50) {
    console.log("cd");
}
else if (not >= 30 && not < 40) {
    console.log('dc');
} else if (not >= 20 && not < 30) {
    console.log("dd");
} else if (not >= 10 && not < 20) {
    console.log("fd");
} */

//soru 10
/* let carpimTablosu = "";
for(let i = 1; i<10;i++){
    for(let j = 1; j<10; j++){
        carpimTablosu += `${i} x ${j} : ${i*j}\n`;
        
    }
}
console.log(carpimTablosu); */

//soru 11

/* let sayi = Math.floor(Math.random() * 100);
console.log(sayi)
let kullaniciSayi = parseInt(prompt("sayı giriniz"));
while(kullaniciSayi != sayi){
    if(kullaniciSayi<sayi){
        kullaniciSayi =parseInt(prompt("arttırarak yeni sayı giriniz"));
    }else if(kullaniciSayi>sayi){
        kullaniciSayi =parseInt(prompt("azaltarak yeni sayı giriniz"));
    }
} */

//soru12

/* let sayilarCarpim = 1;
let kullaniciSayi = parseInt(prompt("sayı giriniz"));
while(kullaniciSayi != 0){
    sayilarCarpim *= kullaniciSayi;
    kullaniciSayi = parseInt(prompt("sayı giriniz"));
}
console.log(sayilarCarpim); */

//soru13

/* let sayi1 = parseInt(prompt("ilk sayı"));
let sayi2 = parseInt(prompt("ikinci sayı"));
let kucukSayi = 0;

let ebob = 1;
if (sayi1 > sayi2) {
    kucukSayi = sayi2;
} else if (sayi1 < sayi2)
    kucukSayi = sayi1;
else if (sayi1 == sayi2)
    console.log("ebob sayıların kendisidir")
for (let i = 2; i <= kucukSayi; i++) {
    if (sayi1 % i == 0 && sayi2 % i == 0) {
        ebob *= i;
    }
}
console.log(ebob); */

//soru14
let sayi = parseInt(prompt("sayı giriniz"),9);
let tumAsalSayilar = "";
for(let i = 2; i<=sayi; i++){
    for(let j=2; j<=i;j++){
        if(j!=i && i%j == 0){
            break;
        }
        if(i==j){
            tumAsalSayilar += i.toString() + " ,";
        }
    }
}
console.log(tumAsalSayilar);
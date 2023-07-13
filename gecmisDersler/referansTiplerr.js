let renkler = ["yeşil","mavi"];
let yeniRenkler = renkler;

renkler = ["yeşil","mavi"];
yeniRenkler.push("kırmızı");


let ogrenci1 = {
    ad:'emre',
    yas: 32
}

let ogrenci2 = ogrenci1;

ogrenci1 = {
    ad:'emre',
    yas: 32
}

ogrenci1.soyad = 'okcularlı';

console.log(ogrenci1,ogrenci2)

console.log(yeniRenkler,renkler);
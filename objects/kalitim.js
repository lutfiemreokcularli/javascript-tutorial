function Person(ad,soyad){
    this.ad = ad;
    this.soyad = soyad;
}
Person.prototype.bilgileriVer = function(){
    return `Merhaba benim adım ${this.ad} ve soyadım ${this.soyad}`;
}

function Ogrenci(ad,soyad,sinif){
    Person.call(this,ad,soyad);
    this.sinif = sinif;
}
Ogrenci.prototype = Object.create(Person.prototype);
Ogrenci.prototype.constructor = Ogrenci;

/* Ogrenci.prototype.bilgileriVer = function(){
    return `Merhaba benim adım ${this.ad} ve soyadım ${this.soyad} ve sınıfım ${this.sinif}`
} */

const emre = new Ogrenci('emre','okcu',4);
console.log(emre.bilgileriVer());

let dizi = [1,2,3];
const yenDizi = dizi.map(deger => deger* 2);
console.log(yenDizi)

Array.prototype.kendiMapim = function(callbackFn){
    let geciciDizi = [];
    for(let i = 0; i< this.length; i++){
        geciciDizi[i] = callbackFn(this[i]);
    }
    return geciciDizi;
}

let yeniBirDizi = dizi.kendiMapim(deger => deger *4)
console.log(yeniBirDizi)
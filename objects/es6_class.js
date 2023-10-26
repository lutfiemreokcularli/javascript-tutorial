class Person{
    static sayac = 0;
    constructor(ad,soyad){
        this.ad = ad;
        this.soyad = soyad;
        Person.sayac++;
    }
    get adiVer(){
        return this.ad;
    }
    set adiSetle(yeniAd){
        this.ad = yeniAd;
    }
    selamla(){
        return `merhaba benim ad ${this.ad}`
    }
    static test(){
        return `hahaha`
    }
}

class Ogrenci extends Person{
    constructor(ad,soyad,sinif){
        super(ad,soyad);
        this.sinif = sinif;
    }
    selamla(){
        return `canım ya sınıfım ${this.sinif}`
    }
}

const emre = new Ogrenci('emre','ok',5);
const emre2 = new Ogrenci('emre','ok',5);
emre2.adiSetle = 'emreok';

console.log(emre.selamla())
console.log(emre2);
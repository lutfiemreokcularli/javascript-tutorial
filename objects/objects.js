//factory fonksiyonlar
const factoryFunc = (ad,yas,evliMi,okul,username) =>{
    return {
        isim:ad,
        yas:yas,
        evliMi:evliMi,
        okul:okul,
        bilgileriSoyle: function (){
            return `adı :  ${this.isim}\n
            yaşı: ${this.yas}\n evlilik durumu: ${this.evliMi} kullanıcı adı : ${this["user-name"]}`;
        },
        ['user-name']:username
    };
}
const emre = factoryFunc('emre','33','hayır','deu','emreok');
console.log(emre.bilgileriSoyle());

//constructor functions

function Ogrenci(ad,yas,evliMi,okul){
    this.ad = ad;
    this.yas = yas;
    this.evliMi = evliMi;
    this.okul = okul;
    this.bilgileriSoyle = function (){
        return `adı: ${this.ad}`;
    }
}
const emre2 = new Ogrenci('emre',32,true,'deu');
console.log(emre2.bilgileriSoyle())




//constructor functions with prototype
//prototype: değerlerinin aynı olduğunu bildiğimiz durumlarda kullanıyoruz.
User.prototype.il = 'izmir';
function User(ad,soyad){
    this.ad = ad;
    this.soyad = soyad;
}
const user1 = new User('emre','ok');
console.log(user1.il)


//constructor functions with protptype 2

function Ogrenci2(ad,soyad,okul,kullaniciAdi){
    this.ad = ad;
    this.soyad = soyad;
    this.okul = okul;
    this.username = kullaniciAdi;
}
Ogrenci2.prototype.bilgiVer = function (){
    console.log(`merhaba benim adım ${this.ad} , soyadım ${this.soyad}, ve okulum ${this.okul}`);
}

const ogrNeew = new Ogrenci2('emre','okcu','deu','emreok');
ogrNeew.bilgiVer();

const ogrNeew2 = new Ogrenci2('demre','okcu','deu','emreok');
ogrNeew2.bilgiVer();

console.log(ogrNeew2.constructor.prototype)

// factory fonksiyonlarda prototype kavramı yok.

/* function OgrenciFactory2(name,surname,school,age){
    return {
        name:name,
        surname,surname,
        school:school,
        ["age-age"]: age,
    };
}
OgrenciFactory2.prototype.bilgileriSoyle = function (){
    return `merhaba ben ${this.name} ve yasım ${this["age-age"]}`;
 };
const oFak = OgrenciFactory2('emre','okcu','deu',33);
oFak.
console.log(oFak.bilgileriSoyle()) */

let dizi = [1,2,3]
console.log(dizi.constructor.prototype)

const isim = 'emre';
console.log(isim instanceof Object);

console.log(isim.constructor.prototype)

const isis = 'emre'
console.log(typeof isis);

const sayi = new Number(1990);
console.log(typeof sayi);
sayi.text = 'bu kimin sayisi';
console.log(sayi.text);
console.log(sayi.constructor.prototype)

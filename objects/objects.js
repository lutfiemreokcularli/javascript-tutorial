//factory fonksiyonlar
const factoryFunc = (ad,yas,evliMi,okul) =>{
    return {
        isim:ad,
        yas:yas,
        evliMi:evliMi,
        okul:okul,
        bilgileriSoyle: function (){
            return `adı :  ${this.isim}\n
            yaşı: ${this.yas}\n evlilik durumu: ${this.evliMi}`;
        } 
    };
}
const emre = factoryFunc('emre','33','hayır','deu');
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
User.prototype.il = 'izmir';
function User(ad,soyad){
    this.ad = ad;
    this.soyad = soyad;
}
const user1 = new User('emre','ok');
console.log(user1.il)
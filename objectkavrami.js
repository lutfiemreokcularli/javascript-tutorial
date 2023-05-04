
//bu obje
let emre = {
    adi: 'Emre',
    soyadi : 'Okcularlı',
    dogumYil : 1990,
    evliMi : false,
    sevdigiRenkler: ['Yesil','Mavi'],
    yasiHesapla : _ => 2023 - emre.dogumYil,
    yasiHesaplaThis : function () {
        return 2023 - this.dogumYil
    },
    yasihesapEt : function () {
        this.yas = 2023 - this.dogumYil;
    } 
};
let emre2 = {
    ad: 'Emre',
    soyadi : 'Okcularlı',
    dogumYil : 1990,
    evliMi : false,
    sevdigiRenkler: ['Yesil','Mavi'],
    yasiHesapla : _ => 2023 - emre.dogumYil,
    yasiHesaplaThis : function () {
        return 2023 - this.dogumYil
    },
    yasihesapEt : function () {
        this.yas = 2023 - this.dogumYil;
    } 
};

console.log(emre);
/* console.log(emre.dogumYil);
console.log(emre['dogumYil']); */
console.log(emre.yasiHesapla());
console.log(emre.yasiHesaplaThis());
emre.yasihesapEt();
console.log(emre.yas);

//obje dizisi

let objeDizisi = [emre,emre2];
console.log(objeDizisi[1])
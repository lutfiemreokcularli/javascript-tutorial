let emre = {
    ad: 'Emre',
    soyadi:'ok',
    dogumYil: 1990,
    evlimi: false,
    sevdigiRenkler : ['yeşil','mavi'],
    yasiHesapla: _ => 2023 - emre.dogumYil,
    yeniKey: _ => emre.yas = 2023 - emre.dogumYil,
    kubra : {
        ad: 'Kubra',
        soyad: 'sumer',
        dogumYili: '1993',
    }
};

console.log(emre);
console.log(emre.dogumYil);
console.log(emre['dogumYil']);
emre.yasiHesapla();
console.log("********************")
console.log(emre.yeniKey());
console.log("********************")
console.log(emre.yas);
console.log("------------");
emre.kubra["denemeKey"] = "denemeDeger";
console.log(emre.kubra.denemeKey);
emre.kubra.yasHesabi = function () {return 2023 - emre.kubra.dogumYili;} 
console.log(emre.kubra.yasHesabi())


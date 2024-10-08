let sayilar = [1, 2, 3];

const yeniSayialr = sayilar.map(function (sayi) {
    return sayi * sayi
});


/* function kendiMapYapim(dizi, islem) {
    let geciciDizi = [];
    for (let i = 0; i < dizi.length; i++) {
        geciciDizi.push(islem(dizi[i]));
    }
    return geciciDizi;
} 

const sonucDizi = kendiMapYapim(sayilar,function(sayi){
    return sayi * sayi;
});
console.log(sonucDizi);*/

Array.prototype.kendiMapYapim = function(islem){
    let geciciDizi = [];
    for (let i = 0; i < this.length; i++) {
        geciciDizi.push(islem(this[i]));
    }
    return geciciDizi;
}

let deneme = [4,5,6];
console.log(deneme.constructor.prototype);
let sonuc = deneme.kendiMapYapim(function(sayi){
    return sayi * sayi;
});
console.log(sonuc)
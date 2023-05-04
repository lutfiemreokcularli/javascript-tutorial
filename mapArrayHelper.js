//kendi map yapım

const numaralar = [1, 2, 3, 4, 5];

function ikiIleCarpilmisNumaralar(sayilar, islem) {
    let geciciDizi = [];
    for (let i = 0; i < sayilar.length; i++) {
        geciciDizi[i] = islem(sayilar[i]);
    }
    return geciciDizi;
}

const sonuc = ikiIleCarpilmisNumaralar(numaralar, function (sayi) {
    return sayi * 2;
});
console.log('sonuc', sonuc);








/* const sayilar = [1, 2, 3, 4, 5, 6];
const textler = ["a", "b", "c", "d"];


let sayilar2 = sayilar.map(function (sayi) {
    return sayi * 2;
});

let textler1 = textler.map((text, index) => {
    return text + index;
});

const kitaplar = [
    { adi: '1', sayfasayisi: 30 },
    { adi: '2', sayfasayisi: 40 },
    { adi: '3', sayfasayisi: 50 },
];


const kitaplar2 = kitaplar.map((kitap, index) => {
    return kitap.adi += index;
});

console.log(textler1);

console.log(sayilar);
console.log(sayilar2);

console.log(kitaplar[0])
console.log(kitaplar2) */
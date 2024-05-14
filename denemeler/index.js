/* let sayilar = [1, 2, 3, 4, 5];

const diziyiYazdir = (sayilar, callback) => {
    for (let index = 0; index < sayilar.length; index++) {
        callback(sayilar[index], index);
    }
}
diziyiYazdir(sayilar, function (deger, i) {
    console.log(deger, i);
})

const yeniSayilar = sayilar.map(function (params, params1) {
    return params * 2;
})

console.log(yeniSayilar);

const yeniMapSayilar = [];
const kendiMapYapim = (sayilar, callback) => {
    for (let index = 0; index < sayilar.length; index++) {
        yeniMapSayilar.push(callback(sayilar[index]))

    }
}
kendiMapYapim(sayilar, (gelenDeger) => {
    return gelenDeger % 2 == 0 ? gelenDeger * 2 : gelenDeger * 3;
});
console.log(yeniMapSayilar)

const toplam = sayilar.reduce(function(pre, curr, index){
    if( curr > 3)pre.push(curr) 
    return pre;
},[])
console.log(toplam) */
/* const sehirler = [
    {ad:"izmir",plaka:35,komsu:["manisa","balıkesir"]},
    {ad:"Erzurum",plaka:58,komsu:["Rize","ağrı"]}
]
const siraliSehirler = sehirler.sort((a,b)=>{
    return (a.ad > b.ad) ? 1 : (a.ad < b.ad ? -1 : 0)
});
console.log(siraliSehirler) */

/* let ogrenciler = [
    { id: 22, ad: "emre", soyad: "ok" },
    { id: 23, ad: "fmre", soyad: "ok" },
    { id: 24, ad: "gmre", soyad: "ok" },
    { id: 25, ad: "hmre", soyad: "ok" },
    { id: 26, ad: "imre", soyad: "ok" },
]
const sonuc = ogrenciler.filter((ogrenci) => ogrenci.id % 2 == 0).map((ogrenci) => new Object(id = ogrenci.id))
console.log(sonuc); 

let dizim = [1, 2, 3];
const ikiIleCarp = (sayi) => sayi * 2;
const ikiIleBol = (sayi) => sayi / 2;
const ikiEkle = (sayi) => sayi + 2;

const diziIslemleri = function (dizi , islem){
    let geciciDizi = []
    dizi.forEach(element => {
        geciciDizi.push(islem(element))
    });
    dizi.forEach((element,index,arry) =>{
        console.log(element,index,arry)
    });
    return geciciDizi;
}
console.log(diziIslemleri(dizim,ikiIleCarp));

function AdimiYaz(ad , soyad , callback) {

    const mesaj = ad + " " + soyad ;
    callback(mesaj);
    
}
AdimiYaz("emre","ok",(mesaj) =>{
    console.log(mesaj);
})

const kitaplar = [
    {ad: "roman1" , sayfaSayisi: 40},
    {ad: "roman2" , sayfaSayisi: 50},
    {ad: "roman3" , sayfaSayisi: 60},
    {ad: "roman4" , sayfaSayisi: 70},
]
const kitapSayisiObj = kitaplar.map((element)=>{
    return {
        sayfaNumber : element.sayfaSayisi
    }
});
console.log(kitapSayisiObj)


let sayiDizi = [1,2,3];
const reducedDizi = sayiDizi.reduce(function(final , current){
    final.push(current);
    return final;
},[]);
console.log(reducedDizi);
let a = -1;
if(a) console.log(true.toString());


const sayilar = [1,2,3,4,5,6,7,8,9];

const teksayilar = sayilar.filter(function(sayi){
    return (sayi % 2 != 0)
})
console.log(teksayilar);

const karesiAlinmistekler = teksayilar.map(function(sayi){
    return sayi * sayi;
})

console.log(karesiAlinmistekler);

const ondanBuyuklerToplami = karesiAlinmistekler.reduce(function(pre,current){
    if(current > 10){
        pre += current;
    }
    return pre;
},0);

console.log(ondanBuyuklerToplami);
const tekteBulalim = sayilar.filter(function(sayi){
    return (sayi % 2 != 0)
}).map(function(sayi){
    return sayi * sayi;
}).reduce(function(pre,current){
    if(current > 10){
        pre += current;
    }
    return pre;
},0);
console.log(tekteBulalim)


const sehirler = [
    {sehirAdi: "izmir", plaka: 35 , bolge: "ege"},
    {sehirAdi : "istanbul", plaka: 34, bolge: "maramara"},
    {sehirAdi: "van", plaka : 11 , bolge: "d. Anadolu"}
];

const siraliSehirler = sehirler.sort(function(a,b){
    return (a.sehirAdi < b.sehirAdi) ? 1 : (a.sehirAdi > b.sehirAdi ? -1 : 0);
});
console.log(siraliSehirler);



let num = parseInt(prompt('bir sayı ver bana'));

let sayiDizisi = [];
for(let i = 1; i<= num; i++){
    sayiDizisi.push(i);
}

let toplam = sayiDizisi.reduce(function(pre,curr){
    pre = pre + curr;
    return pre;
},0);
console.log(toplam);

const ogrenciler = [
    { ad: "emre", soyad: "ok", id: 1 },
    { ad: "hasan", soyad: "hasan", id: 2 },
    { ad: "veli", soyad: "veli", id: 3 },
    { ad: "tuba", soyad: "tuba", id: 4 },
    { ad: "ayşe", soyad: "ayşe", id: 5 },
    { ad: "betül", soyad: "betül", id: 6 },
];
let result = ogrenciler.filter((ogr) => ogr.id % 2 == 0).map((deger) => deger.ad + " " + deger.soyad).sort((a, b) => (a > b) ? 1 : (a < b ? -1 : 0));
console.log(result);

function fareGezdirme(e){
    e.preventDefault()
    document.querySelector(".container").style.backgroundColor = `rgb(${e.clientX},${e.clientY},1)`;
}
document.querySelector(".container").addEventListener("mousemove",fareGezdirme);


const getMeta = (url, cb) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
    //return [img.naturalWidth , img.naturalHeight];
  };
  
  // Use like:
 
  console.log( );
  let MathScore = [
    ['John Doe', 20, 60, 'A'],
    ['Jane Doe', 10, 52, 'B'],
    ['Petr Chess', 5, 24, 'F'],
    ['Ling Jess', 28, 43, 'A'],
    ['Ben Liard', 16, 51, 'B']
];
console.log(MathScore[0][1]);

function getMeta(url, callback) {
    const img = new Image();
    img.onload = () => callback(null, img);
    img.onerror = (err) => callback(err);
    img.src = url;
}
let buttonArry = ["aufgaben.png", "mein-profil.png", "mein-mintibuch.png", "mediathek.png",
    "spiel-spass.png", "bildworterbuch.png", "lernen-uben.png", "wortschatz.png", "lieder.png",
    "meine-module.png", "meine-arbeitsblatter.png"
]
let sizeArray = [
    [1,1],
    [1,1],
    [1,1],
    [1,1],
    [1,1],
    [1,1],
    [1,1],
    [1,1],
    [1,1],
    [1,1],
    [1,1],
];

for (let i = 0 , j=0; i < buttonArry.length; i++) {
    
    getMeta("https://cdn.minticity.com/assets/themes/main-page/junior/minti-in-space/" + buttonArry[i], (err, img) => {
        sizeArray[i][j++] = (img.naturalWidth);
        sizeArray[i][j] = (img.naturalHeight);
        j = 0;
    });
}
console.log(sizeArray);*/
myimage.onclick = function(e) {
    var ratioX = e.target.naturalWidth / e.target.offsetWidth;
    var ratioY = e.target.naturalHeight / e.target.offsetHeight;
  
    var domX = e.x + window.pageXOffset - e.target.offsetLeft;
    var domY = e.y + window.pageYOffset - e.target.offsetTop;
  
    var imgX = Math.floor(domX * ratioX);
    var imgY = Math.floor(domY * ratioY);
  
    console.log(imgX, imgY);
    getCurrentDateTime();
  };

  function getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Months are zero-indexed, so we add 1
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const millisecond = now.getMilliseconds();

    return {
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second,
        millisecond: millisecond
    };
}

// Example usage:
const currentDateTime = getCurrentDateTime();
console.log(`Year: ${currentDateTime.year}`);
console.log(`Month: ${currentDateTime.month}`);
console.log(`Day: ${currentDateTime.day}`);
console.log(`Hour: ${currentDateTime.hour}`);
console.log(`Minute: ${currentDateTime.minute}`);
console.log(`Second: ${currentDateTime.second}`);
console.log(`Millisecond: ${currentDateTime.millisecond}`);





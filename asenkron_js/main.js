console.log("başladı");
let ogrencileriGetir = (callback) => {
    setTimeout(() => {
        const dizi = []
        for (let index = 0; index < 30; index++) {
            dizi.push({ad:"Öğrenci "+index})
        }
        callback(dizi);
    }, 3000);
}
let ogrencileriYazdir = (ogrencilerDizisi) =>{
    console.log(ogrencilerDizisi);

}
console.log("bitti");


console.log("başladı2");
ogrencileriGetir2(ogrencileriYazdir2)

function ogrencileriGetir2(callback2){
    setTimeout(function (){
        const dizi = [];
        for (let index = 0; index < 30; index++) {
            dizi.push({ad:index}) 
        }
        callback2(dizi)
    }, 3000);
}
function ogrencileriYazdir2(ogrencilerDizisi2){
    console.log(ogrencilerDizisi2);
}
console.log("bitti2");
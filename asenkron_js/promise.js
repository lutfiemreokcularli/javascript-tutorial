const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('internete çıktım');
    }, 3000)
});
myPromise.then(sonuc => { console.log(sonuc); })
    .catch(hata => { console.log(hata) })

ogrencileriGetir().then(ogrencilerrr => { console.log(ogrencilerrr) })
function ogrencileriGetir() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const dizi = [];
            for (let i = 0; i <= 30; i++) {
                dizi.push({ ad: "öğrenci" })
            }
            resolve(dizi);
        }, 2000);
    })
}

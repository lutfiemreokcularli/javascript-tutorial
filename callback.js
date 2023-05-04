function adim(ad,soyad,callback){
    const mesaj = ad + soyad;
    callback(mesaj)
}

adim('emre','ok', function(msj){
    console.log(msj);
});
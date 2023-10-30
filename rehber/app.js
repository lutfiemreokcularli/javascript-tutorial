const ad = document.getElementById('ad');
const soyad = document.getElementById('soyad');
const mail = document.getElementById('email');

console.log(ad,soyad,mail)
const form = document.getElementById('form-rehber');

//kaydet fonk
const kaydet = (e)=>{
    e.preventDefault()
    const kisi = {
        ad:ad.value,
        soyad: soyad.value,
        mail: mail.value
    }
    const sonuc = verileriKontrolEt(kisi);
    bilgiOlustur(sonuc.durum,sonuc.mesaj,sonuc.className);
}

//veri kontrol funk
const verileriKontrolEt = (kisi) =>{
    for (const key in kisi) {
        if(kisi[key]){

        }else{
            return{
                durum: false,
                mesaj: 'Başarısız',
                className: 'bilgi--error'
            }
        }
    }
    return {
        durum: true,
        mesaj: 'Başarılı',
        className: 'bilgi--success'
    }
}

//bilgi oluştur
const bilgiOlustur = (durum,mesaj,sinif) => {
    const olusturulanBilgi = document.createElement('div');
    olusturulanBilgi.textContent = mesaj;
    olusturulanBilgi.classList.add('bilgi');
    olusturulanBilgi.classList.add(sinif);
    document.querySelector('.container').insertBefore(olusturulanBilgi,form);
}
form.addEventListener('submit',kaydet);
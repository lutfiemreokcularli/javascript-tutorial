class Kisi {
    constructor(ad,soyad,mail){
        this.ad = ad;
        this.soyad = soyad;
        this.mail = mail;
    }
}

class Ekran {
    constructor(){
        this.ad = document.getElementById('ad');
        this.soyad = document.getElementById('soyad');
        this.mail = document.getElementById('email');
        this.ekleGuncelleButton = document.querySelector('.kaydet-guncelle');
        this.depo = new Depo();
    }
}
class Depo{
    //Uygulama ilk açıldığında veriler getirilir
    constructor(){
        this.tumKisiler = [];
    }
    verileriGetir(){
        let tumKisiler;
        if(localStorage.getItem('tumKisiler') === null){
            tumKisiler = [];
        }else{
            tumKisiler = JSON.parse(localStorage.getItem('tumKisiler'));
        }
        this.tumKisiler = tumKisiler;
        return tumKisiler;
    }
    kisiEkle(kisi){
       
        const tumKisilerLocal =  this.verileriGetir();
        tumKisilerLocal.push(kisi);
        localStorage.setItem('tumKisiler',JSON.stringify(tumKisilerLocal));
    }
}
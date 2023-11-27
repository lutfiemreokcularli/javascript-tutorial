class Kisi {
    constructor(ad, soyad, mail) {
        this.ad = ad;
        this.soyad = soyad;
        this.mail = mail;
    }
}

class Ekran {
    constructor() {
        this.ad = document.getElementById('ad');
        this.soyad = document.getElementById('soyad');
        this.mail = document.getElementById('email');
        this.ekleGuncelleButton = document.querySelector('.kaydet-guncelle');
        this.form = document.getElementById('form-rehber').addEventListener('submit', this.kaydetGuncelle.bind(this));
        this.kisiListesi = document.querySelector('.kisi-listesi');
        this.kisiListesi.addEventListener('click', this.guncelleVeyaSil.bind(this));
        this.depo = new Depo();
        this.secilenSatir = undefined;
        this.kisileriEkranaYazdir();
    }
    alanlariTemizle(){
        this.ad.value = '';
        this.soyad.value = '';
        this.mail.value = '';
    }
    guncelleVeyaSil(e) {
        if (e.target.classList.contains('btn--delete')) {
            this.secilenSatir = e.target.parentElement.parentElement;
            this.kisiyiEkrandanSil();

        } else if (e.target.classList.contains('btn--edit')) {
            this.secilenSatir = e.target.parentElement.parentElement;
        }
    }
    kisiyiEkrandanSil(){
        this.secilenSatir.remove();
        const silinecekMail = this.secilenSatir.cells[2].textContent;
        this.depo.kisiSil(silinecekMail);
        this.alanlariTemizle();
        
    }
    kisileriEkranaYazdir() {
        this.depo.tumKisiler.forEach(kisi => {
            this.kisiyiEkranaEkle(kisi);
        });
    }
    kisiyiEkranaEkle(kisi) {
        const olusturulanTrElementi = document.createElement('tr');
        olusturulanTrElementi.classList.add('item');
        olusturulanTrElementi.innerHTML = `<td>${kisi.ad}</td>
    <td>${kisi.soyad}</td>
    <td>${kisi.mail}</td>
    <td><button class="btn btn--edit"><i class="fas fa-edit"></i></button>
    <button class="btn btn--delete"><i class="fas fa-trash-alt"></i></button>
    </td>`;
        this.kisiListesi.appendChild(olusturulanTrElementi);
        this.alanlariTemizle()
    }
    kaydetGuncelle(e) {
        e.preventDefault();
        console.log(this)
        const kisi = new Kisi(this.ad.value, this.soyad.value, this.mail.value)
        const sonuc = Utils.bosAlanKontrol(kisi.ad, kisi.soyad, kisi.mail);

        if (sonuc) {
            //yeni kişiyi ekrana basar
            this.kisiyiEkranaEkle(kisi);

            //yeni kişiyi locale ekler
            this.depo.kisiEkle(kisi)
        } else {

        }
    }
}
class Depo {
    //Uygulama ilk açıldığında veriler getirilir
    constructor() {
        this.tumKisiler = this.verileriGetir();
    }
    verileriGetir() {
        let tumKisiler;
        if (localStorage.getItem('tumKisiler') === null) {
            tumKisiler = [];
        } else {
            tumKisiler = JSON.parse(localStorage.getItem('tumKisiler'));
        }
        return tumKisiler;
    }
    kisiEkle(kisi) {

        this.tumKisiler.push(kisi)
        localStorage.setItem('tumKisiler', JSON.stringify(this.tumKisiler));
    }
    kisiSil(mail) {
        this.tumKisiler.forEach((kisi, index) => {
            if (kisi.mail === mail) {
                this.tumKisiler.splice(index, 1);
            }
        })
        localStorage.setItem('tumKisiler', JSON.stringify(this.tumKisiler));
    }
    kisiGuncelle(guncelKisi) {
        this.tumKisiler.forEach((kisi, index) => {
            if (kisi.mail === guncelKisi.mail) {
                this.tumKisiler[index] = guncelKisi;
            }
        })
        localStorage.setItem('tumKisiler', JSON.stringify(this.tumKisiler));
    }
}

document.addEventListener('DOMContentLoaded', function (e) {
    const ekran = new Ekran();
});

class Utils {
    static bosAlanKontrol(...alanlar) {
        let sonuc = true;
        alanlar.forEach(alan => {
            if (alan.length === 0) {
                sonuc = false;
                return false;
            }
        });
        return sonuc;
    }
}
const ad = document.getElementById('ad');
const soyad = document.getElementById('soyad');
const mail = document.getElementById('email');
const form = document.getElementById('form-rehber');
const kisiListesi = document.querySelector('.kisi-listesi');
//const trElement = document.querySelector('.item');
//tüm kişiler dizisi
const tumKisiler = [];
let secilenSatir = undefined;

//kaydet fonk
const kaydet = (e) => {
    e.preventDefault();
    const kisi = {
        ad: ad.value,
        soyad: soyad.value,
        mail: mail.value
    }
    const sonuc = verileriKontrolEt(kisi);
    bilgiOlustur(sonuc.durum, sonuc.mesaj, sonuc.className);
    if (sonuc.durum){
        if(secilenSatir){
            kisiGuncelle(kisi);
        }else{
            kisiEkle(kisi);
        }
    }
    
}
//kişi gunceller
const kisiGuncelle = (kisi) => {

    for(let i = 0; i< tumKisiler.length; i++){
        if(tumKisiler[i].mail === secilenSatir.cells[2].textContent){
            /* tumKisiler[i].ad = kisi.ad;
            tumKisiler[i].soyad = kisi.soyad;
            tumKisiler[i].mail = kisi.mail; */
            tumKisiler[i] = kisi;
            break;
        }
    }
    console.log(tumKisiler)

    secilenSatir.cells[0].textContent = kisi.ad;
    secilenSatir.cells[1].textContent = kisi.soyad;
    secilenSatir.cells[2].textContent = kisi.mail;
    document.querySelector('.kaydet-guncelle').value = 'Kaydet';
    secilenSatir = undefined;
}


//veri kontrol funk
const verileriKontrolEt = (kisi) => {
    for (const key in kisi) {
        if (!kisi[key]) {
            return {
                durum: false,
                mesaj: 'Başarısız',
                className: 'bilgi--error'
            }
        }
    }
    alanlariTemizle();
    return {
        durum: true,
        mesaj: 'Kişi rehbere kaydedildi',
        className: 'bilgi--success'
    }
}

//bilgi oluştur
const bilgiOlustur = (durum, mesaj, sinif) => {
    const olusturulanBilgi = document.createElement('div');
    olusturulanBilgi.textContent = mesaj;
    olusturulanBilgi.classList.add('bilgi');
    olusturulanBilgi.classList.add(sinif);
    document.querySelector('.container').insertBefore(olusturulanBilgi, form);
    setTimeout(() => {
        olusturulanBilgi.remove();
    }, 2000);
}
const alanlariTemizle = _ => {
    ad.value = '';
    soyad.value = '';
    mail.value = '';
}

const kisiEkle = (eklenecekKisi) => {
    const olusturulanTrElementi = document.createElement('tr');
    olusturulanTrElementi.classList.add('item');
    olusturulanTrElementi.innerHTML = `<td>${eklenecekKisi.ad}</td>
    <td>${eklenecekKisi.soyad}</td>
    <td>${eklenecekKisi.mail}</td>
    <td><button class="btn btn--edit"><i class="fas fa-edit"></i></button>
    <button class="btn btn--delete"><i class="fas fa-trash-alt"></i></button>
    </td>`;
    kisiListesi.appendChild(olusturulanTrElementi);
    //kisiListesi.insertBefore(olusturulanTrElementi, trElement);
    tumKisiler.push(eklenecekKisi);
}

const kisiIslemleriniYap = (e) => {
    console.log(tumKisiler);
    if (e.target.classList.contains('btn--delete')) {
        const silinecekTr = e.target.parentElement.parentElement;
        const silicekMail = e.target.parentElement.previousElementSibling.textContent;
        rehberdenSil(silinecekTr, silicekMail);
    } else if (e.target.classList.contains('btn--edit')) {
        document.querySelector('.kaydet-guncelle').value = 'Güncelle';
        const secilenTR = e.target.parentElement.parentElement;
        const guncellenecekEmail = secilenTR.cells[2].textContent;

        ad.value = secilenTR.cells[0].textContent;
        soyad.value = secilenTR.cells[1].textContent;
        mail.value = secilenTR.cells[2].textContent;

        secilenSatir = secilenTR;
    }
}

function rehberdenSil(silinecekTrElement, silinecekMail) {
    silinecekTrElement.remove();

    //maile göre silme işlemi

    tumKisiler.forEach((kisi, index) => {
        if (kisi.mail === silinecekMail) {
            tumKisiler.splice(index, 1);
        }
    });
    alanlariTemizle();
}
form.addEventListener('submit', kaydet);

/* document.querySelector('.submitType').addEventListener('click',(e) => {
    e.preventDefault()
    if(e.target.classList.contains('btn--edit')){

    }else{
        kaydet();
    }
}); */

kisiListesi.addEventListener('click', kisiIslemleriniYap);
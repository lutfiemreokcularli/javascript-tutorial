const ad = document.getElementById('ad');
const soyad = document.getElementById('soyad');
const mail = document.getElementById('email');
const form = document.getElementById('form-rehber');
const kisiListesi = document.querySelector('.kisi-listesi');
const trElement = document.querySelector('.item');
let isSubmitEnabled = true;

//tüm kişiler dizisi
const tumKisiler = [];

//kaydet fonk
const kaydet = (e) => {
    e.preventDefault()
    if (isSubmitEnabled) {
        console.log(e.target);
        if (e.target.children[3].children[0].classList.contains('button-primary')) {
            const kisi = {
                ad: ad.value,
                soyad: soyad.value,
                mail: mail.value
            }
            const sonuc = verileriKontrolEt(kisi);
            bilgiOlustur(sonuc.durum, sonuc.mesaj, sonuc.className);
            if (sonuc.durum)
                kisiEkle(kisi);
        }

    }else{
        isSubmitEnabled = true;
    }

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
    //kisiListesi.appendChild(olusturulanTrElementi);
    kisiListesi.insertBefore(olusturulanTrElementi, trElement);
    tumKisiler.push(eklenecekKisi);
    console.log(tumKisiler)
}

const kisiIslemleriniYap = (e) => {
    isSubmitEnabled = false;
    if (e.target.classList.contains('btn--delete')) {
        const silinecekTr = e.target.parentElement.parentElement;
        const silicekMail = e.target.parentElement.previousElementSibling.textContent;
        rehberdenSil(silinecekTr,silicekMail);
    } else if (e.target.classList.contains('btn--edit')) {

    }
}
function rehberdenSil(silinecekTrElement,silinecekMail){
    silinecekTrElement.remove();
    console.log(silinecekMail)

    //maile göre silme işlemi

    tumKisiler.forEach((kisi,index)=>{
        if(kisi.mail === silinecekMail){
            tumKisiler.splice(index,1);
        }
    })
    console.log(tumKisiler)
}
form.addEventListener('submit', kaydet);
kisiListesi.addEventListener('click', kisiIslemleriniYap);
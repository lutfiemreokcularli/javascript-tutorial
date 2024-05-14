const yeniGorev = document.querySelector(".input-gorev");
const yeniGorevEkleBtn = document.querySelector(".btn-gorev-ekle");
const gorevListesi = document.querySelector(".gorev-listesi");

gorevListesi.addEventListener("click", gorevSilTamamla);
document.addEventListener("DOMContentLoaded", localStorageOku);

function gorevSilTamamla(e) {
    e.preventDefault();
    console.log(e.target)
    if (e.target.classList.contains("gorev-btn-tamamlandi")) {
        console.log("turuncu")
        e.target.parentElement.classList.toggle('gorev-tamamlandi');
    }
    if (e.target.classList.contains("gorev-btn-sil")) {
        if (confirm("Emin misin?")) {
            e.target.parentElement.classList.toggle('kaybol');
            localStorageSil(e.target.parentElement.children[0].innerText);
            e.target.parentElement.addEventListener('transitionend', function () {
                e.target.parentElement.remove();
            });
        }

        //
    }

}

yeniGorevEkleBtn.addEventListener("click", gorevEkle);
function gorevEkle(e) {
    e.preventDefault();
    gorevItemOlustur(yeniGorev.value);

    localStorageKaydet(yeniGorev.value);
    yeniGorev.value = '';
}

const localStorageKaydet = (yeniGorev) => {
    let gorevler = localStoragetoArrayConvert();
    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler', JSON.stringify(gorevler));

}
function localStorageOku() {
    let gorevler = localStoragetoArrayConvert();
    gorevler.forEach(element => {
        gorevItemOlustur(element);
    });
}

function gorevItemOlustur(gorev) {
    //.gorev-item
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item');

    //.gorev-tanim
    const gorevLi = document.createElement("li");
    gorevLi.classList.add('gorev-tanim');
    gorevLi.innerText = gorev;

    //.gorev-btn-tamamlandi
    const gorevTamamBtn = document.createElement("button");
    gorevTamamBtn.classList.add('gorev-btn');
    gorevTamamBtn.classList.add('gorev-btn-tamamlandi');
    gorevTamamBtn.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;

    //.gorev-btn-sil
    const gorevSilBtn = document.createElement("button");
    gorevSilBtn.classList.add("gorev-btn-sil");
    gorevSilBtn.classList.add("gorev-btn");
    gorevSilBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    gorevDiv.appendChild(gorevLi);
    gorevDiv.appendChild(gorevTamamBtn);
    gorevDiv.appendChild(gorevSilBtn);
    gorevListesi.appendChild(gorevDiv);
}

const localStorageSil = (gorev) => {
    let gorevler = localStoragetoArrayConvert();
    let gorevIndex = 0;
    gorevIndex = gorevler.indexOf(gorev);
    gorevler.splice(gorevIndex, 1);
    localStorage.setItem("gorevler", JSON.stringify(gorevler));
}

function localStoragetoArrayConvert() {
    let gorevler;
    if (localStorage.getItem("gorevler") === null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem("gorevler"));
    }
    return gorevler;
}


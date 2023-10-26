const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');
document.addEventListener('DOMContentLoaded',getDataFromLocal);
const gorevEkle = (e) => {
    e.preventDefault();
    gorevItemOlustur(yeniGorev.value);
    saveDataToLocal(yeniGorev.value);
    yeniGorev.value = '';
}
const gorevSilveTamamla = (e) => {
    //console.log(e.target);
    const tiklanilanEleman = e.target;
    console.log(tiklanilanEleman);
    if(tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')){
        
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
    }else if(tiklanilanEleman.classList.contains('gorev-btn-sil')){
        tiklanilanEleman.parentElement.classList.add('kaybol');
        const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
        localStorageDanSil(silinecekGorev);
        tiklanilanEleman.parentElement.addEventListener('transitionend',function(){
            tiklanilanEleman.parentElement.remove();
        });
        
    }

}
yeniGorevEkleBtn.addEventListener('click',gorevEkle);
gorevListesi.addEventListener('click',gorevSilveTamamla);

function saveDataToLocal(gorev){
    let gorevler;
    if(localStorage.getItem('gorevler') === null){
        gorevler = [];
    }else{
    gorevler = JSON.parse(localStorage.getItem('gorevler'))
    }

    gorevler.push(gorev);
    localStorage.setItem('gorevler',JSON.stringify(gorevler))
}

function getDataFromLocal(){
    let gorevler;
    if(localStorage.getItem('gorevler') === null){
        gorevler = [];
    }else{
    gorevler = JSON.parse(localStorage.getItem('gorevler'))
    }
    gorevler.forEach(element => {
        gorevItemOlustur(element);
    });
}

function gorevItemOlustur(gorev){
    
    //div oluşturma
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item');

    //li oluşturma
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.textContent = gorev;
    gorevDiv.appendChild(gorevLi);

    //Görev Tamam button oluşturma
    const gorevOKButton = document.createElement('button');
    gorevOKButton.classList.add('gorev-btn');
    gorevOKButton.classList.add('gorev-btn-tamamlandi');
    gorevOKButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    gorevDiv.appendChild(gorevOKButton);

    //Görev Sil button oluşturma
    const gorevSilButton = document.createElement('button');
    gorevSilButton.classList.add('gorev-btn');
    gorevSilButton.classList.add('gorev-btn-sil');
    gorevSilButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    gorevDiv.appendChild(gorevSilButton);
    
    
    //ul ye div ekleme
    gorevListesi.appendChild(gorevDiv);
}
function localStorageDanSil(gorev){
    let gorevler;
    if(localStorage.getItem('gorevler') === null){
        gorevler = [];
    }else{
    gorevler = JSON.parse(localStorage.getItem('gorevler'))
    }

    //splice ilte item sil
    const silinecekElemanIndex = gorevler.indexOf(gorev);
    gorevler.splice(silinecekElemanIndex,1);
    localStorage.setItem('gorevler',JSON.stringify(gorevler))
}

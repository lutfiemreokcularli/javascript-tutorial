const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');
const gorevEkle = (e) => {
    e.preventDefault();
    //div oluşturma
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item');

    //li oluşturma
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.textContent = yeniGorev.value;
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

    yeniGorev.value = '';
    //ul ye div ekleme
    gorevListesi.appendChild(gorevDiv);
}
const gorevSilveTamamla = (e) => {
    //console.log(e.target);
    const tiklanilanEleman = e.target;
    if(tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')){
        console.log('checked tıklandı');
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
    }else if(tiklanilanEleman.classList.contains('gorev-btn-sil')){
        tiklanilanEleman.parentElement.classList.add('kaybol');
        tiklanilanEleman.parentElement.addEventListener('transitionend',function(){
            tiklanilanEleman.parentElement.remove();
        });
        
    }

}
yeniGorevEkleBtn.addEventListener('click',gorevEkle);
gorevListesi.addEventListener('click',gorevSilveTamamla);

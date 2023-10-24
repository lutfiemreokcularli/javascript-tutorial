const firtsOpen = () => {
    const ulListesi = document.querySelector('.liste');
    const isimDizisi = JSON.parse(localStorage.getItem('isimListesi'));

    isimDizisi.forEach(element => {
        const yeniLi = document.createElement('li');
        yeniLi.textContent = element;
        ulListesi.appendChild(yeniLi);
    });
}
firtsOpen();


document.querySelector('#form').addEventListener('submit', (e) => {
    const yeniIsim = document.querySelector('.isim').value;
    let isimDizisi;

    if (localStorage.getItem('isimListesi') === null) {
        isimDizisi = [];
    } else {
        isimDizisi = JSON.parse(localStorage.getItem('isimListesi'));
    }

    isimDizisi.push(yeniIsim);
    localStorage.setItem('isimListesi', JSON.stringify(isimDizisi));
    firtsOpen();
});

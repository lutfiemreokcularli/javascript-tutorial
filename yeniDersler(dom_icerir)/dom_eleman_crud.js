const yeniListeElemani = document.createElement('li');

yeniListeElemani.className = "cliste-item";
yeniListeElemani.textContent = "Yozgat";

document.querySelector('ul#liste2').appendChild(yeniListeElemani);
console.log(yeniListeElemani.getClientRects()[0]);
yeniListeElemani.getClientRects()[0].x = 600;
const eskiBaslik = document.querySelector('h1');
const yeniBaslik = document.createElement('h6');
yeniBaslik.textContent = 'Yeni başlık';
const parentBaslik = document.querySelector('body');
parentBaslik.replaceChild(yeniBaslik,eskiBaslik);
console.log(yeniListeElemani);

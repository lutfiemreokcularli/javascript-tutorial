const baslik = document.getElementById('baslik');
console.log(baslik)
console.log(baslik.id);
console.log(baslik.className);

//stil

baslik.style.backgroundColor = 'red';
baslik.style.padding = '2rem';

//icerik

baslik.textContent = 'bu yeni baslik';
baslik.innerText = 'yeniii';
baslik.innerHTML = '<a class="link link-facebook" href="www.facebook.com">Facebook</a>'

console.log(document.querySelector('h1'));
console.log(document.querySelector('#formID'))
console.log(document.querySelector('.link.link-facebook'))

const myListe = document.querySelector('li');
myListe.style.color = "blue";

document.querySelector('li:last-child').style.color = 'yellow';
document.querySelector('li:nth-child(2)').style.color = 'red';

const testdeneme = document.querySelector('ul li');
testdeneme.style.color = 'teal';

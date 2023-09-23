const baslik = document.getElementById('baslik');
console.log(baslik)

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

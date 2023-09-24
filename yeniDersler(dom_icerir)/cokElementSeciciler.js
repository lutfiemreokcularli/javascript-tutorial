const sehirler = document.getElementsByClassName('link')
console.log(sehirler)

//ul içerisindeki cliste-item sınıfından olan elementleri almak istiyoruz

const sehirler2 = document.querySelector('ul').getElementsByClassName('cliste-item');
console.log(sehirler2)

const test1 = document.getElementsByTagName('ul')
console.log(test1)

const sehirler3 = document.querySelectorAll('ul');
console.log(sehirler3)
sehirler3.forEach(item =>{
    console.log(item);
})

const sehirlerTek = document.querySelectorAll('li:nth-child(odd)');
const sehirlerCift = document.querySelectorAll('li:nth-child(even)');
sehirlerCift.forEach(item =>{
    item.style.backgroundColor = "#0dd"
})
sehirlerTek.forEach(item =>{
    item.style.backgroundColor = '#ccc';
})
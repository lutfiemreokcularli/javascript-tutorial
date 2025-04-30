let arr = [5,4,3,2,1];
arr.sort();

arr

let arr2 = arr.map(num => num * 2);
arr2

let parent = {
    name : "emre"
}

let child = {
    surname : "ok"
}

Object.setPrototypeOf(parent,child);

for (const item in parent) {
    console.log(item);
}

console.log(parent.surname);

console.log(Object.keys(child))

function Ogrenci(ad, yas){
    this.ad = ad;
    this.yas = yas;
}

const emre = new Ogrenci("emre",35);

Ogrenci.prototype.bilgileriGoster = function (){
    return `merhaba adım ${this.ad}`;
}
console.log(emre.bilgileriGoster());


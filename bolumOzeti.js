let person = {
    ad : 'emre',
    yas : 32,
    evlimi : false,
};

console.log(person.ad);
console.log(typeof person);
console.log(person instanceof Object);


let dizi = [1,2,3,4];

const carpi2 = function(dizi){
    for(let i = 0; i<dizi.length; i++){
        dizi[i] *= 2;
    }
    return dizi;
}

let sonuc = carpi2(dizi);
console.log(sonuc,dizi);
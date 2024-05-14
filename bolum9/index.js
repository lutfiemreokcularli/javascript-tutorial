//factory functiions

function createOgr(ad, yas, evliMi, okul) {
    return {
        ad, yas, evliMi, okul,["deneme-x"] : "emre okçu",bilgileriSoyle: function(){
            return `adım ${this.ad}`;
        }
    }
}


const emre = createOgr("emre",33,false,"deu");
const mert = createOgr("hasan",34,true,"ege");
console.log(emre.bilgileriSoyle(),mert)


//constructor functions
Ogrenci.prototype.bilgileriSoyle = function(){
    return `adım ${this.ad} ve soyadım ${this.soyad}`;
}
function Ogrenci(ad,soyad){
    this.ad = ad; this.soyad = soyad;
}

const mehmet = new Ogrenci("meh","met");
console.log(mehmet.constructor.prototype);

let deneme = {};
console.log(deneme.constructor())

let dizi = [1,2,3];
console.log(dizi.findLastIndex(v => v>2));
console.log(dizi.constructor.prototype);
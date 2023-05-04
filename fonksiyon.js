function sayilariTopla(sayi1,sayi2){
    console.log(`${sayi1} ve ${sayi2} toplamı = ${sayi1 + sayi2}`)
}

sayilariTopla(1,2);


const sayilar = function(){
    console.log("merhaba");
}

sayilar();


const fatArrow = () =>{
    console.log('selam emre bu fat arrow');
}

fatArrow();


let fatArrow2 = () => {
    console.log('isimsiz bir fonksiyon let tipli değişkene aktarıldı');
}

fatArrow2();


const fatArrow3 = ()=>{
    console.log('isimsiiz bir function const tipli bir değişkene aktarıldı');
}

const fatArrow4 = ()=> {
    console.log('eğer foksiyonun isimsiz ise bu yapıyı kullanmak çok kolay olacaktır')
}
fatArrow4();

const fatArrow5 = _ => {
    console.log('Bu BİR parametresiz isimsiz bir fonksiyondur');
}

fatArrow5();

function karesiniAl(say){
    return say * say;
}

console.log(karesiniAl(3));

let karesiAldiginfonk = (number) =>{
    return number * number;
}

console.log(karesiAldiginfonk(4));

const karesiniA = number => number * number;
console.log(karesiniA(19));


let myDizi = [1,2,3];

const diziIslem = function(dizi){
    let geciciDizi = [];

    for(let i = 0;i<dizi.length; i++){
        geciciDizi[i] = dizi[i] * 2;
    }
    console.log(geciciDizi);
    console.log(myDizi);
}
diziIslem(myDizi);



const diziIslem2 = (dizi,islem) => {
    let geciciDizi = [];
    for(let i = 0; i<dizi.length;i++){
        geciciDizi[i] = islem(dizi[i])
    }
    console.log(geciciDizi);
}

const ikiiIleCarp = function(sayi){
    return sayi * 2;
}

const uceBol = (sayi) =>{
    return sayi/3;
}
console.log("**********************")
diziIslem2(myDizi,uceBol);
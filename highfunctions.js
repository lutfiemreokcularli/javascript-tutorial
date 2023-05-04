let myDizi = [1,2,3];

const diziyiKopyalaveIkiileCarp = function(myDizi){
    let geciciDizi = [];
    for(let i  =0; i< myDizi.length;i++){
        geciciDizi[i] = myDizi[i] * 2;
    }
    console.log(geciciDizi);
}

const diziyiKopyalave2yeBol = (myDizi) => {
    let geciciDizi = [];
    for (let index = 0; index < myDizi.length; index++) {
        geciciDizi[index] = myDizi[index]/2;
    }
    console.log(geciciDizi);

}

const diziyiKopyalave3ekle = function (myDizi){
    let geciciDizi = [];
    for(let i = 0;i<myDizi.length;i++){
        geciciDizi[i] = myDizi[i] + 3;
    }
    console.log(geciciDizi);
}

const diziIslemleri = (myDizi,islem) => {
    let geciciDizi = [];
    for(let i =0;i<myDizi.length;i++){
        geciciDizi[i] = islem(myDizi[i]);
    }
    console.log("diziislemleri çalıştı",geciciDizi);
}


const ikiIleCarp = (sayi) => {
    return sayi *2;
}
const ikiilebol = (sayi) => {
    return sayi / 2;
}
const ucEkle = (sayi) => {
    return sayi + 3;
}
//diziIslemleri(myDizi,ikiIleCarp);
diziIslemleri(myDizi,(sayi) => {
    return sayi / 2;
})


diziyiKopyalave3ekle(myDizi);
console.log(myDizi);

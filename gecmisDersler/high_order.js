
let myDizi = [1,2,3]

const diziIslemleri = function (dizi,islem){
    let geciciDizi = [];
    for(let i =0;i<dizi.length;i++){
        geciciDizi[i] = islem(dizi[i]);
    }
    console.log(geciciDizi);
}



const ikiIleCarp = (sayi) => {
    return sayi * 2;
}

const ikiIleBol = (sayi) =>{
    return sayi/2;
}

diziIslemleri(myDizi,(sayi)=>{
    return sayi *2;
});
/* diziIslemleri(myDizi,ikiIleBol);

let deger = ikiIleCarp(3);
console.log(deger); */
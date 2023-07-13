let sayilar = [1,2,3,4,5];

/* sayilar.forEach(ikiParametreAlanFonk);

function ikiParametreAlanFonk(element ,i){
    console.log(element,i);
} */


//kendi foreach fonk

const diziyiYazdır = (dizi,islem) =>{

    for(let i =0;i<dizi.length;i++){
        islem(dizi[i],i);
    }
}

function yazdir(deger,index){
    console.log(deger,index);
}

diziyiYazdır(sayilar,yazdir);
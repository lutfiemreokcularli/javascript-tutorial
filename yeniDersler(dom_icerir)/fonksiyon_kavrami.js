let sayilar = [1,2,3,4];
sayilar.forEach((number)=>{console.log(number)});

//kendi foreach yapım

let sayiDizi = [1,2,3,4,5,6,7];
function kendiForEachYapim(sayiDizisi,fonkislem){
    for (let i = 0; i < sayiDizisi.length; i++) {
        fonkislem(sayiDizisi[i],i);
    }
}

const islem = (sayi,index) => {
    console.log(sayi,index);
}

kendiForEachYapim(sayiDizi,islem);
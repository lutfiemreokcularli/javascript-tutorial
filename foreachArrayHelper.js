let sayilar = [1,2,3,4,5,6];

sayilar.forEach((sayi) =>{
    console.log(sayi);
});

function kendiforeachYapim(dizi,islem){
    for(let i = 0;i<dizi.length;i++){
        islem(dizi[i],i);
    }
}
kendiforeachYapim(sayilar,(sayi,index) => {
    console.log("kendi",sayi,index);
})
const kisiler = [
    {kisiAdi:'emre',kisiSoyad:'okcularli'},
    {kisiAdi:'hasan',kisiSoyad:'kara'},
    {kisiAdi:'ali',kisiSoyad:'sayad'}
];

const tamIsımliler = kisiler.map((kisi) => kisi.kisiAdi + ' '+ kisi.kisiSoyad);
console.log(tamIsımliler);




const sayilar = [1,2,3,4,5];

const yenisayilar = sayilar.map(function(value){
   return value * 2;
});

console.log(yenisayilar);
console.log(sayilar);

//kendi map yapımızı yapalım

const kendiSayilar = [1,2,3];

const kendiMapYapimiziYazalim = (kendiSayilar,callback)=>{
    let geciciDizi = [];
    for(let i =0;i<kendiSayilar.length; i++){
        geciciDizi[i] = callback(kendiSayilar[i])
    }
    return geciciDizi;
}

const yenimap = kendiMapYapimiziYazalim(kendiSayilar,function(deger){
   return deger * 2;
})

console.log(yenimap);
console.log(kendiSayilar);


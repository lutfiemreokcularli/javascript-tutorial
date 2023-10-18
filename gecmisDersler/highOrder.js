let kisiler = [
    {ad: 'ali',soyad:'TUNA'},
    {ad: 'veli',soyad:'MOK'},
    {ad: 'ayse',soyad:'OK'},
];

const yeniKisiler = kisiler.map((kisi,index,array)=>{
    return kisi.ad + "m";
})
console.log(yeniKisiler);
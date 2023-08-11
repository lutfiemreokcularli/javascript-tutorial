function belliAraliktakiSayilariTopla(sayi1,sayi2){
    let toplam = 0;
    for(let i = sayi1; i<= sayi2; i++){
        toplam += i;
    }
    return toplam;
}

let sonuc = belliAraliktakiSayilariTopla(30,60);
console.log(sonuc);P

selamVer();
function selamVer() {
    console.log("merhaba");
}

function sayilariTopla(sayi1, sayi2) {
    console.log(sayi1 + sayi2);
}

sayilariTopla(10, 20);


function belirliAralitakiSayilariTopla(baslangic, bitis) {
    let toplam = 0;
    for (let i = baslangic; i <= bitis; i++) {
        toplam += i;
    }
    console.log(toplam);
}
belirliAralitakiSayilariTopla(12,13)
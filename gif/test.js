// script.js dosyası

// Resim yollarını içeren dizi

const images = {
  image3 :[],
  image4: [],
  image5 : [],
  image6 : []
};
/* for (let i = 0; i <= 149; i++) {
    images.push(`images/star-${i}.png`);
} */
for (let i = 0; i <= 4; i++) {
  images.image3.push(`images3/${i+1}.png`);
}
for (let i = 0; i <= 17; i++) {
  images.image4.push(`images4/${i+1}.png`);
}
for (let i = 0; i <= 7; i++) {
  images.image5.push(`images5/${i+1}.png`);
}
for (let i = 0; i <= 3; i++) {
  images.image6.push(`images6/${i+1}.png`);
}

  
  // Hangi resmin gösterileceğini takip eden değişken
  let currentIndex = 0;
  let currentIndex2 = 0;
  let currentIndex3 = 0;
  let currentIndex4 = 0;
  
  // Resim değiştirme fonksiyonu
  function changeImage3() {
    // img etiketi
    const imageElement = document.getElementById('animatedImage1');
  
    // Resmi değiştir
    imageElement.src = images.image3[currentIndex];
  
    // İndeksi güncelle
    currentIndex = (currentIndex + 1) % images.image3.length;
  }
  function changeImage4() {
    // img etiketi
    const imageElement = document.getElementById('animatedImage2');
  
    // Resmi değiştir
    imageElement.src = images.image4[currentIndex2];
  
    // İndeksi güncelle
    currentIndex2 = (currentIndex2 + 1) % images.image4.length;
  }
  function changeImage5() {
    // img etiketi
    const imageElement = document.getElementById('animatedImage3');
  
    // Resmi değiştir
    imageElement.src = images.image5[currentIndex3];
  
    // İndeksi güncelle
    currentIndex3 = (currentIndex3 + 1) % images.image5.length;
  }
  function changeImage6() {
    // img etiketi
    const imageElement = document.getElementById('animatedImage4');
  
    // Resmi değiştir
    imageElement.src = images.image6[currentIndex4];
  
    // İndeksi güncelle
    currentIndex4 = (currentIndex4 + 1) % images.image6.length;
  }
  
  // Her 200 ms'de bir changeImage fonksiyonunu çağırarak resimleri sırayla göster
  setInterval(changeImage3, 250);
  setInterval(changeImage4, 250);
  setInterval(changeImage5, 250);
  setInterval(changeImage6, 250);
  
// script.js dosyası

// Resim yollarını içeren dizi
const images = [
    
    // Buraya diğer resimlerin yolunu ekleyin
  ];
/* for (let i = 0; i <= 149; i++) {
    images.push(`images/star-${i}.png`);
} */
for (let i = 0; i <= 3; i++) {
  images.push(`images2/${i+1}.png`);
}
  
  // Hangi resmin gösterileceğini takip eden değişken
  let currentIndex = 0;
  
  // Resim değiştirme fonksiyonu
  function changeImage() {
    // img etiketi
    const imageElement = document.getElementById('animatedImage');
  
    // Resmi değiştir
    imageElement.src = images[currentIndex];
  
    // İndeksi güncelle
    currentIndex = (currentIndex + 1) % images.length;
  }
  
  // Her 200 ms'de bir changeImage fonksiyonunu çağırarak resimleri sırayla göster
  setInterval(changeImage, 500);
  
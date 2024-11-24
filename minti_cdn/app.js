const axios = require('axios');
const { JSDOM } = require('jsdom');
const fs = require('fs');

const BASE_URL = 'https://cdn.minticity.com/assets/mintibuch/a1-2/berufe/seite-10/junior';

async function fetchImageUrls() {
  try {
    console.log("emre");
    // URL'ye GET isteği gönder
    const response = await axios.get(BASE_URL);
    console.log("e");
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    // Resim dosyalarını bul
    const imageUrls = [];
    const links = document.querySelectorAll('a');
    console.log(links);
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href.endsWith('.jpg') || href.endsWith('.png') || href.endsWith('.jpeg'))) {
        imageUrls.push(BASE_URL + href);
      }
    });

    // Resim URL'lerini bir dosyaya kaydet
    fs.writeFileSync('images.json', JSON.stringify(imageUrls, null, 2));
    console.log('Resim URL\'leri başarıyla kaydedildi!');
  } catch (error) {
    console.error('Hata:', error.message);
  }
}

fetchImageUrls();

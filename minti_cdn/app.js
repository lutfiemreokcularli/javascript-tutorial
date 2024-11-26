const express = require('express');
const https = require('https');

const app = express();

app.get('/proxy', (req, res) => {
    const url = "https://cdn.minticity.com/assets/mintibuch/a1-1/mein-tag/seite-1/junior/junior.png";
    https.get(url, (response) => {
        res.setHeader('Content-Type', response.headers['content-type']); // İçerik türünü ayarla
        response.pipe(res); // Veriyi doğrudan istemciye gönder
    }).on('error', (err) => {
        console.error(err);
        res.status(500).send('Asset alınamadı');
    });
});

app.listen(3000, () => console.log('Server çalışıyor: http://localhost:3000'));

// Oyun konfigürasyonu
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

// Phaser oyununu başlatıyoruz
const game = new Phaser.Game(config);
let backgroundImage;

function preload() {
    // Başlangıçta herhangi bir resim yüklemiyoruz
}

function create() {
    const fileInput = document.getElementById('fileInput');
    
    // Dosya seçildiğinde çalışacak işlev
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                // Resmi base64 olarak yükleyip sahnede kullanma
                this.textures.once('addtexture', () => {
                    // Resim yüklendiğinde ekranda gösteriliyor
                    if (backgroundImage) {
                        backgroundImage.setTexture('background');  // Var olan resmi güncelle
                    } else {
                        backgroundImage = this.add.image(400, 300, 'background');  // Yeni resmi ekle
                    }
                });
                
                // Phaser'a base64 resim ekleme
                this.textures.addBase64('background', e.target.result);
            };

            reader.readAsDataURL(file);  // Resmi base64 formatında okuma
        }
    });
}

class PortraitScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PortraitScene' });
    }

    create() {
        this.text = this.add.text(0, 0, '📱 Portrait Mode', { 
            fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        this.scale.on('resize', this.resizeGame, this);
        this.resizeGame(); // Yükleme sırasında hemen boyutlandırma yapalım
    }

    resizeGame() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        
        console.log("📱 Portrait Mode - Width:", width, "Height:", height);

        // Text nesnesini ekrana ortalayalım
        this.text.setPosition(width / 2, height / 2);
    }
}

class LandscapeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LandscapeScene' });
    }

    create() {
        this.text = this.add.text(0, 0, '🖥️ Landscape Mode', { 
            fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        this.scale.on('resize', this.resizeGame, this);
        this.resizeGame(); // Yükleme sırasında hemen boyutlandırma yapalım
    }

    resizeGame() {
        let width = window.innerWidth;
        let height = window.innerHeight;

        console.log("🖥️ Landscape Mode - Width:", width, "Height:", height);

        // Text nesnesini ekrana ortalayalım
        this.text.setPosition(width / 2, height / 2);
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [PortraitScene, LandscapeScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
};

const game = new Phaser.Game(config);

// **Canvas'ı tam ekran yap**
function resizeGame() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    game.scale.resize(width, height);
    game.canvas.style.width = width + "px";
    game.canvas.style.height = height + "px";
    game.renderer.resize(width, height);
}

// **Ekran yönünü kontrol eden fonksiyon**
function checkOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const currentScene = game.scene.getScenes(true)[0];

    if (isPortrait && currentScene.scene.key !== 'PortraitScene') {
        console.log("🔄 Switching to Portrait Scene");
        game.scene.stop(currentScene.scene.key);
        game.scene.start('PortraitScene');
    } 
    else if (!isPortrait && currentScene.scene.key !== 'LandscapeScene') {
        console.log("🔄 Switching to Landscape Scene");
        game.scene.stop(currentScene.scene.key);
        game.scene.start('LandscapeScene');
    }

    resizeGame(); // **Her yön değiştiğinde tam ekranı tekrar ayarla**
}

// **Ekran yönü değiştiğinde**
window.addEventListener('resize', checkOrientation);

// **Başlangıçta çağır**
checkOrientation();

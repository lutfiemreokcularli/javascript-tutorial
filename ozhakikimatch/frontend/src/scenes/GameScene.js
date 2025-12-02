import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.wrongCount = 0;
  }

  preload() {
    this.load.image("bg", "/assets/bg-last.png");
    this.load.image("nextBtn", "/assets/ui/next.png");

    // HUD görselleri
    this.load.image("coin1", "/assets/images/coin1.png");
    this.load.image("coin2", "/assets/images/coin2.png");
    this.load.image("coin3", "/assets/images/coin3.png");

    this.load.image("health1", "/assets/images/health1.png");
    this.load.image("health2", "/assets/images/health2.png");
    this.load.image("health3", "/assets/images/health3.png");

    this.load.image("pointBox", "/assets/images/point-box.png");

    this.load.image("fullscreen", "/assets/images/fullscreen.png");
    this.load.image("smallscreen", "/assets/images/smallscreen.png");

    this.load.image("soundBtn", "/assets/images/sound.png");
    // Arka plan müziğini yükle (preload içinde)
    this.load.audio("bgMusic", "/assets/sounds/loop.wav");

    this.load.audio("trueSound", "/assets/sounds/true.mp3");
    this.load.audio("falseSound", "/assets/sounds/false.mp3");
  }

  create() {
    this.add.image(960, 540, "bg").setOrigin(0.5).setDisplaySize(1920, 1080);

    this.slotPositions = [
      { x: 625, y: 375 },
      { x: 1280, y: 375 },
      { x: 625, y: 825 },
      { x: 1280, y: 825 },
    ];

    this.currentItems = [];
    this.correctAnswer = null;
    this.wrongCount = 0;
    // Score başlangıç
    this.score = 0;
    this.correctCount = 0;
    this.questionNumber = 1;

    // Ortadaki kutunun içine text
    this.questionText = this.add
      .text(960, 80, `Frage ${this.questionNumber}`, {
        fontSize: "42px",
        fontStyle: "bold",
        fontFamily: "Abeezee",
        color: "#ffffff",
      })
      .setOrigin(0.5)
      .setDepth(2000);
    // Sağ üst köşeye point-box
    this.pointBox = this.add
      .image(1650, 80, "pointBox")
      .setOrigin(0.5)
      .setDepth(2000);

    // Üzerine score text
    this.scoreText = this.add
      .text(1650, 80, "0", {
        fontSize: "42px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5)
      .setDepth(2001);
    // HUD başlangıcı
    this.coinHud = this.add
      .image(200, 80, "coin3")
      .setOrigin(0.5)
      .setDepth(2000);
    this.healthHud = this.add
      .image(550, 80, "health3")
      .setOrigin(0.5)
      .setDepth(2000);

    this.nextBtn = this.add
      .image(1750, 600, "nextBtn")
      .setInteractive({ cursor: "pointer" })
      .setVisible(false);

    this.nextBtn.on("pointerdown", () => {
      // Animasyonu temizle
      if (this.nextBtn.tween) {
        this.nextBtn.tween.stop();
        this.nextBtn.setScale(1); // tekrar normal boyuta döndür
        this.nextBtn.tween = null;
      }
      // 🔹 Next'e basınca coin her zaman sıfırlanır
      this.coinHud.setTexture("coin3");
      // Soru numarasını artır
      this.questionNumber++;
      this.questionText.setText(`Frage ${this.questionNumber}`);
      this.loadNewQuestion();
    });

    // Fullscreen toggle butonu
    this.fullscreenBtn = this.add
      .image(1850, 80, this.scale.isFullscreen ? "smallscreen" : "fullscreen")
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" })
      .setDepth(5000);

    this.fullscreenBtn.on("pointerdown", () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
        this.fullscreenBtn.setTexture("fullscreen");
      } else {
        this.scale.startFullscreen();
        this.fullscreenBtn.setTexture("smallscreen");
      }
    });
    this.add.image(
      1850,
      80,
      this.scale.isFullscreen ? "smallscreen" : "fullscreen"
    );

    this.loadNewQuestion();
    // Ses butonu (mavi kare alanına yerleşsin)
    this.soundBtn = this.add
      .image(180, 600, "soundBtn") // koordinatları senin görsele göre ayarladım
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" })
      .setDepth(2000);

    // Tıklama eventi
    this.soundBtn.on("pointerdown", () => {
      // Doğru cevabın sesini çal
      const soundKey = this.correctAnswer + "_sound";
      this.sound.play(soundKey);
    });

    // Create içinde müzik başlat
    this.bgMusic = this.sound.add("bgMusic", {
      loop: true,
      volume: 0.05, // sesi ayarlayabilirsin
    });

    // Eğer çalmıyorsa başlat
    if (!this.bgMusic.isPlaying) {
      this.bgMusic.play();
    }
  }

  async loadNewQuestion() {
    // Öncekileri temizle
    this.currentItems.forEach((item) => item.destroy());
    this.currentItems = [];
    this.nextBtn.setVisible(false);

    // API’den verileri çek
    const res = await fetch("http://localhost:3000/api/question");
    const { items, correct } = await res.json();

    this.correctAnswer = correct.name;
    console.log("✅ Doğru cevap:", this.correctAnswer);

    // 🔹 Dinamik preload
    items.forEach((item) => {
      if (!this.textures.exists(item.name)) {
        this.load.image(item.name, "/assets/images/" + item.imagegr);
        this.load.image(`${item.name}normal`, "/assets/images/" + item.image);
      }

      // Ses için doğru kontrol
      if (!this.cache.audio.exists(item.name + "_sound")) {
        this.load.audio(item.name + "_sound", "/assets/sounds/" + item.sound);
      }
    });

    // 🔹 Preload tamamlanınca görselleri ekle
    this.load.once("complete", () => {
      this.sound.play(this.correctAnswer + "_sound");

      items.forEach((item, index) => {
        const pos = this.slotPositions[index];
        const img = this.add
          .image(pos.x, pos.y, item.name)
          .setInteractive({ cursor: "pointer" });

        // Orantılı olarak slot içine sığdır
        const maxW = 350;
        const maxH = 250;
        const scale = Math.min(maxW / img.width, maxH / img.height);
        img.setScale(scale);
        // 🔹 Seçilip seçilmediğini takip etmek için flag
        img.alreadyClicked = false;

        img.on("pointerdown", () => {
          if (item.name === this.correctAnswer) {
            //img.disableInteractive();
            this.input.manager.pointers.forEach((p) => p.reset());

            this.input.enabled = true;

            this.children.list.forEach((obj) => {
              if (obj.input) {
                obj.disableInteractive();
                this.soundBtn.setInteractive({ cursor: "pointer" });
                this.fullscreenBtn.setInteractive({ cursor: "pointer" });
              }
            });
            // ✅ DOĞRU → true.mp3 çal
            this.sound.play("trueSound");
            img.setDepth(1000);
            img.setTexture(`${item.name}normal`);
            this.tweens.add({
              targets: img,
              x: 960,
              y: 540,
              scaleX: scale * 1.5,
              scaleY: scale * 1.5,
              duration: 600,
              ease: "Power2",
              onComplete: () => {
                // ✅ Doğru sayısı +1
                this.correctCount++;
                // ✅ Puan hesapla
                if (this.coinHud.texture.key === "coin3") {
                  this.score += 100;
                } else if (this.coinHud.texture.key === "coin2") {
                  this.score += 75;
                } else if (this.coinHud.texture.key === "coin1") {
                  this.score += 50;
                }

                this.scoreText.setText(this.score);
                const soundKey = this.correctAnswer + "_sound";
                if (this.cache.audio.exists(soundKey)) {
                  const sound = this.sound.add(soundKey);
                  sound.play();

                  // Ses bitince tetiklenecek
                  sound.once("complete", () => {
                    this.nextBtn.setVisible(true).setInteractive();
                    if (!this.nextBtn.tween) {
                      this.nextBtn.tween = this.tweens.add({
                        targets: this.nextBtn,
                        scaleX: 1.2,
                        scaleY: 1.2,
                        duration: 600,
                        yoyo: true,
                        repeat: -1, // 🔥 sonsuz tekrar
                        ease: "Sine.easeInOut",
                      });
                    }
                  });
                } else {
                  // Eğer ses bulunamazsa direkt butonu aç
                  this.nextBtn.setVisible(true);
                  if (!this.nextBtn.tween) {
                    this.nextBtn.tween = this.tweens.add({
                      targets: this.nextBtn,
                      scaleX: 1.2,
                      scaleY: 1.2,
                      duration: 600,
                      yoyo: true,
                      repeat: -1, // 🔥 sonsuz tekrar
                      ease: "Sine.easeInOut",
                    });
                  }
                }
              },
            });
          } else {
            if (!img.alreadyClicked) {
              this.sound.play("falseSound");
              img.alreadyClicked = true;
              this.wrongCount++;
              console.log("❌ Yanlış sayısı:", this.wrongCount);
              // Coin güncelle
              if (this.wrongCount === 1) this.coinHud.setTexture("coin2");
              if (this.wrongCount === 2) this.coinHud.setTexture("coin1");

              // Health güncelle
              if (this.wrongCount === 1) this.healthHud.setTexture("health2");
              if (this.wrongCount === 2) this.healthHud.setTexture("health1");
              if (this.wrongCount >= 3) {
                console.log("➡️ 3 yanlış → EndScene");
                this.scene.start("EndScene", {
                  score: this.score,
                  correct: this.correctCount,
                });
              }
            }
          }
        });

        this.currentItems.push(img);
      });
    });

    // 🔹 Dinamik loader başlat
    this.load.start();
  }
}

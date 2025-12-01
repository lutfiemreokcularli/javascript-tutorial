var game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
  preload: preload,
  create: create,
});

function preload() {
  // Örnek sprite yükleniyor (örnek olarak Phaser logosunu kullanalım)
  game.load.image(
    "karakter",
    "https://examples.phaser.io/assets/sprites/phaser2.png"
  );
}

function create() {
  // 1. Grup oluştur
  var myGroup = game.add.group();

  // 2. Sprite ve Text oluştur
  var sprite = game.add.sprite(0, 0, "karakter");
  var text = game.add.text(0, 0, "Selam!", {
    font: "20px Arial",
    fill: "#ffffff",
  });

  // 3. Text pozisyonunu sprite'a göre ayarla (sprite altına hizalı)
  text.x = sprite.width / 2 - text.width / 2;
  text.y = sprite.height + 5;

  // 4. Nesneleri gruba ekle
  myGroup.add(sprite);
  myGroup.add(text);

  // 5. Grup pozisyonu, scale vs.
  myGroup.x = 200;
  myGroup.y = 150;
  myGroup.alpha = 0.95;

  // Bonus: tıklanınca grup sağa hareket etsin
  game.input.onDown.add(function () {
    myGroup.x += 50;
  });
}

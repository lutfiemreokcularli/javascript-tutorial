export const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#ffffff",
  scene: {
    preload: preload,
    create: create,
  },
};

export function startGame() {
  const game = new Phaser.Game(config);
}
function preload() {
  console.log("preload", config);
  this.load.image("background", "https://picsum.photos/seed/picsum/200");
  this.load.image("star", "https://picsum.photos/seed/picsum/200/300");
}

function create() {
  console.log("create", config);
  const background = this.add.image(400, 300, "background");
  background.setDisplaySize(800, 600);
  const userInput = config.userInput;
  const objectCount = parseInt(userInput) || 1;

  const startX = 50;
  const startY = 50;
  const spacingX = 150;
  const spacingY = 150;
  const maxPerRow = 5;

  for (let i = 0; i < objectCount; i++) {
    const x = startX + (i % maxPerRow) * spacingX;
    const y = startY + Math.floor(i / maxPerRow) * spacingY;

    const image = this.add.image(x, y, "star").setScale(0.5).setInteractive();

    image.on("pointerdown", () => {
      alert(`Image ${i + 1} clicked!`);
    });
  }
}

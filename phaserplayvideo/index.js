class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  create() {
    //  Here we create our video Game Object and then we call `loadURL` to load the video in.
    const video = this.add.video(340, 360);

    video.loadURL("assets/videos/tunnel.mp4", true);
    video.setDisplaySize(25, 25);
    video.play(true);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: "#000000",
  parent: "phaser-example",
  scene: Example,
};

let game = new Phaser.Game(config);

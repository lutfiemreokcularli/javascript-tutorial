import { Scene, PhaserHelper } from "./Minti.js";
var _this;
var url = App.assets.mintibuch.units.meineFamilie + "seite-1/" + App.type + "/";
let themeUrl = App.assets.mintibuchThemes;
let x, y;
var Seite1 = {
  Assets: {
    baseURL:
      App.assets.mintibuch.units.meineFamilie + "seite-1/" + App.type + "/",
    mp3Player: true,
    defaultItems: true,
    image: {
      box1: "1.png",
      logo: themeUrl + "/minticitylogo.png",
    },
    audio: {
      start: "sound.mp3",
    },
  },
  config: Minti.mintibuchConfig1,
};
Seite1.PlayScene = function () {
  this.init = function () {
    this.add.image(0, 0, "bg");

    if (App.type == "junior") {
      (x = 825), (y = 455);
    }
    if (App.type == "teenage") {
      (x = 1026), (y = 455);
    }

    this.gorsel = this.add.image(x, y, "box1");
    this.gorsel.anchor.set(0.5);

    this.logo = this.add.image(Minti.mintibuchConfig1.width / 2, 50, "logo");
    this.logo.anchor.set(0.5);
  };
  this.create = function () {
    console.log(Seite1.Assets.baseURL);
    new Minti.PhaserHelper.MP3Player(this, "default", "start", {
      autoPlay: false,
      volume: 1,
    });
    //$('audio').attr('src', App.url+'/web/mintibuch/starter/das-deutsche-abc/seite-1/sound.mp3');
  };
};
let core;
export function startGame() {
  core = new Phaser.Game(Seite1.config);
  core.state.add("Boot", new PhaserHelper.BootState("Preload"), true);
  core.state.add(
    "Preload",
    new PhaserHelper.PreloadState("PlayScene", Seite1.Assets, core)
  );
  core.state.add("PlayScene", Seite1.PlayScene);
}

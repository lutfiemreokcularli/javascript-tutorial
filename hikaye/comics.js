$(document).ready(function () {
  var Pages = {
    //"baseURL": "/web/lesen/comics/minti-momo-in-sachsen/lesen/",
    baseURL: App.assets.comics,
    textPlace: "50",
    data: [
      [{ img: "1s", place: [960, 1080], type: "image" }],
      [{ img: "2s", place: [960, 1080], type: "image" }],
      [{ img: "3s", place: [960, 1080], type: "image" }],
      [{ img: "4s", place: [960, 1080], type: "image" }],
      [{ img: "5s", place: [960, 1080], type: "image" }],
      [{ img: "6s", place: [960, 1080], type: "image" }],
      [{ img: "7s", place: [960, 1080], type: "image" }],
      [{ img: "8s", place: [960, 1080], type: "image" }],
      [{ img: "9s", place: [960, 1080], type: "image" }],
      [{ img: "10s", place: [960, 1080], type: "image" }],
      [{ img: "11s", place: [960, 1080], type: "image" }],
      [{ img: "12s", place: [960, 1080], type: "image" }],
      [{ img: "13s", place: [960, 1080], type: "image" }],
      [{ img: "14s", place: [960, 1080], type: "image" }],
      [{ img: "15s", place: [960, 1080], type: "image" }],
      [{ img: "16s", place: [960, 1080], type: "image" }],
      [{ img: "17s", place: [960, 1080], type: "image" }],
      [{ img: "18s", place: [960, 1080], type: "image" }],
      [{ img: "19s", place: [960, 1080], type: "image" }],
      [{ img: "20s", place: [960, 1080], type: "image" }],
      [{ img: "21s", place: [960, 1080], type: "image" }],
      [{ img: "22s", place: [960, 1080], type: "image" }],
      [{ img: "23s1", place: [960, 1080], type: "image" }],
      [{ img: "24s", place: [960, 1080], type: "image" }],
      [{ img: "25s", place: [960, 1080], type: "image" }],
      [{ img: "26s", place: [960, 1080], type: "image" }],
    ],
  };
  var Comics = {
    Assets: {
      baseURL: Pages.baseURL,
      defaultItems: false,
      image: {
        next: "next.png",
        prev: "prev.png",
        fse: "z1.png",
        fs: "z2.png",
      },
      audio: {
        page: "page.mp3",
      },
    },
    config: {
      width: 1920,
      height: 1080,
      debug: false,
      transparent: false,
      renderer: Phaser.AUTO,
      seed: [(Date.now() * Math.random()).toString()],
      parent: "core",
    },
    PlayScene: function () {},
  };
  var myPages = Pages;
  for (var i = 0, dat; i < myPages.data.length; i++) {
    for (var j = 0; j < myPages.data[i].length; j++) {
      dat = myPages.data[i][j];
      Comics.Assets.image[dat.img] = dat.img + ".jpg";
    }
  }
  Comics.Assets.baseURL = myPages.baseURL;
  Comics.PlayScene.prototype = {
    init: function () {
      this.isPlaying = false;
      if (myPages.data.length > 1) {
        this.counter = 0;

        this.pageInfo = myPages.data[this.counter];
      } else {
        this.pageInfo = myPages.data[0];
      }
      this.addFullScreenButtons = Minti.Scene.addFullScreenButtons.bind(this);
    },
    create: function () {
      if (this.pageInfoText)
        this.pageInfoText.setText(
          this.counter + 1 + " / " + myPages.data.length
        );
      if (this.part) {
        this.part.destroy(true);
      }
      if (this.next) {
        this.next.destroy();
      }
      if (this.prev) {
        this.prev.destroy();
      }

      this.part = this.add.group(this.world, "part");
      for (var i = 0, dat; i < this.pageInfo.length; i++) {
        dat = this.pageInfo[i];
        if (typeof dat === "object") {
          var elem = this.add[dat.type](
            parseFloat(dat.place[0]),
            parseFloat(dat.place[1]),
            dat.img
          );
          elem.anchor.set(0.5, 1);
          if (dat.type === "button") {
            elem.sound = "a" + dat.img;
            if (!Comics.config.debug) {
              elem.events.onInputDown.add(this.onClick, this);
              elem.events.onInputOut.add(Minti.PhaserHelper.onInput.Out, this);
              elem.events.onInputOver.add(
                Minti.PhaserHelper.onInput.Over,
                this
              );
            }
            Minti.PhaserHelper.getText(
              this,
              parseFloat(dat.place[0]),
              parseFloat(dat.place[1]) +
                parseFloat(myPages.textPlace) +
                parseFloat(dat.textPlace || 0),
              0.5,
              dat.text || "",
              { font: "35px Amaranth" },
              "part"
            );
          }
          if (Comics.config.debug) {
            elem.inputEnabled = true;
            elem.input.enableDrag(false, false);
            elem.events.onDragStop.add(function (e) {
              console.log(e.x + ", " + e.y);
              console.log("x:" + e.x + ", y:" + e.y);
            });
          }
          this.part.add(elem);
          this.addNavigation();
        }
      }
      this.addFullScreenButtons(1840, 20, 0.4, "fs", "fse");
    },
    addNavigation: function () {
      if (this.counter != myPages.data.length - 1) {
        this.next = this.add.button(
          this.world.width - 70,
          550,
          "next",
          function () {
            sound = this.add.sound("page", 0.2, false);
            sound.play();
            this.counter++;
            if (this.counter > myPages.data.length - 2) {
              //this.counter = 0;

              this.pageInfo = myPages.data[this.counter];
              this.create();
              this.next.destroy();
            }
            if (this.counter < myPages.data.length - 1) {
              this.pageInfo = myPages.data[this.counter];
              this.create();
            }
          },
          this
        );
        this.next.anchor.set(0.5);
        this.next.scale.set(1.2);
        this.next.events.onInputOver.add(Minti.PhaserHelper.onInput.Over, this);
        this.next.events.onInputOut.add(Minti.PhaserHelper.onInput.Out, this);
      }

      /* this.pageInfoText = Minti.PhaserHelper.getText(this, this.world.centerX, 1030, .5, (this.counter + 1) + ' / ' + myPages.data.length, { color: 'white', background: 'white', font: 'bold 40px Amaranth', align: 'center' }, 'world'); */
      this.pageInfoText = Minti.PhaserHelper.getText(
        this,
        this.world.centerX,
        1030,
        0.5,
        this.counter + 1 + " / " + myPages.data.length,
        {
          font: "bold 40px Amaranth",
          fill: "#f5faf6",
        },
        "world"
      );
      if (this.counter != 0) {
        this.prev = this.add.button(
          70,
          this.next.y,
          "prev",
          function () {
            sound = this.add.sound("page", 0.2, false);
            sound.play();
            this.counter--;
            if (this.counter == 0) {
              //this.counter = myPages.data.length - 1;
              this.pageInfo = myPages.data[this.counter];
              this.create();
              this.prev.destroy();
            }
            if (this.counter > 0) {
              this.pageInfo = myPages.data[this.counter];
              this.create();
            }
          },
          this
        );
        this.prev.anchor.set(0.5);
        this.prev.scale.set(1.2);
        this.prev.events.onInputOver.add(Minti.PhaserHelper.onInput.Over, this);
        this.prev.events.onInputOut.add(Minti.PhaserHelper.onInput.Out, this);
      }
    },
    onClick: function (e) {
      if (!this.isPlaying) {
        this.isPlaying = !this.isPlaying;
        var snd = this.sound.play(e.sound);
        snd.onStop.add(function () {
          this.isPlaying = !this.isPlaying;
        }, this);
      }
    },
  };
  var core = new Phaser.Game(Comics.config);
  core.state.add("Boot", new Minti.PhaserHelper.BootState("Preload"), true);
  core.state.add(
    "Preload",
    new Minti.PhaserHelper.PreloadState("PlayScene", Comics.Assets, core)
  );
  core.state.add("PlayScene", Comics.PlayScene);
});

var _this, PlayScene;
var pageType = pageContent.pageType;
var MintibuchPage = {
  Config: Minti.GetConfig({
    title: pageContent.title,
    version: pageContent.version,
    //scene: [ Minti.KeyboardScene ],
  }),
  Assets: {
    baseURL: pageContent.baseURL,
    image: {},
    audio: {
      instruction: pageType + "/instruction.mp3",
    },
  },
};
var assetURL = pageContent.baseURL.replace(pageContent.slug, "assets");
for (var i = 0; i < pageContent.data.data.length; i++) {
  var elem = pageContent.data.data[i];
  if (pageType === Minti.Types.MAXI) {
    MintibuchPage.Assets.image[elem] =
      pageType + "/" + Minti.Slugify(elem) + ".png";
  } else if (pageType === Minti.Types.MINI) {
    MintibuchPage.Assets.audio[elem] =
      assetURL + "/" + Minti.Slugify(elem) + ".mp3";
    for (var j = 0; j < 4; j++) {
      var name = Minti.Slugify(elem) + "-" + (j + 1);
      MintibuchPage.Assets.image[name] = pageType + "/" + name + ".png";
    }
  }
}
if (pageType === Minti.Types.MAXI) {
  MintibuchPage.Config.scene = [Minti.KeyboardScene];
  MintibuchPage.Assets.image.textPlace = pageType + "/text-place.png";
  PlayScene = new Phaser.Class({
    Extends: Minti.Scene,
    _create: function () {
      _this = this;
      this.headers = pageContent.data.headers;
      this.data = pageContent.data.data;
      this.limit = this.data.length;
      this.addInstruction(pageType, App.prod, this.addQuestion);
    },
    addQuestion: function () {
      if (this.part) {
        this.part.destroy(true);
      }
      this.part = this.add.container();
      var rand = Minti.Utils.RemoveRandomItem(this.data);
      var image = this.add
        .image(this.centerX, this.centerY + 140, rand)
        .setScale(0);
      var place = this.add
        .image(image.x, image.y - 310, "textPlace")
        .setScale(0);
      var text = this.add
        .text(place.x, place.y, "der ", { fontSize: 60 })
        .setScale(0);
      Minti.Buttonify(place, function () {
        _this.KeyboardScene.setTarget(text);
      });

      this.add.controlButton(1530, place.y, this.onControlClick);

      this.part.add([image, place, text, this.controlButton.setScale(0)]);
      this.part.text = text;
      this.part.datum = rand;

      if (this.KeyboardScene.isVisible) {
        debugger;
        if (!this.KeyboardScene.inView) {
          this.KeyboardScene.toggleView();
        }
      }
      this.KeyboardScene.setTarget(text);
      this.tweens.add({
        targets: this.part.list,
        scale: 1,
        ease: "Back",
        duration: 400,
        delay: this.tweens.stagger(50),
      });

      this.createParticles();
    },
    onControlClick: function () {
      var scene = this.scene,
        part = scene.part;
      this.destroy();
      var text = part.text;
      scene.counter++;
      scene.KeyboardScene.target = false;
      scene.KeyboardScene.clearTarget();
      scene.KeyboardScene.toggleView();
      part.iterate(function (ch) {
        ch.disableInteractive();
      });
      if (
        text.text.mtrim().toLowerCase() === part.datum.mtrim().toLowerCase()
      ) {
        scene.correctAnswer();
        text.setText(part.datum).setColor(Minti.Colors.Correct.Hex);
      } else {
        scene.wrongAnswer();
        text.setColor(Minti.Colors.Wrong.Hex);
        part.add(
          scene.make
            .text({
              x: text.x,
              y: text.y - 100,
              text: part.datum,
              style: text.style,
            })
            .setColor(Minti.Colors.Correct.Hex)
        );
      }
      if (scene.data.length) {
        scene.addNext(this.x, this.y, scene.addQuestion);
      } else {
        scene._endPage();
      }
    },
  });
} else if (pageType === Minti.Types.MINI) {
  MintibuchPage.Assets.timerPlace = true;
  var source, _w, _h;
  PlayScene = new Phaser.Class({
    Extends: Minti.Scene,
    _create: function () {
      _this = this;
      this.fullTime = 5;
      this.headers = pageContent.data.headers;
      this.data = pageContent.data.data;
      this.limit = this.data.length;
      var key = Object.keys(this.textures.list).find(function (ch) {
        return ch.includes("der-");
      });
      source = this.textures.list[key].source[0];
      _w = source.width / 2;
      _h = source.height / 2;
      this.addInstruction(pageType, App.prod, this.addQuestion);
      this.counterText.setX(1650);
    },
    addQuestion: function () {
      var rand = Minti.Utils.RemoveRandomItem(this.data);
      if (this.part) {
        this.part.destroy(true);
      }
      this.part = this.add.container();
      this.part.drags = [];
      this.part.datum = rand;
      this.part.counter = 0;
      this.part.limit = 0;
      var drags = [
        { x: this.centerX - _w, y: this.centerY + 50 - _h, key: 1 },
        { x: this.centerX + _w, y: this.centerY + 50 - _h, key: 2 },
        { x: this.centerX - _w, y: this.centerY + 50 + _h, key: 3 },
        { x: this.centerX + _w, y: this.centerY + 50 + _h, key: 4 },
      ].map(function (ch) {
        ch.key = Minti.Slugify(rand) + "-" + ch.key;
        return ch;
      });
      this.places = this.add.container().setVisible(false);
      this.part.add(this.places);
      for (var i = 0; i < drags.length; i++) {
        var drag = drags[i];
        var place = this.make.image(drag).setTint(0x000000).setAlpha(0.25);
        place.datum = drag.key;
        this.places.add(place);
      }
      for (i = 0; i < drags.length; i++) {
        drag = drags[i];
        var draggable = this.make.image(drag).setScale(0);
        draggable.datum = drag.key;
        Minti.Buttonify(draggable, {
          draggable: true,
          disable: true,
        }).on(Phaser.Input.Events.DRAG_END, this.onDragEnd);
        this.part.add(draggable);
        this.part.drags.push(draggable);
        this.part.limit++;
      }

      this.tweens.add({
        targets: this.part.drags,
        scale: 1,
        ease: "Back",
        duration: 400,
        delay: this.tweens.stagger(50),
      });

      this.addTimerPlace(this.centerX, 175, 5);
      var time = 5;
      this.timer = this.time.addEvent({
        repeat: time - 1,
        delay: 1000,
        callbackScope: this,
        callback: function () {
          time--;
          this.updateTimer(time);
          if (time === 0) {
            this.timeEnd();
          }
        },
      });
      this.createParticles();
    },
    timeEnd: function () {
      this.randomPointRect = Phaser.Geom.Rectangle.CenterOn(
        new Phaser.Geom.Rectangle(0, 0, 16 * 50, 9 * 50),
        this.centerX,
        this.centerY
      );
      var drags = this.part.drags;
      this.shuffleImages(drags, function () {
        if (_this.timerGroup) {
          _this.timerGroup.destroy(true);
        }
        _this.shuffleImages(drags, function () {
          _this.shuffleImages(drags, function () {
            _this.part.drags.forEach(function (ch) {
              ch.setInteractive();
            });
          });
        });
      });
    },
    shuffleImages: function (array, callback) {
      this.places.setVisible(true);
      for (var i = 0; i < array.length; i++) {
        var element = array[i];
        var out = this.randomPointRect.getRandomPoint();
        this.tweens.add({
          targets: element,
          x: out.x,
          y: out.y,
          origin: 0.5,
          ease: "Back.easeOut",
          duration: 350,
          onComplete: function (tween, targets, param) {
            if (param === array.length - 1) {
              callback.call(_this);
            }
          },
          onCompleteParams: [i],
        });
      }
    },
    onDragEnd: function () {
      var scene = this.scene,
        part = scene.part,
        places = scene.places;
      var hit = false,
        wrongSound = false;
      scene.sound.stopAll();
      for (var i = 0; i < places.list.length; i++) {
        var obj = places.list[i];
        if (Minti.CheckOverlap(obj, this)) {
          if (this.datum === obj.datum) {
            hit = true;
            this.removeInteractive().setPosition(obj.x, obj.y);
            part.counter++;
            if (part.counter === part.limit) {
              scene.counter++;
              scene.correctAnswer();
              scene.sound.play(part.datum);
              if (scene.data.length) {
                scene.addNext(scene.addQuestion);
              } else {
                scene._endPage();
              }
            }
            break;
          } else {
            wrongSound = true;
          }
        }
      }
      if (!hit) {
        var out = scene.randomPointRect.getRandomPoint();
        scene.tweens.add({
          targets: this,
          x: out.x,
          y: out.y,
          origin: 0.5,
          ease: "Back.easeOut",
          duration: 350,
        });
        if (wrongSound) {
          scene.ys.play();
        }
      }
    },
  });
}
if (PlayScene) {
  var core = new Phaser.Game(MintibuchPage.Config);
  core.scene.add("PreloadScene", new Minti.PreloadScene(), true, {
    nextScene: "PlayScene",
    pageType: pageContent.pageType,
    Assets: MintibuchPage.Assets,
  });
  core.scene.add("PlayScene", PlayScene);
}

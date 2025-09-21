var _this;
var pageType = pageContent.pageType;
var MintibuchPage = {
  Config: Minti.GetConfig({
    title: pageContent.title,
    version: pageContent.version,
    //scene: [ Minti.KeyboardScene ],
  }),
  Assets: {
    baseURL: pageContent.baseURL,
    image: {
      que: "que.png",
      desk: "desk.png",
      cake: "cake.png",
      place: "place.png",
      candle: "candle.png",
    },
    audio: {
      instruction: pageType + "-instruction.mp3",
    },
  },
};
if (pageType === Minti.Types.MAXI) {
  MintibuchPage.Config.scene = [Minti.KeyboardScene];
}
var PlayScene = new Phaser.Class({
  Extends: Minti.Scene,
  _create: function () {
    _this = this;
    this.headers = pageContent.data.headers;
    this.pageContent = pageContent;
    this.add.image(this.centerX, 1009, "desk").setOrigin(0.5, 1);
    this.addInstruction(pageType, App.prod, this.addQuestion);
  },
  addQuestion: function () {
    this.party = this.add.container();
    var candPlaces = [
      { x: 911.1681914144971, y: 268.9303307529909, key: "candle", name: 11 },
      { x: 979.6270232230826, y: 272.5334271639691, key: "candle", name: 12 },
      { x: 893.1527093596061, y: 295.9535538353273, key: "candle", name: 7 },
      { x: 925.5805770584097, y: 294.1520056298382, key: "candle", name: 8 },
      { x: 967.0161857846589, y: 297.7551020408164, key: "candle", name: 9 },
      { x: 1006.6502463054189, y: 301.3581984517946, key: "candle", name: 10 },
      { x: 876.9387755102041, y: 337.38916256157637, key: "candle", name: 1 },
      { x: 900.3589021815623, y: 339.19071076706547, key: "candle", name: 2 },
      { x: 932.7867698803659, y: 335.58761435608733, key: "candle", name: 3 },
      { x: 967.0161857846587, y: 335.58761435608733, key: "candle", name: 4 },
      { x: 1001.2456016889514, y: 328.38142153413094, key: "candle", name: 5 },
      { x: 1040.8796622097116, y: 342.79380717804366, key: "candle", name: 6 },
    ];
    for (var i = 0; i < candPlaces.length; i++) {
      var candleData = candPlaces[i];
      this.party.add(
        this.make.image(candleData).setName(candleData.name).setVisible(false)
      );
    }
    this.cake = this.add.image(this.centerX, 590, "cake");
    var candle = this.add.image(536, 687, "candle");
    Minti.Buttonify(candle, true).on(
      Phaser.Input.Events.DRAG_END,
      this.onDragEnd
    );
    this.party.candle = candle;
    this.party.add([this.cake, candle]);
    this.addSendToTeacherButton(this.centerX + 600, this.centerY, function () {
      if (text) {
        _this.pageContent = pageContent;
        _this.teacherData.text = text.text;
        _this.teacherData.object = {
          header: _this.headers[0],
          text: _this.teacherData.text,
        };
      } else {
        _this.teacherData.object = {
          header: _this.headers[0],
          text: _this.teacherData.counter,
        };
        _this.teacherData.text = _this.teacherData.counter;
      }
    });
    if (pageType === Minti.Types.MAXI) {
      this.party.setX(-300);
      this.add.image(1347.15, 366.6, "que");
      this.add.text(1347.15, 366.6, "Wie alt bist du?", {
        fontSize: 55,
        color: "#FFF",
      });

      var place = this.add.image(1347.15, 500, "place");
      var text = this.add.text(place.x, place.y, "", {
        fontSize: 45,
      });
      Minti.Buttonify(place, function () {
        _this.KeyboardScene.setTarget(text);
      });
      this.KeyboardScene.setTarget(text);

      if (this.KeyboardScene.isVisible && !this.KeyboardScene.inView) {
        this.KeyboardScene.toggleView();
      }

      this.toTeacher.setPosition(1550, 200);
    }
    this.toTeacher.setInteractive();
  },
  onDragEnd: function () {
    var scene = this.scene;
    var hit = false,
      wrongSound = false;
    if (Minti.CheckOverlap(this, scene.cake)) {
      hit = true;
      scene.revert(this);
      scene.counter++;
      if (!scene.teacherData.counter) {
        scene.teacherData.counter = 0;
      }
      scene.teacherData.counter++;
      var cand = scene.party.getByName(scene.counter);
      if (cand) {
        cand.setVisible(true);
      }
    }
    if (!hit) {
      scene.tweens.add({
        targets: this,
        x: this.defaultPosition.x,
        y: this.defaultPosition.y,
        ease: "Back",
        duration: 400,
      });
    }
  },
  revert: function (gameObject) {
    var pos = gameObject.defaultPosition;
    gameObject.setPosition(pos.x, pos.y).setScale(0);
    this.tweens.add({
      targets: gameObject,
      scale: 1,
      ease: "Back",
      duration: 150,
    });
  },
});
var core = new Phaser.Game(MintibuchPage.Config);
core.scene.add("PreloadScene", new Minti.PreloadScene(), true, {
  nextScene: "PlayScene",
  pageType: pageContent.pageType,
  Assets: MintibuchPage.Assets,
});
core.scene.add("PlayScene", PlayScene);

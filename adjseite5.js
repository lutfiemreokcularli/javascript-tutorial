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
            place: 'place.png',
            circle: 'circle.png',
            textPlace: 'text-place.png',
        },
        audio: {
            instruction: 'instruction.mp3',
        },
    },
};
for(var i = 0; i < pageContent.data[pageType].length; i++) {
    var elem = pageContent.data[pageType][i];
    MintibuchPage.Assets.image[elem] = Minti.Slugify(elem, '_') + '.png';
    if(pageType === Minti.Types.MINI) {
        MintibuchPage.Assets.audio[elem] = Minti.Slugify(elem, '_') + '.mp3';
    }
}
var PlayScene = new Phaser.Class({
    Extends: Minti.Scene,
    _create: function() {
        _this = this;
        this.headers = pageContent.data.headers;
        this.data = pageContent.data[pageType];
        this.defaultData = this.data.slice(0);
        this.limit = this.data.length;
        this.addInstruction(pageType, App.prod, this.addQuestion);
    },
    addQuestion: function() {
        if(this.part) { this.part.destroy(true); }
        if (this.static) { this.static.clear(); }
        this.part = this.add.container();
        this.part.places = [];
        var rand = Minti.Utils.RemoveRandomItem(this.data);
        var place = this.add.image(505, 590, 'place').setScale(0);
        var image = this.add.image(place.x, place.y, rand).setScale(0);
        var dots = this.make.dots({
            x: this.centerX - 50,
            y: place.y,
            data: rand,
        }).setName('place').setScale(0);
        this.part.places.push(dots);
        this.tweens.add({
            targets: [ place, image, dots.first, dots.last ],
            scale: 1,
            ease: 'Back',
            duration: 400
        });


        var others = Minti.Utils.Shuffle(this.defaultData.filter(function(ch) { return ch !== rand })).slice(0, 2);
        others.push(rand); Minti.Utils.Shuffle(others);
        for (var i = 0, farky = -250; i < others.length; i++) {
            var other = others[i], arr = [];
            var circle = this.make.dots({
                x: this.centerX + 325,
                y: place.y + farky,
                data: other,
            }).setScale(0);
            arr.push(circle.first, circle.last);
            if(pageType === Minti.Types.MAXI) {
                var tp = this.add.image(this.centerX + 610, place.y + farky, 'textPlace').setScale(0);
                var text = this.add.text(tp.x, tp.y, other, { fontSize: 60 }).setScale(0);
                this.part.add([tp, text]);
                arr.push(tp, text);
            }
            else if(pageType === Minti.Types.MINI) {
                var snd = this.add.image(this.centerX + 610, place.y + farky, 'sound').setScale(0);
                snd._data = other;
                Minti.Buttonify(snd, function() {
                    Minti.TweenBigger(this);
                    this.scene.sound.stopAll();
                    this.scene.sound.play(this._data);
                });
                this.part.add(snd);
                arr.push(snd);
            }
            this.part.add(circle);
            this.part.places.push(circle);
            this.tweens.add({
                targets: arr,
                scale: 1,
                ease: 'Back',
                duration: 400,
                delay: i * 50
            });
            farky += 250;
        }

        this.part.add([ place, image, dots ]);
        this.createParticles();
    },
    onDragStart: function() {
        this.scene.renderLive = true;
        this.scene.target = this.parentContainer;
        this.parentContainer.parentContainer.bringToTop(this.parentContainer);
    },
    onDragEnd: function () {
        var scene = this.scene, parent = this.parentContainer;
        var hit = false, wrongSound = false, pos;

        for (var i = 0; i < scene.part.places.length; i++) {
            var place = scene.part.places[i];
            if(parent !== place && Minti.CheckOverlap(this, place)) {
                if(parent._data === place._data) {
                    hit = true;
                    this.setPosition(place.last.x, place.last.y);
                    place.last.removeInteractive();
                    parent.draw();
                    scene.counter++;
                    scene.correctAnswer();
                    scene.renderLive = false;
                    scene.target = null;
                    scene.live.clear();
                    if(scene.data.length) {
                        scene.addNext(scene.addQuestion);
                    }
                    else {
                        scene._endPage();
                    }
                }
                else {
                    wrongSound = true;
                }
            }
        }

        if (!hit) {
            scene.tweens.add({
                targets: this,
                x: this.defaultPosition.x,
                y: this.defaultPosition.y,
                ease: 'Back',
                duration: 400,
            });
            if (wrongSound) { scene.wrongAnswer(); }
        }
    },
    update: function() {
        if(this.renderLive && this.target) {
            this.live.clear()
            .lineStyle(4, 0x955899, 1)
            .moveTo(this.target.first.x, this.target.first.y)
            .lineTo(this.target.last.x , this.target.last.y)
            .stroke();
        }
    },
});
var core = new Phaser.Game(MintibuchPage.Config);
core.scene.add('PreloadScene', new Minti.PreloadScene, true, {
    nextScene: 'PlayScene',
    pageType: pageContent.pageType,
    Assets: MintibuchPage.Assets
});
core.scene.add('PlayScene', PlayScene);

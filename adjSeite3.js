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
            place: 'place.png'
        },
        audio: {
            instruction: 'instruction.mp3',
        },
    },
};
for (var i = 0; i < pageContent.data[pageType].length; i++) {
    var elem = pageContent.data[pageType][i]
    MintibuchPage.Assets.image[elem] = Minti.Slugify(elem) + '.png';
    MintibuchPage.Assets.audio[elem] = Minti.Slugify(elem) + '.mp3';
}
var PlayScene = new Phaser.Class({
    Extends: Minti.Scene,
    _create: function () {
        _this = this;
        this.headers = pageContent.data.headers;
        this.data = pageContent.data[pageType].chunkBy(2);
        this.addInstruction(pageType, App.prod, this.addQue);
    },
    addQue: function () {
        this.part = this.add.container();
        for (var i = 0; i < this.data.length; i++) {
            var datum = this.data[i];
            var gr = this.add.container();
            for (var j = 0, farkx = -250; j < datum.length; j++) {
                var dat = datum[j];
                var img = this.add.image(this.centerX + farkx, this.centerY, dat);
                var snd = this.add.image(this.centerX + farkx, this.centerY + 350, 'sound').setScale(.75);
                snd.datum = dat;
                Minti.Buttonify(snd, this.playSound);
                gr.add([img, snd]);
                if(pageType === Minti.Types.MAXI) {
                    var place = this.add.image(snd.x, snd.y, 'place');
                    var text = this.add.text(place.x, place.y, dat, {
                        fontSize: 50,
                        fontStyle: 'bold',
                        fontFamily: Minti.Font
                    });
                    gr.add([place, text]);
                    snd.setX(j === 0 ? 450 : 1470);
                }
                farkx += 500;
            }
            this.part.add(gr.setVisible(false));
        }
        this.part.first.setVisible(true);

        this.counter = 0;
        this.right = this.add.image(1750, this.centerY, 'rightArrow');
        this.right.datum = 1;
        Minti.Buttonify(this.right, this.show);
        this.left = this.add.image(170, this.centerY, 'rightArrow');
        this.left.scaleX = -1; this.left.datum = -1;
        Minti.Buttonify(this.left, this.show);
    },
    show: function() {
        var scene = this.scene;
        scene.counter += this.datum;
        if(scene.counter < 0) {
            scene.counter = scene.part.list.length - 1;
        }
        if(scene.counter >= scene.part.list.length) {
            scene.counter = 0;
        }
        scene.part.each(function(ch) { ch.setVisible(false); });
        scene.part.list[scene.counter].setVisible(true);
    },
    playSound: function() {
        Minti.TweenBigger(this);
        this.scene.sound.stopAll();
        this.scene.sound.play(this.datum);
    },
});
var core = new Phaser.Game(MintibuchPage.Config);
core.scene.add('PreloadScene', new Minti.PreloadScene, true, {
    nextScene: 'PlayScene',
    pageType: pageContent.pageType,
    Assets: MintibuchPage.Assets,
});
core.scene.add('PlayScene', PlayScene);
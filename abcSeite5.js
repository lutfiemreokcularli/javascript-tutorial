var _this;
var pageType = pageContent.pageType;
var MintibuchPage = {
    Config: Minti.GetConfig({
        title: pageContent.title,
        version: pageContent.version
    }),
    Assets: {
        baseURL: pageContent.baseURL,
        image: {},
        audio: {
            instruction: pageType + '-instruction.mp3',
        },
    },
};
var assetURL = pageContent.baseURL.replace(pageContent.slug, 'assets');
for(var i = 0; i < pageContent.data.alphabet.length; i++) {
    var letter = pageContent.data.alphabet[i];
    MintibuchPage.Assets.image[letter] = letter+'.png';
    MintibuchPage.Assets.audio[letter] = assetURL + 'sound/' + letter + '.mp3';
}
var PlayScene = new Phaser.Class({
    Extends: Minti.Scene,
    _create: function() {
        _this = this;
        this.headers = pageContent.data[pageType].headers;
        this.addInstruction(pageType, App.prod, this.onStart);
    },
    onStart: function() {
        var alphabet = pageContent.data.alphabet;
        var gr = this.add.container(0, 0);
        for(var i = 0, farkx = 300, farky = 270; i < alphabet.length; i++) {
            if(i !== 0 && i % 7 === 0) { farkx = 300; farky += 200; }
            if(i === 21) { farkx += 225; }
            var l = alphabet[i];
            var letter = this.add.image(farkx, farky, l);
            Minti.Buttonify(letter, {
                hitArea: new Phaser.Geom.Rectangle(0, 30, 180, 150),
                hitAreaCallback: Phaser.Geom.Rectangle.Contains,
                onInput: this.game.device.os.desktop,
                callback: function() {
                    if(!this.scene.game.device.os.desktop) {
                        Minti.TweenBigger(this);
                    }
                    this.scene.sound.stopAll();
                    this.scene.sound.play(this.texture.key);
                }
            });
            gr.add(letter.setScale(0));
            farkx += 225;
        }
        this.tweens.add({
            targets: gr.getAll(),
            scale: 1,
            ease: 'Back',
            duration: 350,
            delay: this.tweens.stagger(50, { from: 'center' })
        });
    }
});
var core = new Phaser.Game(MintibuchPage.Config);
core.scene.add('PreloadScene', new Minti.PreloadScene, true, {
    nextScene: 'PlayScene',
    pageType: pageContent.pageType,
    Assets: MintibuchPage.Assets
});
core.scene.add('PlayScene', PlayScene);

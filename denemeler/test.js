document.addEventListener("DOMContentLoaded", function(event) {
    var _this;
    let themeUrl=App.assets.mintibuchThemes;
    var Seite4 = {
        Assets: {
        
            baseURL:App.assets.mintibuch.units.meineFamilie+'seite-4/'+App.type+'/',
            mp3Player: false,
            defaultItems: true,
            image: {
                logo : themeUrl + '/minticitylogo.png',
                //bg: App.url + '/web/mintibuch/themes/' + App.type + '/' + App.theme.theme_mintibuch + '/background.jpg',
                drag: 'drag.png',
                place: 'place.png',
                weiter: 'weiter.png',
                box1:'box1.png'
            },
            audio: {}
        },
        config: _extends(Minti.mintibuchConfig1, {})
    };
    Seite4.PlayScene = function() {
        this.total = 0;
        this.counter = 0;
        this.places = [];
        this.init = function () {
            _this = this;
            this.add.image(0, 0, 'bg');
             this.logo = this.add.image(Minti.mintibuchConfig1.width/2, 50 , 'logo');
            this.logo.anchor.set(.5);
            var pageData = App.content.data;
            this.headers = pageData.headers;
            this.data = pageData.data;
            this.LENGTH = this.data.length;
            for(var key in Minti.Scene) {
                if( ! Minti.Scene.hasOwnProperty(key)) continue;
                this[key] = Minti.Scene[key].bind(this);
            }
        };
        this.create = function () {
            this.arrangeDefaultButtons(this.headers[0], true, true);
            this.arrangeScene();
            
        };
        this.arrangeScene = function () {
            this.add.image(880,100,'box1').scale.set(0.98)
            for (var i = 0, farky= 0, farkx = 0; i < this.data.length; i++) {
                var place = this.data[i];
                var p = this.add.image(place[0], place[1], 'place');
                p.scale.set(i === 0 ? 1.2 : .9)
                p.anchor.set(.5);
                p.data = place[2];
                p.haveSpace = true;
                p.addChild(Minti.PhaserHelper.getText(this, 0, 0, .5, place[2], {
                    font: (i === 0 ? 20 : 20)+'px Amaranth',
                    align: 'center'
                }));
                p.children[0].visible = false;
                this.places.push(p);
            }
            var drags = Minti.Utils.shuffle(this.data.map(function (child) {return child[2];}));
            for (i = 0; i < drags.length; i++) {
                var drag = drags[i];
                if(i !== 0 && i === drags.length / 2) { farky = 0; farkx += 300; }
                p = this.add.button(180+farkx, 200+farky, 'drag');
                p.anchor.set(.5);
                p.data = drag;
                p.addChild(Minti.PhaserHelper.getText(this, 0, 0, .5, drag, {
                    font: '30px Amaranth',
                    align: 'center'
                }));
                p.input.enableDrag(false, true);
                p.defaultPosition = new Phaser.Point(p.x, p.y);
                p.events.onDragStop.add(this.onDragStop, this);
                farky += 80;
            }
          
        };
        this.onDragStop = function(e) {
            var hit = false, wrongSound = false;
            for (var i = 0; i < this.places.length; i++) {
                var obj = this.places[i];
                if(obj.haveSpace) {
                    if(Minti.PhaserHelper.checkOverlap(obj, e)) {
                        if(e.data === obj.data) {
                            hit = true;
                            e.xy(obj);
                            e.tint = 0x007700;
                            e.destroy();
                            this.counter++;
                            obj.children[0].visible = true;
                            if(this.counter === this.LENGTH) {
                                new Minti.PhaserHelper.PopUp(this);
                            }
                            this.total += 1000 / this.LENGTH;
                            this.ds.stop(); this.gl.stop(); this.ys.stop(); this.ds.play(); this.gl.play();
                            wrongSound = false;
                            break;
                        }
                        else {
                            wrongSound = true;
                        }
                    }
                }
            }
            this.puanText.setText(Math.round(this.total));
            if(!hit) {
                core.add.tween(e).to({x: e.defaultPosition.x, y: e.defaultPosition.y}, 650, Phaser.Easing.Back.Out, true);
                if(wrongSound) { this.ds.stop(); this.gl.stop(); this.ys.stop(); this.ys.play(); }
            }
        };
    };
    var core = new Phaser.Game(Seite4.config);
    core.state.add('Boot', new Minti.PhaserHelper.BootState('Preload'), true);
    core.state.add('Preload', new Minti.PhaserHelper.PreloadState('PlayScene', Seite4.Assets, core));
    core.state.add('PlayScene', Seite4.PlayScene);
});
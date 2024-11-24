export function testfnc(){
    return "emre on";
}

/* module.exports = {
    testfnc
} */

    document.addEventListener("DOMContentLoaded", function (event) {
        let themeURL = App.assets.mintibuchThemes;
        let arrayOfSoundButtons = [];
        let arrayOfinputs = [];
        let trueanswer = [];
        let arrayOfKontrolleButtons = [];
        let arrayOfBoxes = [];
        let _total = 0, isPlaying = false, genSound;
        var _subData;
        var _this;
        this.Url = App.content.baseURL;
        let inputIndex = 0;
    
    
        var Seite5 = {
            Assets: {
                baseURL: App.assets.mintibuch.units.dasDeutscheAbc + 'seite-5/' + App.type + '/',
                mp3Player: false,
                defaultItems: true,
                image: {
                    yer: 'box.png',
                    box1: 'box1.png',
                    kontrolle: themeURL + App.type + '/'+App.theme.theme_mintibuch+'/kontrolle.png',
                    logo: themeURL + 'minticitylogo.png',
    
                    sound: themeURL + App.type + '/'+App.theme.theme_mintibuch+'/audio.png',
                },
                audio: {
                    sound0: App.url + "/web/mintibuch/starter/das-deutsche-abc/seite-5/junior/1.mp3",
                    sound1: App.url + "/web/mintibuch/starter/das-deutsche-abc/seite-5/junior/2.mp3",
                    sound2: App.url + "/web/mintibuch/starter/das-deutsche-abc/seite-5/junior/3.mp3",
                    sound3: App.url + "/web/mintibuch/starter/das-deutsche-abc/seite-5/junior/4.mp3",
                    sound4: App.url + "/web/mintibuch/starter/das-deutsche-abc/seite-5/junior/5.mp3",
                    sound5: App.url + "/web/mintibuch/starter/das-deutsche-abc/seite-5/junior/6.mp3",
                    sound6: App.url + "/web/mintibuch/starter/das-deutsche-abc/seite-5/junior/7.mp3",
                }
            },
            config: _extends(Minti.mintibuchConfig1, {
                parent: 'core1'
            })//işlem gerçekleşmiş kod parçası
        };
    
        Seite5.PlayScene = function () {
            this.total = 0;
            this.answer = 0;
            this.options = [];
            this.isPlaying = false
    
            this.init = function () {
                //
    
                var pageData = App.content.data;
                this.headers = pageData.headers;
                this.data = pageData.data;
    
                _this = this;
                this.add.image(0, 0, 'bg');
                this.parent = $('#' + this.game.config.parent);
                this.logo = this.add.image(Minti.mintibuchConfig1.width / 2, 50, 'logo');
                this.logo.anchor.set(.5);
                for (var key in Minti.Scene) {
                    if (!Minti.Scene.hasOwnProperty(key)) continue;
                    this[key] = Minti.Scene[key].bind(this);
                }
            };
            this.create = function () {
                this.arrangeDefaultButtons(this.headers[0], true, true);
    
                addEvents(this.setFontSize.bind(this));
                this.soundButtons();
                this.createKontrolleButtons();
                this.arrangeBoxes();
                this.arrangeinputs();

            };
            this.arrangeinputs = function () {
                x = 22, y = 17
                for (let i = 0, fark = 0; i < 7; i++, fark += 11.3) {
                    this.parent.append('<div id="dc' + i + '" class="dcevap"></div><input id="in' + i + '" class="input" type="text" autocomplete="off" autocapitalize="off" maxlength="20" spellcheck="false">');
    
                    $('#in' + i).css({ top: y + fark + '%', left: x + '%', width: 50 + '%', });//inputu konumlandırmak için gerekli olan kodlar
                    $('#dc' + i).css({ top: y + fark + 6 + '%', left: x + '%', width: 50 + '%', });//doğru cevabı konumlandırmak için gereken kodla
                }
                $('#in0').focus();
    
                changeEvent(this.setFontSize.bind(this));
    
    
            };
            this.arrangeBoxes = function () {
                for (let i = 0, fark = 0, x = 360, y = 150; i < 7; i++, fark += 100) {
                    this.add.image(x, y + fark, "box1")
    
    
                }
            }

            this.createKontrolleButtons = function () {
                for (let i = 0; i < 7; i++) {
                    var x = 1500;
                    let y = 190 + 100 * (i);
                    arrayOfKontrolleButtons[i] = this.add.button(x, y, 'kontrolle', () => {
                        $('#in' + i).prop('disabled', true);
                        var current = this.data[i]
                        var son = current.data
                        console.log(son)
                        this.checkInput($('#in' + i), son, i)//kontrolü sağlayan fonksiyonun çağrılması   
                        if (isPlaying) { genSound.pause(); this.callback(); }
                        arrayOfSoundButtons[i].destroy();
                        arrayOfKontrolleButtons[i].destroy();
    
                        if (i==6) {
                            if (this.total != 0) {
                                new Minti.PhaserHelper.PopUp(this);
                            }
                        }
    
                    });
                    arrayOfKontrolleButtons[i].anchor.set(0.5)
                }
    
            };
            this.soundButtons = function () {
                for (let i = 0; i < 7; i++) {
                    var x = 250;
                    let a = i - 1
                    let y = 150 + 101 * (i);
                    arrayOfSoundButtons[i] = this.add.button(x, y, 'sound', () => {
                        if (!isPlaying) {
                            isPlaying = !isPlaying;
                            for (let j = 0; j < arrayOfSoundButtons.length; j++) {
    
                                if (i != j) {
                                    arrayOfSoundButtons[j].alpha = 0.4;
                                }
                            }
    
    
                            genSound = this.add.sound(`sound${i}`);
                            genSound.play();
    
                            genSound.onStop.add(this.callback, this);
    
                        }
    
                    })
    
                }
            };
            this.callback = function () {
    
                for (let i = 0; i < arrayOfSoundButtons.length; i++) {
                    arrayOfSoundButtons[i].alpha = 1;
                }
                isPlaying = !isPlaying;
            }
            this.setFontSize = function () {//Font boyutunu ayarlayan fonksiyonumuz 
                $('#core1 .input').css({ 'fontSize': ((this.parent.width() * (mintibuchInputFontSize + 2./*Fontun boyutunun büyüklüğünü ayarlayan sayımız*/)) / 1813) + 'em' });
                $('#core1 .dcevap').css({ 'fontSize': ((this.parent.width() * (mintibuchInputFontSize + 1.3/*Fontun boyutunun büyüklüğünü ayarlayan sayımız*/)) / 1813) + 'em' });
            }
            this.checkInput = function (input, data, i) {
                if (($.inArray(input.val(), data) !== -1)) {
                    input.css({ color: '#009900' });//Doğruysa girilen inputun rengini yeşil yapan css kodu
                    this.setMintos(1000 / 7)//Doğruysa verilcek soru başına mintos puanı;
                }
                else {
                    input.css({ color: '#EE0000' });//yanlışsa girilen inputu kırmızı renk yapan css kodu
                    $('#' + input.attr('id').replace('in' + i + '', 'dc' + i + '')).html(data[0]);//doğru cevabı inputun altına yazdıran kod
                }
            }
    
    
        }
        var core = new Phaser.Game(Seite5.config);
        core.state.add('Boot', new Minti.PhaserHelper.BootState('Preload'), true);
        core.state.add('Preload', new Minti.PhaserHelper.PreloadState('PlayScene', Seite5.Assets, core));
        core.state.add('PlayScene', Seite5.PlayScene);
    });
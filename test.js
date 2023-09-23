/*document.addEventListener("DOMContentLoaded", function(event) {
  var baseURL = App.content.baseURL;
  mintibuchFontSize = 8;
  var counter = 0, userAns = {}, _total = 0, $gonder = $('.gonder'), $core = $('#core'),
      questions = Minti.Helper.encodeString(App.content.data, atob);
  var LENGTH = questions.length;
  var validation;
  socket.emit('mintibuchPage');
  socket.on('mintibuchValidation', function(v){ validation = v; });
  socket.on('reconnect', function() { socket.emit('mintibuchPage'); });
  $('#bg').attr('src', baseURL+'bg.jpg');
  $gonder.find('img').attr('src', baseURL+'kaydet.png');
  $core.append('<div id="ornekDiv"><img alt="img" id="ornekimg" src="'+baseURL+'zb.png" class="img-fluid"></div><img alt="weiter" id="weiter" src="'+baseURL+'ileri.png" class="img-fluid weiter">');
  $('#weiter').on('click', function () {
      $(this).unbind().remove();
      $('#ornekDiv').remove();
      arrangeInput();
  });
  var callback = function (){
      $('.inputS').css({'fontSize': (($core * mintibuchInputFontSize) / 1920)+'em'});
  };
  function arrangeInput() {
      var $dcevap = $('.dcevap');
      $dcevap.hide(); $dcevap.html('');
      $core.append('<div class="minQuestionPar"><div class="minQuestion"><img alt="img" src="'+baseURL+(counter+1)+'.png" class="img-fluid"></div>' +
          '<input type="text" class="input"> <div id="dc1" class="dcevap"></div>'+
          '<input type="text" maxlength="2" class="inputS"><div id="dc2" class="dcevap"></div>'+
          '<div class="kontrol"><img alt="img" src="'+baseURL+'kontrol.png" class="img-fluid"></div></div>');
      var data = questions[counter];
      if(data['.input']) { data['#dc1'] = Object.assign({}, data['.input']); }
      if(data['.inputS']) { data['#dc2'] = Object.assign({}, data['.inputS']); }
      for(var key in data) {
          if(data.hasOwnProperty(key) && key !== 'ans') {
              $(key).css(data[key]);
          }
      }
      $('.input').focus();
      $('.kontrol').click(function (){
          $(this).unbind(); $(this).remove();
          $('.input, .inputS').attr('disabled', true);
          var inp = $('.input'), inp1 = $('.inputS');
          var ans1 = inp.val().mtrim();
          var ans2 = inp1.val().mtrim();
          if(ans1 === data.ans[0]) { _total += 1000 / 20; inp.css({'color': '#009900'}); }
          else { inp.css({'color': '#EE0000'}); $('#dc1').html(data.ans[0]); }
          
          if(ans2 === data.ans[1] || ((data.ans[2]) && data.ans[2] === ans2)) { _total += 1000 / 20; inp1.css({'color': '#009900'}); }
          else { inp1.css({'color': '#EE0000'}); $('#dc2').html(data.ans[1]); }
          userAns[counter] = { '.input': ans1, '.inputS': ans2 };
          counter++;
          if(counter < LENGTH) {
              $core.append('<img alt="img" id="weiter" src="'+baseURL+'ileri.png" class="img-fluid weiter">');
              $('#weiter').on('click', function () { $(this).unbind().remove(); $('.minQuestionPar').remove(); arrangeInput(); });
          }
          else {
              Minti.Helper.PopUp($core);
          }
          $('.puan').html(Math.round(_total));
      });
      changeEvent(callback);
  }
  addEvents(callback);
  $gonder.on('click', function(){
      $('#core .kontrol').trigger('click');
      Minti.Helper.PopUp($core);
      setTimeout(sendEvent, 0, _total, validation);
  });
});

*/





document.addEventListener("DOMContentLoaded", function (event) {
    var _this;
    let ak = 0;
    let ans = [];
    let themeURL = App.url + '/web/mintibuch/themes/' + App.type + '/' + App.theme.theme_mintibuch;
    //let dc1, dc2;
    let Url=App.content.baseURL;
    let _total = 0, isPlaying = false, genSound;
    var _this;
    var _subData;
    let fark1 = 0, fark2 = 0;


    var seite10 = {

        Assets: {
            baseURL: App.content.baseURL,
            mp3Player: true,
            defaultItems: true,
            
            image: {
                logo: App.url + '/web/mintibuch/themes' + '/minticitylogo.png',

                image0: 'box1.png',
                image1: 'box2.png',
                image2: '1.png',
                image3: '2.png',
                image4: '3.png',
                image5: '4.png',
                image6: '5.png',
                image7: '6.png',
                image8: '7.png',
                image9: '8.png',
                image10: '9.png',
                image11: '10.png',
                tick:  (Url == App.url + '/web/mintibuch/a1/a1-1/meine-familie/seite-10/junior/' ?App.url + '/web/mintibuch/themes' + '/junior/j-true96.png' : App.url + '/web/mintibuch/themes' +'/teenage/t-true96.png'),
                cross:  (Url == App.url + '/web/mintibuch/a1/a1-1/meine-familie/seite-10/junior/' ? App.url + '/web/mintibuch/themes' + '/junior/j-false96.png' : App.url + '/web/mintibuch/themes' + '/teenage/t-false96.png'),

                forwardBtn: 'ileri.png',

                sound: themeURL + '/audio.png',
                kontrolle: themeURL + '/kontrolle.png',
            },

        },

        config: _extends(Minti.mintibuchConfig1, {})
    };
    seite10.PlayScene = function () {
        this.nextImageIndice = 2;
        this.ansindice = 0;
        this.total = 0;
        let canvasHeight = Minti.mintibuchConfig1.height;
        Phaser.Device.whenReady(function () {
            core.add.plugin(PhaserInput.Plugin);
        });
        this.init = function () {

            this.dc1 = this.add.text((20), (Minti.mintibuchConfig1.height / 2 + 350), "");
            this.dc2 = this.add.text((20), (Minti.mintibuchConfig1.height / 2 + 350), "");
            this.cross = this.add.image(20,60,"cross");
            this.tick = this.add.image(20,60,"tick");
            var pageData = App.content.data;
            this.headers = pageData.headers;
            _subData = Minti.Helper.encodeString(pageData.ans, atob);
            _this = this;
            this.add.image(0, 0, 'bg');
            
            this.logo = this.add.image(Minti.mintibuchConfig1.width / 2, 50, 'logo');
            this.logo.anchor.set(.5);

            for (var key in Minti.Scene) {
                if (!Minti.Scene.hasOwnProperty(key)) continue;
                this[key] = Minti.Scene[key].bind(this);
            }

        };
        this.create = function () {
            this.arrangeScene();

            this.add.image(600, 100, 'image0').scale.set(0.8)
            this.box1 = this.add.image(450, 700, 'image1')
            this.arrangeDefaultButtons(this.headers[0], true, true);

            addEvents();



        };
        this.arrangeScene = function () {
            let counter = 0;
            for (let i = 0; i < 2; i++) {
                ans[i] = this.add.inputField((i == 0 ? Minti.mintibuchConfig1.width / 2 + 100 : Minti.mintibuchConfig1.width / 2 + 200), (Minti.mintibuchConfig1.height / 2), {
                    font: '20px Arial',
                    fill: '#212121',
                    fillAlpha: 1,
                    fontWeight: 'bold italic',
                    width: 5,
                    max: 0,
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#000',
                    borderRadius: 6,
                    placeHolder: '',
                    textAlign: 'center',
                    zoom: true
                });
            }

            this.ileri = this.add.button(1400, 500, 'forwardBtn', () => {
                counter++;
                this.box1.destroy();
                this.box1 = this.add.image(350, 700, `image${this.nextImageIndice++}`)
                this.box1.scale.set(.8)

                this.cross.destroy();
                this.tick.destroy();
                this.dc1.setText("");
                this.dc2.setText("");

                this.ileri.alpha = 0;
                this.ileri.input.enabled = false;

                ans[0].destroy();
                ans[1].destroy();

                var a = 0, a2 = 0;
                switch (counter) {
                    case 1: a = 650; a2 = 1420; break; case 2: a = 650; a2 = 1367; break; case 3: a = 650; a2 = 1404; break; case 4: a = 650; a2 = 1499; break; case 5: a = 650;
                        a2 = 1343; break; case 6: a = 650; a2 = 1383; break; case 7: a = 649; a2 = 1383; break; case 8: a = 650; a2 = 1394;
                        break; case 9: a = 650; a2 = 1394; break; case 10: a = 680; a2 = 1426; break;
                }

                for (let i = 0; i < 2; i++) {
                    ans[i] = this.add.inputField((i == 0 ? a : a2), (Minti.mintibuchConfig1.height / 2 + 285), {
                        font: '24px Arial',
                        fill: '#212121',
                        fillAlpha: 0,
                        fontWeight: 'bold italic',
                        width: i == 0 ? 130 : 55,
                        max: i == 0 ? 5 : 2,
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 6,
                        placeHolder: '',
                        textAlign: 'center',
                        zoom: true
                    });
                }


                arrayOfKontrolleButtons = this.add.button(1570, 100, 'kontrolle', () => {

                    //console.log(ans[i].value);

                    let userval1 = ans[0];
                    let userval2 = ans[1];
                    ca1 = _subData[this.ansindice][0]
                    ca2 = _subData[this.ansindice][1]

                    if($.inArray(userval1.value, _subData[this.ansindice]) !== -1)
                    {
                        _total = 1000 / 20;
                        this.setMintos(_total);
                    }
                    if($.inArray(userval2.value, _subData[this.ansindice]) !== -1)
                    {
                        _total = 1000 / 20;
                        this.setMintos(_total);
                    }
                    if ($.inArray(userval1.value, _subData[this.ansindice]) !== -1 && $.inArray(userval2.value, _subData[this.ansindice]) !== -1) {
                        this.tick = this.add.image(Minti.mintibuchConfig1.width / 2 + 700, (Minti.mintibuchConfig1.height / 2) + 255, 'tick');
                    }
                    if( $.inArray(userval1.value, _subData[this.ansindice]) == -1) {
                        
                        this.dc1 = this.add.text((a + 20), (Minti.mintibuchConfig1.height / 2 + 350), ca1);
                        
                       this.cross = this.add.image(Minti.mintibuchConfig1.width / 2 + 700, (Minti.mintibuchConfig1.height / 2) + 240, 'cross');
                        
                        this.dc1.fill = '#009900';
                    }
                    if($.inArray(userval2.value, _subData[this.ansindice]) == -1 )
                    {
                        this.cross.destroy();
                        this.dc2 = this.add.text((a2 + 20), (Minti.mintibuchConfig1.height / 2 + 350), ca2);
                        this.cross = this.add.image(Minti.mintibuchConfig1.width / 2 + 700, (Minti.mintibuchConfig1.height / 2) + 240, 'cross');
                        this.dc2.fill = '#009900';
                    }

                    arrayOfKontrolleButtons.destroy();
                    this.ileri.alpha = 1;
                    this.ileri.input.enabled = true;
                    this.ansindice++
                    if (this.ansindice == 10) {
                        new Minti.PhaserHelper.PopUp(this);
                        this.ileri.alpha = 0;
                        this.ileri.input.enabled = false;
                    }

                });


                /*let text1 =  document.getElementById('inR');
               let text2 =  document.getElementById('inL');
                let text3 = document.getElementById('dcR');
                let text4 = document.getElementById('dcL');
                text1.remove();
                text2.remove();
                text3.remove();
                text4.remove();
                $('#core').append('<input id="inR" type="text" class="input" maxlength="2"> <div id="dcR" class="dcevap"></div>');
                $('#core').append('<input id="inL" type="text" class="input "> <div id="dcL" class="dcevap"></div>');*/


                //$('#inR').value = "------------------"




                /*var a = 0 , a2= 0;
                switch(counter)
                {
                    case 1:
                        a = 76;
                        a2 = 74;
                        break;
                    case 2:
                        a = 73;
                        a2 = 71;
                        break;
                    case 3:
                        a= 75.5;
                        a2 = 73;
                        break;
                    case 4:
                        a= 80.5;
                        a2 = 78.2;
                        break;
                    case 5:
                        a= 72;
                        a2= 69.5;
                        break;
                    case 6:
                        a= 69;
                        a2= 72;
                        break;
                    case 7:
                        a = 69;
                        a2= 72;
                        break;
                    case 8:
                        a = 69.6;
                        a2= 72.5;
                        break;
                    case 9:
                        a = 69.6;
                        a2= 72.5;
                        break;
                    case 10:
                        a = 71.2;
                        a2= 74.2;
                        break;
                        
                    
                }
                

                $('#inR').css({ left: a + '%', top: ((100 * (this.box1.y + 10) / canvasHeight) + '%'), });
                $('#dcR').css({ left: a2 + '%', top: ((100 * (this.box1.y + 50) / canvasHeight) + '%'), });
                $('#inL').css({ left: 33 + '%', top: ((100 * (this.box1.y + 10) / canvasHeight) + '%'), });
                $('#dcL').css({ left: 33 + '%', top: ((100 * (this.box1.y + 50) / canvasHeight) + '%'), });

                this.kButton = this.add.button(1560, 80, 'kontrolle', () => {
                    if(this.ansindice <9){
                    this.ileri.input.enabled = true}
                    let $elemR = $('#inR');
                    let $elemL = $('#inL');
                    //$elem.attr('disabled', true);
                    //$elem1.attr('disabled',true)
                    var userValR = ($elemR.val());
                    var userValL = ($elemL.val());

                    if ($.inArray(userValR, _subData[this.ansindice]) !== -1) {
                        $elemR.css({ 'color': '#009900' });
                        _total = 1000 / 20;
                        this.setMintos(_total);
                        
                    }
                    else {
                        $elemR.css({ 'color': '#E00' });
                        $('#dcR').html(_subData[this.ansindice][1]);
                    }
                    if ($.inArray(userValL, _subData[this.ansindice]) !== -1) {
                        $elemL.css({ 'color': '#009900' });
                        _total = 1000 / 20;
                        this.setMintos(_total);
                    }
                    else {
                        $elemL.css({ 'color': '#E00' });
                        $('#dcL').html(_subData[this.ansindice][0]);
                    }
                
                    this.ileri.alpha = 1;
                    this.ileri.enabled = true;
                    this.kButton.destroy();
                    this.ansindice++
                    if (this.ansindice == 10) {
                        new Minti.PhaserHelper.PopUp(this);
                        this.ileri.alpha = 0;
                        this.ileri.enabled = false;
                    }

                });*/




            });


        }



    }
    var core = new Phaser.Game(seite10.config);
    core.state.add('Boot', new Minti.PhaserHelper.BootState('Preload'), true);
    core.state.add('Preload', new Minti.PhaserHelper.PreloadState('PlayScene', seite10.Assets, core));
    core.state.add('PlayScene', seite10.PlayScene);
});
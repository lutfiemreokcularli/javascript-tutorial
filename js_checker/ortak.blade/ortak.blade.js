document.addEventListener("DOMContentLoaded", function () {
  let initialTime = [];
  let timerIndices = [];
  let red, green, blue;
  let x = App.theme.theme_folder;
  var group;
  let group2;
  var core;
  let eventsPosX = 1760,
    eventPosY = 70;
  let arrayofThemeButtons = [];
  let notificationImage;
  let arrayOfAnimations = [];
  let starAnimation;
  let arrayOfEventsAnimations = [];
  let arrayOfButtonIndicesNotLoaded = [];
  let sayac = 0;
  let aufgabenBtnWidth = 0,
    aufgabenBtnHeight = 0;
  let themeButtonImageArry = [];
  let themeButtonImageSizeArray = [];
  let devicesScaleObj = {
    x0: 1,
    y0: 1,
    x1: 1,
    y1: 1,
  };
  let directionOfMinti1 = 1;
  let directionOfMinti2 = 1;
  //variables are related with smartphones
  let xPosition = window.innerWidth * devicePixelRatio;
  let yPosition = window.innerHeight * devicePixelRatio;
  let yCounter = 1;
  let xfactor = 0.75;
  let rowCompleted = 0;
  //variables are related with smartphones
  const userAgent = navigator.userAgent.toLowerCase();
  const isTablet =
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
      userAgent
    );
  const isMobile = /ipad|iPhone|Android/i.test(navigator.userAgent);
  let isPhone = false;
  let tweenAufgaben;
  if (isMobile && !isTablet) {
    isPhone = true;
  }

  //console.log(isTablet, isMobile);
  function getMeta(url, callback) {
    const img = new Image();
    img.onload = () => callback(null, img);
    img.onerror = (err) => callback(err);
    img.src = url;
  }

  var MainPage = {
    Assets: {
      //App.url + '/index/' + App.type + '/' + App.theme.theme_folder + '/'
      //'junior/' + App.theme.theme_folder + '/'
      //junior/city/
      //baseURL: `${App.url}/index/${App.type}/${App.theme.theme_folder}`,
      mp3Player: false,
      defaultItems: false,
      image: {
        startBg:
          App.assets.mainPageThemes +
          App.type +
          "/" +
          App.theme.theme_folder +
          "/background.jpg",
        avatar: App.user.avatar.face,
        mask:
          App.assets.mainPageThemes +
          App.type +
          "/" +
          App.theme.theme_folder +
          "/frame.png",
        lockImg: `https://cdn.minticity.com/assets/menu-icons/${App.type}/others/lock-${App.type}.png`,
        //sthNew: '/new.png',
      },
      atlas: {
        starNew: [
          `${App.assets.mainPageThemes}animations/spritesheets/starNew.png`,
          `${App.assets.mainPageThemes}animations/animationjsons/starNew.json`,
        ],
      },
    },
    config: _extends(
      isMobile && !isTablet ? Minti.mintibuchConfig3 : Minti.mintibuchConfig3,
      {
        renderer: Phaser.CANVAS,
      }
    ),
  };
  for (let i = 0; i < App.theme.theme_buttons.length; i++) {
    themeButtonImageArry.push(App.theme.theme_buttons[i].Image);
    themeButtonImageSizeArray.push([1, 1]);
    MainPage.Assets.image[App.theme.theme_buttons[i].ButtonName] =
      App.assets.mainPageThemes +
      App.type +
      "/" +
      App.theme.theme_folder +
      "/" +
      App.theme.theme_buttons[i].Image;
  }
  for (let i = 0; i <= 9; i++) {
    MainPage.Assets.image[`notification${i + 1}`] =
      i != 9
        ? App.assets.mainPageThemes +
          App.type +
          "/" +
          "icons" +
          "/" +
          "notification-icons" +
          "/" +
          "notification" +
          (i + 1) +
          ".png"
        : App.assets.mainPageThemes +
          App.type +
          "/" +
          "icons" +
          "/" +
          "notification-icons" +
          "/" +
          "notification9plus.png";
  }
  if (App.user.typeID === 2 || App.user.typeID == 3) {
    getMeta(
      App.assets.mainPageThemes +
        App.type +
        "/" +
        App.theme.theme_folder +
        "/aufgaben.png",
      (err, img) => {
        aufgabenBtnWidth = img.naturalWidth;
        aufgabenBtnHeight = img.naturalHeight;
      }
    );
  }
  for (let i = 0, j = 0; i < themeButtonImageArry.length; i++) {
    getMeta(
      App.assets.mainPageThemes +
        App.type +
        "/" +
        App.theme.theme_folder +
        "/" +
        themeButtonImageArry[i],
      (err, img) => {
        themeButtonImageSizeArray[i][j++] = img.naturalWidth;
        themeButtonImageSizeArray[i][j] = img.naturalHeight;
        j = 0;
      }
    );
  }
  //console.log(themeButtonImageSizeArray);

  //if (isMobile && !isTablet)

  if (App.theme.theme_animations.length > 0) {
    for (let i = 0; i < App.theme.theme_animations.length; i++) {
      MainPage.Assets.atlas[App.theme.theme_animations[i].AnimationName] = [
        `${App.assets.mainPageThemes}${App.type}/${App.theme.theme_folder}/spritesheets/${App.theme.theme_animations[i].Sprite}`,
        `${App.assets.mainPageThemes}${App.type}/${App.theme.theme_folder}/animations/${App.theme.theme_animations[i].Data}`,
      ];
    }
  }

  //Üstteki if bloğu alttaki if'in içine girecek
  /* if (!(isMobile && !isTablet)) {
    //buraya satır 64 talimatı
  }else{
    //related about smartphones
    if (App.theme.theme_animations.length > 0) {
      for (let i = 2; i < App.theme.theme_animations.length; i++) {
        MainPage.Assets.atlas[App.theme.theme_animations[i].AnimationName] = [`${App.assets.mainPageThemes}${App.type}/${App.theme.theme_folder}/spritesheets/${App.theme.theme_animations[i].Sprite}`, `/animations/${App.theme.theme_animations[i].Data}`];
        //MainPage.Assets.atlas[App.theme.theme_animations[i].AnimationName] = [`https://www.w3schools.com/html/img_chania.jpg}`, `/animations/${App.theme.theme_animations[i].Data}`];
        console.log(`${App.assets.mainPageThemes}${App.type}/${App.theme.theme_folder}/spritesheets/${App.theme.theme_animations[i].Sprite}`);
      }
    }
  } */

  if (App.events.length > 0) {
    for (let i = 0; i < App.events.length; i++) {
      MainPage.Assets.atlas[App.events[i].EventName] = [
        `${App.assets.mainPageEvents}${App.events[i].Sprite}`,
        `${App.assets.mainPageThemes}/events/animations/${App.events[i].Data}`,
      ];
    }
  }

  MainPage.TitleScreen = function () {};
  MainPage.TitleScreen.prototype = {
    init: function () {
      this.countDownTextArray = [];
      this.bg = this.add.image(0, 0, "startBg");
      if (App.events.length > 0) {
        for (let i = 0; i < App.events.length; i++) {
          if (App.events[i].Countdown) {
            if (App.events[i].Clickable == 0) {
              timerIndices.push(i);
              initialTime.push(
                this.convertTimeToSeconds(App.events[i].Countdown)
              );
            }
          }
          if (
            parseInt(App.events[i].TeacherEvent) > 0 &&
            parseInt(App.user.memberTypeID) == 4
          )
            continue;
          this.createEventsAnimation(
            eventsPosX - i * 120,
            eventPosY,
            App.events[i].EventName,
            App.events[i].Scale,
            App.events[i].Speed,
            App.events[i].Anchor,
            i
          );
        }
      }
      //starIndice = this.getStarIndice();
      if (App.theme.theme_avatar.show == 1) {
        this.avatarFace = this.add.image(
          App.theme.theme_avatar.x,
          App.theme.theme_avatar.y,
          "avatar"
        );
        this.avatarFace.anchor.set(0.5);
        this.avatarFace.scale.set(0.8);
        this.mask = this.add.image(
          App.theme.theme_avatar.x,
          App.theme.theme_avatar.y,
          "mask"
        );
        this.mask.anchor.set(0.5);
      }

      for (let i = 0; i < App.theme.theme_buttons.length; i++) {
        if (
          App.theme.theme_buttons[i].ButtonName == "mein-mintibuch" ||
          App.theme.theme_buttons[i].ButtonName == "lernen-uben" ||
          App.theme.theme_buttons[i].ButtonName == "spiel-spass" ||
          App.theme.theme_buttons[i].ButtonName == "mediathek"
        ) {
          this.createThemeButtons(App.theme.theme_buttons[i].IsLocked, i);

          if (App.theme.theme_buttons[i].SomethingNew == 1) {
            if (App.theme.theme_avatar.show == 0 && i == 0) continue;
            starAnimation = this.add.sprite(
              App.theme.theme_buttons[i].PositionX,
              App.theme.theme_buttons[i].PositionY -
                themeButtonImageSizeArray[i][1] / 2,
              "starNew",
              0
            );
            starAnimation.scale.set(0.3);
            starAnimation.anchor.set(0.5);
            starAnimation.animations.add("starNew");
            starAnimation.animations.play("starNew", 20, true);
          }
        } else {
          arrayOfButtonIndicesNotLoaded.push(i);
        }
      }
      if (App.theme.theme_animations.length > 0) {
        let adder = 100;
        let zAdder;
        for (let i = 0; i < App.theme.theme_animations.length; i++) {
          if (App.theme.theme_animations[i].AnimationName != "starNew") {
            arrayOfAnimations[i] = this.add.sprite(
              App.theme.theme_animations[i].PositionX,
              App.theme.theme_animations[i].PositionY + adder,
              App.theme.theme_animations[i].AnimationName,
              0
            );
            arrayOfAnimations[i].z = zAdder;
            arrayOfAnimations[i].scale.set(App.theme.theme_animations[i].Scale);
            devicesScaleObj[`x${i}`] = arrayOfAnimations[i].scale.x;
            devicesScaleObj[`y${i}`] = arrayOfAnimations[i].scale.y;
            arrayOfAnimations[i].anchor.set(
              App.theme.theme_animations[i].Anchor
            );
            arrayOfAnimations[i].animations.add(
              App.theme.theme_animations[i].AnimationName
            );
            arrayOfAnimations[i].animations.play(
              App.theme.theme_animations[i].AnimationName,
              App.theme.theme_animations[i].Speed,
              true
            );
          }
          zAdder++;
          adder *= -1;
        }
        group = this.add.group();
        group.add(arrayOfAnimations[0]);
        group.add(arrayOfAnimations[1]);
      }
      if (arrayOfButtonIndicesNotLoaded) {
        arrayOfButtonIndicesNotLoaded.forEach((element) => {
          this.createThemeButtons(
            App.theme.theme_buttons[element].IsLocked,
            element
          );
          /* arrayofThemeButtons[element] = this.add.button(App.theme.theme_buttons[element].PositionX, App.theme.theme_buttons[element].PositionY, App.theme.theme_buttons[element].ButtonName, () => {
            window.open(App.url + '/' + App.type + App.theme.theme_buttons[element].Link, "_self");

          });
          arrayofThemeButtons[element].anchor.set(0.5); 
          */
          if (App.notifications.length > 0) {
            if (App.theme.theme_buttons[element].ButtonName == "aufgaben") {
              notificationImage = this.add.image(
                App.theme.theme_buttons[element].PositionX +
                  aufgabenBtnWidth / 2,
                App.theme.theme_buttons[element].PositionY -
                  aufgabenBtnHeight / 2,
                App.notifications.length > 9
                  ? "notification10"
                  : `notification${App.notifications.length}`
              );
              notificationImage.anchor.set(0.5);
              notificationImage.scale.set(0.4);
              this.playtweenAnimation(element);
              this.time.events.loop(
                10000,
                function () {
                  this.playtweenAnimation(element);
                },
                this
              );
            }
          }

          /* this.add.tween(e).to({ x: obj.x, y: obj.y }, 450, 'Linear', true).onComplete.add(function () {
            e.destroy();
          });
          this.add.tween(next.scale).to({ x: 1, y: 1 }, 500, 'Back.easeOut', true, 250);
          */

          if (
            parseInt(App.theme.theme_buttons[element].SomethingNew) *
              parseInt(App.theme.theme_avatar.show) >
            0
          ) {
            starAnimation = this.add.sprite(
              App.theme.theme_buttons[element].PositionX,
              App.theme.theme_buttons[element].PositionY -
                themeButtonImageSizeArray[element][1] / 2,
              "starNew",
              0
            );
            starAnimation.scale.set(0.3);
            starAnimation.anchor.set(0.5);
            starAnimation.animations.add("starNew");
            starAnimation.animations.play("starNew", 20, true);
          }
        });
      }
      //üstteki init içindeki tüm kodlar alttaki ife girecek
      /* if (!(isMobile && !isTablet)) {

      }else{
        //this area related for smartphones
        if (App.events.length > 0) {
          for (let i = 0; i < App.events.length; i++) {
            this.createEventsAnimation(xPosition * 0.915, yPosition * 70/1920, App.events[i].EventName, App.events[i].Scale, (isMobile && isTablet) ? App.events[i].Speed + 10 : App.events[i].Speed, App.events[i].Anchor, i);
            eventsPosX -= 120;
          }
        }
        starIndice = this.getStarIndice();
        this.avatarFace = this.add.image(xPosition * 0.1 , yPosition *  0.1, "avatar");
        this.avatarFace.anchor.set(0.5);
        this.avatarFace.scale.set(0.8);
        this.mask = this.add.image(xPosition * 0.1, yPosition *  0.1, "mask");
        this.mask.anchor.set(.5);

        for (let i = 0; i < App.theme.theme_buttons.length; i++) {
          if (App.theme.theme_buttons[i].ButtonName == "mein-mintibuch" || App.theme.theme_buttons[i].ButtonName == "lernen-uben" || App.theme.theme_buttons[i].ButtonName == "spiel-spass" || App.theme.theme_buttons[i].ButtonName == "mediathek") {

            xfactor == 0.75 ? xfactor = 0.25 : xfactor = 0.75;
            arrayofThemeButtons[i] = this.add.button(xPosition * xfactor, yPosition * parseFloat(`0.${(arrayofThemeButtons.length%2 == 0 ? yCounter++ : yCounter)}`), App.theme.theme_buttons[i].ButtonName, () => {
              window.open(App.url + '/' + App.type + App.theme.theme_buttons[i].Link, "_self");

            })
            arrayofThemeButtons[i].anchor.set(0.5);


            if (App.theme.theme_buttons[i].SomethingNew == 1) {
              arrayOfAnimations[starIndice] = this.add.sprite(xPosition * xfactor, yPosition * parseFloat(`0.${yCounter}`) + 40, App.theme.theme_animations[starIndice].AnimationName, 0);
              arrayOfAnimations[starIndice].scale.set(App.theme.theme_animations[starIndice].Scale);
              arrayOfAnimations[starIndice].anchor.set(App.theme.theme_animations[starIndice].Anchor);
              arrayOfAnimations[starIndice].animations.add(App.theme.theme_animations[starIndice].AnimationName);
              arrayOfAnimations[starIndice].animations.play(App.theme.theme_animations[starIndice].AnimationName, App.theme.theme_animations[starIndice].Speed, true);
            }

          } else {
            arrayOfButtonIndicesNotLoaded.push(i);
          }
        }
        //bu alttaki if bloğu yoruma alınacak
         if (App.theme.theme_animations.length > 0) {
          for (let i = 0; i < App.theme.theme_animations.length; i++) {
            if (App.theme.theme_animations[i].AnimationName != 'starNew') {
              arrayOfAnimations[i] = this.add.sprite(App.theme.theme_animations[i].PositionX, App.theme.theme_animations[i].PositionY, App.theme.theme_animations[i].AnimationName, 0);
              arrayOfAnimations[i].scale.set(App.theme.theme_animations[i].Scale);
              arrayOfAnimations[i].anchor.set(App.theme.theme_animations[i].Anchor);
              arrayOfAnimations[i].animations.add(App.theme.theme_animations[i].AnimationName);
              arrayOfAnimations[i].animations.play(App.theme.theme_animations[i].AnimationName, App.theme.theme_animations[i].Speed, true);
            }
          }
        }
        if (arrayOfButtonIndicesNotLoaded) {
          arrayOfButtonIndicesNotLoaded.forEach(element => {
            xfactor == 0.75 ? xfactor = 0.25 : xfactor = 0.75;
            arrayofThemeButtons[element] = this.add.button(xPosition * xfactor, yPosition * parseFloat(`0.${(arrayofThemeButtons.length%2 == 0 ? yCounter++ : yCounter)}`), App.theme.theme_buttons[element].ButtonName, () => {
              window.open(App.url + '/' + App.type + App.theme.theme_buttons[element].Link, "_self");

            });
            arrayofThemeButtons[element].anchor.set(0.5);



            if (App.theme.theme_buttons[element].SomethingNew == 1) {
              arrayOfAnimations[starIndice] = this.add.sprite(xPosition * xfactor, yPosition * parseFloat(`0.${yCounter}`) + 40, App.theme.theme_animations[starIndice].AnimationName, 0);
              arrayOfAnimations[starIndice].scale.set(App.theme.theme_animations[starIndice].Scale);
              arrayOfAnimations[starIndice].anchor.set(App.theme.theme_animations[starIndice].Anchor);
              arrayOfAnimations[starIndice].animations.add(App.theme.theme_animations[starIndice].AnimationName);
              arrayOfAnimations[starIndice].animations.play(App.theme.theme_animations[starIndice].AnimationName, App.theme.theme_animations[starIndice].Speed, true);
            }
          });
        }

      } */
      if (App.type == "teenage") {
        group2 = this.add.group();
        if (starAnimation != undefined || starAnimation != null) {
          group2.add(starAnimation);
          group2.add(arrayofThemeButtons[3]);
          group2.sort("z", Phaser.Group.SORT_DESCENDING);
        }

        //group2.sort('z', Phaser.Group.SORT_ASCENDING);
      }
    },
    createThemeButtons: function (IsLocked, i) {
      if (IsLocked && App.user.memberType == "Schuler") return undefined;
      if (IsLocked) {
        arrayofThemeButtons[i] = this.add.button(
          App.theme.theme_buttons[i].PositionX,
          App.theme.theme_buttons[i].PositionY,
          App.theme.theme_buttons[i].ButtonName,
          () => {
            $("#upgradeMintiPackageModal").modal("show");
          }
        );
        if (i != 0) {
          //this.add.image(App.theme.theme_buttons[i].PositionX, App.theme.theme_buttons[i].PositionY, "lockImg").anchor.set(0.5);
          //console.log(App.theme.theme_buttons[i].PositionX, App.theme.theme_buttons[i].PositionY,i);
        }
      } else {
        arrayofThemeButtons[i] = this.add.button(
          App.theme.theme_buttons[i].PositionX,
          App.theme.theme_buttons[i].PositionY,
          App.theme.theme_buttons[i].ButtonName,
          () => {
            window.open(
              App.url + "/" + App.type + App.theme.theme_buttons[i].Link,
              "_self"
            );
          }
        );
      }
      IsLocked == true ? (arrayofThemeButtons[i].tint = 0x808080) : undefined;
      arrayofThemeButtons[i].anchor.set(0.5);
    },
    playtweenAnimation: function (
      element,
      rndNumber = Math.floor(Math.random() * 1)
    ) {
      let _this = this;

      if (rndNumber == 2) {
        arrayofThemeButtons[element].scale.set(0);
        this.add
          .tween(arrayofThemeButtons[element].scale)
          .to({ x: 1, y: 1 }, 1500, "Back.easeOut", true, 250);

        notificationImage.scale.set(0);
        this.add
          .tween(notificationImage.scale)
          .to({ x: 0.4, y: 0.4 }, 500, "Back.easeOut", true, 250);
      } else if (rndNumber == 1) {
        arrayofThemeButtons[element].scale.set(0);
        this.add
          .tween(arrayofThemeButtons[element].scale)
          .to({ x: 1, y: 1 }, 1500, "Back.easeOut", true, 250);
        arrayofThemeButtons[element].y += -200;
        this.add
          .tween(arrayofThemeButtons[element])
          .to(
            { y: App.theme.theme_buttons[element].PositionY },
            800,
            Phaser.Easing.Bounce.Out,
            true,
            150,
            0
          );

        notificationImage.scale.set(0);
        this.add
          .tween(notificationImage.scale)
          .to({ x: 0.4, y: 0.4 }, 1500, "Back.easeOut", true, 250);

        notificationImage.y += -200;
        this.add
          .tween(notificationImage)
          .to(
            { y: App.theme.theme_buttons[element].PositionY - 100 },
            800,
            Phaser.Easing.Bounce.Out,
            true,
            150,
            0
          );
      } else if (rndNumber == 0) {
        tweenAufgaben = this.add
          .tween(arrayofThemeButtons[element])
          .to({ angle: 15 }, 40, Phaser.Easing.Cubic.In, true, 50, 0)
          .onComplete.add(function () {
            _this.add
              .tween(arrayofThemeButtons[element])
              .to({ angle: -15 }, 40, Phaser.Easing.Cubic.In, true, 50, 0)
              .onComplete.add(function () {
                _this.add
                  .tween(arrayofThemeButtons[element])
                  .to({ angle: 15 }, 40, Phaser.Easing.Cubic.In, true, 50, 0)
                  .onComplete.add(function () {
                    _this.add
                      .tween(arrayofThemeButtons[element])
                      .to(
                        { angle: 0 },
                        40,
                        Phaser.Easing.Cubic.In,
                        true,
                        50,
                        0
                      );
                  });
              });
          });

        this.add
          .tween(notificationImage)
          .to({ angle: 15 }, 40, Phaser.Easing.Cubic.In, true, 50, 0)
          .onComplete.add(function () {
            _this.add
              .tween(notificationImage)
              .to({ angle: -15 }, 40, Phaser.Easing.Cubic.In, true, 50, 0)
              .onComplete.add(function () {
                _this.add
                  .tween(notificationImage)
                  .to({ angle: 15 }, 40, Phaser.Easing.Cubic.In, true, 50, 0)
                  .onComplete.add(function () {
                    _this.add
                      .tween(notificationImage)
                      .to(
                        { angle: 0 },
                        40,
                        Phaser.Easing.Cubic.In,
                        true,
                        50,
                        0
                      );
                  });
              });
          });
      }
    },
    /* getStarIndice: function () {
      if (App.theme.theme_animations.length > 0) {
        for (let index = 0; index < App.theme.theme_animations.length; index++) {
          if (App.theme.theme_animations[index].AnimationName == 'starNew') {
            return index;
          }
        }
      }
    }, */
    formatTime: function (seconds) {
      var hours = Math.floor(seconds / 3600);

      var minutes = Math.floor((seconds - hours * 3600) / 60);
      // Seconds
      var partInSeconds = (seconds - hours * 3600) % 60;
      // Adds left zeros to seconds
      partInSeconds = partInSeconds.toString().padStart(2, "0");
      // Returns formated time
      if (hours < 10) hours = "0" + hours.toString();
      if (minutes < 10) minutes = "0" + minutes.toString();
      return `${hours}:${minutes}:${partInSeconds}`;
    },
    onEvent: function () {
      for (let i = 0; i < initialTime.length; i++) {
        initialTime[i] -= 1;

        if (initialTime[i] < 0) {
          this.countDownTextArray[i].setText("");
          App.events[timerIndices[i]].Clickable = 1;
        } else if (initialTime[i] >= 0) {
          this.countDownTextArray[i].setText(this.formatTime(initialTime[i]));
        }
      }
    },
    createEventsAnimation: function (
      x,
      y,
      animationName,
      scale,
      speed,
      anchor,
      index
    ) {
      if (App.events[index].IsPremium && App.user.memberType == "Schuler")
        return undefined;
      let anim;
      anim = this.add.sprite(x, y, animationName, 0);
      anim.IsPremium = App.events[index].IsPremium;
      arrayOfEventsAnimations.push(anim);
      anim.scale.set(scale);
      anim.anchor.set(anchor);
      anim.inputEnabled = true;
      anim.input.useHandCursor = true;
      anim.events.onInputDown.add(() => {
        if (App.events[index].Clickable == 1) {
          if (arrayOfEventsAnimations[index].IsPremium) {
            $("#upgradeMintiPackageModal").modal("show");
          } else {
            if (App.events[index].Link.includes("http")) {
              window.open(App.events[index].Link, App.events[index].LinkTarget);
            } else {
              window.open(
                App.url + "/" + App.type + App.events[index].Link,
                App.events[index].LinkTarget
              );
            }
          }
        }
      }, this);
      anim.animations.add(animationName);
      anim.animations.play(animationName, speed, true);
    },
    convertTimeToSeconds: function (countDown) {
      let timePieces = countDown.split(":");
      let isNegative = false;
      let hour = "";
      let minute = "";
      let second = "";
      for (let i = 0; i < timePieces.length; i++) {
        let piecesOfTimePiece = timePieces[i].split("");
        for (let j = 0; j < piecesOfTimePiece.length; j++) {
          if (piecesOfTimePiece[j] == "-" && j == 0) {
            isNegative = true;
            second = -1;
            break;
          }
          if (i == 0) hour += piecesOfTimePiece[j];
          else if (i == 1) minute += piecesOfTimePiece[j];
          else if (i == 2) second += piecesOfTimePiece[j];
        }
        if (isNegative) break;
      }
      return second == -1
        ? -1
        : 3600 * parseInt(hour) + 60 * parseInt(minute) + parseInt(second);
    },

    update: function () {
      /* for(let i = 0; i< this.countDownTextArray.length; i++){
        this.countDownTextArray[i].fill = `rgb(${red}, ${green}, ${blue})`;
      } */
      if (App.theme.theme_animations.length > 0) {
        sayac++;
        if (sayac % 60 == 1) {
          arrayOfAnimations[0].x += 2 * directionOfMinti1;
          arrayOfAnimations[1].x += 2.5 * directionOfMinti2;

          //Minti1
          if (arrayOfAnimations[0].x > 2500) {
            setTimeout(() => {
              arrayOfAnimations[0].scale.set(
                -devicesScaleObj.x0,
                devicesScaleObj.y0
              );
              directionOfMinti1 = -1;
              arrayOfAnimations[0].y = 480;
              group.sort("z", Phaser.Group.SORT_ASCENDING);
            }, 7000);
          } else if (arrayOfAnimations[0].x < -500) {
            setTimeout(() => {
              directionOfMinti1 = 1;
              arrayOfAnimations[0].scale.set(
                devicesScaleObj.x0,
                devicesScaleObj.y0
              );
              arrayOfAnimations[0].y = 580;
              group.sort("z", Phaser.Group.SORT_DESCENDING);
            }, 7000);
          }
          //Minti2
          if (arrayOfAnimations[1].x > 2500) {
            setTimeout(() => {
              arrayOfAnimations[1].scale.set(
                devicesScaleObj.x1,
                devicesScaleObj.y1
              );
              directionOfMinti2 = -1;
              arrayOfAnimations[1].y = 480;
            }, 8000);
          } else if (arrayOfAnimations[1].x < -500) {
            setTimeout(() => {
              directionOfMinti2 = 1;
              arrayOfAnimations[1].scale.set(
                -devicesScaleObj.x1,
                devicesScaleObj.y1
              );
              arrayOfAnimations[1].y = 580;
            }, 7000);
          }

          sayac = 0;
        }
      }
      /* if (!(isMobile && !isTablet)) {
    
      } */
    },

    create: function () {
      for (let i = 0; i < arrayofThemeButtons.length; i++) {
        arrayofThemeButtons[i].events.onInputOver.add(
          Minti.PhaserHelper.onInput.Over,
          this
        );
        arrayofThemeButtons[i].events.onInputOut.add(
          Minti.PhaserHelper.onInput.Out,
          this
        );
      }
      for (let index = 0; index < arrayOfEventsAnimations.length; index++) {
        arrayOfEventsAnimations[index].events.onInputOver.add(
          Minti.PhaserHelper.onInput.Over,
          this
        );
        arrayOfEventsAnimations[index].events.onInputOut.add(
          Minti.PhaserHelper.onInput.Out,
          this
        );
        if (arrayOfEventsAnimations[index].IsPremium) {
          arrayOfEventsAnimations[index].tint = 0x808080;
        }
      }
      if (App.theme.theme_avatar.show == 0) {
        arrayofThemeButtons[0].destroy(); //ekrandan siler
        //delete arrayofThemeButtons[0]; //diziden siler
        //console.log(arrayofThemeButtons);
      }
      /* if (!(isMobile && !isTablet)) {
    
      } */
      for (let i = 0; i < timerIndices.length; i++) {
        this.countDownTextArray[i] = this.add.text(
          eventsPosX - 30 - timerIndices[i] * 120,
          140,
          this.formatTime(initialTime[i]),
          { fontSize: "16px", fill: "#000000" }
        );
      }
      /*`rgb(${red}, ${green}, ${blue})`
      document.addEventListener('mousemove',(e)=>{
        red = (e.clientX % 255);
        green = (e.clientY%255);
        blue = 1;
      }); */

      //this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
      this.timedEvent = this.time.events.loop(1000, this.onEvent, this);
    },
  };
  Phaser.Group.prototype.sort = function (key, order) {
    if (this.children.length < 2) {
      //  Nothing to swap
      return;
    }
    if (key === undefined) {
      key = "z";
    }
    if (order === undefined) {
      order = Phaser.Group.SORT_ASCENDING;
    }
    this._sortProperty = key;
    if (order === Phaser.Group.SORT_ASCENDING) {
      this.children.sort(this.ascendingSortHandler.bind(this));
    } else {
      this.children.sort(this.descendingSortHandler.bind(this));
    }
  };
  core = new Phaser.Game(MainPage.config);
  //bu alttaki degeri test ediyorum.
  core.state.clearCurrentState();
  core.state.add("Boot", new Minti.PhaserHelper.BootState("Preload"), true);
  core.state.add(
    "Preload",
    new Minti.PhaserHelper.PreloadState("TitleScreen", MainPage.Assets, core)
  );
  core.state.add("TitleScreen", MainPage.TitleScreen);
});

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.levelIndex = 0;
    this.gameData = null;
  }

  preload() {
    // JSON'u yükle (assets klasöründen ya da URL'den)
    // Örn: public/assets/levels.json
    this.load.json("levels", "assets/levels.json");

    // Eğer remote URL'den almak istersen:
    // this.load.json('levels', 'https://example.com/gameData.json');
  }

  create() {
    // JSON'u cache'den çek
    this.gameData = this.cache.json.get("levels");
    if (!this.gameData || !this.gameData.levels) {
      this.add
        .text(400, 300, "Veri bulunamadı ❌", {
          fontSize: "28px",
          color: "red",
        })
        .setOrigin(0.5);
      return;
    }
    this.loadLevel();
  }

  loadLevel() {
    this.children.removeAll();
    this.input.removeAllListeners();
    if (this.levelIndex >= this.gameData.levels.length) {
      this.add
        .text(400, 300, "Tüm seviyeler bitti 👏", {
          fontSize: "28px",
          color: "blue",
        })
        .setOrigin(0.5);
      return;
    }

    const level = this.gameData.levels[this.levelIndex];
    this.add
      .text(400, 50, level.prompt, { fontSize: "24px", color: "#000" })
      .setOrigin(0.5);

    switch (level.mechanic) {
      case "typing":
        this.createTyping(level);
        break;
      case "sorting":
        this.createSorting(level);
        break;
      case "dragdrop_permanent":
        this.createDragDrop(level, false);
        break;
      case "dragdrop_returning":
        this.createDragDrop(level, true);
        break;
      case "clicking":
        this.createClicking(level);
        break;
      case "swapping":
        this.createSwapping(level);
        break;
    }
  }

  // --- 1. Typing ---
  createTyping(level) {
    const inputText = this.add
      .text(400, 200, "", { fontSize: "32px", color: "#000" })
      .setOrigin(0.5);
    this.input.keyboard.on("keydown", (e) => {
      if (e.key === "Backspace") {
        inputText.text = inputText.text.slice(0, -1);
      } else if (e.key.length === 1) {
        inputText.text += e.key.toUpperCase();
      }
      if (inputText.text === level.answer) this.win();
    });
  }

  // --- 2. Sorting ---
  createSorting(level) {
    // parçaları karıştır
    const parts = Phaser.Utils.Array.Shuffle([...level.parts]);

    // slotları oluştur
    this.slots = [];
    for (let i = 0; i < parts.length; i++) {
      const slot = this.add
        .rectangle(150 + i * 120, 200, 100, 50, 0xdddddd)
        .setStrokeStyle(2, 0x000000);
      slot.setData("index", i); // slot sırasını kaydet
      this.slots.push(slot);
    }

    // parçaları ekle
    this.items = [];
    parts.forEach((w, i) => {
      const txt = this.add
        .text(150 + i * 120, 400, w, { fontSize: "20px", color: "#000" })
        .setOrigin(0.5);
      txt.setInteractive({ draggable: true });
      this.input.setDraggable(txt);
      txt.setData("slotIndex", null); // hangi slota yerleştiğini kaydedeceğiz
      this.items.push(txt);
    });

    // sürükleme
    this.input.on("drag", (pointer, gameObject, x, y) => {
      gameObject.x = x;
      gameObject.y = y;
    });

    // bırakma
    this.input.on("dragend", (pointer, gameObject) => {
      let placed = false;

      this.slots.forEach((slot) => {
        if (
          Phaser.Geom.Rectangle.Contains(
            slot.getBounds(),
            gameObject.x,
            gameObject.y
          )
        ) {
          // parçayı slot üzerine yerleştir
          gameObject.x = slot.x;
          gameObject.y = slot.y;
          gameObject.setData("slotIndex", slot.getData("index"));
          placed = true;
        }
      });

      if (!placed) {
        // slot dışında kaldıysa eski yerine gönder
        this.tweens.add({
          targets: gameObject,
          x: gameObject.input.dragStartX,
          y: gameObject.input.dragStartY,
          duration: 300,
          ease: "Back",
        });
        gameObject.setData("slotIndex", null);
      }

      // her bırakmada doğru mu diye kontrol et
      this.checkSortingAnswer(level);
    });
  }

  checkSortingAnswer(level) {
    // slotlara yerleşmiş parçaları sıraya koy
    const placed = this.items
      .filter((item) => item.getData("slotIndex") !== null)
      .sort((a, b) => a.getData("slotIndex") - b.getData("slotIndex"))
      .map((item) => item.text);

    if (
      placed.length === level.answer.length &&
      JSON.stringify(placed) === JSON.stringify(level.answer)
    ) {
      this.win();
    }
  }

  // --- 3 & 4. DragDrop ---
  createDragDrop(level, returning) {
    // slot dizisi ve hızlı erişim için indeks
    this.slots = [];
    const gap = 110;
    for (let i = 0; i < level.parts.length; i++) {
      const slot = this.add
        .rectangle(150 + i * gap, 220, 100, 56, 0xeeeeee)
        .setStrokeStyle(2, 0x000000);
      slot.setData("index", i);
      slot.setData("occupant", null); // bu slota yerleşen item
      this.slots.push(slot);
    }

    // parçalar (karıştır istersen)
    const parts = [...level.parts]; // veya Phaser.Utils.Array.Shuffle([...level.parts])
    this.items = parts.map((p, i) => {
      const t = this.add
        .text(150 + i * gap, 420, p, {
          fontSize: "22px",
          color: "#000",
          backgroundColor: "#d9d9d9",
          padding: { x: 8, y: 6 },
        })
        .setOrigin(0.5);
      t.setData("startX", t.x);
      t.setData("startY", t.y);
      t.setData("locked", false); // permanent için kullanılacak
      t.setData("slotIndex", null); // hangi slota yerleşti
      t.setInteractive({ draggable: true });
      this.input.setDraggable(t);
      return t;
    });

    this.input.on("drag", (pointer, go, x, y) => {
      if (go.getData("locked")) return; // permanent: kilitliyse hareket yok
      go.x = x;
      go.y = y;
    });

    this.input.on("dragend", (pointer, go) => {
      if (go.getData("locked")) return;

      // Üzerinde bırakılan uygun, boş bir slot var mı?
      const target = this.slots.find((s) =>
        Phaser.Geom.Rectangle.Contains(s.getBounds(), go.x, go.y)
      );

      // Eğer bir slot hedeflendiyse ve boşsa kabul et
      if (target && !target.getData("occupant")) {
        // Eski slotu boşalt
        const prevIdx = go.getData("slotIndex");
        if (prevIdx !== null) {
          this.slots[prevIdx].setData("occupant", null);
        }

        // Yeni slota yerleştir
        go.x = target.x;
        go.y = target.y;
        go.setData("slotIndex", target.getData("index"));
        target.setData("occupant", go);

        // Permanent mod: kilitle (tekrar sürüklenemez)
        if (!returning) {
          go.setData("locked", true);
          go.disableInteractive();
        }
      } else {
        // Slot uygun değilse:
        if (returning) {
          // Returning: eski yerine dön
          this.tweens.add({
            targets: go,
            x: go.getData("startX"),
            y: go.getData("startY"),
            duration: 250,
            ease: "Back",
          });
          // eski slot bilgisini temizle
          const prevIdx = go.getData("slotIndex");
          if (prevIdx !== null) {
            this.slots[prevIdx].setData("occupant", null);
            go.setData("slotIndex", null);
          }
        } else {
          // Permanent: slot değilse yine de eski yerine dönsün (kilitleme yok)
          this.tweens.add({
            targets: go,
            x: go.getData("startX"),
            y: go.getData("startY"),
            duration: 250,
            ease: "Back",
          });
          const prevIdx = go.getData("slotIndex");
          if (prevIdx !== null) {
            this.slots[prevIdx].setData("occupant", null);
            go.setData("slotIndex", null);
          }
        }
      }

      this.checkDragDropAnswer(level); // yalnızca slot yerleşimleri üzerinden kontrol
    });
  }
  checkDragDropAnswer(level) {
    // slot sırasına göre occupant text’lerini al
    const placed = this.slots.map((s) => {
      const occ = s.getData("occupant");
      return occ ? occ.text : null;
    });

    // tüm slotlar dolmuş mu?
    if (placed.some((v) => v === null)) {
      return; // boş varsa kontrol etme
    }

    // cevap kontrolü (tek tek karşılaştır)
    const correct = placed.every((txt, i) => txt === level.answer[i]);

    if (correct) {
      this.win();
    }
  }

  // --- 5. Clicking ---
  createClicking(level) {
    const slots = [];
    for (let i = 0; i < level.answer.length; i++) {
      const slot = this.add
        .rectangle(150 + i * 120, 200, 100, 50, 0xeeeeee)
        .setStrokeStyle(2, 0x000000);
      slots.push(slot);
    }

    let currentIndex = 0;
    level.parts.forEach((p, i) => {
      const btn = this.add
        .text(150 + i * 120, 400, p, {
          fontSize: "20px",
          color: "#000",
          backgroundColor: "#ccc",
        })
        .setOrigin(0.5)
        .setInteractive();
      btn.on("pointerdown", () => {
        if (currentIndex < slots.length) {
          this.add
            .text(slots[currentIndex].x, slots[currentIndex].y, p, {
              fontSize: "20px",
              color: "#000",
            })
            .setOrigin(0.5);
          currentIndex++;
          if (currentIndex === level.answer.length) this.checkAnswer(level);
        }
      });
    });
  }

  // --- 6. Swapping ---
  createSwapping(level) {
    const items = [];
    level.parts.forEach((p, i) => {
      const txt = this.add
        .text(150 + i * 80, 300, p, {
          fontSize: "20px",
          color: "#000",
          backgroundColor: "#eee",
        })
        .setOrigin(0.5)
        .setInteractive();
      items.push(txt);
    });

    let first = null;
    items.forEach((item) => {
      item.on("pointerdown", () => {
        if (!first) {
          first = item;
          item.setStyle({ backgroundColor: "#f88" });
        } else {
          const temp = first.text;
          first.setText(item.text);
          item.setText(temp);
          first.setStyle({ backgroundColor: "#eee" });
          first = null;
          this.checkAnswer(level);
        }
      });
    });
  }

  // --- Cevap kontrolü ---
  checkAnswer(level) {
    const texts = this.children.list
      .filter((c) => c.type === "Text")
      .map((t) => t.text);
    const answer = level.answer.join("");
    if (texts.join("").includes(answer)) this.win();
  }

  win() {
    this.add
      .text(400, 500, "Doğru! 🎉", { fontSize: "28px", color: "green" })
      .setOrigin(0.5);
    this.time.delayedCall(1500, () => {
      this.levelIndex++;
      this.loadLevel();
    });
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MainScene],
  backgroundColor: "#b3e5fc",
});

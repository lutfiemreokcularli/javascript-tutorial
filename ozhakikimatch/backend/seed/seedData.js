import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Item from "../models/item.js";

await connectDB();

const seedItems = [
  {
    name: "apfel",
    image: "apfel.png",
    imagegr: "apfelgr.png",
    sound: "apfel.webm",
  },
  {
    name: "brot",
    image: "brot.png",
    imagegr: "brotgr.png",
    sound: "brot.webm",
  },
  {
    name: "schal",
    image: "schal.png",
    imagegr: "schalgr.png",
    sound: "schal.webm",
  },
  {
    name: "rock",
    image: "rock.png",
    imagegr: "rockgr.png",
    sound: "rock.webm",
  },

  {
    name: "hamburger",
    image: "hamburger.png",
    imagegr: "hamburgergr.png",
    sound: "hamburger.webm",
  },
  {
    name: "erdbeere",
    image: "erdbeere.png",
    imagegr: "erdbeeregr.png",
    sound: "erdbeere.webm",
  },
  {
    name: "hose",
    image: "hose.png",
    imagegr: "hosegr.png",
    sound: "hose.webm",
  },
  {
    name: "kakao",
    image: "kakao.png",
    imagegr: "kakaogr.png",
    sound: "kakao.webm",
  },
  {
    name: "kartoffel",
    image: "kartoffel.png",
    imagegr: "kartoffelgr.png",
    sound: "kartoffel.webm",
  },
  {
    name: "milch",
    image: "milch.png",
    imagegr: "milchgr.png",
    sound: "milch.webm",
  },
  {
    name: "orange",
    image: "orange.png",
    imagegr: "orangegr.png",
    sound: "orange.webm",
  },
  {
    name: "pizza",
    image: "pizza.png",
    imagegr: "pizzagr.png",
    sound: "pizza.webm",
  },
  {
    name: "spaghetti",
    image: "spaghetti.png",
    imagegr: "spaghettigr.png",
    sound: "spaghetti.webm",
  },
  {
    name: "tshirt",
    image: "tshirt.png",
    imagegr: "tshirtgr.png",
    sound: "tshirt.webm",
  },
  {
    name: "wurst",
    image: "wurst.png",
    imagegr: "wurstgr.png",
    sound: "wurst.webm",
  },
  {
    name: "zitrone",
    image: "zitrone.png",
    imagegr: "zitronegr.png",
    sound: "zitrone.webm",
  },
];

await Item.deleteMany({});
await Item.insertMany(seedItems);

console.log("✅ Seed data inserted");
mongoose.connection.close();

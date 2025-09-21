import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Item from "../models/item.js";

await connectDB();

const seedItems = [
  { name: "apfel", image: "apfel.png", sound: "apfel.webm" },
  { name: "brot", image: "brot.png", sound: "brot.webm" },
  { name: "schal", image: "schal.png", sound: "schal.webm" },
  { name: "rock", image: "rock.png", sound: "rock.webm" },

  { name: "hamburger", image: "hamburger.png", sound: "hamburger.webm" },
  { name: "erdbeere", image: "erdbeere.png", sound: "erdbeere.webm" },
  { name: "hose", image: "hose.png", sound: "hose.webm" },
  { name: "kakao", image: "kakao.png", sound: "kakao.webm" },
];

await Item.deleteMany({});
await Item.insertMany(seedItems);

console.log("✅ Seed data inserted");
mongoose.connection.close();

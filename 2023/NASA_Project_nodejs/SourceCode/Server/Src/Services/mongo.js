require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;
console.log(process.env.MONGO_URL);

// mongoose exposes this connectoin object  it is an event emmitter that emit's event's
mongoose.connection.once("open", () => {
  // 'open' event will execute once, we are being explicit by using .once intead of .on
  console.log("MongoDB connection ready ");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function connectToMongoDb() {
  await mongoose.connect(MONGO_URL);
}

async function disconnectFromMongoDb() {
  await mongoose.disconnect();
}

module.exports = {
  connectToMongoDb,
  disconnectFromMongoDb,
};

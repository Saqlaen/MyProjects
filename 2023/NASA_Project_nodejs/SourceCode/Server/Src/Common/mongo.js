const mongoose = require("mongoose");


const MONGO_URL =
  "mongodb+srv://saqlaen:koOpTAJz9Gdm85Nf@cluster0.bji63cs.mongodb.net/nasa?retryWrites=true&w=majority";

// mongoose exposes this connectoin object  it is an event emmitter that emit's event's
mongoose.connection.once("open", () => {
  // 'open' event will execute once, we are being explicit by using .once intead of .on
  console.log("MongoDB connection ready ");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function connectToMongoDb(){
    await mongoose.connect(MONGO_URL);
}

async function disconnectFromMongoDb(){
    await mongoose.disconnect();
}

module.exports = {
  connectToMongoDb,
  disconnectFromMongoDb,
};
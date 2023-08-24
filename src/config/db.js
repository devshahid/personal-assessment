const mongoose = require("mongoose");

const { DB_NAME, DB_URL } = require("./index");
const url = DB_URL + "/" + DB_NAME;
const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed ", error);
    throw error;
  }
};

module.exports = connectDB;

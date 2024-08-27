const mongoose = require("mongoose");

const url = process.env.URL;
const dbConnect = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database connection successful");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};

module.exports = dbConnect;

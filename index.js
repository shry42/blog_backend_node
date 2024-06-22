const express = require("express");
const mongoose = require("mongoose");

var bodyParser = require("body-parser");
const route = require("./routes/route.js");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = 3000;

const IP_ADDRESS = "localhost";
const path = require("path");

const corsOptions = {
  origin: process.env.DOMAIN,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  // .connect("mongodb+srv://yadavshravan42:MDdBzLbhxFIKubn5@cluster0.wdqq2xv.mongodb.net/blogApp?retryWrites=true&w=majority")
  .connect(process.env.DBURL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

// app.use(multer().any())
app.use("", route);



const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});



app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server is running on http://${IP_ADDRESS}:${PORT}`);
});
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { authRoutes, userRoutes, videoRoutes, commentRoutes } = require("./routes");

const app = express();
dotenv.config();

const connect = async () => {
  await mongoose
    .connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`db connection succesfull and listening : ${process.env.DB_HOST}:${process.env.APP_PORT}`);
    })
    .catch((err) => {
      throw err;
    });
};

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload({ useTempFiles: true }));
app.use(helmet());

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//multer
multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 },
});

// * routers ****************************************************************
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
// * end routers ************************************************************

app.listen(process.env.APP_PORT || 8080, process.env.HOST || "0.0.0.0", () => {
  connect();
  console.log(`Server is listening on http://localhost:${process.env.APP_PORT}/`);

  //error handler
  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });
});

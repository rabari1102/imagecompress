const express = require("express");
const Router = express.Router();
const multer = require("multer");
const fs = require("fs");
const imagecontroller = require("../controller/imagecontroller");

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("image/jpeg") ||
    file.mimetype.includes("image/png") ||
    file.mimetype.includes("image/jpg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Please upload only jpeg/png/jpg file."));
  }
};

const destinationPath = "public/uploads/compress/"; // Set the destination directory for compressed images

if (!fs.existsSync(destinationPath)) {
  fs.mkdirSync(destinationPath, { recursive: true });
}

let serverStorageimage = multer({
  storage: multer.diskStorage({
    fileFilter: imageFilter,
    destination: (req, file, cb) => {
      cb(null, "public/uploads/"); // Update the destination directory
    },
    filename: (req, file, cb) => {
      const parts = file.originalname.split(".");
      const extension = parts[1].toLowerCase();
      const image_file_name = parts[0] + "." + extension;
      if (req.locals) {
        cb(null, req.locals.image_file);
      } else {
        cb(null, image_file_name);
      }
    },
  }),
});

Router.post("/image", serverStorageimage.single("image"), imagecontroller.create);

module.exports = Router;

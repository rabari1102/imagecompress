const path = require("path");
const sharp = require("sharp");

const imagecontroller = {
  create: async (req, res) => {
    try {
      const sourcePath = path.join(__basedir, "public/uploads/");
      const destinationPath = path.join(__basedir, "public/uploads/compress/");

      const compressImage = (imagePath) => {
        return new Promise((resolve, reject) => {
          const outputFilename = path.basename(imagePath);
          const outputPath = path.join(destinationPath, outputFilename);

          sharp(imagePath)
            .jpeg({ quality: 60 })
            .toFile(outputPath, (error, info) => {
              if (error) {
                reject(error);
              } else {
                resolve(info);
              }
            });
        });
      };

      const imagePath = req.file.path;
      await compressImage(imagePath);
      console.log("Successfully compressed file");

      res.status(200).json({
        success: true,
        message: "Image compressed successfully.",
      });
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ message: "Internal error", success: false });
    }
  },
};

module.exports = imagecontroller;

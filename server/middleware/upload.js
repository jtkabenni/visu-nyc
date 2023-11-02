const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("1", file);
    return cb(null, "../Images");
  },
  filename: function (req, file, cb) {
    console.log("FILEEEEEE", file);
    return cb(null, `${Date.now()}_ ${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

module.exports = { upload };

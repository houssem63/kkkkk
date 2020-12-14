const multer = require("multer");
const path = require('path');

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Mime type invalide");
    if (isValid) {
      error = null;
    }
    console.log( path.join(__dirname, '../','images'))
    cb(error,path.join(__dirname, '../','images'));
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null,Date.now()+ "-" + name );
  }
});

module.exports = multer({ storage: storage }).
fields([{name:"CopierContrat"},{name:"CopierCarteGrise"},{name:"CopierAssurance"},{name:"CopierVisite"},{name:"CopierCarteexploitation"},{name:"CopierVignette"}]);
// Récupération du module multer pour utilisation ultérieure
const multer = require('multer');

// Établissement des extensions d'images concernés
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png'
};

// Définition du lieu de stockage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/');
  },
  // Définition du nom du fichier image
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + "_" + name);
  }
});

module.exports = multer({storage: storage}).single('file');

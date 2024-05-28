const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'user_profiles', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg']
    }
});

const upload = multer({ storage });

module.exports = upload;

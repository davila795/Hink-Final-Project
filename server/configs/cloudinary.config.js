const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Hink-images',
        format: async (req, file) => 'jpg',
        quality: async (req, file) => 20,
        transformation: [
            { aspect_ratio: '4:3', crop: 'fill' },
            { width: "auto", dpr: "auto", crop: "scale" }
        ]
    }
})

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud
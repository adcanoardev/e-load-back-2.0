const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "e-load/users",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: 400, height: 400, crop: "fill" }],
    },
});

const uploadImage = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

/**
 * Elimina un archivo de Cloudinary dado su URL o public_id.
 */
const deleteFile = async (fileUrl) => {
    try {
        // Extrae el public_id de la URL de Cloudinary
        const parts = fileUrl.split("/");
        const filename = parts[parts.length - 1].split(".")[0];
        const folder = parts[parts.length - 2];
        const publicId = `${folder}/${filename}`;
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error("Error deleting file from Cloudinary:", error.message);
    }
};

module.exports = { uploadImage, deleteFile };

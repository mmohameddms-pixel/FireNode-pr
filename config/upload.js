import multer from 'multer';
import imgbbUploader from 'imgbb-uploader';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({ storage: storage });  // Initialize multer with memory storage

const uploadFileToImgBB = async (filePath) => {
    return new Promise((resolve, reject) => {
        imgbbUploader({
            apiKey: process.env.IMGBB_API_KEY,  // Use your ImgBB API key from .env
            imagePath: filePath,  // File buffer (temporary storage in memory)
        })
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

export { uploadFileToImgBB };
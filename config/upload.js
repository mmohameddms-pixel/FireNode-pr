import multer from 'multer';
import imgbbUploader from 'imgbb-uploader';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Set a unique filename for each uploaded file using timestamp
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({ storage: storage });
const uploadFileToImgBB = async (filePath) => {
    return new Promise((resolve, reject) => {
        imgbbUploader({
            apiKey: process.env.IMGBB_API_KEY,
            imagePath: filePath,
        })
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

export { uploadFileToImgBB };
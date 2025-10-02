import multer from 'multer';
import imgbbUploader from 'imgbb-uploader';
const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });
const uploadFileToImgBB = async (fileBuffer) => {
    const base64string = fileBuffer.toString('base64');
    return new Promise((resolve, reject) => {
        imgbbUploader({
            apiKey: process.env.IMGBB_API_KEY,
            base64string: base64string

        })
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

export { uploadFileToImgBB };
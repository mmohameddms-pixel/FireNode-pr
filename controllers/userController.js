import { uploadFileToImgBB } from '../config/upload.js';
import { getUserById, updateUser } from '../repositories/userRepository.js';

export const getProfile = async (req, res) => {
    try {
        const user = await getUserById(req.user.uid);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Unable to fetch user profile' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const updates = req.body;

        if (req.file) {
            const imageUrl = req.file?.path ? await uploadFileToImgBB(req.file.path) : null;

            updates.profileImage = imageUrl?.url ?? null;
        }

        await updateUser(req.user.uid, updates);

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Unable to update profile' });
    }
};

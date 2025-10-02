import postRef from "../models/postModel.js";

export const isPostOwner = async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.user.uid;
    console.log(userId)
    const post = (await postRef.doc(postId).get()).data();

    if (!post || post.userID !== userId) {
        return res.status(403).json({ message: 'Forbidden: You can only modify your own posts' });
    }

    next();
}
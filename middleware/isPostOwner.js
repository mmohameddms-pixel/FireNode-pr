
export const isPostOwner = (req, res, next) => {
    const postId = req.params.id;
    const userId = req.user.id;

    Post.findOne({ where: { id: postId } }).then(post => {
        if (!post || post.userId !== userId) {
            return res.status(403).json({ message: 'Forbidden: You can only modify your own posts' });
        }
        next();
    });
}
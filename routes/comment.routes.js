// routes/comment.routes.js
import { Router } from 'express';
import { createComment, getCommentsByPost, updateComment, deleteComment } from '../controllers/commentController.js';
import { authenticate } from '../middleware/authenticationMiddleware.js';
const router = Router();


router.post("/:postId", authenticate, createComment);
router.get("/:postId", authenticate, getCommentsByPost);
router.put("/:commentId", authenticate, updateComment);
router.delete("/:commentId", authenticate, deleteComment);

// module.exports = router;
export default router;
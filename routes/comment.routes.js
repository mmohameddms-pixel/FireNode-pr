// routes/comment.routes.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authenticate = require("../middleware/authenticationMiddleware");

router.post("/:postId", authenticate, commentController.createComment);
router.get("/:postId", authenticate, commentController.getCommentsByPost);
router.put("/:commentId", authenticate, commentController.updateComment);
router.delete("/:commentId", authenticate, commentController.deleteComment);

// module.exports = router;
export default router;
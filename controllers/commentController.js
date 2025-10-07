// controllers/commentController.js
import commentRef from "../models/commentModel.js";
const createComment = async (req, res) => {
  try {
    // const postId = req.params.postId;
    const { postId,content } = req.body;
    console.log("body ;",req.body);
    
    const userId = req.user.uid;

    const newComment = await commentRef.add({ postId, userId, content });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params.commentId;
    const comments = await commentRef.doc(postId).get();
    res.json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.uid;
    const isAdmin = req.user.role === "admin";


    const commentDoc = await commentRef.doc(commentId).get();
    if (!commentDoc.exists) {
      return res.status(404).json({ error: 'Comment not found' });
    }


    await commentRef.doc(commentId).update({ content });
    res.json({message : 'Comment updated successfully'});
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.uid;
    const isAdmin = req.user.role === "admin";

    const result = await commentRef.doc(commentId).delete();
    res.json(result);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

export { createComment , getCommentsByPost , updateComment , deleteComment}
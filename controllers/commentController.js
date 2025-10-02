// controllers/commentController.js
// const CommentModel = require("../models/commentModel");
import CommentModel from "../models/commentModel.js";
export const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id;

    const newComment = await CommentModel.createComment({ postId, userId, content });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await CommentModel.getCommentsByPost(postId);
    res.json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const isAdmin = req.user.role === "admin";

    const updatedComment = await CommentModel.updateComment(commentId, userId, content, isAdmin);
    res.json(updatedComment);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.role === "admin";

    const result = await CommentModel.deleteComment(commentId, userId, isAdmin);
    res.json(result);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};
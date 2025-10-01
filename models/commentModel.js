// models/commentModel.js
const { db } = require("../config/firebase");
const { FieldValue } = require("firebase-admin/firestore");

const commentsCollection = db.collection("comments");

class CommentModel {
  static async createComment({ postId, userId, content }) {
    const newComment = {
      postId,
      userId,
      content,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    const docRef = await commentsCollection.add(newComment);
    return { id: docRef.id, ...newComment };
  }

  static async getCommentsByPost(postId) {
    const snapshot = await commentsCollection.where("postId", "==", postId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async updateComment(commentId, userId, content, isAdmin = false) {
    const docRef = commentsCollection.doc(commentId);
    const doc = await docRef.get();

    if (!doc.exists) throw new Error("Comment not found");

    if (!isAdmin && doc.data().userId !== userId) {
      throw new Error("Unauthorized to edit this comment");
    }

    await docRef.update({
      content,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return { id: doc.id, ...doc.data(), content };
  }

  static async deleteComment(commentId, userId, isAdmin = false) {
    const docRef = commentsCollection.doc(commentId);
    const doc = await docRef.get();

    if (!doc.exists) throw new Error("Comment not found");

    if (!isAdmin && doc.data().userId !== userId) {
      throw new Error("Unauthorized to delete this comment");
    }

    await docRef.delete();
    return { message: "Comment deleted successfully" };
  }
}

module.exports = CommentModel;
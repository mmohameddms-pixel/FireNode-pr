
import postRef from '../models/postModel.js'
import { uploadFileToImgBB } from '../config/upload.js';
import { validationResult } from 'express-validator';
import { Timestamp } from 'firebase-admin/firestore';

const addPost = async (req, res) => {

    // Validate the input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userID = req.user.uid;
    if (!userID) {
        return res.status(400).send("Login First" + userID)
    }

    const { title, content } = req.body;

    if (!req.file) {    
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileBuffer = req.file.buffer;
    const imageUrl = fileBuffer ? (await uploadFileToImgBB(fileBuffer)) : null;

    try {
        await postRef.add({
            title, content,
            photo: fileBuffer ? imageUrl.url : null,
            createdAt: Timestamp.now(), updatedAt: null, userID
        });

        res.status(200).json({
            msg: "Post is added",
            title,
            content,
            photo: fileBuffer ? imageUrl.url : null,
            createdAt: Timestamp.now(),
            updatedAt: null,
            userID
        })

    } catch (error) {
        res.status(500).json({ msg: 'Error fetching posts', error: error.message });
    }
}

const getAllPosts = async (req, res) => {
    try {
        const snapshot = await postRef.get();
        if (snapshot.empty) {
            return res.status(404).json({ msg: 'No posts found' });
        }
        const Posts = [];
        snapshot.forEach(doc => {
            Posts.push({ id: doc.id, ...doc.data() })
        });
        res.status(200).json({ msg: `All Posts`, Posts })
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching posts', error: error.message });
    }
}

const getUserPosts = async (req, res) => {
    try {
        const snapshot = await postRef.get();
        if (snapshot.empty) {
            return res.status(404).json({ msg: 'No posts found' });
        }

        const userID = req.user.uid;
        const userPosts = [];
        snapshot.forEach(doc => {
            if (userID == doc.data().userID) {
                userPosts.push({ id: doc.id, ...doc.data() })
            }
        });
        res.status(200).json({ msg: `Posts of ${userID}`, userPosts })
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching posts', error: error.message });
    }
}

const getSinglePost = async (req, res) => {

    try {
        const postId = req.params.id;
        const singlePost = (await postRef.doc(postId).get()).data();
        console.log(singlePost)
        res.status(200).json({ msg: `single Post`, postId, singlePost })
    } catch (error) {
        res.status(500).json({ msg: 'Error single post', error: error.message });

    }
}

const updatePost = async (req, res) => {
    const updatedPost = req.body;
    const postId = req.params.id;

    if (!updatedPost || Object.keys(updatedPost).length === 0) {
        return res.status(400).json({ msg: 'No data provided to update' });
    }
    
    try {
        const postSnapshot = await postRef.doc(postId).get();

        if (!postSnapshot.exists) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Update the post
        await postRef.doc(postId).update({
            ...updatedPost,
            updatedAt: Timestamp.now(),  // Set updatedAt to the current timestamp
        });

        res.status(200).json({ msg: 'Post updated successfully', updatedPost });
    } catch (error) {
        res.status(500).json({ msg: 'Error update post', error: error.message });
    }
}

const deletePost = async (req, res) => {
    try {
        await postRef.doc(req.params.id).delete();
        res.status(200).send('Post deleted')
    } catch (error) {
        res.status(500).json({ msg: 'Error delete post', error: error.message });
    }
}

const deleteAnyPost = async (req, res) => {
    try {
        await postRef.doc(req.params.id).delete();
        res.status(200).send('Post deleted')
    } catch (error) {
        res.status(500).json({ msg: 'Error delete post', error: error.message });
    }
}

export { addPost, getAllPosts, getUserPosts, getSinglePost, updatePost, deletePost, deleteAnyPost }
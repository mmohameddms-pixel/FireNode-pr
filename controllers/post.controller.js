
import postRef from '../models/postModel.js'
import { uploadFileToImgBB } from '../config/upload.js';
import { validationResult } from 'express-validator';

const addPost = async (req, res) => {

    // Validate the input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userID = req.user.id;
    if (!userID) {
        return res.status(400).send("Login First")
    }

    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;
    const imageUrl = req.file ? (await uploadFileToImgBB(req.file.path)) : null;

    try {
        await postRef.add({
            title, content,
            userImage: image ? imageUrl.url : null,
            createdAt: Date.now(), updatedAt: null, userID
        });

        res.status(200).json({
            msg: "Post is added",
            title,
            content,
            userImage: image ? imageUrl.url : null,
            createdAt: Date.now(),
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
        console.log("sdfsfsdfs" + snapshot)
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

        const userID = req.user.id;
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
        const singlePost = (await postRef.doc(req.params.id).get()).data();
        res.status(200).json({ msg: `single Post`, singlePost })
    } catch (error) {
        res.status(500).json({ msg: 'Error single post', error: error.message });

    }
}

const updatePost = async (req, res) => {
    const updatedPost = req.body;
    try {
        await postRef.doc(req.params.id).update({
            ...updatedPost,
            updatedAt: Date.now(),
        });
        res.status(200).json({ msg: `Updated Post`, updatedPost })
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
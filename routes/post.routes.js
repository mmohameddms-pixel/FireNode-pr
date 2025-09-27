import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { isAdmin } from '../middleware/isAdmin.js'
import { isPostOwner } from '../middleware/isPostOwner.js';
import { addPost, deletePost, getAllPosts, getSinglePost, getUserPosts, updatePost, deleteAnyPost } from '../controllers/post.controller.js';
import { upload } from '../config/upload.js';

const postRoutes = Router();

postRoutes.post('/posts', authenticate, upload.single('image'), addPost);

postRoutes.get('/posts', authenticate, getAllPosts);

postRoutes.get('/user/posts', authenticate, getUserPosts);

postRoutes.get('/posts/:id', authenticate, getSinglePost);

postRoutes.put('/posts/:id', isPostOwner, updatePost);

postRoutes.delete('/posts/:id', isPostOwner, deletePost);

postRoutes.delete('/posts/:id', isAdmin, deleteAnyPost);


export default postRoutes;
import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { isAdmin } from '../middleware/isAdmin.js'
import { isPostOwner } from '../middleware/isPostOwner.js';
import { addPost, deletePost, getAllPosts, getSinglePost, getUserPosts, updatePost, deleteAnyPost } from '../controllers/post.controller.js';
import { upload } from '../config/upload.js';

const postRoutes = Router();

postRoutes.post('/posts', authenticate, upload.single('image'), addPost);

postRoutes.get('/posts', authenticate, getAllPosts);

postRoutes.get('/posts/:id', authenticate, getSinglePost);

postRoutes.get('/user/posts', authenticate, getUserPosts);

postRoutes.put('/user/posts/:id', upload.none(), authenticate, isPostOwner, updatePost);

postRoutes.delete('/user/posts/:id', authenticate, isPostOwner, deletePost);

postRoutes.delete('/admin/posts/:id', authenticate, isAdmin, deleteAnyPost);


export default postRoutes;
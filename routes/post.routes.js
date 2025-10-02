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

postRoutes.get('/user/posts', isPostOwner, getUserPosts);

postRoutes.put('user/posts/:id', isPostOwner, updatePost);

postRoutes.delete('user/posts/:id', isPostOwner, deletePost);

postRoutes.delete('admin/posts/:id', isAdmin, deleteAnyPost);


export default postRoutes;
import { Router } from 'express';
import { createPost, getPost, updatePost, deletePost } from '../controllers/postController';

const router = Router();

router.post('/posts', createPost);
router.get('/posts/:id', getPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

export default router;

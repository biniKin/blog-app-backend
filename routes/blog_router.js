// create post
// fetch post 
// fetch post by id
// delete post
// update post

const express = require('express');
const { createPost, fetchPost, fetchPostById, updatePost, deletePost } = require('../controller/blog_controller');

const router = express.Router();

router.post('/posts', createPost);
router.get('posts', fetchPost);
router.get('posts/:id', fetchPostById)
router.patch('posts/:id', updatePost)
router.delete('posts/:id', deletePost)
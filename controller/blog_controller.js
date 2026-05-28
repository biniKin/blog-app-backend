// req - res functions
// create post
// fetch post 
// fetch post by id
// delete post
// update post

// controller: a middleware that only cares about req, and res.
// - no db query. 
// - it takes req object and extract data.
// - call other functions and database functions
// - return res with status and message

const { createBlog, fetchBlogs, fetchBlogById, deleteBlogById, updateBlogById } = require("../models/db_queries_blog");

const createPost = async(req, res)=>{
    try{
        const {title, content} = req.body;
        const user_id = req.user.uid;
        if(!title || !content || !user_id){
            return res.status(400).json({
                msg: "Missing required values"
            });
        }
        const id = await crypto.randomUUID();
        const new_blog_post = {
            id,
            user_id,
            title,
            content,
        }
        const result = await createBlog(new_blog_post);
        // if(!result){
        //     console.log(result);
        //     return res.status(400).json({
        //         msg: 'error on creating blog',
        //     });
        // }
        res.status(201).json({
            msg: "post created",
            data: result
        });
    }catch(e){
        console.log(`error on post creating: ${e}`);
        res.status(500).json({
            msg: "Server error."
        });
    }
}

const fetchPost = async(req, res)=>{
    try{
        const result = await fetchBlogs();
        // if(!result){
        //     res.status(400).json({
        //         msg: 'error on creating blog',
        //     });
        // }
        res.status(200).json({
            msg: "post fetched",
            data: result
        });

    }catch(e){
        console.log(`error on post fetching: ${e}`);
        res.status(500).json({
            msg: "Server error."
        });
    }
}

const fetchPostById = async(req, res) =>{
    try{
        const user_id = req.user.uid;
        const blog_id = req.param.id
        const result = await fetchBlogById(blog_id, user_id);
        if(!result){
            res.status(400).json({
                msg: 'error on creating blog',
            });
        }
        res.status(200).json({
            msg: "post created",
            data: result
        });

    }catch(e){
        console.log(`error on post fetching: ${e}`);
        res.status(500).json({
            msg: "Server error."
        });
    }
}

const deletePost = async(req, res) => {
    try{
        const blog_id = req.params.id;
        const user_id = req.user.uid;
        const result = await deleteBlogById(blog_id, user_id);
        if(!result){
            res.status(400).json({
                msg: 'error on deleting post',
            });
        }
        res.status(200).json({
            msg: "post deleted sucesfully",
            data: result
        });
    } catch(e){
        console.log(`error on post deletion: ${e}`);
        res.status(500).json({
            msg: "Server error."
        });
    }
}

const updatePost = async(req, res)=>{
    try{
        const user_id = req.user.uid;
        const {title, content} = req.body;
        const new_post = {
            title,
            content,
        }
        const result = await updateBlogById(new_post);
        if(!result){
            res.status(400).json({
                msg: 'error on creating blog',
            });
        }
        res.status(200).json({
            msg: "post created",
            data: result
        });

    }catch(e){
        console.log(`error on post fetching`);
        res.status(500).json({
            msg: "Server error."
        });
    }
}

module.exports = {
    createPost,
    fetchPost,
    fetchPostById,
    updatePost,
    deletePost,
}
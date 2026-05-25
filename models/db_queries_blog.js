// db schema for blogs
/* 

    blogs: {
        id,
        user_id,
        title,
        content,
        created_at,
        updated_at,
    }
*/

const { pool } = require("../db/pg_setup");


// Use parameterized queries ($1, $2...) — avoids SQL injection.
// PostgreSQL uses = not ==.
// pool.query() returns a result — you should return rows.
// UPDATE should dynamically update fields.
// Usually created_at uses DB default; don't manually pass it unless needed.

// create blog
// The curly braces { } in the arguments mean "destructuring"
async function createBlog({id, user_id, title, content}) {
    // TODO: go to blog table inseart it.
    try{
        const result = await pool.query(
            `
            INSERT INTO blogs (id, user_id, title, content)
            VALUES ($1, $2, $3, $4)
            `,
            [id, user_id, title, content]
        );

        return result.rows[0];
    }catch(e){
        console.log(`error on creating blog: ${e}`)
        throw new Error(`error on creating blog: ${e}`)
    }
}

// fetch blog by id
async function fetchBlogById(blog_id, user_id) {
    // go to blog table where id == id
    // return json value of blog
    try{
        const result = await pool.query(
            `
            select * from blogs 
            where id=$1 and user_id=$2
            `,
            [blog_id, user_id]
        );
        return result.rows[0];
    }catch(e){
        console.log(`error on fetching blog by id: ${e}`)
        throw new Error(`error on fetching blog by id: ${e}`)
    }
}

// fetch blog
async function fetchBlogs() {
    // go to blog table fetch all
    // return list of blog
    try {
        const result = await pool.query(
            `
            SELECT *
            FROM blogs
            ORDER BY created_at DESC;
            `
        );

        return result.rows;

    } catch (e) {
        console.log(`error fetching blogs: ${e}`);
        throw new Error(`error fetching blogs: ${e}`);
    }
}

// delete blog by id
async function deleteBlogById(blog_id, user_id) {
    // go to blog table where id == id
    // return json value of blog
    try {

        // ownership check
        const result = await pool.query(
            `
            DELETE FROM blogs
            WHERE id = $1
            AND user_id = $2
            RETURNING *;
            `,
            [blog_id, user_id]
        );

        return result.rows[0];

    } catch (e) {
        console.log(`error deleting blog: ${e}`);
        throw new Error(`error deleting blog: ${e}`);
    }
}

// update blog by id
async function updateBlogById({id, user_id, title, content, created_at, updated_at}) {
    // go to blog table where id == id
    // return json value of blog
    // RETURNING * : After insert/update/delete returns the affected row immediately
     try {
        const result = await pool.query(
            `
            UPDATE blogs
            SET
                title = $1,
                content = $2,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            AND user_id = $4
            RETURNING *;
            `,
            [title, content, id, user_id]
        );

        return result.rows[0];

    } catch (e) {
        console.log(`error updating blog: ${e}`);
        throw new Error(`error updating blog: ${e}`);
    }
}

module.exports = {
    createBlog,
    fetchBlogById,
    fetchBlogs,
    updateBlogById,
    deleteBlogById,
};
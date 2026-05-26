    // users: {
    //     user_id,
    //     name,
    //     email,
    //     password,
    //     created_at,
    // }

const { pool } = require("../db/pg_setup");

// save user
async function createNewUser({user_id, name, email, password}) {
    try{
        const result = await pool.query(
            `
            INSERT INTO users(user_id, name, email, password)
            VALUES ($1, $2, $3, $4);
            `,
            [user_id, name, email, password]
        );
        return result.rows[0];
    }catch(e){
        throw new Error(`error on creating user on db: ${e}`);
    }
}

// get user
async function getUser(user_id) {
    try{
       const result = await pool.query(
           `
           SELECT * FROM users
           WHERE user_id=$1;
           `,
           [user_id]
       );
       return result.rows[0];
    }catch(e){
        throw new Error(`error on creating user on db: ${e}`);
    }
}

// remove/delete user
async function deleteUser(user_id) {
    try{
       const result = await pool.query(
           `
           DELETE FROM users
           WHERE user_id = $1
           RETURNING *;
           `,
           [user_id]
       );
       return result.rows[0];
    }catch(e){
        throw new Error(`error on creating user on db: ${e}`);
    }
}

module.exports = {
    createNewUser,
    deleteUser,
    getUser,
}
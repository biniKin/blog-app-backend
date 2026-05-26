const { createNewUser } = require("../models/db_queries_user");
const { hashPassword } = require("../services/password_service");

// create user
const signUp = async(req, res) => {
    // post
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            res.status(400).json({
                message: "Invalid format."
            });
        }

        // lets hash password
        const hashed_password = await hashPassword(password);
        const user_id = await crypto.randomUUID();

        // store it to db
        const new_user = {
            user_id,
            name,
            email,
            hashed_password
        }
        await createNewUser(new_user);

        res.status(200).json({
            message: "Account created sucessfully!"
        });
    }catch(e){
        console.log(`error on account creation: ${e}`);
        res.status(500).json({
            error: "Error occured. Try again"
        });
    }
}

const signIn = async(req, res) => {
    try{

    }catch(e){
        
    }
}
const { createNewUser, getUserByEmail } = require("../models/db_queries_user");
const { hashPassword, checkPassword } = require("../services/password_service");
const jwt = require("jsonwebtoken");

// create user
const signUp = async(req, res) => {
    // post
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
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
            password: hashed_password
        }

        console.log(new_user);
        await createNewUser(new_user);

        const token = jwt.sign({uid: user_id},process.env.JWT_SECRET, {expiresIn: "1d"});

        res.status(201).json({
            message: "Account created sucessfully!",
            token,
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
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                error: "Invalid request format"
            });
        }

        // get password by user's email
        const user = await getUserByEmail(email);

        if(!user){
            return res.status(401).json({
                error: "Invaild credentials"
            });
        }


        const result = await checkPassword(password, user.password);
        if(!result){
            return res.status(401).json({
                error: "Incorrect password"
            });
        }

        // JWT comes to picture
        const token = jwt.sign({uid: user.user_id},process.env.JWT_SECRET, {expiresIn: "1d"});
        
        res.status(200).json({
            message: "Logged in succesfully",
            token
        });

    }catch(e){
        console.log(`error on account log in: ${e}`);
        res.status(500).json({
            error: "Error occured. Try again"
        });
    }
}

module.exports = {
    signIn, signUp
}

// res.json()

// Sends response.

// Does not automatically stop JS execution.
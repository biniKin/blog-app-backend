// blog project to be finished today
const express = require("express");
require("dotenv").config();
const { authMiddleware } = require("./middleware/auth_middleware");
const { signUp, signIn } = require("./controller/user_controller");

const app = express();

app.use(express.json());

const authRouter = require("./routes/user_router");
const blogRouter = require("./routes/blog_router");

app.use("/auth", authRouter);
app.use("/blog", blogRouter);

app.listen(3000, ()=>{
    console.log("server started....");
    console.log(
        `
        host:${process.env.DB_HOST},
        user:${process.env.DB_USER},
        port: ${Number(process.env.DB_PORT)},
        password: ${process.env.DB_PASSWORD},
        database: ${process.env.DB_NAME},
        jwt: ${process.env.JWT_SECRETS}
        `
    )
});

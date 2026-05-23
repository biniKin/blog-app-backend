const { Client } = require("pg")

const con = new Client({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

con.connect().then(()=>console.log("---db connected---"));
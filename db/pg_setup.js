const { Client, Pool } = require("pg")

// const con = new Client({
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     port: process.env.DB_PORT,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// con.connect().then(()=>console.log("---db connected---"));

const pool = new Pool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = {pool}

/*
- using client for creating db connection is not recommended
    - one at a time - onle one person can access with it. If two people visit your site at once, 
    the second person has to wait for the first person's database query to finish.
    - connection drop -> the whole app will drop too
    
*/
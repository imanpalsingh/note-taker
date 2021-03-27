require('dotenv').config()
const Pool = require('pg').Pool

const devConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_port,
}

const prodConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
      }
}


function connect(){
    const pool = new Pool(
        process.env.NODE_ENV === "production" ? prodConfig : devConfig
    );

    return pool;
}

module.exports={
    connect
}
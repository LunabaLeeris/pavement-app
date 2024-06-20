'use server'

import { createConnection } from "mysql2";
import { config } from "dotenv";
import { promisify } from "util";

config({ path: "./src/server/config.env" });

const db_data = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
}

console.log("data: ", db_data)

// Connects to the mysql database
const db = createConnection(db_data);
export const query = promisify(db.query).bind(db);

export const testConnection = async () => {
    return db.connect((err) => {
        if (err) {
            console.log("unable to connect to db")
            console.log(err);
            return false;
        }
        else {
            console.log("connection to database successful")
            return true;
        }
    })
}

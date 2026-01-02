import { Client } from "pg";
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// const createUsersTable = async() => {
//     await client.connect()
//     .then(() => console.log('Connected to PostgreSQL'))
//     .catch(err => console.error('Connection error', err));

//     const result = await client.query(`
//             CREATE TABLE users (
//                 id SERIAL PRIMARY KEY,
//                 username VARCHAR(50) UNIQUE NOT NULL,
//                 email VARCHAR(250) UNIQUE NOT NULL,
//                 password VARCHAR(250) NOT NULL,
//                 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//             )
//         `)
//         console.log(result)
// }

// createUsersTable()

// const addUser = async(username, email, password) => {
//     try {
//         await client.connect();
        
//         const result = await client.query(
//             'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
//             [username, email, password]
//         );
        
//         console.log('User added:', result.rows[0]);
//         return result.rows[0];
//     } catch (err) {
//         console.error('Error adding user:', err);
//     }
// }

// addUser('user2', 'user2@gmail.com', '123456');

const getUser = async(username) => {
    try {
        await client.connect();
        const query = 'SELECT * FROM users WHERE username = $1'
        const result = await client.query(query, [username])
        
        console.log('user:', result.rows);
        return result.rows;
    } catch (err) {
        console.error('Error fetching user:', err);
    } finally {
        await client.end();
    }
}

getUser('tejas')
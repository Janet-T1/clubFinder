// db.js
import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';

console.log('DB_HOST:', process.env.DB_HOST); // Check the host value

// Set up the connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,       
  user: process.env.DB_USER,       
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,   
  port: process.env.DB_PORT,       
});

// Test the connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connection successful');
    connection.release(); 
  }
});

// Export the pool as 'db'
export { db };

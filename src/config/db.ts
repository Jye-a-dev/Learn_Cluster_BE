import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createPool({
	host: process.env.DB_HOST as string,
	user: process.env.DB_USER as string,
	password: process.env.DB_PASSWORD as string,
	database: process.env.DB_NAME as string,
	port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306, // thêm port
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

// Test connection ngay khi start server
db.getConnection()
	.then((conn) => {
		console.log("MySQL connected");
		conn.release();
	})
	.catch((err) => {
		console.error("MySQL connection failed:", err);
	});

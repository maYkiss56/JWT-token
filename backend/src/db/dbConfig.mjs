import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_DATABASE,
	port: parseInt(process.env.DB_PORT, 10),
	options: {
		encrypt: true,
		enableArithAbort: true,
		trustServerCertificate: true,
	},
};

const connectDB = async () => {
	try {
		await sql.connect(dbConfig);
		console.log('Database connected successfully');
	} catch (err) {
		console.error('Database connection error:', err);
	}
};

export default connectDB;

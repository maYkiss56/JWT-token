import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import connectDB from './db/dbConfig.mjs';
import authRoutes from './routes/auth.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Настройка CORS
const corsOptions = {
		origin: 'http://localhost:5173', // Укажите здесь ваш фронтенд URL
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true
};

app.use(cors(corsOptions));

// Middleware для работы с JSON
app.use(express.json());

// Подключение к базе данных
connectDB();

// Middleware для сессий
app.use(session({
		secret: process.env.SESSION_SECRET || 'your-session-secret',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false } // Используйте true, если сервер работает по HTTPS
}));

// Использование маршрутов
app.use('/api/auth', authRoutes);

// Запуск сервера
app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
});


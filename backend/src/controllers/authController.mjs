import sql from 'mssql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Регистрация пользователя
const registerUser = async (req, res) => {
		const { username, email, password } = req.body;

		try {
				const hashedPassword = await bcrypt.hash(password, 10);
				const pool = await sql.connect();
				await pool.request()
						.input('username', sql.VarChar, username)
						.input('email', sql.VarChar, email)
						.input('password', sql.VarChar, hashedPassword)
						.query('INSERT INTO Users (UsersUsername, UsersEmail, UsersPassword) VALUES (@username, @email, @password)');

				res.status(201).json({ message: 'Пользователь успешно зарегистрировался' });
		} catch (error) {
				console.error('Ошибка в регистрации:', error);
				res.status(500).json({ error: 'Регистрация провалена' });
		}
};

// Логин пользователя
const loginUser = async (req, res) => {
		const { email, password } = req.body;

		try {
				const pool = await sql.connect();
				const result = await pool.request()
						.input('email', sql.VarChar, email)
						.query('SELECT * FROM Users WHERE UsersEmail = @email');

				if (result.recordset.length === 0) {
						return res.status(401).json({ error: 'Invalid credentials' });
				}

				const user = result.recordset[0];
				const isMatch = await bcrypt.compare(password, user.UsersPassword);

				if (!isMatch) {
						return res.status(401).json({ error: 'Invalid credentials' });
				}

				// Генерация токена
				const privateKey = process.env.JWT_SECRET;
				const token = jwt.sign(
						{ userId: user.UsersId, email: user.UsersEmail },
						privateKey,
						{ expiresIn: '1h' }
				);

				// Сохранение токена в сессии
				req.session.token = token;
				console.log('Server-side token created:', token); // Вывод токена на сервере
				
				res.status(200).json({ token }); // Отправляем токен в ответе
		} catch (error) {
				console.error('Login error:', error);
				res.status(500).json({ error: 'Login failed' });
		}
};

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
		const token = req.session.token;

		if (!token) {
				return res.sendStatus(401);
		}

		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
				if (err) {
						return res.sendStatus(403);
				}

				req.user = user;
				next();
		});
};

// Выход из системы
const logoutUser = (req, res) => {
		req.session.destroy(err => {
				if (err) {
						return res.status(500).json({ error: 'Logout failed' });
				}

				res.status(200).json({ message: 'Logout successful' });
		});
};

// Защищенный маршрут
const protectedRoute = (req, res) => {
	res.json({ message: 'This is a protected route' });
};

export { registerUser, loginUser, authenticateToken, logoutUser, protectedRoute  };

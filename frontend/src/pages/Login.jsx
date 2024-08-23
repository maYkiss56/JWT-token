import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/index.css';

const Login = () => {
		const [email, setEmail] = useState('');
		const [password, setPassword] = useState('');
		const navigate = useNavigate();

		const handleSubmit = async (e) => {
				e.preventDefault();
				try {
						const response = await axios.post('http://localhost:5000/api/auth/login', {
								email,
								password,
						}, {
								withCredentials: true // Убедитесь, что это указано, если нужно отправлять куки
						});
						
						// Сохранение токена в localStorage (или другом месте)
						localStorage.setItem('token', response.data.token);
						console.log('Client-side token:', response.data.token); // Вывод токена на клиенте
						console.log('Login successful');
						navigate('/protected');
				} catch (error) {
						console.error('Login error:', error);
				}
		};

		return (
				<form onSubmit={handleSubmit} className='form'>
						<input 
								className='input'
								type="email" 
								value={email} 
								onChange={(e) => setEmail(e.target.value)} 
								placeholder="Email" 
								required 
						/>
						<input 
								className='input'
								type="password" 
								value={password} 
								onChange={(e) => setPassword(e.target.value)} 
								placeholder="Password" 
								required 
						/>
						<button type="submit" className='button'>Login</button>
				</form>
		);
};

export default Login;

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/index.css';

const Registration = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:5000/api/auth/register', {
				username,
				email,
				password,
			});
			console.log(response.data);
			// Перенаправление на страницу авторизации после успешной регистрации
			navigate('/login');
		} catch (error) {
			console.error('Registration error:', error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='form'>
			<input
				className='input'
				type="text" 
				value={username} 
				onChange={(e) => setUsername(e.target.value)} 
				placeholder="Username" 
				required 
			/>
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
			<button type="submit" className='button'>Register</button>
		</form>
	);
};

export default Registration;

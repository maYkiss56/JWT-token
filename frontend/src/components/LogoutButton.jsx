import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/index.css';

const LogoutButton = () => {
		const navigate = useNavigate();

		const handleLogout = async () => {
				try {
						await axios.post('http://localhost:5000/api/auth/logout', {}, {
								withCredentials: true // Позволяет отправлять куки
						});
						localStorage.removeItem('token'); // Удаление токена из localStorage
						console.log('Logout successful');
						navigate('/login');
				} catch (error) {
						console.error('Logout error:', error);
				}
		};

		return <button onClick={handleLogout} className='button'>Logout</button>;
};

export default LogoutButton;

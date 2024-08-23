import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton'; // Убедитесь, что путь к компоненту правильный
import '../css/index.css';


const Protected = () => {
		const [data, setData] = useState(null);
		const navigate = useNavigate();

		useEffect(() => {
				const fetchData = async () => {
						try {
								const token = localStorage.getItem('token'); // Получаем токен из localStorage
								const response = await axios.get('http://localhost:5000/api/auth/protected', {
										headers: {
												Authorization: `Bearer ${token}` // Отправляем токен в заголовке
										},
										withCredentials: true // Позволяет отправлять и получать куки
								});
								setData(response.data.message);
						} catch (error) {
								console.error('Error fetching protected data:', error);
								navigate('/login');
						}
				};

				fetchData();
		}, [navigate]);

		return (
				<div className='centr'>
						<h1 className='title'>Protected Route</h1>
						{data ? <p>{data}</p> : <p>Loading...</p>}
						<LogoutButton/>
				</div>
		);
};

export default Protected;


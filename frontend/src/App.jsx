import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Protected from './pages/Protected'; // Компонент для защищенного маршрута

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/register" element={<Registration />} />
				<Route path="/login" element={<Login />} />
				<Route path="/protected" element={<Protected />} />
			</Routes>
		</Router>
	);
};

export default App;
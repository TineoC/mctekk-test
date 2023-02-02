import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
	return (
		<div className='p-4 bg-slate-50'>
			<Navbar />
			<Routes>
				<Route path='/' element={<></>} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route
					path='/users'
					element={
						<ProtectedRoute>
							<Users />
						</ProtectedRoute>
					}
				/>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;

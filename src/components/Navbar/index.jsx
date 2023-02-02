import React, { useContext } from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
import { TokenContext } from "../../context/TokenContext";

const Navbar = () => {
	const { token } = useContext(TokenContext);

	const loggedIn = token !== "null";

	return (
		<>
			<div className='flex flex-row gap-4 mb-4'>
				<HomeButton />
				{loggedIn ? (
					<>
						<LogoutButton />
						<UsersButton />
					</>
				) : (
					<LoginButton />
				)}

				<RegisterButton />
			</div>
			<Outlet />
		</>
	);
};

const LogoutButton = () => {
	const { setToken } = useContext(TokenContext);

	const handleLogout = () => {
		localStorage.setItem("token", null);
		setToken("null");
	};

	return (
		<button
			className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'
			onClick={handleLogout}
		>
			Logout
		</button>
	);
};

const LoginButton = () => {
	return (
		<Link to='/login'>
			<button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
				Login
			</button>
		</Link>
	);
};

const RegisterButton = () => {
	return (
		<Link to='/register'>
			<button className='bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded'>
				Register
			</button>
		</Link>
	);
};

const HomeButton = () => {
	return (
		<Link to='/'>
			<button className='bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'>
				Home
			</button>
		</Link>
	);
};

const UsersButton = () => {
	return (
		<Link to='/users'>
			<button className='bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded'>
				Users
			</button>
		</Link>
	);
};

export default Navbar;

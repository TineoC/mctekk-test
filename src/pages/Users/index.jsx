import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../context/TokenContext";
const Users = () => {
	const [users, setUsers] = useState([]);
	const { token } = useContext(TokenContext);

	const getUsers = async () => {
		const response = await fetch("https://apidev.kanvas.dev/v2/users", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data = await response.json();

		if (!response.ok) {
			alert("Something bad happened");
		}

		setUsers(data);
	};

	useEffect(() => {
		getUsers();
	}, []);

	console.log(users);

	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
			<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50'>
					<tr>
						<th scope='col' className='px-6 py-3'>
							Avatar
						</th>
						<th scope='col' className='px-6 py-3'>
							Full Name
						</th>
						<th scope='col' className='px-6 py-3'>
							DOB
						</th>
						<th scope='col' className='px-6 py-3'>
							Registered At
						</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, i) => {
						return (
							<tr
								key={i}
								className='bg-white border-b dark:border-gray-700'
							>
								<th
									scope='row'
									className='px-6 py-4 font-medium text-gray-500 whitespace-nowrap'
								>
									<img
										src={
											user.photo.url ||
											"https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-12.jpg"
										}
										alt=''
										srcset=''
										className='rounded max-w-[100px]'
									/>
								</th>
								<td className='px-6 py-4'>
									{user.firstname} {user.lastname}
								</td>
								<td className='px-6 py-4'>{user.dob}</td>
								<td className='px-6 py-4'>{user.registered}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Users;

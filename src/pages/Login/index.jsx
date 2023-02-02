import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../context/TokenContext";

const schema = yup
	.object({
		email: yup.string().email().required(),
		password: yup.string().required(),
	})
	.required();

const Login = () => {
	const navigate = useNavigate();

	const { setToken } = useContext(TokenContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	const onSubmit = async (payload) => {
		const response = await fetch("https://apidev.kanvas.dev/v2/auth", {
			method: "POST",
			body: JSON.stringify(payload),
		});

		const data = await response.json();
		const error = data.errors?.message;
		const INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE =
			"Invalid email or password.";

		if (!response.ok && error === INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE) {
			// Check for invalid email or password

			return alert("Invalid credentials: Wrong email or password");
		}

		if (!response.ok) {
			return alert("Something bad happened");
		}

		setToken(data.token);
		navigate("/users");
	};

	return (
		<>
			<h1 className='font-bold text-2xl'>Login Form</h1>

			<form
				className='flex flex-col mt-4 gap-y-2 max-w-[50%]'
				onSubmit={handleSubmit(onSubmit)}
			>
				<label className='text-md font-bold' htmlFor='email'>
					Email
				</label>
				<input
					type='email'
					name='email'
					placeholder='Write your email...'
					{...register("email")}
				/>
				<p className='text-sm text-red-500'>{errors.email?.message}</p>
				<label className='text-md font-bold' htmlFor='surnames'>
					Password
				</label>
				<input
					type='password'
					name='password'
					placeholder='Write your password...'
					{...register("password")}
				/>
				<p className='text-sm text-red-500'>
					{errors.password?.message}
				</p>

				<button
					type='submit'
					className='bg-blue-500 text-white text-xl font-bold p-2 hover:cursor-pointer hover:bg-blue-600'
				>
					Login
				</button>
			</form>
		</>
	);
};

export default Login;

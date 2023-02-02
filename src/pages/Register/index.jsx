import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
	.object({
		firstname: yup.string().required(),
		lastname: yup.string().required(),
		email: yup.string().email().required(),
		password: yup.string().min(8).max(22).required(),
		verify_password: yup
			.string()
			.required("confirm password is a required field")
			.oneOf([yup.ref("password"), null], "Passwords dont match"),
		default_company: yup
			.string()
			.required("default company is a required field")
			.min(3)
			.max(20),
	})
	.required();

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	const onSubmit = async (payload) => {
		const response = await fetch("https://apidev.kanvas.dev/v2/users", {
			method: "POST",
			body: JSON.stringify(payload),
		});

		const data = await response.json();
		const error = data.errors?.message;
		const EXISTING_EMAIL_ERROR_MESSAGE =
			"This email already has an account.";

		if (!response.ok && error === EXISTING_EMAIL_ERROR_MESSAGE) {
			// Check for existing email error
			return alert("There is an account already with that email");
		}

		if (!response.ok) {
			return alert("Something bad happened");
		}

		alert("Register went succesfully");
	};

	return (
		<>
			<h1 className='font-bold text-2xl'>Register Form</h1>

			<form
				className='flex flex-col mt-4 gap-y-2 max-w-[50%]'
				onSubmit={handleSubmit(onSubmit)}
			>
				<label className='text-md font-bold' htmlFor='name'>
					Name
				</label>
				<input
					type='text'
					name='firstname'
					placeholder='Write your name...'
					{...register("firstname")}
				/>
				<p className='text-sm text-red-500'>
					{errors.firstname?.message}
				</p>

				<label className='text-md font-bold' htmlFor='surnames'>
					Surnames
				</label>
				<input
					type='text'
					name='lastname'
					placeholder='Write your surnames...'
					{...register("lastname")}
				/>
				<p className='text-sm text-red-500'>
					{errors.lastname?.message}
				</p>

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

				<label className='text-md font-bold' htmlFor='password'>
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

				<label className='text-md font-bold' htmlFor='verify_password'>
					Confirm password
				</label>
				<input
					type='password'
					name='verify_password'
					placeholder='Confirm your password...'
					{...register("verify_password")}
				/>
				<p className='text-sm text-red-500'>
					{errors.verify_password?.message}
				</p>

				<label className='text-md font-bold' htmlFor='default_company'>
					Default company
				</label>
				<input
					type='text'
					name='default_company'
					placeholder='Write your default company name...'
					{...register("default_company")}
				/>
				<p className='text-sm text-red-500'>
					{errors.default_company?.message}
				</p>

				<button
					type='submit'
					className='bg-indigo-500 text-white text-xl font-bold p-2 hover:cursor-pointer hover:bg-indigo-600'
				>
					Register
				</button>
			</form>
		</>
	);
};

export default Register;

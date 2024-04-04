import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../validations/loginSchema';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(loginSchema),
	});

	// use Mutation belirli bir form işlemi sonrasında çalışır kullanılır
	const loginMutation = useMutation({
		mutationKey: ['Login'],
		mutationFn: async (data: any) => {
			return (await axios.post('https://reqres.in/api/login', data)).data;
		},
		onSuccess(data, variables, context) {
			console.log('data', data);
			sessionStorage.setItem('accessToken', data.token);
			// yönledirme yapalım.
			navigate('/'); // anasayfaya yönledir
		},
		onError(error, variables, context) {
			alert('Form bilgilerini tekrar deneyiniz');
		},
	});

	const onSubmit = async (formValue: any) => {
		console.log('formValue', formValue);
		await loginMutation.mutateAsync(formValue);
	};

	return (
		<div style={{ padding: '10px', border: '1px solid gray' }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input {...register('email')} />
				<p>{errors.email?.message}</p>

				<br></br>

				<input {...register('password')} />
				<p>{errors.password?.message}</p>

				<input type="submit" />
			</form>
		</div>
	);
}

export default LoginPage;

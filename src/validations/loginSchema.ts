import * as yup from 'yup';

export const loginSchema = yup
	.object({
		email: yup
			.string()
			.email('Email formatında olmalı')
			.required('Email boş geçilemez'),
		password: yup
			.string()
			.matches(new RegExp('', 'i'))
			.required('Parola boş geçilemez'),
	})
	.required();

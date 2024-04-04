import React from 'react';
import { Navigate } from 'react-router-dom';

function AuthGuard({ children }: any) {
	const token = sessionStorage.getItem('accessToken');

	if (token) return children; // ilgili componenti domda gösterebilirsin demek

	return <Navigate to="/login"></Navigate>;
}

export default AuthGuard;

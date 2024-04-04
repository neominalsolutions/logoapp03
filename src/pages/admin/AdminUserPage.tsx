import React from 'react';
import { useSelector } from 'react-redux';
import { AdminRootState } from '../../store/adminStore';
import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminUserPage() {
	const state = useSelector(
		(RootState: AdminRootState) => RootState.counterState
	);

	const { data, isLoading, isFetched, isError, error } = useQuery({
		queryKey: ['users'],
		queryFn: () => {
			return axios.get('https://jsonplaceholder.typicode.com/users');
		},
		retry: 3,
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
		refetchOnMount: false,
	});

	if (isLoading) return <>Veri Yükleniyor...</>;

	if (isError) return <>Bir hata oluştu</>;

	if (isFetched && data) {
		return (
			<>
				<div>
					<Link to="/">Home</Link>{' '}
					{data.data.map((user: any) => {
						return <div key={user.id}>{user.name}</div>;
					})}
				</div>
				<div>Counter: {state.value}</div>;
			</>
		);
	}

	return <></>;
}

export default AdminUserPage;

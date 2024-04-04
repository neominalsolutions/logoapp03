import React from 'react';
import { useSelector } from 'react-redux';
import { AdminRootState } from '../../store/adminStore';

function AdminUserPage() {
	const state = useSelector(
		(RootState: AdminRootState) => RootState.counterState
	);

	return <div>Counter: {state.value}</div>;
}

export default AdminUserPage;

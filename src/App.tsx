import React, { useEffect } from 'react';
import { Link, Outlet, useRoutes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import FavoriteProductsPage from './pages/FavoriteProductsPage';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from './store/store';
import { adminStore } from './store/adminStore';
import AdminUserPage from './pages/admin/AdminUserPage';
import { FavoriteFetch } from './store/features/FavoriteProductSlice';
import LoginPage from './pages/LoginPage';
import AuthGuard from './guards/AuthGuard';

function App() {
	const dispatch: AppDispatch = useDispatch();
	const state = useSelector((state: RootState) => state.favoriteState);

	useEffect(() => {
		debugger;
		console.log('load-server-state');
		// SERVER da olan favorite bilgilerinin client state aktarılması.

		dispatch(FavoriteFetch());
	}, []);

	const routes = useRoutes([
		{
			path: '',
			element: (
				<>
					<div style={{ padding: '5px' }}>
						<nav>
							<Link to="/products">Products</Link>{' '}
							<Link to="/favorite-products">Favorite Products</Link>{' '}
							<Link to="/admin">Admin</Link>{' '}
							<Link to="/admin/users">Admin Users</Link>{' '}
							<Link to="/login">Login Page</Link>
						</nav>
						<main>
							<Provider store={store}>
								<Outlet />
							</Provider>
						</main>
					</div>
				</>
			),
			children: [
				{
					path: 'products',
					Component: ProductsPage,
				},
				{
					path: 'favorite-products',
					Component: FavoriteProductsPage,
				},
				{
					path: 'login',
					Component: LoginPage,
				},
			],
		},
		{
			path: 'admin',
			element: (
				<>
					<AuthGuard>
						<div>
							<p>Admin Layout</p>
							<Provider store={adminStore}>
								<Outlet />
							</Provider>
						</div>
					</AuthGuard>
				</>
			),
			children: [
				{
					path: 'users',
					Component: AdminUserPage,
				},
			],
		},
	]);

	return (
		<>
			{routes}
			{state.isLoading && <>... loading Server State</>}
		</>
	);
}

export default App;

import React from 'react';
import { Link, Outlet, useRoutes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import FavoriteProductsPage from './pages/FavoriteProductsPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { adminStore } from './store/adminStore';
import AdminUserPage from './pages/admin/AdminUserPage';

function App() {
	return useRoutes([
		{
			path: '',
			element: (
				<>
					<div style={{ padding: '5px' }}>
						<nav>
							<Link to="/products">Products</Link>{' '}
							<Link to="/favorite-products">Favorite Products</Link>{' '}
							<Link to="/admin">Admin</Link>{' '}
							<Link to="/admin/users">Admin Users</Link>
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
			],
		},
		{
			path: 'admin',
			element: (
				<>
					<div>
						<p>Admin Layout</p>
						<Provider store={adminStore}>
							<Outlet />
						</Provider>
					</div>
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
}

export default App;

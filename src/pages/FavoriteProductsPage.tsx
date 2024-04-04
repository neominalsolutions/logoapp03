import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { FavoriteProduct } from '../store/features/FavoriteProductSlice';

function FavoriteProductsPage() {
	// state listener
	// stateden bilgileri dinler ve state bilgilerine component erişiriz.
	const state = useSelector((state: RootState) => state.favoriteState);

	return (
		<div>
			{state.products.map((item: FavoriteProduct) => {
				return <div>{item.name}</div>;
			})}
		</div>
	);
}

export default FavoriteProductsPage;

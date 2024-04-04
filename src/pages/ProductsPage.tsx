import React from 'react';

import productMock from '../data/products.json';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/features/FavoriteProductSlice';

interface Product {
	id: number;
	stock: number;
	name: string;
	price: number;
}

function ProductsPage() {
	const data: Product[] = [...productMock];
	console.log('data', data);

	const dispatch = useDispatch();

	const onAddToFavorite = (item: Product) => {
		// state dispatch işlemi
		dispatch(addItem(item));
	};

	return (
		<div>
			{data.map((item: Product) => {
				return (
					<div key={item.id}>
						{item.name} - {item.price} TL
						<button onClick={() => onAddToFavorite(item)}>
							Favori Ürünü Ekle
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default ProductsPage;

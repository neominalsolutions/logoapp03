import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface FavoriteProduct {
	id: number;
	price: number;
	name: string;
}

type FavoriteProducts = {
	products: FavoriteProduct[];
};

const initState: FavoriteProducts = {
	products: [],
};

// Favorite_AddItem action_type
// Favorite_DeleteItem action_type
const favoriteProductSlice = createSlice({
	name: 'Favorite',
	initialState: initState,
	reducers: {
		addItem: (
			state: FavoriteProducts,
			action: PayloadAction<FavoriteProduct>
		) => {
			state.products.push(action.payload);
		},
		deleteItem: (
			state: FavoriteProducts,
			action: PayloadAction<{ id: number }>
		) => {
			state.products = state.products.filter((x) => x.id == action.payload.id);
		},
	},
});

export const favoriteProductsReducer = favoriteProductSlice.reducer;
export const { addItem, deleteItem } = favoriteProductSlice.actions;

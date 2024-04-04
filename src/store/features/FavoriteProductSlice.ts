import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface FavoriteProduct {
	id: number;
	price: number;
	name: string;
}

type FavoriteProducts = {
	products: FavoriteProduct[];
	isLoading: boolean;
	error: any;
	fetched: boolean;
};

const initState: FavoriteProducts = {
	products: [],
	isLoading: false,
	fetched: true,
	error: {},
};

// async işlemlerin store statelerini createAsyncThunk diye bir yapı üzerinden yönetiyoruz
// APIDAN bulların initalState yükleme yapmak için kullanıldığını düşündüğümüz case
export const FavoriteFetch = createAsyncThunk('Favorite_FETCH', async () => {
	console.log('FavoriteFetch');
	// axios ile api call
	return await new Promise((resolve, reject) => {
		setTimeout(() => {
			const data: any = [
				{
					id: 1,
					name: 'P-1',
					price: 20,
					stock: 10,
				},
				{
					id: 2,
					name: 'P-2',
					price: 20,
					stock: 10,
				},
			];
			resolve(data);
		}, 3000);
	});
});

// Favorite_AddItem action_type
// Favorite_DeleteItem action_type
const favoriteProductSlice = createSlice({
	name: 'Favorite',
	initialState: initState,
	reducers: {
		// senkron geliştirme
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
	extraReducers: (builder) => {
		builder.addCase(FavoriteFetch.pending, (state: FavoriteProducts) => {
			state.isLoading = true;
		});
		builder.addCase( // 3sn sonra promise çözülünce çalışır
			FavoriteFetch.fulfilled,
			(state: FavoriteProducts, action: PayloadAction<any>) => {
				state.products = [...action.payload];
				// api dan çekilen veri products state aktarıldı.
				state.isLoading = false;
				state.fetched = true;
			}
		);
		builder.addCase(
			FavoriteFetch.rejected,
			(state: FavoriteProducts, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.fetched = false;
				state.error = action.payload; // action.payload; sunucundan gelen hata nesnesi
				state.products = [];
			}
		);
	},
});

export const favoriteProductsReducer = favoriteProductSlice.reducer;
export const { addItem, deleteItem } = favoriteProductSlice.actions;

import { configureStore } from '@reduxjs/toolkit';
import { CounterReducer } from './features/CounterSlice';

export const adminStore = configureStore({
	reducer: {
		counterState: CounterReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AdminRootState = ReturnType<typeof adminStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof adminStore.dispatch;

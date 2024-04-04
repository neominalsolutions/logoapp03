import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root') as any);
const client = new QueryClient();
root.render(
	<BrowserRouter>
		<QueryClientProvider client={client}>
			<Provider store={store}>
				<App />
			</Provider>
		</QueryClientProvider>
	</BrowserRouter>
);

import React from 'react';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import App from './App';

import { store } from './store';

const Index = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default Index;

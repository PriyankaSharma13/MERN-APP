// store.js

import { combineReducers } from 'redux';
import { legacy_createStore as createStore } from 'redux'
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    // Add other reducers here if needed
});

const store = createStore(rootReducer);

export default store;

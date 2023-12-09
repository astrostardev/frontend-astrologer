import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // Correct import statement
import astroReducer from './slice/astrologerSlice';

const reducer = combineReducers({
  astroState: astroReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;


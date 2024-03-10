import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // Correct import statement
import astroReducer from './slice/astrologerSlice';
import conversationReducer from './slice/conversationSlice.js'

const reducer = combineReducers({
  astroState: astroReducer,
  conversationState:conversationReducer,

});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;


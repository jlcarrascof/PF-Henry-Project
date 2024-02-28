import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../Reducer/reducer';

// Tienda Redux sin persistencia
const store = configureStore({
  reducer: rootReducer,
});

export default store;

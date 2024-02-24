// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import rootReducer from '../Reducer/reducer'; // Ajusta la ruta de importación

// // Crea la tienda Redux
// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunkMiddleware)
// );

// export default store;


import { createStore, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import rootReducer from '../Reducer/reducer'


const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);


export default store


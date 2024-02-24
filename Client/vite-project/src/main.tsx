// //import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App"; //Componente Principal
// import { Provider } from 'react-redux';
// import store from './Redux/Store/store'; // Importa la tienda Redux
// import "./index.css";

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );


// Importa createRoot de react-dom
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './Redux/Store/store';
import './index.css';

// Obtiene la referencia al elemento root
const rootElement = document.getElementById('root');

// Verifica si el elemento root existe antes de llamar a createRoot
if (rootElement) {
  // Utiliza createRoot en lugar de ReactDOM.render
  createRoot(rootElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  console.error('No se encontró el elemento con el ID "root".');
}


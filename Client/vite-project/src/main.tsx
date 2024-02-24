// //import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import { BrowserRouter } from "react-router-dom";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );



import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App.jsx'; //Todo lo que vamos a renderizar
import { BrowserRouter } from 'react-router-dom'; //LAS RUTAS SE PONEN DENTRO DE ESTE (TODAS LAS RUTAS ESTAN EN App)

import { Provider } from 'react-redux';
import store from './Redux/Store/store.js';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);





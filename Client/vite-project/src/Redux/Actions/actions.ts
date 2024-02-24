import axios from "axios";
import { Dispatch } from "redux";
import { GET_HOTELS } from './actions-types';

// Define el tipo de acción de manera explícita
export interface Action {
    type: string;
    payload: any;
}

// Obtengo todos los HOTELES
export const getHotels = () => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const { data } = await axios.get('http://localhost:3001/hotels/');
            console.log('Hoteles obtenidos en actions:', data);
            dispatch({
                type: GET_HOTELS,
                payload: data
            });
        } catch (error) {
            console.error("Error al obtener hoteles:", error);
        }
    }
}

// import axios from "axios";
// import { Dispatch } from "redux";
// import { GET_HOTELS } from './actions-types';

// // Definición del tipo de acción
// export interface Action {
//     type: string;
//     payload: any; // Ajusta este tipo según la estructura de datos de tu payload
// }

// // Obtengo todos los HOTELES
// export const getHotels = () => {
//     return async (dispatch: Dispatch<Action>) => {
//         try {
//             const { data } = await axios.get('http://localhost:3001/hotels/');
//             console.log('Hoteles obtenidos en actions:', data); // Agrega este console.log
//             dispatch({
//                 type: GET_HOTELS,
//                 payload: data
//             });
//         } catch (error) {
//             // Aquí puedes manejar el error de acuerdo a tus necesidades
//             console.error("Error al obtener hoteles:", error);
//         }
//     }
// }









import axios from "axios";
import { Dispatch } from "redux";
import { GET_HOTELS, GET_HOTEL_BY_ID, GET_HOTEL_BY_NAME } from './actions-types';

export interface Action {
    type: string;
    payload: any;
}

export const getHotels = () => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const { data } = await axios.get('http://localhost:3001/hotels/');
            dispatch({
                type: GET_HOTELS,
                payload: data
            });
        } catch (error) {
            console.error("Error al obtener hoteles:", error);
        }
    }
}

export const getHotelById = (id: string) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/hotels/${id}`);
            dispatch({
                type: GET_HOTEL_BY_ID,
                payload: data
            });
        } catch (error) {
            console.error("Error al obtener hotel por ID:", error);
        }
    }
}

export const getHotelByName = (name: string) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/hotels/?name=${name}`);
            dispatch({
                type: GET_HOTEL_BY_NAME,
                payload: data
            });
        } catch (error) {
            console.error("Error al obtener hotel por nombre:", error);
        }
    }
}




// import axios from "axios";
// import { Dispatch } from "redux";
// import { GET_HOTELS } from './actions-types';

// // Define el tipo de acción de manera explícita
// export interface Action {
//     type: string;
//     payload: any;
// }

// // Obtengo todos los HOTELES
// export const getHotels = () => {
//     return async (dispatch: Dispatch<Action>) => {
//         try {
//             const { data } = await axios.get('http://localhost:3001/hotels/');
//             console.log('Hoteles obtenidos en actions:', data);
//             dispatch({
//                 type: GET_HOTELS,
//                 payload: data
//             });
//         } catch (error) {
//             console.error("Error al obtener hoteles:", error);
//         }
//     }
// }

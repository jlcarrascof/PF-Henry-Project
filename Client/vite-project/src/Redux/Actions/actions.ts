import axios from "axios";
import { Dispatch } from "redux";
import { GET_HOTELS } from './actions-types';

// Definición del tipo de acción
interface Action {
    type: string;
    payload: any; // Aquí debes especificar el tipo correcto de tu payload
}

// Obtengo todos los HOTELES
export const getHotels = () => {
    return async function (dispatch: Dispatch<Action>) {
        try {
            const { data } = await axios.get('http://localhost:3001/hotels/');
            dispatch({
                type: GET_HOTELS,
                payload: data
            });
        } catch (error) {
            // Aquí puedes manejar el error de acuerdo a tus necesidades
            console.error("Error al obtener hoteles:", error);
        }
    }
}













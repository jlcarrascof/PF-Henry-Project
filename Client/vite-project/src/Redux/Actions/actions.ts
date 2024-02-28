import axios from "axios";
import { Dispatch } from "redux";
import { User } from 'firebase/auth'; // Importa el tipo User de Firebase
import {
  GET_HOTEL_BY_ID,
  GET_HOTEL_BY_NAME,
  GET_FILTERED_HOTELS,
} from "./actions-types";

// Definir una interfaz para las acciones
export interface Action {
  type: string;
  payload: any;
}

// Acción para obtener un hotel por su ID
export const getHotelById = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(`http://localhost:3002/hotels/${id}`);
      dispatch({
        type: GET_HOTEL_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching hotel by ID:", error);
    }
  };
};

// Acción para obtener un hotel por su nombre
export const getHotelByName = (address: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3002/hotels/?address=${address}`
      );
      dispatch({
        type: GET_HOTEL_BY_NAME,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching hotel by name:", error);
    }
  };
};

// Acción para obtener hoteles filtrados
export const getFilteredHotels = (filters: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get("http://localhost:3002/hotels/", {
        params: filters,
      });
      dispatch({
        type: GET_FILTERED_HOTELS,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching filtered hotels:", error);
    }
  };
};

// Nueva acción para autenticar al usuario
export const authenticateUser = (user: User | null): Action => ({
  type: 'AUTHENTICATE_USER',
  payload: user,
});

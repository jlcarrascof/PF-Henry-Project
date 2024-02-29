import axios from "axios";
import { Dispatch } from "redux";
import { User } from 'firebase/auth'; // Importa el tipo User de Firebase
import {
  GET_HOTEL_BY_ID,
  GET_HOTEL_BY_NAME,
  GET_FILTERED_HOTELS,
} from "./actions-types";


import {HotelAction, POST_REVIEW, RESET, RoomAction} from "./actions-types";


// VAMOS A TRAER A LAS HABITACIONES YIEPEEEEEEEEEEEEE

export interface Action {
  type: string;
  payload: any;
}

export const getRooms = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get("http://localhost:3002/rooms/");
      dispatch({
        type: "GET_ROOMS",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener habitaciones:", error);
    }
  };
};

export const getRoomById = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(`http://localhost:3002/rooms/${id}`);
      dispatch({
        type: "GET_ROOMS_BY_ID",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener habitacion por ID:", error);
    }
  };
};

export const getRoomByName = (address: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3002/rooms/?address=${address}`
      );
      dispatch({
        type: "GET_ROOMS_BY_NAME",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener habitacion por nombre:", error);
    }
  };
};

export const getFilteredRooms = (filters: any) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const { data } = await axios.get("http://localhost:3002/rooms/filtered/", {
        params: filters,
      });
      dispatch({
        type: "GET_FILTERED_ROOMS",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener habitaciones filtradas:", error);
    }
  };
};

export const postReview = (review: any) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const res = await axios.post('http://localhost:3002/hotels/', review)
      dispatch({
        type: POST_REVIEW,
        payload: res.data
      })
    } catch (error) {
      alert('An error occured at posting your review'+ error)
    }
  }
}
///tipo alert solo recibe 1 parametro

export const resetFilters = () => ({
  type: RESET
})

// Acción para obtener un hotel por su ID
/* export const getHotelById = (id: string) => {
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
}; */

// Nueva acción para autenticar al usuario
export const authenticateUser = (user: User | null): Action => ({
  type: 'AUTHENTICATE_USER',
  payload: user,
});

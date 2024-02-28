import axios from "axios";
import { Dispatch } from "redux";
import { ThunkAction } from 'redux-thunk';
import {HotelAction, RoomAction} from "./actions-types";


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

export const getroomById = (id: string) => {
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
  return async (dispatch: Dispatch<Action>) => {
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

/* export interface Action {
  type: string;
  payload: any;
}

export const getHotels = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get("http://localhost:3002/hotels/");
      dispatch({
        type: "GET_HOTELS",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener hoteles:", error);
    }
  };
};

export const getHotelById = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(`http://localhost:3002/hotels/${id}`);
      dispatch({
        type: "GET_HOTEL_BY_ID",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener hotel por ID:", error);
    }
  };
};

export const getHotelByName = (address: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3002/hotels/?address=${address}`
      );
      dispatch({
        type: "GET_HOTEL_BY_NAME",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener hotel por nombre:", error);
    }
  };
};

export const getFilteredHotels = (filters: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get("http://localhost:3002/hotels/filtered/", {
        params: filters,
      });
      dispatch({
        type: "GET_FILTERED_HOTELS",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener hoteles filtrados:", error);
    }
  };
}; */







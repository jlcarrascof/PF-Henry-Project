import axios from "axios";
import { Dispatch } from "redux";
import {
  GET_HOTELS,
  GET_HOTEL_BY_ID,
  GET_HOTEL_BY_NAME,
  GET_FILTERED_HOTELS,
} from "./actions-types";

export interface Action {
  type: string;
  payload: any;
}

/* export const getHotels = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get("http://localhost:3002/hotels/");
      dispatch({
        type: GET_HOTELS,
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener hoteles:", error);
    }
  };
}; */

export const getHotelById = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(`http://localhost:3002/hotels/${id}`);
      dispatch({
        type: GET_HOTEL_BY_ID,
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
        type: GET_HOTEL_BY_NAME,
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
      const { data } = await axios.get("http://localhost:3002/hotels/", {
        params: filters,
      });
      dispatch({
        type: GET_FILTERED_HOTELS,
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener hoteles filtrados:", error);
    }
  };
};









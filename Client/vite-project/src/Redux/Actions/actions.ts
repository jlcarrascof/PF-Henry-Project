import axios from "axios";
import { Dispatch } from "redux";
import { ThunkAction } from 'redux-thunk';
import {
  HotelAction
} from "./actions-types";

export interface Action {
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

/* export const getFilteredHotels = (filters: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get("http://localhost:3002/hotels/filtered/", {
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
}; */

import store from "../Store/store"

export const getFilteredHotels = (
  params: { p: number, minPrice: "", maxPrice: "", address: "", desiredCheckInDate: "", desiredCheckOutDate: "",
  minScore: "", services: "", SrvSpa: false, SrvWifi: false, SrvBar: false, SrvRoomService: false, 
  SrvConcierge: false, SrvFineDiningRestaurant: false }
): ThunkAction<void, typeof store , unknown, HotelAction> => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:3002/hotels/filtered", { params });
    dispatch({
      type: 'GET_FILTERED_HOTELS',
      payload: data,
    });
  } catch (error) {
    console.error("Error al obtener hoteles:", error);
  }
};







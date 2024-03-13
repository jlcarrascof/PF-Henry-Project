/* import axios, { AxiosInstance } from "axios";
import { Dispatch } from "redux";
import { User } from "firebase/auth";
import { ThunkAction } from "redux-thunk";
import { HotelAction, RESET, RoomAction, UserAction } from "./actions-types";

export interface Action {
  type: string;
  payload: any;
}

const baseUrl = import.meta.env.VITE_APP_BACK

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl
});

export const createUser = (userData: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const response = await axiosInstance.post(
        "/users",
        userData
      );
      dispatch({
        type: "POST_USER",
        payload: response.data.insertedId,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUsers = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axiosInstance.get("/users/");
      dispatch({
        type: "GET_USERS",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };
};
export const disableRoom = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axiosInstance.patch(
        `/admin/rooms/${id}`
      );
      dispatch({
        type: "DISABLE_ROOMS_BY_ID",
        payload: data,
      });
    } catch (error) {
      console.log("Error al borrar logicamente", error);
    }
  };
};

export const getDisabledRooms = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get("http://localhost:3002/admin/rooms/");
      dispatch({
        type: "GET_DISABLED_ROOMS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const authenticateUser = (user_email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const authenticate = await axios.get(
        `http://localhost:3002/users?user_email=${user_email}&password=${password}`
      );
      dispatch({
        type: "AUTHENTICATE_USER",
        payload: authenticate.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const propertySearch = (address: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axiosInstance.get(`/admin/search/`, {
        params: address,
      });
      dispatch({
        type: "GET_MIXED_SEARCH",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const disableHotel = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axiosInstance.patch(
        `/admin/hotels/${id}`
      );
      dispatch({
        type: "DISABLE_HOTELS_BY_ID",
        payload: data,
      });
    } catch (error) {
      console.log("Error al borrar logicamente", error);
    }
  };
};

export const getDisabledHotels = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axiosInstance.get(`/admin/hotels/`);
      dispatch({
        type: "GET_DISABLED_HOTELS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRooms = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axiosInstance.get("/rooms/");
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
      const { data } = await axiosInstance.get(`/rooms/${id}`);
      dispatch({
        type: "GET_ROOMS_BY_ID",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener habitacion por ID:", error);
    }
  };
};

export const getFilteredRooms = (filters: any) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const { data } = await axiosInstance.get("/rooms/filtered", {
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

export const postReview = (roomId: string, reviewData: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axiosInstance.post(
        `/rooms/${roomId}/reviews`,
        reviewData
      );
      console.log("actions: payload de postReview:", res.data);
      dispatch({
        type: "POST_REVIEW",
        payload: res.data,
      });
      return res.data;
    } catch (error) {
      console.error("An error occurred while posting the review:", error);
    }
  };
};

export const resetFilters = () => ({
  type: RESET,
});

export const reserveRoom = (userId: any, formData: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axiosInstance.post(
        `/users/${userId}/reservations`,
        formData
      );
      dispatch({
        type: "RESERVE_ROOM",
        payload: res.data,
      });
    } catch (error) {
      console.error("An error occurred while posting the reservation:", error);
    }
  };
};

export const createHotels = (data: any) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const response = await axiosInstance.post("/hotels/", data);
      dispatch({
        type: "POST_HOTEL",
        payload: response,
      });
    } catch (error) {
      console.error("Error al crear el hotel:", error);
    }
  };
};

export const getReservations = (userEmail: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axiosInstance.get(
        `/users/${userEmail}/reservations`
      );

      dispatch({
        type: "GET_RESERVATIONS",
        payload: res.data,
      });
    } catch (error) {
      console.error("An error occurred while getting reservations:", error);
    }
  };
};

export const deleteReservation = (userId: string, reservationId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axiosInstance.delete(
        `/users/${userId}/reservations/${reservationId}`
      );
      dispatch({
        type: "DELETE_RESERVATION",
        payload: res.data,
      });
    } catch (error) {
      console.error("An error occurred while deleting the reservation:", error);
    }
  };
};

export const getConfirmedReservations = (userEmail: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axiosInstance.get(
        `/users/${userEmail}/reservations/confirmed`
      );
      dispatch({
        type: "GET_CONFIRMED_RESERVATIONS",
        payload: res.data,
      });
    } catch (error) {
      console.error(
        "An error occurred while getting confirmed reservations:",
        error
      );
    }
  };
};

export const getFavoriteRooms = (identifier: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axiosInstance.get(
        `/users/${identifier}/favorites`
      );
      dispatch({
        type: "GET_FAVORITE_ROOMS",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener las habitaciones favoritas:", error);
    }
  };
};

export const addFavoriteRoom = (identifier: string, roomId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      await axiosInstance.patch(
        `/users/${identifier}/favorites/${roomId}`
      );
      dispatch({
        type: "ADD_FAVORITE_ROOM",
        payload: roomId,
      });
    } catch (error) {
      console.error("Error al agregar la habitación a favoritos:", error);
    }
  };
};

export const removeFavoriteRoom = (identifier: string, roomId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      await axiosInstance.delete(
        `/users/${identifier}/favorites/${roomId}`
      );
      dispatch({
        type: "REMOVE_FAVORITE_ROOM",
        payload: roomId,
      });
    } catch (error) {
      console.error("Error al eliminar la habitación de favoritos:", error);
    }
  };
}; */


import axios from "axios";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import {HotelAction, RESET, RoomAction, UserAction} from "./actions-types";
import { User } from "firebase/auth";


export interface Action {
  type: string;
  payload: any;
}

export const createUser = (userData: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/users",
        userData
      );
      dispatch({
        type: "POST_USER",
        payload: response.data.insertedId,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUsers = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get("http://localhost:3002/admin/users/");
      dispatch({
        type: "GET_ALL_USERS",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };
};
export const disableRoom = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3002/admin/rooms/${id}`
      );
      dispatch({
        type: "DISABLE_ROOMS_BY_ID",
        payload: data,
      });
    } catch (error) {
      console.log("Error al borrar logicamente", error);
    }
  };
};

export const getDisabledRooms = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(`http://localhost:3002/admin/rooms/`);
      dispatch({
        type: "GET_DISABLED_ROOMS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const authenticateUser = (user_email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const authenticate = await axios.get(
        `http://localhost:3002/users?user_email=${user_email}&password=${password}`
      );
      dispatch({
        type: "AUTHENTICATE_USER",
        payload: authenticate.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const propertySearch = (address: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(`http://localhost:3002/admin/search/`, {
        params: address,
      });
      dispatch({
        type: "GET_MIXED_SEARCH",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const disableHotel = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3002/admin/hotels/${id}`
      );
      dispatch({
        type: "DISABLE_HOTELS_BY_ID",
        payload: data,
      });
    } catch (error) {
      console.log("Error al borrar logicamente", error);
    }
  };
};

export const getDisabledHotels = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(`http://localhost:3002/admin/hotels/`);
      dispatch({
        type: "GET_DISABLED_HOTELS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

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

export const getFilteredRooms = (filters: any) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const { data } = await axios.get("http://localhost:3002/rooms/filtered", {
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

export const postReview = (roomId: string, reviewData: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.post(
        `http://localhost:3002/rooms/${roomId}/reviews`,
        reviewData
      );
      console.log("actions: payload de postReview:", res.data);
      dispatch({
        type: "POST_REVIEW",
        payload: res.data,
      });
      return res.data;
    } catch (error) {
      console.error("An error occurred while posting the review:", error);
    }
  };
};

export const resetFilters = () => ({
  type: RESET,
});

export const reserveRoom = (userId: any, formData: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.post(
        `http://localhost:3002/users/${userId}/reservations`,
        formData
      );
      dispatch({
        type: "RESERVE_ROOM",
        payload: res.data,
      });
    } catch (error) {
      console.error("An error occurred while posting the reservation:", error);
    }
  };
};

export const createHotels = (data: any) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:3002/hotels/", data);
      dispatch({
        type: "POST_HOTEL",
        payload: response,
      });
    } catch (error) {
      console.error("Error al crear el hotel:", error);
    }
  };
};

export const getReservations = (userEmail: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.get(
        `http://localhost:3002/users/${userEmail}/reservations`
      );

      dispatch({
        type: "GET_RESERVATIONS",
        payload: res.data,
      });
    } catch (error) {
      console.error("An error occurred while getting reservations:", error);
    }
  };
};

export const deleteReservation = (userId: string, reservationId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.delete(
        `http://localhost:3002/users/${userId}/reservations/${reservationId}`
      );
      dispatch({
        type: "DELETE_RESERVATION",
        payload: res.data,
      });
    } catch (error) {
      console.error("An error occurred while deleting the reservation:", error);
    }
  };
};

export const getConfirmedReservations = (userEmail: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.get(
        `http://localhost:3002/users/${userEmail}/reservations/confirmed`
      );
      dispatch({
        type: "GET_CONFIRMED_RESERVATIONS",
        payload: res.data,
      });
    } catch (error) {
      console.error(
        "An error occurred while getting confirmed reservations:",
        error
      );
    }
  };
};

export const getFavoriteRooms = (identifier: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3002/users/${identifier}/favorites`
      );
      dispatch({
        type: "GET_FAVORITE_ROOMS",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener las habitaciones favoritas:", error);
    }
  };
};

export const addFavoriteRoom = (identifier: string, roomId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      await axios.patch(
        `http://localhost:3002/users/${identifier}/favorites/${roomId}`
      );
      dispatch({
        type: "ADD_FAVORITE_ROOM",
        payload: roomId,
      });
    } catch (error) {
      console.error("Error al agregar la habitación a favoritos:", error);
    }
  };
};

export const removeFavoriteRoom = (identifier: string, roomId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      await axios.delete(
        `http://localhost:3002/users/${identifier}/favorites/${roomId}`
      );
      dispatch({
        type: "REMOVE_FAVORITE_ROOM",
        payload: roomId,
      });
    } catch (error) {
      console.error("Error al eliminar la habitación de favoritos:", error);
    }
  };
};
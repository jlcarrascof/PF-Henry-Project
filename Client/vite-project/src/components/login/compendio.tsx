// actions.ts:

import axios from "axios";
import { Dispatch } from "redux";
import { User } from 'firebase/auth'
import { ThunkAction } from 'redux-thunk';
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
      const { data } = await axios.get("http://localhost:3002/rooms/", {
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

// Nueva acción para autenticar al usuario
export const authenticateUser = (user: User | null): Action => ({
  type: 'AUTHENTICATE_USER',
  payload: user,
});


/* export const getHotels = () => {

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

};

export const postReview = (review: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.post("http://localhost:3002/hotels/", review);
      dispatch({
        type: POST_REVIEW,
        payload: res.data,
      });
    } catch (error) {
      alert("An error occured at posting your review", error);
    }
  };
};

export const resetFilters = () => ({
  type: RESET,
});

};*/



//reducer.ts:


/* import { Action } from "../Actions/actions"; //  tipo Action  archivo Types.ts
export interface State {
  allHotels: any[]; // Define una propiedad allHotels que será un arreglo de cualquier tipo
  allHotelsBackUp: any[];
  currentHotel: any;
  filteredHotels: any[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

const initialState: State = {
  allHotels: [],
  allHotelsBackUp: [],
  currentHotel: null,
  filteredHotels: [],
  currentPage: 1,
  totalPages: 1,
  totalResults: 0,
};

const rootReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case GET_HOTELS:
          return {
              ...state,
              allHotels: action.payload.hotels,
              allHotelsBackUp: action.payload.hotels
          };
    case GET_HOTEL_BY_ID:
      return {
        ...state,
        currentHotel: action.payload,
      };
    case GET_HOTEL_BY_NAME:
      return {
        ...state,
        currentHotel: action.payload,
      };

    case GET_FILTERED_HOTELS:
      return {
        ...state,
        allHotels: action.payload.hotels,
        allHotelsBackUp: action.payload.hotels,
        currentPage: action.payload.currentPage, // Actualizar la página actual
        totalPages: action.payload.totalPages, // Actualiza el total de páginas
        totalResults: action.payload.totalResults,
      };

    case POST_REVIEW:
      return {
        ...state,
      };
    case RESET:
      return {
        ...state,
        filteredHotels: [],
      };
    default:
      return state;
  }
};

export default rootReducer; */

import { Action } from '../Actions/actions'; //  tipo Action  archivo Types.ts
import { HotelAction, RoomAction, AUTHENTICATE_USER, LOGOUT_USER } from '../Actions/actions-types';


export interface State {
    allRooms: any[];
    allRoomsBackUp: any[]; 
    currentRoom: any;
    filteredRooms: any[];
    currentPage: number; 
    totalPages: number; 
    totalResults: number;
    isAuthenticated: boolean;
    user: any
  }
  
  const initialState: State = {
    allRooms: [],
    allRoomsBackUp: [],
    currentRoom: null,
    filteredRooms: [],
    currentPage: 1, 
    totalPages: 1, 
    totalResults: 0,
    isAuthenticated: false,
    user: null,
  };
  
  const rootReducer = (state: State = initialState, action: Action): State => {
    switch(action.type) {
        case "GET_ROOMS":
            return {
                ...state,
                allRooms: action.payload.rooms,
                allRoomsBackUp: action.payload.rooms,
                currentPage: action.payload.currentPage, 
                totalPages: action.payload.totalPages,
                totalResults: action.payload.totalResults,
            };
        case "GET_ROOMS_BY_ID":
            return {
                ...state,
                currentRoom: action.payload
            };
        case "GET_ROOMS_BY_NAME":
            return {
                ...state,
                currentRoom: action.payload
            };
  
            case "GET_FILTERED_ROOMS":
              return {
                ...state,
                filteredRooms: action.payload.filteredRooms,
                allRooms: action.payload.rooms,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages,
                totalResults: action.payload.totalResults,
              };
         // Agrega casos para manejar la autenticación del usuario
            case 'AUTHENTICATE_USER':
              return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
              };

            case 'LOGOUT_USER':
              return {
                ...state,
                isAuthenticated: false,
                user: null,
              };
            default:
              return state;
    }
  }



export default rootReducer;


/* case GET_HOTEL_BY_ID:
      return {
        ...state,
        currentHotel: action.payload
      };
    case GET_HOTEL_BY_NAME:
      return {
        ...state,
        currentHotel: action.payload
      };

    case GET_FILTERED_HOTELS:
      return {
        ...state,
        allHotels: action.payload.hotels,
        allHotelsBackUp: action.payload.hotels,
        currentPage: action.payload.currentPage, // Actualizar la página actual
        totalPages: action.payload.totalPages, // Actualiza el total de páginas
        totalResults: action.payload.totalResults,
      }; */

// store.ts:

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../Reducer/reducer';

// Tienda Redux sin persistencia
const store = configureStore({
  reducer: rootReducer,
});

export default store;

/* import { createStore, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import rootReducer from '../Reducer/reducer'


const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);


export default store

 */
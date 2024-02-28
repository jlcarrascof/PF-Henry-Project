import { Action } from "../Actions/actions"; //  tipo Action  archivo Types.ts
import {
  GET_HOTELS,
  GET_HOTEL_BY_ID,
  GET_HOTEL_BY_NAME,
  GET_FILTERED_HOTELS,
  POST_REVIEW,
  RESET,
} from "../Actions/actions-types";

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
    /* case GET_HOTELS:
          return {
              ...state,
              allHotels: action.payload.hotels,
              allHotelsBackUp: action.payload.hotels
          }; */
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

export default rootReducer;

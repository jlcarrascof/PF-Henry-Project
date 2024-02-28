import { Action } from '../Actions/actions'; // Importa el tipo Action
import { GET_HOTEL_BY_ID, GET_HOTEL_BY_NAME, GET_FILTERED_HOTELS } from '../Actions/actions-types';

export interface State {
  allHotels: any[]; // Define una propiedad allHotels que será un arreglo de cualquier tipo
  allHotelsBackUp: any[]; 
  currentHotel: any;
  filteredHotels: any[];
  currentPage: number; 
  totalPages: number; 
  totalResults: number;
  isAuthenticated: boolean; // Agrega el estado de autenticación
  user: any; // Agrega la información del usuario autenticado
}

const initialState: State = {
  allHotels: [],
  allHotelsBackUp: [],
  currentHotel: null,
  filteredHotels: [],
  currentPage: 1, 
  totalPages: 1, 
  totalResults: 0,
  isAuthenticated: false, // Inicializa como no autenticado
  user: null, // Inicializa como null
}; 

const rootReducer = (state: State = initialState, action: Action): State => {
  switch(action.type) {
    case GET_HOTEL_BY_ID:
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

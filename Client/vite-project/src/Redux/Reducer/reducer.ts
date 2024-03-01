
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
import { HotelAction, RoomAction, AUTHENTICATE_USER, LOGOUT_USER, POST_HOTEL } from '../Actions/actions-types';


export interface State {
  allHotels: any[]; // Define una propiedad allHotels que será un arreglo de cualquier tipo
    allRooms: any[];
    allRoomsBackUp: any[]; 
    currentRoom: any;
    filteredRooms: any[];
    currentPage: number; 
    pageNum: any;
    totalPages: number; 
    totalResults: number;
    isAuthenticated: boolean;
    user: any;
    post_hotel: any[];
    reservations: any[];
  }
 
  const initialState: State = {
    allRooms: [],
    allHotels: [],
    allRoomsBackUp: [],
    currentRoom: null,
    filteredRooms: [],
    currentPage: 1, 
    totalPages: 1, 
    pageNum: null,
    totalResults: 0,
    isAuthenticated: false,
    user: null,
    post_hotel: [],
    reservations: []
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
              currentRoom: action.payload,
            };
         case "GET_ROOMS_BY_NAME":
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
                pageNum: action.payload.pageNum,
              };
        case "POST_REVIEW":
            return {
              ...state,
              currentRoom: {
                  ...state.currentRoom,
                  reviews: [...state.currentRoom.reviews, action.payload],
              },
          };
        case "RESET":
            return {
              ...state,
              filteredRooms: [], 
              allRooms: state.allRoomsBackUp 
          };
        case 'RESERVE_ROOM':
           return {
                ...state,
                reservations: [...state.reservations, action.payload]
          }; 
        case "POST_RESERVATION":
            return {
                ...state,
                reservations: [...state.reservations, action.payload.reservation]
            };

        case "DELETE_RESERVATION":
            return {
                ...state,
                reservations: state.reservations.filter(reservation => reservation._id !== action.payload.reservation._id)
            };
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
        case "POST_HOTEL":
                return{
                    ...state,
                    post_hotel:action.payload
                }
                
            default:
              return state;
    }
}
export default rootReducer

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
    

          case "GET_FILTERED_HOTELS":
            return {
              ...state,
              filteredHotels: action.payload.filteredHotels,
              allHotels: action.payload.hotels,
              currentPage: action.payload.currentPage,
              totalPages: action.payload.totalPages,
              totalResults: action.payload.totalResults,
            };
      default:
          return state;
  }
} */















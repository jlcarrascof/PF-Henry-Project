import { Action } from '../Actions/actions'; //  tipo Action  archivo Types.ts
import { HotelAction, RoomAction } from '../Actions/actions-types';


export interface State {
    allRooms: any[];
    allRoomsBackUp: any[]; 
    currentRoom: any;
    filteredRooms: any[];
    currentPage: number; 
    totalPages: number; 
    totalResults: number;
  }
  
  const initialState: State = {
    allRooms: [],
    allRoomsBackUp: [],
    currentRoom: null,
    filteredRooms: [],
    currentPage: 1, 
    totalPages: 1, 
    totalResults: 0,
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
        default:
            return state;
    }
  }



/* export interface State {
  allHotels: any[];
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
  switch(action.type) {
      case "GET_HOTELS":
          return {
              ...state,
              allHotels: action.payload.hotels,
              allHotelsBackUp: action.payload.hotels,
              currentPage: action.payload.currentPage, 
              totalPages: action.payload.totalPages,
              totalResults: action.payload.totalResults,
          };
      case "GET_HOTEL_BY_ID":
          return {
              ...state,
              currentHotel: action.payload
          };
      case "GET_HOTEL_BY_NAME":
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

export default rootReducer;














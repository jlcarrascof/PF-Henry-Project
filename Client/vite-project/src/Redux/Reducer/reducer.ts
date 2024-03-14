import { Action } from "../Actions/actions"; //  tipo Action  archivo Types.ts
import { HotelAction, RoomAction, UserAction } from "../Actions/actions-types";

export interface State {
  allAdminRooms: any[];
  allAdminHotels: any[];
  allHotels: any[];
  allRooms: any[];
  allHotelsBackUp: any[];
  allRoomsBackUp: any[];
  currentRoom: any;
  filteredRooms: any[];
  currentPage: number;
  pageNum: any;
  totalPages: number;
  totalResults: number;
  isAuthenticated: boolean;
  allUsers: any[];
  user: any;
  post_hotel: any[];
  reservations: any[];
  confirmedReservations: any[];
  favoriteRooms: string[];
  fav: boolean;
}

const initialState: State = {
  allAdminRooms: [],
  allAdminHotels: [],
  allRooms: [],
  allHotels: [],
  allHotelsBackUp: [],
  allRoomsBackUp: [],
  currentRoom: null,
  filteredRooms: [],
  currentPage: 1,
  totalPages: 1,
  pageNum: null,
  totalResults: 0,
  isAuthenticated: false,
  allUsers: [],
  user: {},
  post_hotel: [],
  reservations: [],
  confirmedReservations: [],
  favoriteRooms: [],
  fav: false,
};

const rootReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        allUsers: action.payload,
      };
    case "GET_USER_BY_ID":
      return {
        ...state,
        user: action.payload
      }
    case "DELETE_USER":
      const updatedUsers = state.user.filter(user => user.id !== action.payload);
      return {
        ...state,
        allUsers: updatedUsers,
      }
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
          currentRoom: action.payload,
        };
      case "GET_DISABLED_ROOMS":
        return {
          ...state,
          allAdminRooms: action.payload.rooms,
          allRoomsBackUp: action.payload.rooms,
        };
        case "GET_USER_BY_ID":
        return {
          ...state,
          allUsers: action.payload
        };
      case "GET_DISABLED_HOTELS":
        return {
          ...state,
          allAdminHotels: action.payload.hotels,
          allHotelsBackUp: action.payload.hotels,
          totalResults: action.payload.totalResults,
        };
      case "GET_MIXED_SEARCH":
        return {
          ...state,
          allAdminHotels: action.payload.result,
        };
    case "DISABLE_HOTEL_BY_ID":
      return {
        ...state,
        allHotels: action.payload.hotels,
      };
    case "DISABLE_ROOM_BY_ID":
      return {
        ...state,
        allRooms: action.payload.rooms,
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
        allRooms: state.allRoomsBackUp,
      };
    case "RESERVE_ROOM":
      return {
        ...state,
        reservations: [...state.reservations, action.payload],
      };
    case "POST_RESERVATION":
      return {
        ...state,
        reservations: [...state.reservations, action.payload.reservation],
      };

    case "GET_RESERVATIONS":
      return {
        ...state,
        reservations: action.payload,
      };

    case "DELETE_RESERVATION":
      return {
        ...state,
        reservations: state.reservations.filter(
          (reservation) => reservation._id !== action.payload.reservation._id
        ),
      };
    case "POST_USER":
      return {
        ...state,
        allUsers: [...state.allUsers, action.payload],
        isAuthenticated: true,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: [...state.user, action.payload],
        isAuthenticated: true,
      };
    case "AUTHENTICATE_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: [...state.user, action.payload],
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isAuthenticated: false,
        user: [],
      };
    case "POST_HOTEL":
      return {
        ...state,
        post_hotel: action.payload,
      };

    case "GET_CONFIRMED_RESERVATIONS":
      return {
        ...state,
        confirmedReservations: action.payload,
      };

    case "GET_FAVORITE_ROOMS":
      return {
        ...state,
        favoriteRooms: action.payload,
      };

    case "ADD_FAVORITE_ROOM":
      return {
        ...state,
        favoriteRooms: [...state.favoriteRooms, action.payload],
        fav: true,
      };

    case "REMOVE_FAVORITE_ROOM":
      return {
        ...state,
        favoriteRooms: state.favoriteRooms.filter(
          (roomId) => roomId !== action.payload
        ),
        fav: false,
      };

    default:
      return state;
  }
};
export default rootReducer;
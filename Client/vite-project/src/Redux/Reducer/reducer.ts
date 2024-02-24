import { Action } from '../Actions/actions'; //  tipo Action  archivo Types.ts
import { GET_HOTELS, GET_HOTEL_BY_ID, GET_HOTEL_BY_NAME, GET_FILTERED_HOTELS } from '../Actions/actions-types';

export interface State {
  allHotels: any[]; // Define una propiedad allHotels que será un arreglo de cualquier tipo
  allHotelsBackUp: any[]; 
  currentHotel: any;
  filteredHotels: any[];
}

const initialState: State = {
  allHotels: [],
  allHotelsBackUp: [],
  currentHotel: null,
  filteredHotels: [],
};

const rootReducer = (state: State = initialState, action: Action): State => {
  switch(action.type) {
      case GET_HOTELS:
          return {
              ...state,
              allHotels: action.payload.hotels,
              allHotelsBackUp: action.payload.hotels
          };
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
                    filteredHotels: action.payload.hotels
                };
      default:
          return state;
  }
}

export default rootReducer;














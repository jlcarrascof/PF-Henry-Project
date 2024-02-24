import { Action } from '../Actions/actions'; //  tipo Action  archivo Types.ts
import { GET_HOTELS, GET_HOTEL_BY_ID, GET_HOTEL_BY_NAME } from '../Actions/actions-types';

export interface State {
  allHotels: any[]; // Define una propiedad allHotels que será un arreglo de cualquier tipo
  allHotelsBackUp: any[]; 
  currentHotel: any;
}

const initialState: State = {
  allHotels: [],
  allHotelsBackUp: [],
  currentHotel: null,
};

const rootReducer = (state: State = initialState, action: Action): State => {
  switch(action.type) {
      case GET_HOTELS:
          return {
              ...state,
              allHotels: action.payload,
              allHotelsBackUp: action.payload
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
      default:
          return state;
  }
}

export default rootReducer;





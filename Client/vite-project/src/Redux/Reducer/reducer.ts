import { Action } from '../Actions/actions'; //  tipo Action  archivo Types.ts
import { GET_HOTELS } from '../Actions/actions-types';

export interface State {
  allHotels: any[]; // Define una propiedad allHotels que será un arreglo de cualquier tipo
  allHotelsBackUp: any[]; // Define una propiedad allHotelsBackUp que será un arreglo de cualquier tipo
}

const initialState: State = {
  allHotels: [],
  allHotelsBackUp: [],
};

const rootReducer = (state: State = initialState, action: Action): State => {
  switch(action.type) {
    case GET_HOTELS:
      console.log('Datos de hoteles recibidos en reducer:', action.payload);
      return {
        ...state,      
        allHotels: action.payload,
        allHotelsBackUp: action.payload
      };
    default:
      return state;
  }
}

export default rootReducer;






// import { Hotel, User, Action } from '../../types';

// // Definición de estado inicial
// interface InitialState {
//   hotels: Hotel[];
//   users: User[];
// }

// const initialState: InitialState = {
//   hotels: [],
//   users: [],
// };

// // Reducer
// const rootReducer = (state: InitialState = initialState, action: Action): InitialState => {
//   switch(action.type) {
//     case 'GET_HOTELS':
//       return {
//         ...state,
//         hotels: action.payload,
//       };
//     case 'GET_USERS':
//       return {
//         ...state,
//         users: action.payload,
//       };
//     // Otros casos
//     default:
//       return state;
//   }
// };

// export default rootReducer;







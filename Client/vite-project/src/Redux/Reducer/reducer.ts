import { Action } from '../../types'; //  tipo Action  archivo Types.ts
import { GET_HOTELS } from '../Actions/actions-types';

export interface State {
  allHotels: any[]; // Ajusta el tipo de acuerdo a la estructura de tus datos
  allHotelsBackUp: any[]; // Ajusta el tipo de acuerdo a la estructura de tus datos
}

const initialState: State = {
  allHotels: [],
  allHotelsBackUp: [],
};

const rootReducer = (state: State = initialState, action: Action): State => {
  switch(action.type) {
    case GET_HOTELS:
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







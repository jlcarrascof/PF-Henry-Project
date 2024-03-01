// Definir tipos de acciones

export type HotelAction =
  | { type: 'GET_HOTELS'; payload: any }
  | { type: 'GET_HOTEL_BY_ID'; payload: any }
  | { type: 'GET_HOTEL_BY_NAME'; payload: any }
  | { type: 'GET_FILTERED_HOTELS'; payload: any }
  | { type: 'DISABLE_ROOMS_BY_ID'; payload: any}
  | { type: 'GET_DISABLED_ROOMS'; payload: any}
  | { type: 'POST_HOTEL'; payload: any};

  export type RoomAction =
  | { type: 'GET_ROOMS'; payload: any }
  | { type: 'GET_ROOMS_BY_ID'; payload: any }
  | { type: 'GET_ROOMS_BY_NAME'; payload: any }
  | { type: 'GET_FILTERED_ROOMS'; payload: any }
  | { type: 'POST_REVIEW'; payload: any};

  export const RESET = 'RESET'
  
  export const GET_USERS = 'GET_USERS'
  export const GET_USER_NAME = 'GET_USER_NAME'


  export const AUTHENTICATE_USER = 'AUTHENTICATE_USER'
  export const LOGOUT_USER = 'LOGOUT_USER'

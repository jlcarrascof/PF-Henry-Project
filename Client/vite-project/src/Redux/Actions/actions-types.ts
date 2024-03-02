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

  export type UserAction =
  | { type: 'GET_USERS'; payload: any}
  | { type: 'GET_USER_NAME'; payload: any}
  | { type: 'POST_USER'; payload: any}
  | { type: 'PATCH_USER'; payload:any}
  | { type: 'AUTHENTICATE_USER'; payload: any}
  | { type: 'LOGOUT_USER'; payload: any}

  export const RESET = 'RESET'


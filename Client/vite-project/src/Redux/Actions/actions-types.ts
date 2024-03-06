// Definir tipos de acciones


// export const GET_HOTELS = "GET_HOTELS";
// export const GET_HOTEL_BY_ID = "GET_HOTELS_ID";
// export const GET_HOTEL_BY_NAME = "GET_HOTEL_BY_NAME";
// export const POST_HOTEL = "POST_HOTEL";
// export const GET_FILTERED_HOTELS = "GET_FILTERED_HOTELS";
// export const POST_REVIEW = "POST_REVIEW";
// export const RESET = "RESET";

// export const GET_USERS = "GET_USERS";
// export const GET_USER_NAME = "GET_USER_NAME";

export const GET_ROOMS = "GET_ROOMS";
export const GET_ROOMS_BY_ID = "GET_ROOMS_ID";
export const GET_ROOMS_BY_NAME = "GET_ROOMS_BY_NAME";
export const POST_ROOMS = "POST_ROOMS";
export const GET_FILTERED_ROOMS = "GET_FILTERED_ROOMS";

/* 
export const GET_USERS = 'GET_USERS'
export const GET_USER_NAME = 'GET_USER_NAME' */

// export type HotelAction =
//   | { type: 'GET_HOTELS'; payload: any }
//   | { type: 'GET_HOTEL_BY_ID'; payload: any }
//   | { type: 'GET_HOTEL_BY_NAME'; payload: any }
//   | { type: 'GET_FILTERED_HOTELS'; payload: any };


export const POST_REVIEW = "POST_REVIEW";


export const GET_USERS = "GET_USERS";
export const GET_USER_NAME = "GET_USER_NAME";

export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const LOGOUT_USER = "LOGOUT_USER";
//FILTROS

//ORDENAMIENTOS

//RESET

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


import axios from "axios";
import { Dispatch } from "redux";
import { User } from "firebase/auth";
import { ThunkAction } from "redux-thunk";
import { HotelAction, RESET, RoomAction, UserAction } from "./actions-types";

// VAMOS A TRAER A LAS HABITACIONES YIEPEEEEEEEEEEEEE

export interface Action {
  type: string;
  payload: any;
}

export const createUser = (userData: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/users",
        userData
      );
      dispatch({
        type: "POST_USER",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const disableRoom = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3002/admin/rooms/${id}`
      );
      dispatch({
        type: "DISABLE_ROOMS_BY_ID",
        payload: data,
      });
    } catch (error) {
      console.log("Error al borrar logicamente", error);
    }
  };
};

export const getDisabledRooms = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get("http://localhost:3002/admin/rooms/");
      dispatch({
        type: "GET_DISABLED_ROOMS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const authenticateUser = (email: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const authenticate = await axios(
        `http://localhost:3002/users/authenticate/${email}`
      );
      dispatch({
        type: "AUTHENTICATE_USER",
        payload: authenticate,
      });
    } catch (error) {
      console.log("An error occured: ", error);
    }
  };
};

export const getRooms = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get("http://localhost:3002/rooms/");
      dispatch({
        type: "GET_ROOMS",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener habitaciones:", error);
    }
  };
};

export const getRoomById = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(`http://localhost:3002/rooms/${id}`);
      dispatch({
        type: "GET_ROOMS_BY_ID",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener habitacion por ID:", error);
    }
  };
};

// export const getRoomByName = (address: string) => {
//   return async (dispatch: Dispatch<Action>) => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:3002/rooms/?address=${address}`
//       );
//       dispatch({
//         type: "GET_ROOMS_BY_NAME",
//         payload: data,
//       });
//     } catch (error) {
//       console.error("Error al obtener habitacion por nombre:", error);
//     }
//   };
// };

export const getFilteredRooms = (filters: any) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const { data } = await axios.get("http://localhost:3002/rooms/filtered", {
        params: filters,
      });
      dispatch({
        type: "GET_FILTERED_ROOMS",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener habitaciones filtradas:", error);
    }
  };
};

// export const postReview = (roomId: string, reviewData: any) => {
//   return async (dispatch: Dispatch<Action>) => {
//       try {
//           const res = await axios.post(`http://localhost:3002/rooms/${roomId}/reviews`, reviewData);
//           console.log("actions: payload de postReview:",res.data)
//           dispatch({
//               type: "POST_REVIEW",
//               payload: res.data,
//           });
//       } catch (error) {
//           console.error('An error occurred while posting the review:', error);
//       }
//   };
// };

export const postReview = (roomId: string, reviewData: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.post(
        `http://localhost:3002/rooms/${roomId}/reviews`,
        reviewData
      );
      console.log("actions: payload de postReview:", res.data);
      dispatch({
        type: "POST_REVIEW",
        payload: res.data,
      });
      return res.data;
    } catch (error) {
      console.error("An error occurred while posting the review:", error);
    }
  };
};

export const resetFilters = () => ({
  type: RESET,
});

export const reserveRoom = (userId: any, formData: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.post(
        `http://localhost:3002/users/${userId}/reservations`,
        formData
      );
      dispatch({
        type: "RESERVE_ROOM",
        payload: res.data,
      });
    } catch (error) {
      console.error("An error occurred while posting the reservation:", error);
    }
  };
};

// export const authenticateUser = (user: User | null): Action => ({
//   type: 'AUTHENTICATE_USER',
//   payload: user,

// });

// export const authenticateUser = (userData: { email: string; password: string }) => {
//   return async (dispatch: Dispatch<Action>) => {
//     try {
//       console.log("UserData: ", userData) //ESTO RECIBE BIEN ASIQ ESTO NO ES EL PROBLEMA
//       const response = await axios.post("http://localhost:3002/users/authenticate", userData)
// /*       const accessToken = response.data.accessToken;
//  */
//       dispatch({
//         type: 'AUTHENTICATE_USER',
//         payload: response.data
//       })
//     } catch (error) {
//       console.log(error)
//       console.log("Email: ${userData.email}")
//       console.log("Falla en la autenticacion de usuario con contraseña")
//     }
//   }
// }

export const createHotels = (data: any) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:3002/hotels/", data);
      dispatch({
        type: "POST_HOTEL",
        payload: response,
      });
    } catch (error) {
      console.error("Error al crear el hotel:", error);
    }
  };
};

export const getReservations = (userEmail: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.get(
        `http://localhost:3002/users/${userEmail}/reservations`
      );

      dispatch({
        type: "GET_RESERVATIONS",
        payload: res.data,
      });
    } catch (error) {
      console.error("An error occurred while getting reservations:", error);
    }
  };
};

// export const postReservation = (userId: string, reservationData: any) => {
//   return async (dispatch: Dispatch<Action>) => {
//       try {
//           const res = await axios.post(`http://localhost:3002/users/${userId}/reservations`, reservationData);
//           dispatch({
//               type: "POST_RESERVATION",
//               payload: res.data
//           });
//       } catch (error) {
//           console.error('An error occurred while posting the reservation:', error);
//       }
//   };
// };

export const deleteReservation = (userId: string, reservationId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.delete(
        `http://localhost:3002/users/${userId}/reservations/${reservationId}`
      );
      dispatch({
        type: "DELETE_RESERVATION",
        payload: res.data,
      });
    } catch (error) {
      console.error("An error occurred while deleting the reservation:", error);
    }
  };
};

export const getConfirmedReservations = (userEmail: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.get(
        `http://localhost:3002/users/${userEmail}/reservations/confirmed`
      );
      dispatch({
        type: "GET_CONFIRMED_RESERVATIONS",
        payload: res.data,
      });
    } catch (error) {
      console.error(
        "An error occurred while getting confirmed reservations:",
        error
      );
    }
  };
};

/* export const getHotels = () => {

  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get("http://localhost:3002/hotels/");
      dispatch({
        type: "GET_HOTELS",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener hoteles:", error);
    }
  };
};

export const getHotelById = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(`http://localhost:3002/hotels/${id}`);
      dispatch({
        type: "GET_HOTEL_BY_ID",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener hotel por ID:", error);
    }
  };
};

export const getHotelByName = (address: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3002/hotels/?address=${address}`
      );
      dispatch({
        type: "GET_HOTEL_BY_NAME",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener hotel por nombre:", error);
    }
  };
};

export const getFilteredHotels = (filters: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get("http://localhost:3002/hotels/filtered/", {
        params: filters,
      });
      dispatch({
        type: "GET_FILTERED_HOTELS",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener hoteles filtrados:", error);
    }
  };

};

export const postReview = (review: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.post("http://localhost:3002/hotels/", review);
      dispatch({
        type: POST_REVIEW,
        payload: res.data,
      });
    } catch (error) {
      alert("An error occured at posting your review", error);
    }
  };
};

export const resetFilters = () => ({
  type: RESET,
});

};*/

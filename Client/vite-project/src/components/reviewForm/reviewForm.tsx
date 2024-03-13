import React, { useState } from "react";
import StarRating from "./starRating";
import ChangeRating from "./changeRating";
import { revValidation } from "./revValidation";
import { useDispatch } from "react-redux";
import { postReview } from "../../Redux/Actions/actions";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./review.css";
// =======
// import { revValidation } from "./revValidation";
// import { useDispatch } from "react-redux";
// import { postReview } from "../../Redux/Actions/actions";
// import emailjs from "@emailjs/browser";
// import "./review.css";

// interface Props {
//   roomId: string;
//   onSubmitReview: () => void; // Nueva prop para notificar que se envió una reseña
// }

// const ReviewForm: React.FC<Props> = ({ roomId, onSubmitReview }) => {
//   const dispatch = useDispatch();

//   interface Review {
//     email: string;
//     description: string;
//     score: number;
//     date: string;
//   }

//   const [review, setReview] = useState<Review>({
//     email: "",
//     description: "",
//     score: 0,
//     date: new Date().toISOString().split("T")[0], // Obtener la fecha actual en formato YYYY-MM-DD
//   });

//   const [errors, setErrors] = useState<any>({});

//   const handleRating = (rating: number) => {
//     setReview({
//       ...review,
//       score: rating,
//     });
//   };

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let { name, value } = e.target;
//     setReview({
//       ...review,
//       [name]: value,
//     });
//     setErrors({
//       ...errors,
//       ...revValidation({ [name]: value }),
//     });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     dispatch(postReview(roomId, review)).then(() => {
//       onSubmitReview(); // Notificar a MyReservations que se envió una reseña
//     });
//   };

//   return (
//     <div className="revContainer">
//       <form onSubmit={handleSubmit}>
//         <h2>¡Deja una reseña!</h2>
//         <div className="email">
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={review.email}
//             onChange={onChange}
//             placeholder="miemail@gmail.com"
//           />
//         </div>

//         <div className="rating">
//           <label>Calificación:</label>
//           <StarRating rating={review.score} handleRating={handleRating} />
//         </div>

//         <div className="description">
//           <label>Descripción:</label>
//           <input
//             type="text"
//             name="description"
//             value={review.description}
//             onChange={onChange}
//             placeholder="Escribe tu comentario"
//           />
//           {errors.description && <p className="error">{errors.description}</p>}
//         </div>

//         <button type="submit">Enviar reseña</button>
//       </form>
//     </div>
//   );
// };

// export default ReviewForm;

// //   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     let { name, value } = e.target;
// //     setReview({
// //       ...review,
// //       [name]: value,
// //     });
// //     setErrors({
// //       ...errors,
// //       // Aquí podrías añadir validaciones adicionales si es necesario
// //     });
// //   };

// //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     dispatch(postReview(roomId, review));
// //   };

// //   return (
// //     <div className="revContainer">
// //       <form onSubmit={handleSubmit}>
// //         <h2>¡Deja una reseña!</h2>
// //         <div className="email">
// //           <label>Email:</label>
// //           <input
// //             type="email"
// //             name="email"
// //             value={review.email}
// //             onChange={onChange}
// //             placeholder="miemail@gmail.com"
// //           />
// //         </div>

// //         <div className="description">
// //           <label>Descripción:</label>
// //           <input
// //             type="text"
// //             name="description"
// //             value={review.description}
// //             onChange={onChange}
// //             placeholder="Escribe tu comentario"
// //           />
// //           {errors.description && (
// //             <p className="error">{errors.description}</p>
// //           )}
// //         </div>

// //         <div className="date">
// //           <label>Fecha:</label>
// //           <input
// //             type="date"
// //             name="date"
// //             value={review.date}
// //             onChange={onChange}
// //           />
// //         </div>

// //         <button type="submit">Enviar reseña</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default ReviewForm;

// // import React, { useState } from 'react';
// // import StarRating from './starRating';
// // import ChangeRating from './changeRating';
// // import { useDispatch } from 'react-redux';
// // import { postReview } from '../../Redux/Actions/actions';
// // import './review.css';
// >>>>>>> develop2

interface Props {
  roomId: string;
}

const ReviewForm: React.FC<Props> = ({ roomId }) => {
  const dispatch = useDispatch();
  const form = useRef<HTMLFormElement>();
  interface Values {
    user_email: string;
    message: string;
  }

  const [values, setValues] = useState<Values>({
    user_email: "",
    message: `Wohoo! It looks like you have made a review at one of our hotels. Thank you for your support! :D `,
  });

  interface Review {
    email: string;
    description: string;
    score: number;
    date: string;
  }

  const [review, setReview] = useState<Review>({
    email: values.user_email,
    description: "",
    score: 0,
    date: new Date().toISOString().split("T")[0], // Obtener la fecha actual en formato YYYY-MM-DD
  });

  interface Errors {
    email?: string;
    description?: string;
  }

  const [errors, setErrors] = useState<Errors>({
    email: "",
    description: "",
  });

  const handleRating = (input: number) => {
    setReview({
      ...review,
      score: input,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      ...revValidation({ [name]: value }),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postReview(roomId, review));
    if (!form.current) return;

    emailjs
      .sendForm("service_owcj3ui", "template_0yv2m0n", form.current, {
        publicKey: "mMSNbNNhKTe-H44Fh",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="revContainer">
      <form ref={form} onSubmit={handleSubmit}>
        <h2>¡Deja una reseña!</h2>
        <div className="email">
          <label>Email:</label>
          <input
            type="email"
            name="user_email"
            value={values.user_email}
            onChange={onChange}
            placeholder="miemail@gmail.com"
          />
        </div>

        <div className="rating">
          <label>Calificación:</label>
          {/* Utiliza el componente StartRating para mostrar la calificación */}
          <StarRating stars={review.score} />
          {/* Utiliza ChangeRating para permitir al usuario cambiar la calificación */}
          <ChangeRating rating={review.score} handleRating={handleRating} />
        </div>
        {/* <div className="rating">
          <label>Calificación:</label>
          <ChangeRating rating={avgRating} handleRating={handleRating} />
          <StarRating stars={avgRating} />
        </div> */}

        <div className="description">
          <label>Descripción:</label>
          <input
            type="text"
            name="description"
            value={review.description}
            onChange={onChange}
            placeholder="Escribe tu comentario"
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div className="date">
          <label>Fecha:</label>
          <input
            type="date"
            name="date"
            value={review.date}
            onChange={onChange}
          />
        </div>
        <input
          className="messageInput"
          name="message"
          value={values.message}
          onChange={(e) =>
            setValues((prevValues) => ({
              ...prevValues,
              message: e.target.value,
            }))
          }
        ></input>

        <button type="submit">Enviar reseña</button>
      </form>
    </div>
  );
};

export default ReviewForm;

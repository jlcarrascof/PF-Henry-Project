import React, { useState } from "react";
import StarRating from "./starRating";
import { revValidation } from "./revValidation";
import { useDispatch } from "react-redux";
import { postReview } from "../../Redux/Actions/actions";
import emailjs from "@emailjs/browser";
import "./review.css";

interface Props {
  roomId: string;
}

const ReviewForm: React.FC<Props> = ({ roomId }) => {
  const dispatch = useDispatch();

  interface Review {
    email: string;
    description: string;
    score: number;
    date: string;
  }

  const [review, setReview] = useState<Review>({
    email: "",
    description: "",
    score: 0,
    date: new Date().toISOString().split("T")[0], // Obtener la fecha actual en formato YYYY-MM-DD
  });

  const [errors, setErrors] = useState<any>({});

  const handleRating = (rating: number) => {
    setReview({
      ...review,
      score: rating,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setReview({
      ...review,
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
    // Aquí puedes agregar la lógica de emailjs si lo necesitas
  };

  return (
    <div className="revContainer">
      <form onSubmit={handleSubmit}>
        <h2>¡Deja una reseña!</h2>
        <div className="email">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={review.email}
            onChange={onChange}
            placeholder="miemail@gmail.com"
          />
        </div>

        <div className="rating">
          <label>Calificación:</label>
          <StarRating rating={review.score} handleRating={handleRating} />
        </div>

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

        <button type="submit">Enviar reseña</button>
      </form>
    </div>
  );
};

export default ReviewForm;



// import React, { useState } from 'react';
// import StartRating from './starRating'; // Importa el componente StartRating
// import ChangeRating from './changeRating'; // Importa el componente ChangeRating
// import { useDispatch } from 'react-redux';
// import { postReview } from '../../Redux/Actions/actions';
// import './review.css';

// interface Props {
//   roomId: string;
// }

// const ReviewForm: React.FC<Props> = ({ roomId }) => {
//   const dispatch = useDispatch();

//   interface Review {
//     email: string;
//     description: string;
//     score: number;
//     date: string;
//   }

//   const [review, setReview] = useState<Review>({
//     email: '',
//     description: '',
//     score: 0,
//     date: new Date().toISOString().split('T')[0], // Obtener la fecha actual en formato YYYY-MM-DD
//   });

//   interface Errors {
//     email?: string;
//     description?: string;
//   }

//   const [errors, setErrors] = useState<Errors>({
//     email: '',
//     description: '',
//   });

//   const handleRating = (input: number) => {
//     setReview({
//       ...review,
//       score: input,
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
//       // Aquí podrías añadir validaciones adicionales si es necesario
//     });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     dispatch(postReview(roomId, review));
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
//           {/* Utiliza el componente StartRating para mostrar la calificación */}
//           <StartRating stars={review.score} />
//           {/* Utiliza ChangeRating para permitir al usuario cambiar la calificación */}
//           <ChangeRating rating={review.score} handleRating={handleRating} />
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
//           {errors.description && (
//             <p className="error">{errors.description}</p>
//           )}
//         </div>

//         <div className="date">
//           <label>Fecha:</label>
//           <input
//             type="date"
//             name="date"
//             value={review.date}
//             onChange={onChange}
//           />
//         </div>

//         <button type="submit">Enviar reseña</button>
//       </form>
//     </div>
//   );
// };

// export default ReviewForm;


// import React, { useState } from 'react';
// import StarRating from './starRating';
// import ChangeRating from './changeRating';
// import { useDispatch } from 'react-redux';
// import { postReview } from '../../Redux/Actions/actions';
// import './review.css';

// interface Props {
//   roomId: string;
// }

// const ReviewForm: React.FC<Props> = ({ roomId }) => {
//   const dispatch = useDispatch();

//   interface Review {
//     email: string;
//     description: string;
//     score: number;
//     date: string;
//   }

//   const [review, setReview] = useState<Review>({
//     email: '',
//     description: '',
//     score: 0,
//     date: new Date().toISOString().split('T')[0], // Obtener la fecha actual en formato YYYY-MM-DD
//   });

//   interface Errors {
//     email?: string;
//     description?: string;
//   }

//   const [errors, setErrors] = useState<Errors>({
//     email: '',
//     description: '',
//   });

//   const handleRating = (input: number) => {
//     setReview({
//       ...review,
//       score: input,
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
//       // Aquí podrías añadir validaciones adicionales si es necesario
//     });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     dispatch(postReview(roomId, review));
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
//           <ChangeRating rating={review.score} handleRating={handleRating} />
//           <StarRating stars={review.score} />
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
//           {errors.description && (
//             <p className="error">{errors.description}</p>
//           )}
//         </div>

//         <div className="date">
//           <label>Fecha:</label>
//           <input
//             type="date"
//             name="date"
//             value={review.date}
//             onChange={onChange}
//           />
//         </div>

//         <button type="submit">Enviar reseña</button>
//       </form>
//     </div>
//   );
// };

// export default ReviewForm;



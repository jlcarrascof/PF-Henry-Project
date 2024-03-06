import React, { useState } from "react";
import StarRating from "./starRating";
import ChangeRating from "./changeRating";
import { revValidation } from "./revValidation";
import { useDispatch } from "react-redux";
import { postReview } from "../../Redux/Actions/actions";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./review.css";

interface Props {
  roomId: string;
}

const ReviewForm: React.FC<Props> = ({ roomId }) => {
  const form = useRef<HTMLFormElement>();
  interface Values {
    user_email: string;
    message: string;
  }

  const [values, setValues] = useState<Values>({
    user_email: "",
    message: `Wohoo! It looks like you have made a review at one of our hotels. Thank you for your support! :D `,
  });

  const dispatch = useDispatch();

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

  const [avgRating, setAvgRating] = useState<number>(0);

  const handleRating = (input: number) => {
    setAvgRating(input);
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
      .sendForm("service_7ocfmjp", "template_l1f8bz9", form.current, {
        publicKey: "b645crolwMFi4MBSX",
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
          <ChangeRating rating={avgRating} handleRating={handleRating} />
          <StarRating stars={avgRating} />
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

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./notification.css";

const Notification: React.FC = () => {
  interface Values {
    user_name: string;
    user_email: string;
    message: string;
  }
  const [values, setValues] = useState<Values>({
    user_name: "",
    user_email: "",
    message: "Wohoo!! You have made a reservation! Enjoy your holidays!",
  });
  const form = useRef<HTMLFormElement>();

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div className="notContainer">
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input
          type="text"
          name="user_name"
          onChange={handleChange}
          value={values.user_name}
        />
        <label>Email</label>
        <input
          type="email"
          name="user_email"
          onChange={handleChange}
          value={values.user_email}
        />
        <input
          className="message"
          name="message"
          onChange={handleChange}
          value={values.message}
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Notification;

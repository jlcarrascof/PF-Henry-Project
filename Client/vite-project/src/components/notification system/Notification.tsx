import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./notification.css";

const Notification: React.FC = () => {
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

  //   form.message = "Wohoo!! You have made a reservation! Enjoy your holidays!";

  return (
    <div className="notContainer">
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Notification;

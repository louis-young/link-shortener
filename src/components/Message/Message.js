import React from "react";
import PropTypes from "prop-types";

import "../../stylesheets/vendor/animate.min.css";

import { store } from "react-notifications-component";

import "./Message.scss";

const Message = ({ message }) => {
  if (!message) {
    return <></>;
  }

  const handleClick = () => {
    store.addNotification({
      title: "Success",
      message: "Copied to clipboard",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1500,
        onScreen: false,
      },
    });

    navigator.clipboard.writeText(message);
  };

  return (
    <>
      <p className="message" onClick={handleClick}>
        {message}
      </p>
    </>
  );
};

Message.propTypes = {
  message: PropTypes.string,
};

export default Message;

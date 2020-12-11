import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Message from "../../components/Message/Message";

import "./Form.scss";

const Form = () => {
  const [link, setLink] = useState(null);

  const [message, setMessage] = useState(null);

  const [requesting, setRequesting] = useState(false);

  const input = useRef();

  useEffect(() => {
    input.current.focus();
  }, []);

  const convertURL = (proposedUrl) => {
    try {
      const url = new URL(proposedUrl);

      const host = "s.fstds.uk";

      const urlWithoutProtocol = `${host}${url.pathname}`;

      return urlWithoutProtocol;
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    (async () => {
      try {
        setRequesting(true);

        const json = JSON.stringify({
          longUrl: link,
        });

        const url = "https://fluid-url-shortener.herokuapp.com/api/url/shorten/";

        const response = await fetch(url, {
          method: "POST",
          body: json,
          headers: new Headers({ "content-type": "application/json" }),
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        setRequesting(false);

        setMessage(convertURL(data.shortUrl));
      } catch (error) {
        setMessage("Oops, check the URL and try again.");

        setRequesting(false);
      }
    })();

    input.current.value = "";
  };

  return (
    <>
      <section className="section section--center">
        <p className="section__text">Enter the link you'd like to shorten:</p>
        <form className="form" onSubmit={(event) => handleSubmit(event)}>
          <input
            className="form__input"
            onChange={(event) => setLink(event.target.value)}
            placeholder="https://www.louisyoung.co.uk/"
            ref={input}
          ></input>
          <button className="form__submit button" disabled={requesting}>
            Shorten
          </button>
        </form>
      </section>

      <section className="results section section--center">
        <Message message={message} />
      </section>

      <p className="section__text section__text--small section__text--no-bottom">
        {" "}
        Developed by{" "}
        <a className="link" href="https://www.louisyoung.co.uk/" target="_blank" rel="noopener nofollow noreferrer">
          Louis Young
        </a>
        .
      </p>
    </>
  );
};

Form.propTypes = {
  setValue: PropTypes.func,
};

export default Form;

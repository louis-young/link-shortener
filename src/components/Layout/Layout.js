import React from "react";
import PropTypes from "prop-types";

import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <>
      <section className="layout container container--small">
        {children}
      </section>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
};

export default Layout;

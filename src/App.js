import React from "react";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import "./stylesheets/main.scss";

import Form from "./components/Form/Form";
import Layout from "./components/Layout/Layout";

const App = () => {
  return (
    <div className="App">
      <ReactNotification />
      <Layout>
        <Form />
      </Layout>
    </div>
  );
};

export default App;

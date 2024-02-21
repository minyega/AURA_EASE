import React, { useEffect, useCallback, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import "./App.css";
import coverImg from "./assets/img/beauty.jpeg";
import { login, logout as destroy } from "./utils/auth";
import Cover from "./components/utils/Cover";
import { Notification } from "./components/utils/Notifications";
import Parlour from "./page/Parlour";


const App = function AppWrapper() {
  const isAuthenticated = window.auth.isAuthenticated;

  return (
    <>
    <Notification />
      {isAuthenticated ? (
        <Container fluid="md">
          <main>
            {/* <Products /> */}
            <Parlour />
          </main>
        </Container>
      ) : (
        <Cover name="Aura_Ease" login={login} coverImg={coverImg} />
      )}
    </>
  );
};

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import React, { useEffect } from "react";
import { useStateProvider } from "./states/GlobalState";
import Spotify from "./Components/Spotify";
import { reducerCases } from "./states/Constants";

function App() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
      }
    }
    document.title = "Spotify";
  }, [dispatch, token]);
  return (
    <>
      <div>{token ? <Spotify /> : <Login />}</div>
    </>
  );
}

export default App;

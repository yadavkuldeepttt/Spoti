import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Main from "./Main";
import Footer from "./Footer";
import { useStateProvider } from "../states/GlobalState";
import axios from "axios";
import { reducerCases } from "../states/Constants";
import SearchItem from "./SearchItem";

const Spotify = () => {
  const [{ token }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);

  const bodyRef = useRef();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        userName: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [token, dispatch]);

  const handleSearch = () => {
    setSearchPerformed(true);
  };
  const handleHomeClick = () => {
    setSearchPerformed(false);
    setSearchClicked(false);
  };
  const handleSearchClick = () => {
    setSearchClicked(true);
  };
  return (
    <Container>
      <div className="spotify_body">
        <Sidebar
          handleHomeClick={handleHomeClick}
          handleSearchClick={handleSearchClick}
        />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground} handleSearch={handleSearch} />
          <div className="body_contents">
            {searchPerformed || searchClicked ? (
              <SearchItem />
            ) : (
              <Main headerBackground={headerBackground} />
            )}
          </div>
        </div>
      </div>
      <div className="spotify_footer">
        <Footer />
      </div>
    </Container>
  );
};

export default Spotify;

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify_body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.1));
    background-color: rgba(32, 87, 100);

    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        max-height: 2rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;

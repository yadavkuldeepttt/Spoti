import React, { useEffect } from "react";
import { useStateProvider } from "../states/GlobalState";
import { reducerCases } from "../states/Constants";
import axios from "axios";
import styled from "styled-components";

const Playlists = () => {
  const [{ token, playlists }, dispatch] = useStateProvider();

  useEffect(() => {
    const getPlaylistsData = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);
        const { items } = response.data;
        const playlists = items.map(({ name, id }) => {
          return { name, id };
        });

        console.log(playlists);
        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
      } catch (error) {
        console.log(error);
      }
    };
    getPlaylistsData();
  }, [token, dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };
  return (
    <Container>
      <div className="playlist_heading">Playlists</div>
      <ul>
        {playlists.map(({ name, id }) => {
          return (
            <li key={id} onClick={() => changeCurrentPlaylist(id)}>
              {name}
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default Playlists;

const Container = styled.div`
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  .playlist_heading {
    padding: 1rem 1rem 0.7rem 1rem;
    font-weight: bold;
  }
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.8rem 1rem;
    height: 40vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
  }
`;

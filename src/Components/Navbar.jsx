import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useStateProvider } from "../states/GlobalState";
import axios from "axios";
import { reducerCases } from "../states/Constants";

const Navbar = ({ navBackground, handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [{ userInfo, token }, dispatch] = useStateProvider();

  const searchItem = async () => {
    if (searchQuery.trim() === "") return;
    try {
      const response = await axios.get(`https://api.spotify.com/v1/search`, {
        params: {
          q: searchQuery,
          type: "track",
        },
        headers: {
          Authorization: `Bearer ${token} `,
        },
      });
      const data = response.data;
      const foundTracks = data.tracks.items;
      console.log(foundTracks);
      if (foundTracks.length > 0) {
        dispatch({
          type: reducerCases.SET_SEARCH_RESULTS,
          searchResults: foundTracks,
        });
      }
    } catch (error) {
      console.error("Error fetching data from Spotify:", error);
    }
  };

  return (
    <Container navBackground={navBackground} handleSearch={handleSearch}>
      <div className="search_bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Artists,songs or podcasts"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchItem();
              handleSearch();
            }
          }}
        />
      </div>
      <div className="avatar">
        <a href={userInfo?.userUrl}>
          <CgProfile />
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};
  .search_bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
    }
    svg {
      font-size: 1.7rem;
      background-color: #282828;
      padding: 0.2rem;
      border-radius: 1rem;
      color: #c7c5c5;
      &:hover {
        color: white;
      }
    }
  }
`;

import React from "react";
import styled from "styled-components";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import Playlists from "./Playlists";

const Sidebar = ({ handleHomeClick, handleSearchClick }) => {
  return (
    <Container>
      <div className="top_links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify"
          />
        </div>

        <ul>
          <NavItem
            icon={<MdHomeFilled />}
            label="Home"
            onClick={handleHomeClick}
          />
          <NavItem
            icon={<MdSearch />}
            label="Search"
            onClick={handleSearchClick}
          />
          <NavItem icon={<IoLibrary />} label="Your Library" />
        </ul>
      </div>
      <Playlists />
    </Container>
  );
};

export default Sidebar;

const NavItem = ({ icon, label, onClick }) => (
  <li onClick={onClick}>
    {icon}
    <span>{label}</span>
  </li>
);

const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top_links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;

      li {
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: white;
        }
      }
    }
  }
`;

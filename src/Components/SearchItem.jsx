import React, { useState } from "react";
import { useStateProvider } from "../states/GlobalState";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import axios from "axios";
import { reducerCases } from "../states/Constants";

const SearchItem = () => {
  const [{ searchResults, token, currentPlaying, playerState }, dispatch] =
    useStateProvider();
  const topResult = searchResults[0];
  const remainingSongs = searchResults.slice(1, 6);

  const playTrack = async (id, name, artists, image, uri, track_number) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        uris: [uri],
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };

      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  };
  return (
    <Container>
      <div className="header_row">
        <TopResultsColumn>
          <h3>Top Result</h3>
          {topResult && (
            <TopResultItem>
              <img
                src={topResult.album.images[0].url}
                alt={topResult.name}
                onClick={() =>
                  playTrack(
                    topResult.id,
                    topResult.name,
                    topResult.artists.map((artist) => artist.name),
                    topResult.album.images[2].url,
                    topResult.uri,
                    topResult.track_number
                  )
                }
              />
              <div className="song_info">
                <span className="song_name">{topResult.name}</span>
                <span className="artists">
                  {topResult.artists.map((artist) => artist.name).join(", ")}
                </span>
                <span> {formatDuration(topResult.duration_ms)}</span>
              </div>
            </TopResultItem>
          )}
        </TopResultsColumn>

        <div className="col">
          <h3>Songs</h3>
          {remainingSongs.map((track) => (
            <SongItem
              key={track.id}
              onClick={() =>
                playTrack(
                  track.id,
                  track.name,
                  track.artists.map((artist) => artist.name),
                  track.album.images[2].url,
                  track.uri,
                  track.track_number
                )
              }>
              <div className="song_info">
                <span className="song_name">{track.name}</span>
                <span className="artists">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </span>
              </div>
              <span className="duration">
                <AiFillClockCircle /> {formatDuration(track.duration_ms)}
              </span>
            </SongItem>
          ))}
        </div>
      </div>
    </Container>
  );
};

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default SearchItem;

const Container = styled.div`
  background-color: black;
  padding: 0.5rem 1rem;
  overflow: auto;

  .header_row {
    display: grid;
    grid-template-columns: 3fr 4fr;
    margin: 1rem 1rem 0 1rem;
    color: #dddcdc;
    padding: 1rem 3rem;
    transition: 0.3s ease-in-out;
  }
`;
const TopResultsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-right: 1rem;
`;

const TopResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
  }
  .song_info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-self: flex-end;

    .song_name {
      font-weight: bold;
    }
    .artists {
      color: #b3b3b3;
    }
  }
`;
const SongItem = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  gap: 2rem;
  align-items: center;
  padding: 0.5rem 0;
  margin-right: 1rem;
  &:hover {
    background-color: #333;
    cursor: pointer;
  }

  .song_info {
    display: flex;
    flex-direction: column;
    .song_name {
      font-weight: bold;
    }
    .artists {
      color: #b3b3b3;
    }
  }

  .duration {
    display: flex;
    align-items: center;
    color: #b3b3b3;
    svg {
      margin-right: 0.5rem;
    }
  }
`;

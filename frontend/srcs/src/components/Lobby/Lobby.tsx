import React, { useContext } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { AxiosError, AxiosResponse } from 'axios';
import { GameContext } from './GameContext';

function Lobby() {
  const axiosPrivate = useAxiosPrivate();
  const socket = useContext(GameContext)

  //let's change this to local storage of ID
  const classic = () => {
    axiosPrivate
        .get("/auth/me")
        .then((res: AxiosResponse) => {
          socket?.emit("client.lobbyCreate", {
            fromId: res.data.id,
            mode: "classic",
            players: 2,
          }); 
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 404) alert("Username doesn't exist");
          else if (err.response?.status === 409)
            alert("User already in your friendList");
        });
  }

  const champions = () => {
    axiosPrivate
        .get("/auth/me")
        .then((res: AxiosResponse) => {
          socket?.emit("client.lobbyCreate", {
            fromId: res.data.id,
            mode: "champions",
            players: 2,
          }); 
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 404) alert("Username doesn't exist");
          else if (err.response?.status === 409)
            alert("User already in your friendList");
        });
  }

  return (
    <div>
      <button onClick={classic}>
        Classic Mode
      </button>
      <br/>
      <button onClick={champions}>
        Champions Mode
      </button>
      
    </div>
  )
}

export default Lobby
import React, { useContext, useEffect, useState } from "react";
import { MapSelectorContainer, SelectItemContainer } from "../Selector.style";
import MapSelectorCards from "./MapSelectorCards/MapSelectorCards";
import { nanoid } from "nanoid";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LobbySocketContext } from "../../../../services/Lobby/LobbySocketContext";
import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { lobbyAtom } from "../../../../services/store";
import { EMap } from "../../../../shared/enum";

function MapSelector() {
  const axiosPrivate = useAxiosPrivate();
  const socket = useContext(LobbySocketContext);
  const [lobby] = useAtom(lobbyAtom);
  const [maps, setMaps] = useState<{ name: string; img: string }[]>([]);
  const [vote, setVote] = useState(new Map<string, number>());

  const computeVote = (votes: string[]) => {
    const newVote = new Map<string, number>();
    votes.forEach((vote) => {
      const count = newVote.get(vote) || 0;
      newVote.set(vote, count + 1);
    });
    setVote(newVote);
  };

  const handleVote = (mapName: string) => {
    axiosPrivate
      .post("/lobbies/vote", { lobbyId: lobby.id, mapName: mapName })
      .then((res: AxiosResponse) => {
        computeVote(res.data);
      });
  };

  useEffect(() => {
    axiosPrivate
      .post("/lobbies/get-maps", { lobbyId: lobby.id })
      .then((res: AxiosResponse) => {
        setMaps(res.data);
        res.data.forEach((map) => {
          vote.set(map.name, 0);
        });
      })
      .catch((err: AxiosError) => {});

    axiosPrivate
      .post("/lobbies/get-votes", { lobbyId: lobby.id })
      .then((res: AxiosResponse) => {
        computeVote(res.data);
      });
  }, []);

  useEffect(() => {
    socket?.on("on-vote", (vote) => {
      computeVote(vote);
    });
    return () => {
      socket?.off("on-vote");
    };
  }, [socket, vote]);

  return (
    <MapSelectorContainer>
      <h3>CHOOSE A MAP</h3>
      <SelectItemContainer>
        {maps.map((map) => {
          var mapVote = vote.get(map.name);
          if (!mapVote) mapVote = 0;
          return (
            <div key={nanoid()} onClick={() => handleVote(map.name)}>
              <MapSelectorCards name={map.name} img={map.img} votes={mapVote} />
            </div>
          );
        })}
      </SelectItemContainer>
    </MapSelectorContainer>
  );
}

export default MapSelector;

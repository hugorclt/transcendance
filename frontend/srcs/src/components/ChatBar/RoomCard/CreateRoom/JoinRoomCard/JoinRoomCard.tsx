import { AxiosError, AxiosResponse } from "axios";
import React, { SyntheticEvent, useState } from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";

function JoinRoomCard() {
  const [password, setPassword] = useState("");
  const [roomName, setRoomName] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    axiosPrivate
      .post("/rooms/join", { password: password, roomName: roomName })
      .then((res: AxiosResponse) => {
        console.log(res);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  return (
    <div className="h-full flex items-center">
      <form className="flex flex-col items-center" onSubmit={handleSubmit} autoComplete="off">
        <input
          required
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="room name"
          className="w-3/5 h-6 p-2 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="w-3/5 h-6 p-2 rounded"
        />
        <input type="submit" value="Join" className="w-3/5 h-6 p-2" />
      </form>
    </div>
  );
}

export default JoinRoomCard;

import React, { useState } from "react";

function JoinRoomCard() {
  const [password, setPassword] = useState("");
  const [privateRoom, setPrivateRoom] = useState("unchecked");
  const [roomName, setRoomName] = useState("");
  
  return (
    <div className="flex flex-col placeholder-dark-blue">
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="room name"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <input
        type="checkbox"
        id="privateRoom"
        onChange={(e) => setPrivateRoom(e.target.value)}
        value={privateRoom}
      />
      <label htmlFor="privateRoom">Make private</label>
    </div>
  );
}

export default JoinRoomCard;

import { AxiosError, AxiosResponse } from "axios";
import React, { FormEvent, useContext, useState } from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { FriendsListContext } from "../../../../../views/ChatPage/FriendsListContext";

function CreateRoomCard() {
  const { friendList } = useContext(FriendsListContext);
  const [password, setPassword] = useState("");
  const [privateRoom, setPrivateRoom] = useState("unchecked");
  const [roomName, setRoomName] = useState("");
  const [friendRoom, setFriendRoom] = useState<string[]>([]);
  const axiosPrivate = useAxiosPrivate();

  const addFriendToRoom = (name: string) => {
    setFriendRoom((prev) => {
      if (!prev.includes(name)) {
        return [...prev, name];
      }
      return prev.filter((item) => item !== name);
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axiosPrivate
      .post("/rooms/create", {
        name: roomName,
        password: password,
        users: friendRoom,
        isPrivate: privateRoom,
      })
      .then((e: AxiosResponse) => {
        console.log("nice");
      })
      .catch((e: AxiosError) => {
        console.log("error");
      });
  };

  return (
    <>
      <div>
        {friendList.map((friend) => {
          return (
            <div
              onClick={() => addFriendToRoom(friend.name)}
              className={
                friendRoom.includes(friend.name) ? "bg-white p-3 py-1" : "bg-dark-blue px-3 py-1"
              }>
              <h2 className="text-gold">{friend.name}</h2>
            </div>
          );
        })}
        <div className="p-3 flex flex-col placeholder-dark-blue">
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="room name"
          />
          <div className="flex">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-2/3"
            />
            <input
              type="checkbox"
              id="privateRoom"
              onChange={(e) => setPrivateRoom(e.target.value)}
              value={privateRoom}
            />
            <label htmlFor="privateRoom" className="text-gold">
              Make private
            </label>
          </div>
          <button className="text-gold" onClick={handleSubmit}>
            Create Room
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateRoomCard;

import { AxiosError, AxiosResponse } from "axios";
import React, { FormEvent, useContext, useState } from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { ChatHistoryContext } from "../../../../../views/ChatPage/ChatHistoryContext";
import { FriendsListContext } from "../../../../../views/ChatPage/FriendsListContext";

function CreateRoomCard() {
  const { friendList } = useContext(FriendsListContext);
  const [password, setPassword] = useState("");
  const [privateRoom, setPrivateRoom] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [friendRoom, setFriendRoom] = useState<string[]>([]);
  const {setChatHistory} = useContext(ChatHistoryContext);
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
        setChatHistory((prev) => {
          if (!prev.some((item) => item.name === roomName)) {
            return [...prev, {avatar: "", lastMessage: "", name: roomName}];
          }
          return prev;
        });
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
              key={friend.name}
              onClick={() => addFriendToRoom(friend.name)}
              className={
                friendRoom.includes(friend.name)
                  ? "bg-white p-3 py-1"
                  : "bg-dark-blue px-3 py-1"
              }>
              <h2 className="text-gold">{friend.name}</h2>
            </div>
          );
        })}
        <div className="p-3 flex flex-col placeholder-dark-blue">
          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              required
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="room name"
              className="w-3/5 h-6 p-2 rounded"
            />
            <div className="flex items-center">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="w-3/5 h-6 p-2 mr-4 rounded"
                disabled={privateRoom? false : true}
              />
              <input
                type="checkbox"
                id="privateRoom"
                onChange={(e) => setPrivateRoom(e.target.checked)}
              />
              <label htmlFor="privateRoom" className="text-gold">
                Make private
              </label>
            </div>
            <input type="submit" value="Create" className="text-gold" />
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateRoomCard;

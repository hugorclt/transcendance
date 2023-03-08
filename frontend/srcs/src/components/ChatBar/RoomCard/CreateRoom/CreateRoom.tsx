import React, { useContext, useState } from "react";
import { IconContext } from "react-icons/lib";
import { BiArrowBack } from "react-icons/bi";
import { CreateRoomContext } from "../../../../views/ChatPage/CreateRoomContext";
import JoinRoomCard from "./JoinRoomCard/JoinRoomCard";
import CreateRoomCard from "./CreateRoomCard/CreateRoomCard";

function CreateRoom() {
  const { isActive, setIsActive } = useContext(CreateRoomContext);
  const [createNewRoom, setCreateNewRoom] = useState(false);
  const [joinRoom, setJoinRoom] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <figure className="pt-2 w-full h-full create-group-side">
      <IconContext.Provider value={{ color: "#E8C47C", size: "20" }}>
        <BiArrowBack
          onClick={() => {
            setIsActive(!isActive);
            setCreateNewRoom(false);
            setJoinRoom(false);
            setIsClicked(false);
          }}
        />
      </IconContext.Provider>
      {!isClicked && (
        <div className="flex h-full flex-col justify-center items-center">
          <button
            onClick={() => {
              setCreateNewRoom(true);
              setIsClicked(true);
            }}
          >
            <h2 className="text-gold p-2">Create a new room</h2>
          </button>
          <button
            onClick={() => {
              setJoinRoom(true);
              setIsClicked(true);
            }}
          >
            <h2 className="text-gold p-2">Join a new Room</h2>
          </button>
        </div>
      )}
      {createNewRoom && <CreateRoomCard />}
      {joinRoom && <JoinRoomCard />}
    </figure>
  );
}

export default CreateRoom;

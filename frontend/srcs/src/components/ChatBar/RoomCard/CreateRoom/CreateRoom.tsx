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
    <figure className="create-group-side">
      <div>
        <IconContext.Provider value={{ color: "#E8C47C" }}>
          <BiArrowBack
            size={20}
            onClick={() => {
              setIsActive(!isActive);
              setCreateNewRoom(false);
              setJoinRoom(false);
              setIsClicked(false);
            }}
          />
        </IconContext.Provider>
      </div>
      {!isClicked && (
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={() => {
              setCreateNewRoom(true);
              setIsClicked(true);
            }}>
            <h2 className="text-gold">Create a new room</h2>
          </button>
          <button
            onClick={() => {
              setJoinRoom(true);
              setIsClicked(true);
            }}>
            <h2 className="text-gold">Join a new Room</h2>
          </button>
        </div>
      )}
      {createNewRoom && <CreateRoomCard />}
      {joinRoom && <JoinRoomCard />}
    </figure>
  );
}

export default CreateRoom;

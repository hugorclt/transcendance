import React, { useContext, useRef, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { SocketContext } from "../../../services/Auth/SocketContext";

function ManageBar() {
  const [widthInvite, setWidthInvite] = useState("0%");
  const [display, setDisplay] = useState("block");
  const [username, setUsername] = useState("");
  const focusRef = useRef<HTMLInputElement>(null);
  const socket = useContext(SocketContext);

  const handleInvite = () => {
    setWidthInvite("100%");
    setDisplay("none");
    if (!focusRef.current) return;
    focusRef.current.focus();
  };

  const handleFocusOut = () => {
    setWidthInvite("0%");
    setDisplay("block");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("sending friend request to ", username);
    socket?.emit("friend-request", username);
    setUsername("");
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h2
            className="text-gold mx-3 mt-1 transition-all"
            style={{ display: display }}
          >
            Friends
          </h2>
        </div>
        <form onSubmit={handleSubmit} style={{ width: widthInvite }}>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            ref={focusRef}
            onBlur={handleFocusOut}
            className="mt-0"
            style={{
              width: widthInvite,
              transition: "1s",
              backgroundColor: "#2d384c",
            }}
          />
        </form>
        <div className="flex justify-end mt-1">
          <button
            style={{ display: display }}
            className="mx-3 transition-all"
            onClick={handleInvite}
          >
            <IconContext.Provider value={{ color: "#E8C47C" }}>
              <AiOutlineUsergroupAdd size={20} />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    </>
  );
}

export default ManageBar;

import { AxiosError, AxiosResponse } from "axios";
import React, { useContext, useRef, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { StatusContext } from "../../../statusPageContext";

function ManageBar() {
  const [widthInvite, setWidthInvite] = useState("0%");
  const [display, setDisplay] = useState("block");
  const [username, setUsername] = useState("");
  const focusRef = useRef<HTMLInputElement>(null);
  const axiosPrivate = useAxiosPrivate();
  const socket = useContext(StatusContext);

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
    axiosPrivate
      .get("/auth/me")
      .then((res: AxiosResponse) => {
        socket?.emit("friend-request", {
          fromId: res.data.id,
          toUsername: username,
        }); 
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 404) alert("Username doesn't exist");
        else if (err.response?.status === 409)
          alert("User already in your friendList");
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2
            className="text-gold mx-3 mt-1 transition-all"
            style={{ display: display }}>
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
            onClick={handleInvite}>
            <IconContext.Provider value={{ color: "#E8C47C" }}>
              <AiOutlineUsergroupAdd />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageBar;

import React, {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import logo from "../../../assets/images/42.jpg";
import LogoutButton from "./LogoutButton/LogoutButton";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router";
import { AxiosError, AxiosResponse } from "axios";
import { ChatSocketContext } from "../../../views/ChatPage/ChatSocketContext";
import {
  ExperienceBar,
  ProfilBoxLink,
  ProfileBoxLeft,
  ProfileBoxName,
  ProfileBoxStatus,
  LevelExperienceBar,
} from "./ProfilBoxStyle";

type User = {
  id: string;
  username: string;
  avatar: string;
  email: string;
  status: string;
  balance: number;
};

function ProfilBox() {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState<User>();
  const [color, setColor] = useState("#19e650");
  const socket = useContext(ChatSocketContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axiosPrivate
      .get("/users/me")
      .then((res: AxiosResponse) => setUser(res.data))
      .catch((res: AxiosError) =>
        navigate("/login", { state: { from: location }, replace: true })
      );
  }, []);

  var changeStatus: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const optionSelected = event.target.value;
    const color: string[] = ["#19e650", "#e6b319", "#8a8a8a"];
    const status: string[] = ["CONNECTED", "AWAY", "DISCONNECTED"];

    color.map((color, index) => {
      if (status[index] === optionSelected) {
        setColor(color);
        axiosPrivate
          .post("/users/me/status", {
            status: status[index],
          })
          .catch((res: AxiosError) =>
            navigate("/login", { state: { from: location }, replace: true })
          );
        socket?.emit("status-update", status[index]);
      }
    });
  };

  return (
    <ProfilBoxLink>
      <ProfileBoxLeft>
        <ProfileBoxName>
          {user?.username.toLocaleUpperCase()}
          <ProfileBoxStatus style={{ backgroundColor: "#19e650" }} />
        </ProfileBoxName>
        <ExperienceBar>
          <LevelExperienceBar></LevelExperienceBar>
        </ExperienceBar>
      </ProfileBoxLeft>
    </ProfilBoxLink>
  );
}

export default ProfilBox;

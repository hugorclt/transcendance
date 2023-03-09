import React, {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import "react-circular-progressbar/dist/styles.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router";
import { AxiosError, AxiosResponse } from "axios";
import { SocketContext } from "../../../services/Auth/SocketContext";
import {
  ExperienceBar,
  ProfilBoxLink,
  ProfilBoxLeft,
  ProfilBoxTitle,
  ProfileBoxStatus,
  LevelExperienceBar,
  ExperienceBarContainer,
  ProfilBoxText,
  ProfilBoxRight,
  CurrencyContainer,
  StyledSelect,
  SelectBox,
} from "./ProfilBoxStyle";

import { TbCurrencyShekel } from "react-icons/tb";
import { COLORS } from "../../../colors";

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
  const socket = useContext(SocketContext);
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
      <ProfilBoxLeft>
        <ProfilBoxTitle>
          {user?.username.toLocaleUpperCase()}
          <ProfileBoxStatus style={{ backgroundColor: color }} />
        </ProfilBoxTitle>
        <ExperienceBarContainer>
          <ExperienceBar>
            <LevelExperienceBar />
          </ExperienceBar>
          <ProfilBoxText>10</ProfilBoxText>
        </ExperienceBarContainer>
      </ProfilBoxLeft>
      <ProfilBoxRight>
        <CurrencyContainer>
          <ProfilBoxText>{user?.balance}</ProfilBoxText>
          <TbCurrencyShekel style={{ color: COLORS.secondary }} size={24} />
        </CurrencyContainer>
        <SelectBox>
          <StyledSelect onChange={changeStatus}>
            <option>CONNECTED</option>
            <option>AWAY</option>
            <option>DISCONNECTED</option>
          </StyledSelect>
        </SelectBox>
      </ProfilBoxRight>
    </ProfilBoxLink>
  );
}

export default ProfilBox;

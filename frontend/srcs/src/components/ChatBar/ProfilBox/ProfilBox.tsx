import React, { ChangeEvent, ChangeEventHandler } from "react";
import "react-circular-progressbar/dist/styles.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router";
import { AxiosError, AxiosResponse } from "axios";
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
import { COLORS, convertStatusColor } from "../../../colors";
import { useGlobal } from "../../../services/Global/GlobalProvider";
import { useMainContext } from "../../../views/MainPage/MainContext";

function ProfilBox() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { status } = useGlobal();
  const { user } = useMainContext();

  var changeStatus: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const optionSelected = event.target.value;
    axiosPrivate
      .post("/users/me/status", {
        status: optionSelected,
      })
      .catch((res: AxiosError) =>
        navigate("/login", { state: { from: location }, replace: true })
      );
  };

  return (
    <ProfilBoxLink>
      <ProfilBoxLeft>
        <ProfilBoxTitle>
          {user?.username.toLocaleUpperCase()}
          <ProfileBoxStatus
            style={{ backgroundColor: convertStatusColor(status) }}
          />
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
          <StyledSelect value={status.toUpperCase()} onChange={changeStatus}>
            <option>CONNECTED</option>
            <option>AWAY</option>
            <option>DISCONNECTED</option>
            <option>LOBBY</option>
            <option>GAME</option>
          </StyledSelect>
        </SelectBox>
      </ProfilBoxRight>
    </ProfilBoxLink>
  );
}

export default ProfilBox;

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
import { useAtom } from "jotai";
import { userAtom, userPreferencesAtom } from "../../../services/store";

function ProfilBox() {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useAtom(userAtom);
  const [userPreferences, setUserPreferences] = useAtom(userPreferencesAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const { status } = useGlobal();

  var changeStatusVisibility: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const optionSelected = event.target.value;
    axiosPrivate
      .post("/users/me/visibility", {
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
            style={{
              backgroundColor: convertStatusColor(status),
            }}
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
          <StyledSelect
            value={userPreferences.visibility.toUpperCase()}
            onChange={changeStatusVisibility}
          >
            <option>VISIBLE</option>
            <option>AWAY</option>
            <option>INVISIBLE</option>
          </StyledSelect>
        </SelectBox>
      </ProfilBoxRight>
    </ProfilBoxLink>
  );
}

export default ProfilBox;

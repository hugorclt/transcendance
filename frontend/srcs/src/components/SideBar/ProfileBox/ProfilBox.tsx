import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router";
import { AxiosError } from "axios";
import {
  ExperienceBar,
  ProfilBoxLink,
  ProfilBoxLeft,
  ProfileBoxStatus,
  LevelExperienceBar,
  ExperienceBarContainer,
  ProfilBoxRight,
  CurrencyContainer,
  StyledSelect,
  SelectBox,
  ProfilBoxName,
} from "./ProfilBoxStyle";
import { TbCurrencyShekel } from "react-icons/tb";
import { COLORS, convertStatusColor } from "../../../colors";
import { useAtom } from "jotai";
import { userAtom, userPreferencesAtom } from "../../../services/store";

function ProfilBox() {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useAtom(userAtom);
  const [userPreferences, setUserPreferences] = useAtom(userPreferencesAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const [lvl, setLvl] = useState("0");

  useEffect(() => {
    setLvl(Math.floor(calculateLevel()).toString());
  }, []);

  useEffect(() => {
    setLvl(Math.floor(calculateLevel()).toString());
  }, [user.exp]);

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

  const calculateLevel = () => {
    const xp = Math.max(
      1,
      Math.log(user.exp / 500) / Math.log(Math.pow(2, 1 / 5)) + 1
    );
    return xp;
  };

  const calculatePercentage = () => {
    const level = calculateLevel();
    return `${(level % 1) * 100}%`;
  };

  return (
    <ProfilBoxLink>
      <ProfilBoxLeft>
        <ProfilBoxName>
          {user?.username.length > 15
            ? user?.username.substring(0, 15).concat("...")
            : user?.username.toLocaleUpperCase()}
          <ProfileBoxStatus
            style={{
              backgroundColor: convertStatusColor(user.status),
            }}
          />
        </ProfilBoxName>
        <ExperienceBarContainer>
          <ExperienceBar>
            <LevelExperienceBar
              style={{
                width: calculatePercentage(),
              }}
            />
          </ExperienceBar>
          <h5>{lvl}</h5>
        </ExperienceBarContainer>
      </ProfilBoxLeft>
      <ProfilBoxRight>
        <CurrencyContainer>
          <h5>{user?.balance ? user.balance : 0}</h5>
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

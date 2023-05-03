import React, { FormEvent, useState } from "react";
import {
  PhotoContainer,
  SettingsContainer,
  SettingsLeft,
  SettingsRight,
} from "./Settings.style";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { getImageBase64 } from "../../services/utils/getImageBase64";
import { useAtom } from "jotai";
import { userAtom } from "../../services/store";
import General from "./General/General";
import Blocked from "./Blocked/Blocked";
import { COLORS } from "../../colors";

function Settings() {
  const [settingSelected, setSettingSelected] = useState("GENERAL");

  function chooseColor(value: string) {
    if (settingSelected == value) {
      return COLORS.secondary;
    }
  }

  return (
    <>
      <SettingsLeft>
        <h4
          style={{ cursor: "pointer", color: chooseColor("GENERAL") }}
          onClick={() => setSettingSelected("GENERAL")}
        >
          GENERAL
        </h4>
        <h4
          style={{ cursor: "pointer", color: chooseColor("BLOCKED") }}
          onClick={() => setSettingSelected("BLOCKED")}
        >
          BLOCKED
        </h4>
      </SettingsLeft>
      <SettingsRight>
        {settingSelected == "GENERAL" ? <General /> : <Blocked />}
      </SettingsRight>
    </>
  );
}

export default Settings;

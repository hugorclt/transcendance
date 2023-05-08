import React, { useState } from "react";
import {
  SettingsLeft,
  SettingsRight,
} from "./Settings.style";
import General from "./General/General";
import Blocked from "./Blocked/Blocked";
import { COLORS } from "../../colors";
import F2A from "./F2A/F2A";

function renderRight(settings: string) {
  if (settings == "GENERAL") return <General />;
  if (settings == "BLOCKED") return <Blocked />;
  if (settings == "2FA") return <F2A />;
}

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
          onClick={() => setSettingSelected("GENERAL")}>
          GENERAL
        </h4>
        <h4
          style={{ cursor: "pointer", color: chooseColor("BLOCKED") }}
          onClick={() => setSettingSelected("BLOCKED")}>
          BLOCKED
        </h4>
        <h4
          style={{ cursor: "pointer", color: chooseColor("2FA") }}
          onClick={() => setSettingSelected("2FA")}>
          2FA
        </h4>
      </SettingsLeft>
      <SettingsRight>{renderRight(settingSelected)}</SettingsRight>
    </>
  );
}

export default Settings;

import React, { useState } from "react";
import { TConversation } from "../../../../services/type";
import UnbanCards from "./UnbanCards/UnbanCards";
import { UnbanCardsBox, UnbanContainer } from "./UnbanStyle";
import { nanoid } from "nanoid";
import { TChatProps } from "../ChatType";

function Uban({ chat }: TChatProps) {
  const [errMsg, setErrMsg] = useState("");

  return (
    <>
      <UnbanContainer>
        <h3>Banned Player</h3>
        <UnbanCardsBox>
          {chat.banned.map((banned: string) => {
            return <UnbanCards key={nanoid()} roomId={chat.id} name={banned} setErrMsg={setErrMsg}/>;
          })}
        </UnbanCardsBox>
        {errMsg.length != 0 ? <p style={{ color: "red" }}>{errMsg}</p> : <></>}
      </UnbanContainer>
    </>
  );
}

export default Uban;

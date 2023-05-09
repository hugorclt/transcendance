import React, { useState } from "react";
import SideBarLayout from "../../layouts/SideBarLayout/SideBarLayout";
import { RoomModalOpenContext } from "./RoomModalOpenContext";
import { ChatManagerOpen } from "./ChatManagerOpen";

function SideBarPage() {
  const [openManager, setOpenManager] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <RoomModalOpenContext.Provider value={{ open, setOpen }}>
      <ChatManagerOpen.Provider value={{ openManager, setOpenManager }}>
        <SideBarLayout />
      </ChatManagerOpen.Provider>
    </RoomModalOpenContext.Provider>
  );
}

export default SideBarPage;

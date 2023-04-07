import React, { useState } from "react";
import SideBarLayout from "../../layouts/SideBarLayout/SideBarLayout";
import { CreateRoomContext } from "./CreateRoomContext";
import { RoomModalOpenContext } from "./RoomModalOpenContext";
import { ChatManagerOpen } from "./ChatManagerOpen";

function SideBarPage() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [openManager, setOpenManager] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  return (
      <CreateRoomContext.Provider value={{ isActive, setIsActive }}>
        <RoomModalOpenContext.Provider value={{ open, setOpen }}>
          <ChatManagerOpen.Provider value={{ openManager, setOpenManager }}>
            <SideBarLayout />
            </ChatManagerOpen.Provider>
        </RoomModalOpenContext.Provider>
      </CreateRoomContext.Provider>
  )
}

export default SideBarPage;

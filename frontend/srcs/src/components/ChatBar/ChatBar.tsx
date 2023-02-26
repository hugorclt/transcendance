import React from "react";
import FriendsList from "./FriendsList/FriendsList";
import ProfilBox from "./ProfilBox/ProfilBox";
import NotificationsBar from "./NotificationsBar/NotificationsBar";

function ChatBar() {
  return (
    <div>
      <div className="shadow-md bg-gray-900 h-screen w-full">
        <div className="pt-4 pb-2 px-6">
          <ProfilBox />
        </div>
        <hr className="bg-orange-200" />
        <FriendsList />
        <NotificationsBar />
      </div>
    </div>
  );
}

export default ChatBar;

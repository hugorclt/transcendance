import React from "react";
import ChatPage from "../../views/ChatPage/ChatPage";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-end h-scren">
      <main className="flex-1">{children}</main>

      <div className="w-72">
        <ChatPage />
      </div>
    </div>
  );
};

export default MainLayout;

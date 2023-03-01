import React from "react";
import ChatPage from "../../views/ChatPage/ChatPage";

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex justify-end">
      <div className="w-72">
        <ChatPage />
      </div>

      <main>
        {children}
      </main>
    </div>
  );
}

export default MainLayout;

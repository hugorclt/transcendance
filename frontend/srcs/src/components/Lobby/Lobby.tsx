import React, { useState } from "react";

function Lobby() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="w-full h-1/6 bg-gold"></div>
      <div className="flex w-full h-4/6 bg-dark-blue">
        <div className="bg-white h-5/6 w-2/6"></div>
        <div className="bg-white h-5/6 w-2/6"></div>
      </div>
      <div className="w-full h-1/6 bg-gold"></div>
    </div>
  );
}

export default Lobby;

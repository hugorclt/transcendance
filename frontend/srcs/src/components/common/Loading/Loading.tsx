import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="h-screen opacity-60">
      <div className="loading w-60 h-80 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}

export default Loading;

import React from "react";
import {  CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import logo from "../../assets/42.jpg";

function ProfilBox() {
  return (
    <a href="#!">
      <div className="flex items-center">
        <div className="shrink-0">
          <div className="w-10">
            <CircularProgressbarWithChildren value={70} text="">
              <img className="rounded-full w-8" src={logo}></img>
            </CircularProgressbarWithChildren>
          </div>
        </div>
        <div className="flex flex-col ml-3">
          <div className="grow ">
            <p className="text-lg font-semibold text-orange-100 mb-1">
              hrecolet
            </p>
          </div>
          <select
            className="outline-none bg-gray-900 text-orange-100 opacity-60 text-sm font-extralight"
            name="status"
            id="status"
          >
            <option value="online">Online</option>
            <option value="absent">Absent</option>
            <option value="invisible">Invisible</option>
          </select>
        </div>
      </div>
    </a>
  );
}

export default ProfilBox;

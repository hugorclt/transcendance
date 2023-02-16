import React from "react";
import {  CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import logo from "../../assets/42.jpg";

function ProfilBox() {
  return (
    <a href="#!">
      <div className="flex items-center">
        <div className="shrink-0">
          <div className="w-14">
            <CircularProgressbarWithChildren value={70} text="">
              <img className="rounded-full w-12" src={logo}></img>
              <div className="absolute outline outline-2 outline-orange-100 rounded-full bottom-0 right-0 w-3 h-3 bg-lime-500"></div>
              <div className="absolute outline outline-2 outline-cyan-600 bg-white rounded-full top-0 right-0 w-4 h-4">
                <div className="flex items-center justify-center w-4 h-4">
                  <p className="text-gray-900 text-bold text-xs">1</p>
                </div>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </div>
        <div className="mx-6">
            <p className="text-lg font-semibold text-orange-100 mb-0">
              hrecolet
            </p>
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

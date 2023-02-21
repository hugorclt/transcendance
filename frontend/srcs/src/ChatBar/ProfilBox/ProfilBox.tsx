import React, { ChangeEvent, ChangeEventHandler, SyntheticEvent, useEffect, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import logo from "../../assets/42.jpg";
import LogoutButton from "../LogoutButton.tsx/LogoutButton";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router";

type User = {
  id: string;
  username: string;
  avatar: string;
  email: string;
  status: string;
  balance: number;
};

function ProfilBox() {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState<User>();
  const [color, setColor] = useState("#19e650");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axiosPrivate
      .get("/users/me")
      .then((res) => setUser(res.data))
      .catch((res) =>
        navigate("/login", { state: { from: location }, replace: true })
      );
  }, []);

  var changeStatus: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const optionSelected = event.target.value;
    const color: string[] = ["#19e650", "#e6b319", "#8a8a8a"];
    const status: string[] = ["CONNECTED", "ASBENT", "AWAY"];

    color.map((color, index) => {
      if (status[index] === optionSelected) {
        setColor(color);
        axiosPrivate
          .post("/users/me/status", {
            status: status[index],
          })
          .then((res) => setUser(res.data))
          .catch((res) =>
            navigate("/login", { state: { from: location }, replace: true })
          );
      }
    });
  };

  return (
    <a href="#!">
      <div className="flex items-center">
        <div className="shrink-0">
          <div className="w-14">
            <CircularProgressbarWithChildren value={70} text="">
              <img className="rounded-full w-12" src={logo}></img>
              <div style={{backgroundColor: color}}className="absolute outline outline-2 outline-orange-100 rounded-full bottom-0 right-0 w-3 h-3"></div>
              <div className="absolute outline outline-2 outline-cyan-600 bg-white rounded-full top-0 right-0 w-4 h-4">
                <div className="flex items-center justify-center w-4 h-4">
                  <p className="text-gray-900 text-bold text-xs">1</p>
                </div>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </div>
        <div className="mx-6">
          <p style={{color:"#E8C47C"}}className="text-lg font-semibold mb-0">
            {user?.username}
          </p>
          <select
            style={{color:"#E8C47C"}}
            className="outline-none bg-gray-900 opacity-60 text-sm font-extralight"
            name="status"
            id="status"
            onChange={changeStatus}
          >
            <option value="CONNECTED">Online</option>
            <option value="ASBENT">Absent</option>
            <option value="AWAY">Invisible</option>
          </select>
        </div>
        <LogoutButton />
      </div>
    </a>
  );
}

export default ProfilBox;

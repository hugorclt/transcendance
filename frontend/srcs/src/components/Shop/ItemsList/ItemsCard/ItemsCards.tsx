import { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { ModalBox } from "../../../SideBar/FriendsList/FriendsTopBar/FriendsTopBarStyle";
import { ItemsCardsContainer, ItemsCardsMiddle, ModalConfirmContainer } from "./ItemsCardsStyle";
import { TItemsProps } from "./ItemsCardType";

function ItemsCards({ name, desc, price, image, owned }: TItemsProps) {
  const [isOwned, setIsOwned] = useState(owned);
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const handleYes = () => {
    axiosPrivate.post("items/buy", {name: name}).then((res: AxiosResponse) => {
      setIsOwned(true);
    }).catch((err: AxiosError) => {
      setErrMsg("Error while buying item please retry");
    })

  }

  return (
    <ItemsCardsContainer
      style={{
        backgroundPosition: "center center",
        backgroundImage: `url(data:image/gif;base64,${image})`,
        backgroundSize: "cover",
      }}>
      <div className="top-text">
        <h5>{price}</h5>
      </div>
      <div className="bottom-text">
        <h4>{name}</h4>
        <h5>{desc}</h5>
        <Popup
          trigger={
            <button>BUY</button>
          }
          modal
          nested
        >
          <ModalBox>
            <p>Please, confirm ?</p>
            <ModalConfirmContainer>
              <button onClick={handleYes}>Yes</button>
              <button onClick={() => setIsOwned(false)}>No</button>
            </ModalConfirmContainer>
            {errMsg.length != 0 && <p style={{color: "red"}}>{errMsg}</p>}
          </ModalBox>
        </Popup>
      </div>
    </ItemsCardsContainer>
  );
}

export default ItemsCards;

import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { ModalBox } from "../../../SideBar/FriendsList/FriendsTopBar/FriendsTopBarStyle";
import {
  CardsContainerCenter,
  ItemsCardsContainer,
  ItemsCardsMiddle,
  ModalConfirmContainer,
} from "./ItemsCardsStyle";
import { TItemsProps } from "./ItemsCardType";
import { ImUnlocked } from "react-icons/im";
import { COLORS } from "../../../../colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../services/store";
import { TbCurrencyShekel } from "react-icons/tb";

function ItemsCards({ name, desc, price, image, owned, setData }: TItemsProps) {
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom);

  const handleYes = () => {
    axiosPrivate
      .post("items/buy", { name: name })
      .then((res: AxiosResponse) => {
        setUser((prev) => ({
          ...prev,
          balance: user.balance - +price,
        }))
        setData((prev) => {
          return prev.map((item) => {
            if (item.name == name)
              item.owned = true
            return item;
          })
        })
      })
      .catch((err: AxiosError) => {
        setErrMsg("Error while buying item please retry");
      });
  };

  const closeModal = () => setOpen(false);

  return (
    <ItemsCardsContainer
      style={{
        backgroundPosition: "center center",
        backgroundImage: `url(data:image/gif;base64,${image})`,
        backgroundSize: "cover",
        filter: owned ? "grayscale(80%)" : "none",
      }}>
      <div className="top-text">
        <h5 style={{ color: owned ? COLORS.grey : "" }}>{price}</h5>
        <TbCurrencyShekel color={COLORS.secondary} size={27} />
      </div>
      {owned && (
        <CardsContainerCenter>
          <ImUnlocked color={COLORS.primary} size={100} />
        </CardsContainerCenter>
      )}
      <div className="bottom-text">
        <h4 style={{ color: owned ? COLORS.grey : "" }}>{name}</h4>
        <h5 style={{ color: owned ? COLORS.grey : "" }}>{desc}</h5>
        {!owned && (
          <>
            <button style={{cursor: "pointer",backgroundColor: user.balance < +price ? COLORS.grey : COLORS.secondary}} disabled={user.balance < +price} onClick={() => setOpen((o) => !o)}>BUY</button>
            <Popup
              modal
              nested
              open={open}
              closeOnDocumentClick
              onClose={closeModal}>
              <ModalBox>
                <p>Confirm ?</p>
                <ModalConfirmContainer>
                  <button style={{cursor: "pointer"}} onClick={handleYes}>YES</button>
                  <button style={{cursor: "pointer"}} onClick={() => setOpen((o) => !o)}>NO</button>
                </ModalConfirmContainer>
                {errMsg.length != 0 && <p style={{ color: "red" }}>{errMsg}</p>}
              </ModalBox>
            </Popup>
          </>
        )}
      </div>
    </ItemsCardsContainer>
  );
}

export default ItemsCards;

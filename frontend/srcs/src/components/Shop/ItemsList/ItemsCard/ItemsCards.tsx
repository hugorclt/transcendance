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

function ItemsCards({ name, desc, price, image }: TItemsProps) {
  const [isOwned, setIsOwned] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom);

  const handleYes = () => {
    axiosPrivate
      .post("items/buy", { name: name })
      .then((res: AxiosResponse) => {
        setIsOwned(true);
        setUser((prev) => ({
          ...prev,
          balance: user.balance - +price,
        }))
      })
      .catch((err: AxiosError) => {
        setErrMsg("Error while buying item please retry");
      });
  };

  useEffect(() => {
    axiosPrivate
      .post("/items/has-item", { name: name })
      .then((res: AxiosResponse) => {
        setIsOwned(true);
        setOpen(false);
      })
      .catch((err: AxiosError) => {
        setIsOwned(false);
        setOpen(false);
      });
  }, []);

  const closeModal = () => setOpen(false);

  return (
    <ItemsCardsContainer
      style={{
        backgroundPosition: "center center",
        backgroundImage: `url(data:image/gif;base64,${image})`,
        backgroundSize: "cover",
        filter: isOwned ? "grayscale(80%)" : "none",
      }}>
      <div className="top-text">
        <h5 style={{ color: isOwned ? COLORS.grey : "" }}>{price}</h5>
      </div>
      {isOwned && (
        <CardsContainerCenter>
          <ImUnlocked color={COLORS.primary} size={100} />
        </CardsContainerCenter>
      )}
      <div className="bottom-text">
        <h4 style={{ color: isOwned ? COLORS.grey : "" }}>{name}</h4>
        <h5 style={{ color: isOwned ? COLORS.grey : "" }}>{desc}</h5>
        {!isOwned && (
          <>
            <button onClick={() => setOpen((o) => !o)}>BUY</button>
            <Popup
              modal
              nested
              open={open}
              closeOnDocumentClick
              onClose={closeModal}>
              <ModalBox>
                <p>Confirm ?</p>
                <ModalConfirmContainer>
                  <button onClick={handleYes}>YES</button>
                  <button onClick={() => setOpen((o) => !o)}>NO</button>
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

import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { COLORS } from "../../../../colors";
import { notifAtom } from "../../../../services/store";
import { PopUpBox } from "../../FriendsList/FriendsCards/FriendsCardsStyle";
import { NotificationsContainer } from "./Notifications.style";
import { nanoid } from "nanoid";
import NotificationCards from "./NotificationsCards/NotificationCards";

function NotificationsPanel() {
  const [notifs, setNotif] = useAtom(notifAtom);

  return (
    <PopUpBox>
      <NotificationsContainer>
        {notifs.map((notif) => {
          return <NotificationCards key={nanoid()} {...notif} />;
        })}
      </NotificationsContainer>
    </PopUpBox>
  );
}

export default NotificationsPanel;

import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { COLORS } from '../../../../colors'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'
import { notifAtom } from '../../../../services/store'
import { PopUpBox } from '../../FriendsList/FriendsCards/FriendsCardsStyle'
import { NotifButtonContainer, NotifContainer, NotificationsContainer } from './Notifications.style'
import {nanoid} from 'nanoid';
import { AxiosResponse } from 'axios'
import NotificationCards from './NotificationsCards/NotificationCards'

function NotificationsPanel() {
    const [notifs, setNotif] = useAtom(notifAtom);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        // axiosPrivate.get("/invitations/notif-checked").then((res: AxiosResponse) => {
            // setNotif(res.data);
        // })
    }, [])

  return (
    <PopUpBox>
        <NotificationsContainer>
            {notifs.map((notif) => {
                return (
                    <NotificationCards key={nanoid()} {...notif}/>
                )
            })}
        </NotificationsContainer>
    </PopUpBox>
  )
}

export default NotificationsPanel
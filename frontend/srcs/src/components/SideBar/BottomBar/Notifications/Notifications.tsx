import React, { useEffect } from 'react'
import { COLORS } from '../../../../colors'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'
import { PopUpBox } from '../../FriendsList/FriendsCards/FriendsCardsStyle'
import { NotifButtonContainer, NotifContainer, NotificationsContainer } from './Notifications.style'

const notifs = [
    {
        user: "hugo",
        desc: "sent you a friend request",
        type: "friends",
    },
    {
        user: "hugo",
        desc: "sent you an invitation to play champions",
        type: "party",
    },
    {
        user: "dominique",
        desc: "sent you an invitation to play classic",
        type: "party",
    },
    {
        user: "dominique",
        desc: "sent you an invitation to play classic",
        type: "party",
    },
    {
        user: "dominique",
        desc: "sent you an invitation to play classic",
        type: "party",
    },
]

function NotificationsPanel() {
  return (
    <PopUpBox>
        <NotificationsContainer>
            {notifs.map((notif) => {
                return (
                    <NotifContainer>
                        <p><strong>{notif.user}</strong> {notif.desc}</p>
                        <NotifButtonContainer>
                            <button style={{color: COLORS.green}}>Accept</button>
                            <button style={{color: COLORS.secondary}}>Decline</button>
                        </NotifButtonContainer>
                    </NotifContainer>
                )
            })}
        </NotificationsContainer>
    </PopUpBox>
  )
}

export default NotificationsPanel
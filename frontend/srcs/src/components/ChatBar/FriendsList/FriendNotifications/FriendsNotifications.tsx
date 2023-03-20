import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketContext } from "../../../../services/Auth/SocketContext";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { lobbyAtom } from "../../../../services/store";

function FriendNotifications() {
  const socket = useContext(SocketContext);
  const axiosPrivate = useAxiosPrivate();
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const acceptFriendRequest = (username: string) => {
    socket?.emit("friend-request-reply", {
      fromUsername: username,
      isReplyTrue: true,
    });
  };

  const acceptLobbyRequest = (lobbyId: string, userId: string) => {
    axiosPrivate
      .post("/lobbies/join", { lobbyId: lobbyId, userId: userId })
      .then((response: AxiosResponse) => {
        console.log("success joining lobby: ", JSON.stringify(response.data));
        setLobby({
          id: response.data.id,
          ownerId: response.data.ownerId,
          nbPlayers: +response.data.nbPlayers,
          mode: response.data.mode,
        });
      })
      .catch((error: AxiosError) => {
        console.log("error joining lobby: ", JSON.stringify(error.cause));
      });
  };

  const declineInvitation = (invitationId: string) => {
    axiosPrivate
      .post("/invitations/decline", { invitationId })
      .then((response: AxiosResponse) => {
        console.log(
          "success declining invitation: ",
          JSON.stringify(response.data)
        );
      })
      .catch((error: AxiosError) => {
        console.log(
          "error declining invitation: ",
          JSON.stringify(error.cause)
        );
      });
  };

  //========== FRIEND NOTIFICATION  ==============
  const notifyFriend = (invitation: any) =>
    toast(
      <>
        <p>
          <strong>{invitation.userFromUsername}</strong> has sent you a friend
          request
        </p>
        <div className="flex justify-around">
          <button
            className="text-green-800"
            onClick={() => {
              acceptFriendRequest(invitation.userFromUsername);
            }}
          >
            Accept
          </button>
          <button
            className="text-red-800"
            onClick={() => {
              declineInvitation(invitation.id);
            }}
          >
            Refuse
          </button>
        </div>
      </>
    );

  //=============== LOBBY NOTIFICATION ================
  const notifyLobby = (invitation: any) =>
    toast(
      <>
        <p>
          <strong>{invitation.userFromUsername}</strong> invited you to a lobby
        </p>
        <div className="flex justify-around">
          <button
            className="text-green-800"
            onClick={() => {
              acceptLobbyRequest(invitation.lobbyId, invitation.userId);
            }}
          >
            Accept
          </button>
          <button
            className="text-red-800"
            onClick={() => {
              declineInvitation(invitation.id);
            }}
          >
            Refuse
          </button>
        </div>
      </>
    );

  useEffect(() => {
    socket?.on("invitation", (invitation) => {
      console.log("received invitation: ", invitation);
      if (invitation.type == "FRIEND") {
        notifyFriend(invitation);
      } else if (invitation.type == "LOBBY") {
        notifyLobby(invitation);
      }
    });

    return () => {
      socket?.off("invitation");
    };
  }, [socket]);

  return (
    <div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default FriendNotifications;

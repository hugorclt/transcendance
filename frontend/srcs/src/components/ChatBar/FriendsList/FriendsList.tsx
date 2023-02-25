import { AxiosError, AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../../../services/axios'
import FriendsCards from './FriendsCards/FriendsCards';
import { TUser } from './FriendsCards/FriendsType';
import ManageBar from './ManageBar'

function FriendsList() {
  const [friendList, setFriendList] = useState<TUser[]>([]);

  useEffect(() => {
    axiosPrivate.get("friendship/friends")
    .then((res: AxiosResponse) => {
      setFriendList(res.data);
    })
    .catch((err: AxiosError) => {
      console.log("Error while fetching friendlist")
    })

  }, [])
  return (
    <div>
        <ManageBar />
        {friendList.map((val) => {
          console.log(val);
          return (
            <FriendsCards name={val.username} avatar={val.avatar} status={val.status} />
          )
        })}
    </div>
  )
}

export default FriendsList;
import { AxiosError, AxiosResponse } from 'axios';
import React from 'react'
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'
import { UnbanCardsContainer } from './UnbanCardsStyle'



function UnbanCards(props: any) {
    const axiosPrivate = useAxiosPrivate();

    const handleUnban = () => {
    axiosPrivate.post("/rooms/unban", {roomId: props.roomId, username: props.name}).then((res: AxiosResponse) => {
        
    }).catch((err: AxiosError) => {
        
    })
    }  
  return (
    <UnbanCardsContainer>
        <h5>{props.name}</h5>
        <button onClick={handleUnban}>Unban</button>
    </UnbanCardsContainer>
  )
}

export default UnbanCards
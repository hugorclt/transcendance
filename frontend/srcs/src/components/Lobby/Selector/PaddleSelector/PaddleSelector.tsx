import React, { useEffect, useState } from 'react'
import { PaddleSelectorContainer, SelectItemContainer } from '../Selector.style';
import PaddleSelectorCards from './PaddleSelectorCards/PaddleSelectorCards';
import {nanoid} from 'nanoid';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { AxiosError, AxiosResponse } from 'axios';
import { lobbyAtom } from '../../../../services/store';
import { useAtom } from 'jotai';

function PaddleSelector() {
    const [paddles, setPaddle] = useState<{ name: string; image: string }[]>([]);
    const [paddleSelected, setPaddleSelected] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const [lobby] = useAtom(lobbyAtom);

    useEffect(() => {
        axiosPrivate
          .get("/items/user-items")
          .then((res: AxiosResponse) => {
            setPaddle(res.data);
          })
          .catch((err: AxiosError) => {});
    
        
    }, []);
    
    const handleClick = (e: any, paddleName: string) => {
      setPaddleSelected(paddleName);
      axiosPrivate.post("/lobbies/paddle-selected", {
        lobbyId: lobby.id,
        name: paddleName,
      });
    };
  return (
    <PaddleSelectorContainer>
        <h3>CHOOSE YOUR PADDLE</h3>
        <SelectItemContainer>
          {paddles.length == 0 ? (
            <h4>You don't have any Paddle</h4>
          ) : (
            paddles.map((paddle) => {
              return (
                <div key={nanoid()} onClick={(e) => handleClick(e, paddle.name)}>
                  <PaddleSelectorCards
                    img={paddle.image}
                    name={paddle.name}
                    isSelected={paddle.name == paddleSelected ? true : false}
                  />
                </div>
              );
            })
          )}
        </SelectItemContainer>
    </PaddleSelectorContainer>
  )
}

export default PaddleSelector
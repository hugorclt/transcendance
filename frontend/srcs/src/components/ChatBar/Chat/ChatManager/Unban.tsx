import React from 'react'
import { TConversation } from '../../../../services/type'
import UnbanCards from './UnbanCards/UnbanCards'
import { UnbanContainer } from './UnbanStyle'
import {nanoid} from 'nanoid';
import { TChatProps } from '../ChatType';

function Uban({chat}: TChatProps) {  
  return (
    <UnbanContainer>
      <h3>Banned Player</h3>
      {chat.banned.map((banned: string) => {
        return (<UnbanCards key={nanoid()} roomId={chat.id} name={banned} />);
      })}
    </UnbanContainer>
  )
}

export default Uban
import React from 'react'
import { MatchMakingContainer } from './MatchMakingLayout.style'
import HeptaButton from '../../../components/common/Button/HeptaButton/HeptaButton'

function MatchMakingLayout() {

    const cancel = () => {

    }
  return (
    <MatchMakingContainer>
        <h3 className='loading'>SEARCHING FOR A MATCH...</h3>
        <HeptaButton text="Cancel" width={140} onClick={cancel}/>
    </MatchMakingContainer>
  )
}

export default MatchMakingLayout
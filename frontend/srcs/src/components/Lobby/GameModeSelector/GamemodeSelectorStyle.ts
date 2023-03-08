import styled from 'styled-components';
import { COLORS } from '../../../colors';

export const GameModeContainer = styled.div`
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const GameModeCardsBody = styled.div`
    display: flex;
    justify-content: space-around;
    height: 80%;
    width:100%;
    align-items: center;
`

export const GameModeButtonBody = styled.div`
    display:flex;
    flex-direction: column;
    width:100%;
    height:15%;
    justify-content: center;
    align-items: center;
`

export const GameModeButton = styled.button`
    background-color: ${COLORS.secondary};
    color: ${COLORS.primary};
    border-radius: 5px;
    padding:4px;
    border: 1px solid ${COLORS.border};
`



import styled from 'styled-components';
import { COLORS } from '../../../colors';

export const TimerContainer = styled.div`
    top: 0;
    width: 100%;
    height: 100vh;
    position: absolute;
    background-color: ${COLORS.background};
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 500ms ease-in;
`
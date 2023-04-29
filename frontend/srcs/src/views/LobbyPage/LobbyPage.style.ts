import styled from 'styled-components';
import { COLORS } from '../../colors';

export const EndGameStatInfoContainer = styled.div`
    text-align: center;
    font-weight: normal;
    padding: 8px;

    span {
        font-weight: bold;
    }

    h3 {
        margin: 8px;
        font-weight: normal;
    }

    .game-winner {
        font-weight: bold;
        color: ${COLORS.secondary};
    }

    button {
        background-color: ${COLORS.secondary};
        padding: 8px;
        border-radius: 8px;
        border: none;
        margin-top: 8px;
        color: ${COLORS.primary};
        font-weight: bold;
    }
`
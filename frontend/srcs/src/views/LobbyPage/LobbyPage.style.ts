import styled from 'styled-components';
import { COLORS } from '../../colors';

export const EndGameStatInfoContainer = styled.div`
    display: flex;
    justify-content: column;
    align-items: center;

    button {
        background-color: ${COLORS.secondary};
        padding: 8px;
        border-radius: 8px;
        border: none;
    }
`
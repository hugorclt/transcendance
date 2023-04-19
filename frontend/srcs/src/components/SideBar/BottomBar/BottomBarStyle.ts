import styled from 'styled-components';

export const BottomBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;


    @keyframes tilt-n-move-shaking {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(5px, 5px) rotate(5deg); }
        50% { transform: translate(0, 0) rotate(0eg); }
        75% { transform: translate(-5px, 5px) rotate(-5deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
    }

    .buzzing {
        animation:tilt-n-move-shaking 500ms infinite;
    }
`
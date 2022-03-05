import styled from 'styled-components';

import { Typography } from '@material-ui/core';
import { COLORS } from '../styles/colors';

const StyledGamingTitle = styled(Typography)`
    // background: ${COLORS.primary};
    border: 3px solid ${COLORS.primary};
    // color: ${COLORS.light0};
    padding: 5px;
    border-radius: 20px;
    font-size: 0.65rem;
`;

export const GamingTitle = ({ children }) => {
    return (
        <StyledGamingTitle className="main-text">{children}</StyledGamingTitle>
    )
}
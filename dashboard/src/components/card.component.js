import {Card} from '@material-ui/core';
import styled from 'styled-components';
import {COLORS} from '../styles/colors';

const StyledCard = styled(Card)`
    border-radius: ${COLORS.borderRadius};
    height: ${props => props.height};
    margin-top: ${props => props.mt && '20px'};
`;

export default function CustomCard ({children, height, className, style, mt}){
    return(
        <StyledCard height={height} className={className} style={style} mt={mt}>
            {children}
        </StyledCard>
    )
}
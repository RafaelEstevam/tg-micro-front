import { Card } from '@material-ui/core';
import styled from 'styled-components';

const StyledCard = styled(Card)`
    border-radius: '20px';
    height: ${props => props.height};
    margin-top: ${props => props.mt && '20px'};
`;

const MobileCustomCard = styled('div')`
    @media(max-width: 980px){
        width: 100%;
    }
`

export default function CustomCard({ children, height, className, style, mt }) {
    return (
        <MobileCustomCard style={style}>
            {children}
        </MobileCustomCard>
    )
}
import {Card} from '@material-ui/core';
import styled from 'styled-components';

const StyledCard = styled(Card)`
    border-radius: '20px';
    height: ${props => props.height};
    margin-top: ${props => props.mt && '20px'};
`;

export default function CustomCard ({children, height, className, style, mt}){
    return(
        <div>
            {children}
        </div>
    )
}
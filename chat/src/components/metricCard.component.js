import { Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';
import {COLORS} from '../styles/colors';
import { useSelector } from 'react-redux';

const MetricTitle = styled(Typography)`
    color: ${COLORS.light0};
    font-weight: bold;
`;

const MetricContent = styled(Typography)`
    padding: 20px;
    border-radius: 100%;
    color:${props => props.accessibility ? COLORS.warning : COLORS.light0 + '60'};
    svg {
        font-size: 120px
    }
    // p{
    //     font-size: 80px;
    //     line-height: 50px;
    //     font-weight: bold;
    // }
`;

const MetricIcon = styled('div')`
    position: absolute;
    font-size: 100px;
    opacity: 0.2;
    top: 0px;
    left: 0px;
    svg{
        font-size: 120px;
        color: #fff;
    }
`

const MetricComponent = styled(Paper)`
    padding: 15px;
    border-radius: ${COLORS.borderRadius};
    border: 5px solid ${COLORS.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    height: ${props => props.height};
    background: ${props => props.accessibility ? 'transparent' : COLORS.primary };
    // box-shadow: 0px 0px 18px ${COLORS.primary};
`;

export default function Metric({ height = '180px', background = '#fc0', icon, title, subtitle, value }) {

    const accessibility = useSelector(state => state.accessibility);

    return (
        <MetricComponent elevation={0} height={height} accessibility={accessibility.nightMode}>
            <div style={{position: 'relative', zIndex: '3', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'space-between'}}>
                <MetricTitle>{title}</MetricTitle>
                <MetricContent accessibility={accessibility.nightMode}>
                    {icon}
                    <Typography variant="h3" className='main-font-style main-font-type'>{value}</Typography>
                </MetricContent>
                <MetricTitle>{subtitle}</MetricTitle>
            </div>
        </MetricComponent>
    )
}
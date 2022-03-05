
import {
    Typography
} from '@material-ui/core';
import styled from 'styled-components';

export const PageTitle = styled('div')`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    width: 100%;
    gap: 15px;
`

export const PageTitleComponent = ({title, subtitle}) => {
    return (
        <PageTitle>
            <Typography variant="h5" className="primary-text">
                {title}
            </Typography>
            <Typography variant="subtitle2" className="main-text desktop">
                {subtitle}
            </Typography>
        </PageTitle>
    )
}
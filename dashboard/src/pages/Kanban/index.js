import react, {useEffect, useState} from 'react';
import {Grid, Card, CardHeader, CardContent} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import TaskColumn from '../../components/task.column.component';

const Kanban = () => {

    const token = useSelector(state => state.token);
    const decode = useSelector(state => state.decode);

    return (
        <Grid container spacing={3} style={{height: 'calc(100vh - 90px)'}}>
            <Grid item xs={12} md={3}>
                <TaskColumn title="Para fazer" status="To do" style={{height: '100%'}} />
            </Grid>
            <Grid item xs={12} md={3}>
                <TaskColumn title="Iniciadas" status="In progress" style={{height: '100%'}} />
            </Grid>
            <Grid item xs={12} md={3}>
                <TaskColumn title="Bloqueadas" status="Blocked" style={{height: '100%'}} />
            </Grid>
            <Grid item xs={12} md={3}>
                <TaskColumn title="Finalizadas" status="Finished" style={{height: '100%'}} />
            </Grid>
        </Grid>
    )
}

export default Kanban;
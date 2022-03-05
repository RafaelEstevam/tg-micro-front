import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import {COLORS} from '../styles/colors';
import Moment from 'react-moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import styled from 'styled-components';

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 0,
    marginLeft: 5
  },
  root:{
    marginBottom: 15
  },
  icon:{
    color: "#666"
  }
});

const CustomCard = styled(Card)`
  border-left: 6px solid #666;
  border-color:${props => props.status === "To do" ? COLORS.primary : props.status === "In progress" ? COLORS.warning : props.status === "Blocked" ? COLORS.danger : COLORS.info} ;
  :hover{
    cursor: pointer;
    box-shadow: 0px 4px 10px #0002
  }
`

export default function TaskCard({task}) {

  const classes = useStyles();
  const history = useHistory();

  const handleGoToTask = () => {
    history.push(`/tasks/edit/${task.id}`)
  }

  return (
    <Tooltip title="Editar tarefa">
      <CustomCard status={task.status} className={classes.root} onClick={() => handleGoToTask()}>
        <CardContent>
          {task.deadline && (
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              <Moment date={new Date(task.deadline)} format="DD/MM/YYYY" />
            </Typography>
          )}
          <Typography variant="h6" component="h2">
            {task.title}
          </Typography>
          <br/>
          {task?.profile && (
            <div style={{display: 'flex', alignItems: 'center'}}>
              <AccountCircleIcon className={classes.icon}/>
              <Typography className={classes.pos} color="textSecondary">
                {task?.profile?.login?.email}
              </Typography>
            </div>
          )}
        </CardContent>
      </CustomCard>
    </Tooltip>

  );
}

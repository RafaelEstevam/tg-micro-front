import {
  Box,
  Card,
  CardContent, Grid, Typography,
  Button
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { API, getUserDataInStorage } from '../../services/api';
import styled from 'styled-components';

import XpProgressComponent from '../../components/xpprogress.component';
import PodiumComponent from '../../components/podium.component';
import CustomCard from '../../components/card.component';
import AchievementsComponent from '../../components/achievements.component';
// import ActivityComponent from '../../components/activity.component';
// import MetricsComponent from '../../components/metricsCarrossel.compoment';
import MetricCardComponent from '../../components/metricCard.component';
import BarChartComponent from '../../components/barChart.component';
import { CarrosselItem, CarrosselItemComponent } from '../../components/carrosselItem.component';
import {PageTitleComponent} from '../../components/pageTitle.component';
// import { ChatBar } from '../../components/chatBar.component';

import { EmojiEvents } from '@material-ui/icons';

import { COLORS } from '../../styles/colors';

import mock from '../../services/mock';

const ChartWrapper = styled('div')`
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const DashboardMenu = styled('div')`
  margin-bottom: 20px;
  overflow: hidden;
  overflow-x: auto;
  max-width: 87vw;
  //   overflow: hidden;
  //   overflow-x: auto;
`;

const DashboardMenuWrapper = styled('div')`
  display: flex;
  gap: 20px;
  width: max-content;
`

const DashboardMenuItem = styled(Button)`
  padding: 4px 10px;
  border-radius: ${COLORS.borderRadius};
  span{
    text-transform: capitalize;
  }
`

const carrosselList = [
  { title: 'Teste', subtitle: '234', value: '435' },
  { title: '234', subtitle: 'Teste', value: '435' }
];

const dashItems = [
  { title: 'Português' },
  { title: 'Matemática' },
  { title: 'História' },
  { title: 'Geografia' }
]

function Home() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLinkIndex, setCurrentLinkIndex] = useState(0);
  const [currentDash, setCurrentDash] = useState({});
  const [data, setData] = useState(mock());
  const [subjects, setSubjects] = useState([]);
  const [classesViewed, setClassesViewed] = useState([]);
  const [subjectGrade, setSubjectGrade] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [carrossel, setCarrossel] = useState([]);
  const [daysOfClass, setDaysOfClass] = useState([]);

  const {email} = getUserDataInStorage();

  const handleSetDash = (item) => {
    const current = data.filter((dash) => {
      return item.course_name === dash.course_name
    });

    setCurrentDash(current[0]);
  }

  const handleGetTalks = (e) => {
    const data = {email: e};
    try{
      API.post(`getTalksByStudentEmail`, data).then((res) => {
        console.log(res);
      })
    }catch(e){
      console.log(e)
    }
  }

  const handleGetDash = (item, index) => {
    const {course_id, course_grade} = item;
    
    setCurrentLinkIndex(index);
    setSubjectGrade(course_grade);
    setCarrossel([]);

    try{
      API.post(`getClassesByStudentEmailAndCourse`, {email, course_id}).then((res) => {
        const {data} = res;
        const carrosselItem = { title: 'Tempo total', subtitle: 'Estudo da matéria', value: data.totalClassTime, label: 'minutos' };
        setClassesViewed(data.result);
        setDaysOfClass(data.daysOfClass);
        getTasks(item, carrosselItem);
      })
    }catch(e){
      console.log(e)
    }
  }

  const getTasks = (item, carrosselItem) => {
    const {course_id} = item;
    try{
      API.post(`/getTasksByClassesAndStudentEmail`, {email, course_id}).then((res) => {
        const {data} = res;
        setTasks(data.result);
        setTotalTasks(data.totalHomeWork);
        setCarrossel([carrosselItem, { title: 'Quantidade média', subtitle: 'Atividades entregues', value: data.averageActivitiesDelivered, label: 'por dia' }]);
      })
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    try{
      API.post(`/getCoursesByStudentEmail`, {email}).then((res) => {
        const {data} = res;
        setSubjects(data);
        handleGetDash(data[0], 0);
        handleGetTalks(email);
      })
    }catch(e){
      console.log(e);
    }
  }, []);

  return (
    <>
      <PageTitleComponent title="Dashboard" subtitle="Último acesso em 20 de junho de 2021" />

      <DashboardMenu>
        <DashboardMenuWrapper>
          {subjects.map((item, index) => (
            <DashboardMenuItem
              size="small"
              key={item.course_id}
              className={index !== currentLinkIndex && 'main-text'}
              color={index === currentLinkIndex ? 'primary' : 'default'}
              variant={index === currentLinkIndex ? 'contained' : 'text'}
              currentLinkIndex={currentLinkIndex}
              onClick={() => handleGetDash(item, index)}
            >
              {item.course_name}
            </DashboardMenuItem>
          ))}
        </DashboardMenuWrapper>
      </DashboardMenu>

      <Grid container spacing={3}>
        <Grid item lg={3} sm={3} xl={3} xs={12}>
          <Grid container>
            <Grid item lg={12} xs={12}>
              <CustomCard className="second-background main-text">
                <CardContent>
                  <CardContent>
                    <XpProgressComponent experience={currentDash?.experience} />
                    <AchievementsComponent achievements={currentDash?.achievements} />
                    <PodiumComponent podium={currentDash?.podium} />
                  </CardContent>
                </CardContent>
              </CustomCard>
            </Grid>
            {/* <Grid item lg={12} xs={12}>
              <CustomCard className="main-background main-text">
                <CardContent>
                  <ActivityComponent />
                  <ActivityComponent />
                  <ActivityComponent />
                  <ActivityComponent />
                </CardContent>
              </CustomCard>
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item lg={9} sm={9} xl={9} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={3} xs={6}>
              <MetricCardComponent title={'Nota'} subtitle={'parcial'} value={subjectGrade} background={COLORS.primary} />
            </Grid>
            <Grid item lg={3} xs={6}>
              <MetricCardComponent title={'Aulas'} subtitle={'assistidas'} value={classesViewed.length} background={COLORS.primary} />
            </Grid>
            <Grid item lg={3} xs={6}>
              <MetricCardComponent title={'Nº tarefas'} subtitle={'entregues'} value={tasks.length} background={COLORS.primary} />
            </Grid>
            <Grid item lg={3} xs={6}>
              <MetricCardComponent title={'Nº trabalhos'} subtitle={'entregues'} value={totalTasks} background={COLORS.primary} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <CarrosselItem carrossel={carrossel} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <CustomCard height={'360px'} className="primary-background">
                <ChartWrapper>
                  <Typography style={{ color: COLORS.light0 }}><b>Minutos estudados</b></Typography>
                  <BarChartComponent data={daysOfClass} />
                  <Typography style={{ color: COLORS.light0 }}><b>Por semana</b></Typography>
                </ChartWrapper>
              </CustomCard>
            </Grid>
            <Grid item lg={4} xs={12}>
              <MetricCardComponent
                height={'250px'}
                title={currentDash?.emphasis?.title}
                subtitle={currentDash?.emphasis?.subtitle}
                icon={<EmojiEvents />}
                background={COLORS.primary}
              />
            </Grid>
            <Grid item lg={8} xs={12}>
              <CustomCard height={'250px'} className="second-background main-text" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <CarrosselItemComponent title="Duvidas" subtitle="no fórum" lable="Nº de dúvidas" show />
                <CarrosselItemComponent title="Respostas" subtitle="no fórum" lable="Nº de respostas" show />
              </CustomCard>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item lg={1} sm={8} xl={1} xs={12}>
          <ChatBar />
        </Grid> */}
      </Grid>
    </>
  );
}

export default Home;
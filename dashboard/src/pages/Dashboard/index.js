import {
  Box,
  Card,
  CardContent, Grid, Typography,
  Button,
  LinearProgress
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

import { EmojiEvents, QuestionAnswer } from '@material-ui/icons';

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
  { title: 'Portugu??s' },
  { title: 'Matem??tica' },
  { title: 'Hist??ria' },
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
  const [totalComments, setTotalComments] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [podium, setPodium] = useState([]);
  const [loading, setLoading] = useState(false);

  const {email} = getUserDataInStorage();

  const handleGetAnswersCommentsByCourse = async(item) => {
    const {course_id} = item;
    const data = {
      course_id,
      email
    }
    try{
      await API.post(`/getCommentsByStudentEmailandCourseId`, data).then((response) => {
        setTotalComments(response.data)
      })

      await API.post(`/getAnswerByStudentEmailandCourseId`, data).then((response) => {
        setTotalAnswers(response.data)
      })
    }catch(e){
      console.log(e)
    }
  };

  const handleGetPodiumByCourseId = async(item) => {
    const {course_id} = item;
    
    try{
      await API.get(`/getPodiumByCourseId/${course_id}`).then((response) => {
        setPodium(response.data)
      })
    }catch(e){
      console.log(e)
    }
  };

  const handleGetTasks = async (item, carrosselItem) => {
    const {course_id} = item;
    try{
      await API.post(`/getTasksByClassesAndStudentEmail`, {email, course_id}).then((res) => {
        const {data} = res;
        setTasks(data.result);
        setTotalTasks(data.totalHomeWork);
        setCarrossel([carrosselItem, { title: 'Quantidade m??dia', subtitle: 'Atividades entregues', value: data.averageActivitiesDelivered, label: 'por dia' }]);
      })
    }catch(e){
      console.log(e)
    }
  }

  const handleGetDash = async (item, index) => {
    const {course_id, course_grade} = item;

    setLoading(true);
    
    setCurrentLinkIndex(index);
    setSubjectGrade(course_grade);
    setCarrossel([]);

    handleGetAnswersCommentsByCourse(item);
    handleGetPodiumByCourseId(item);

    try{
      await API.post(`getClassesByStudentEmailAndCourse`, {email, course_id}).then((res) => {
        const {data} = res;
        const carrosselItem = { title: 'Tempo total', subtitle: 'Estudo da mat??ria', value: data.totalClassTime, label: 'minutos' };
        setClassesViewed(data.result);
        setDaysOfClass(data.daysOfClass);
        handleGetTasks(item, carrosselItem);
        setLoading(false);
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
      })
    }catch(e){
      console.log(e);
    }
  }, []);

  return (
    <>

      {loading && (
        <LinearProgress />
      )}

      <PageTitleComponent title="Dashboard" />

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
                    <XpProgressComponent {...{classesViewed}} />
                    <AchievementsComponent {...{tasks, totalTasks, subjectGrade, classesViewed, totalComments, totalAnswers}} />
                    <PodiumComponent {...{podium}} />
                  </CardContent>
                </CardContent>
              </CustomCard>
            </Grid>
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
              <MetricCardComponent title={'N?? tarefas'} subtitle={'entregues'} value={tasks.length} background={COLORS.primary} />
            </Grid>
            <Grid item lg={3} xs={6}>
              <MetricCardComponent title={'N?? trabalhos'} subtitle={'entregues'} value={totalTasks} background={COLORS.primary} />
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
          </Grid>
        </Grid>
      </Grid>

      <Box mt={2}>
        <PageTitleComponent title="Dados da comunidade" />
        <Grid container spacing={3}>
          <Grid item lg={12} xs={12}>
            <CustomCard className="second-background main-text" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} mt={1}>
                    <QuestionAnswer style={{fontSize: '100px', marginRight: '15px'}} />
                    <Typography variant="h3" className="main-font-style main-font-type" align="center">Intera????es na <br/> comunidade</Typography>
                  </Box>
                </Grid>
                <Grid item md={3} xs={6}>
                  <CarrosselItemComponent value={totalComments.total || '0'} title="Duvidas" subtitle="no f??rum" lable="N?? de d??vidas" show />
                </Grid>
                <Grid item md={3} xs={6}>
                  <CarrosselItemComponent value={totalAnswers.totalAnswersAccept || '0'} title="Respostas" subtitle="no f??rum" lable="N?? de respostas" show />
                </Grid>
              </Grid>
            </CustomCard>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
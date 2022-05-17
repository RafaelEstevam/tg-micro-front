import { EmojiEvents, PlaylistAddCheck, EmojiPeople, People, TrendingUp, PanTool, DoneAll } from '@material-ui/icons';

const metric = (min, value, key) => {
    return value >= min
}

const xpFactor = 500;
const levelFactor = 3;

const achievements = [
    {title: 'Aluno colaborativo', metric, min: 5, icon: <People/>, key: 'totalComments'},
    {title: 'Aluno presente', metric, min: 5, icon: <EmojiPeople/>, key: 'classesViewed'},
    {title: 'Aluno participativo', metric, min: 5, icon: <PanTool/>, key: 'totalAnswers'},
    {title: 'Aluno eficiente', metric, min: 5, icon: <PlaylistAddCheck/>, key: 'totalTasks'},
    {title: 'Aluno empenhado', metric, min: 5, icon: <DoneAll />, key: 'tasks'}, 
    {title: 'Aluno acima da média', metric, min: 6, icon: <TrendingUp/>, key: 'subjectGrade'},
    {title: 'Aluno super colaborativo', metric, min: 8, icon: <People/>, key: 'totalComments', plus: true},
    {title: 'Aluno super presente', metric, min: 8, icon: <EmojiPeople/>, key: 'classesViewed', plus: true},
    {title: 'Aluno super participativo', metric, min: 8, icon: <PanTool/>, key: 'totalAnswers', plus: true},
    {title: 'Aluno super eficiente', metric, min: 8, icon: <PlaylistAddCheck/>, key: 'totalTasks', plus: true},
    {title: 'Aluno super empenhado', metric, min: 8, icon: <DoneAll />, key: 'tasks', plus: true},
    {title: 'Aluno nota 10', metric, min: 10, icon: <EmojiEvents/>, key: 'subjectGrade', plus: true}
]

export {achievements, xpFactor, levelFactor}
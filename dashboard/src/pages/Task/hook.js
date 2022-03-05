import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import moment from 'moment';

import {API} from '../../services/api';

const TaskHook = () => {

    const { enqueueSnackbar } = useSnackbar();
    const status = useSelector(state => state.task.status);

    console.log(status);

    const history = useHistory();
    const { id } = useParams();
    const [values, setValues] = useState({
      title: "",
      description: "",
      deadline: "1950-01-01",
      status: status || "",
      category: null,
      profile: null,
    });
    const [slideValue, setSlideValue] = useState(0);
  
    const handleChangeSlide = (event, newValue) => {
      setSlideValue(newValue);
    };
  
    const handleChange = (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    };
  
    const goToList = () => {
      history.push('/tasks');
    }
  
    const handleDelete = async () => {
      API.delete(`/task/delete/${id}`).then(() => {
        enqueueSnackbar('Tarefa apagada com sucesso', {variant: "success"});
        goToList();
      }).catch(() => {
        enqueueSnackbar('Não foi possível apagar a tarefa', {variant: "error"});
      });
    }
  
    const handleOnSubmit = (e) => {
      e.preventDefault();
  
      const data = {
        title: values.title,
        category: values.category ? {
          id: values.category
        } : null,
        profile: values.profile ? {
          id: values.profile
        } : null,
        description: values.description,
        status: values.status,
        progress: slideValue,
        deadline: values.deadline
      }

      if(!id){
        API.post('/task/new', data).then((response) => {
          enqueueSnackbar('Salvo com sucesso', {variant: "success"});
          goToList();
        }).catch((e) => {
          enqueueSnackbar('Não foi possível salvar a tarefa', {variant: "error"});
        });
      }else{
        data.id = id;
  
        API.put(`/task/edit/${id}`, data).then((response) => {
          enqueueSnackbar('Salvo com sucesso', {variant: "success"});
          goToList();
        }).catch((e) => {
          enqueueSnackbar('Não foi possível salvar a tarefa', {variant: "error"});
        });
      }
    }
  
    useEffect(() => {
      if(id){
        API.get(`/task/${id}`).then((response) => {

          const data = response.data;
          data.deadline = moment(new Date(response.data?.deadline)).format('YYYY-MM-DD')

          setValues(
            {...data, 
              category: response.data?.category?.id,
              profile: response.data?.profile?.login?.id
            });

          setSlideValue(response.data.progress);

        }).catch((e) => {
          enqueueSnackbar('Não foi possível encontrar a tarefa', {variant: "error"});
        })
      }
    }, []);

    return {
        history,
        id,
        values,
        slideValue,
        setValues,
        setSlideValue,
        goToList,
        handleChange,
        handleChangeSlide,
        handleDelete,
        handleOnSubmit
    }
    
};

export default TaskHook;
  
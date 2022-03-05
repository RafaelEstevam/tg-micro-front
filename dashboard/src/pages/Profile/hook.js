import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import moment from 'moment';

import {API} from '../../services/api';

const TaskHook = () => {

    const { enqueueSnackbar } = useSnackbar();
    const decode = useSelector(state => state.decode);
    const [loginId, setLoginId] = useState("");
    const [profileId, setProfileId] = useState("");

    const history = useHistory();
    const [values, setValues] = useState({
      name: "",
      doc: "",
      gender: "",
      birthday: "",
      phone: "",
      mobile: "",
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
      history.push('/kanban');
    }
  
    const handleDelete = async () => {
      // API.delete(`/task/delete/${id}`).then(() => {
      //   enqueueSnackbar('Tarefa apagada com sucesso', {variant: "success"});
      //   goToList();
      // }).catch(() => {
      //   enqueueSnackbar('Não foi possível apagar a tarefa', {variant: "error"});
      // });
    }
  
    const handleOnSubmit = (e) => {
      e.preventDefault();
      // values.login ;
      values.login = {};
      values.login.id = loginId;
      values.birthday = new Date(values.birthday)

      if(!profileId){
        API.post('/profile/new', values).then((response) => {
          enqueueSnackbar('Salvo com sucesso', {variant: "success"});
          setProfileId(response.data.id)
        }).catch((e) => {
          enqueueSnackbar('Não foi possível salvar a tarefa', {variant: "error"});
        });
      }else{
        API.post(`/profile/edit/${profileId}`, values).then((response) => {
          enqueueSnackbar('Salvo com sucesso', {variant: "success"});
          setProfileId(response.data.id)
        }).catch((e) => {
          enqueueSnackbar('Não foi possível salvar a tarefa', {variant: "error"});
        });
      }
    }
  
    useEffect(() => {
      if(decode){
        API.get(`/login/email`,{params: {email: decode.email}}).then((response) => {
          setLoginId(response.data.id);
        }).catch((e) => {
          // enqueueSnackbar('Login não encontrado', {variant: "error"});
        })
      }
    }, []);

    useEffect(() => {
      if(loginId){
        API.get(`/login/profile/${loginId}`).then((response) => {

          const data = response.data;
          data.birthday = moment(new Date(response.data?.birthday)).format('YYYY-MM-DD')

          setValues(data)
        }).catch((e) => {
          enqueueSnackbar('Perfil não encontrado', {variant: "error"});
        })
      }
    }, [loginId])

    return {
        history,
        // id,
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
  
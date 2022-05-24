import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import moment from 'moment';

import {API, getUserIdInStorage} from '../../services/api';

const TaskHook = () => {
  
    const { enqueueSnackbar } = useSnackbar();
    const userId = getUserIdInStorage();
    
    const decode = useSelector(state => state.decode);
    const [loginId, setLoginId] = useState("");
    const [profileId, setProfileId] = useState("");

    const history = useHistory();
    const [values, setValues] = useState({
      name: "",
      doc: "",
      email: ""
    });
    const [slideValue, setSlideValue] = useState(0);

    const handleGetUserData = async () => {
      try{
        await API.get(`/users/${userId}`).then((response) => {
          setValues(response.data);
        });
      }catch(e){
        console.log(e);
      }
    };

    const handleChange = (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    };

    useEffect(() => {
      handleGetUserData();
    }, []);

    const handleOnSubmit = async (e) => {
      e.preventDefault();

      try{
        await API.put(`/users/edit/${userId}`, values).then((response) => {
          console.log(response);
        })
      }catch(e){
        console.log(e)
      }
    }

    return {
      userId,
      values,
      setValues,
      handleChange,
      handleOnSubmit
    }
    
};

export default TaskHook;
  
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import {API} from '../../services/api';

const UserListHook = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState([]);
    const [values, setValues] = useState({email: "", password: ""});

    const handleLoad = (row) => {
        setValues(row);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(!values.id){
            API.post('/login/new', values).then((response) => {
                enqueueSnackbar('Salvo com sucesso', {variant: "success"});
                handleGetAll()
            }).catch((e) => {
                enqueueSnackbar('Não foi possível salvar a categoria', {variant: "error"});
            });
        }else{
            API.put(`/login/edit/${values.id}`, values).then((response) => {
                enqueueSnackbar('Salvo com sucesso', {variant: "success"});
                handleGetAll();
            }).catch((e) => {
                enqueueSnackbar('Não foi possível salvar a categoria', {variant: "error"});
            });
        }
    }

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleGetAll = () => {
        API.get('/login/all').then((response) => {
            setData(response.data);
        }).catch((e) => {
            enqueueSnackbar('Não foi possível fazer a consulta', {variant: "error"});
        })
    }

    const handleDelete = () => {
        API.delete(`/login/delete/${values.id}`).then(() => {
            enqueueSnackbar('Categoria apagada com sucesso', {variant: "success"});
            setValues({email: "", password: ""});
            handleGetAll();
        }).catch(() => {
            enqueueSnackbar('Não foi possível apagar a categoria. Ela pode estar vinculada à uma tarefa.', {variant: "error"});
        });
    };

    useEffect(() => {
        handleGetAll();
    }, []);

    return {
        data,
        values,
        setValues,
        handleChange,
        handleDelete,
        handleOnSubmit,
        handleLoad
    }
    
};

export default UserListHook;
  
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import {API} from '../../services/api';

const CategoriesListHook = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState([]);
    const [values, setValues] = useState({name: ""});

    const handleLoad = (row) => {
        setValues(row);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(!values.id){
            API.post('/category/new', values).then((response) => {
                enqueueSnackbar('Salvo com sucesso', {variant: "success"});
                handleGetAll()
            }).catch((e) => {
                enqueueSnackbar('Não foi possível salvar a categoria', {variant: "error"});
            });
        }else{
            API.put(`/category/edit/${values.id}`, values).then((response) => {
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
        API.get('/category/all').then((response) => {
            setData(response.data);
        }).catch((e) => {
            enqueueSnackbar('Não foi possível fazer a consulta', {variant: "error"});
        })
    }

    const handleDelete = () => {
        API.delete(`/category/delete/${values.id}`).then(() => {
            enqueueSnackbar('Categoria apagada com sucesso', {variant: "success"});
            setValues({name: ""});
            handleGetAll();
        }).catch(() => {
            enqueueSnackbar('Não foi possível apagar a categoria. Ela pode estar vinculada à uma tarefa.', {variant: "error"});
        });
    }

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

export default CategoriesListHook;
  
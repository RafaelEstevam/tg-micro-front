import react, {useState, useEffect} from 'react';
import {API} from '../services/api';
import {TextField} from '@material-ui/core';
import { useSnackbar } from 'notistack';

const Select = ({value, onChange, api, label, name, required}) => {

    const [list, setList] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        API.get(`${api}`).then((response) => {
            setList(response.data);
        }).catch(() => {
            enqueueSnackbar('Não foi possível fazer a consulta', {variant: "error"});
        })
    }, []);

    return (
        <TextField
            fullWidth
            label={label}
            name={name}
            onChange={onChange}
            required={required}
            select
            SelectProps={{ native: true }}
            value={value || ' '}
            variant="outlined"
        >
            <option>Selecione</option>
            {list.map((option) => (
                <option
                    key={option.id || option.login.id}
                    value={option.id || option.login.id}
                >
                    {option?.login?.email || option?.name}
                </option>
            ))}
        </TextField>
    )

}

export default Select;
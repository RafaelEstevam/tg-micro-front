import react, {useEffect, useState, useMemo} from 'react';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { API } from '../../services/api';
import {Button, Card} from '@material-ui/core';
import {COLORS} from '../../styles/colors';

import DataTable from '../../components/table.component';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

const columns = [
    {name: 'ID', maxWidth: '60px', selector: row => row.id},
    {name: 'Categoria', selector: row => row?.category?.name},
    {name: 'Usuário', selector: row => row?.profile?.login?.email},
    {name: 'Título', selector: row => row.title},
    {name: 'Descrição', wrap: true, selector: row => row.description},
    {name: 'Status', selector: row => row.status},
    {
        name: 'Progresso',
        maxWidth: '60px',
        selector: row => (<>{row.progress} %</>),
        conditionalCellStyles: [
            {
                when: row => row.progress <= 40,
                style: {
                    backgroundColor: COLORS.danger,
			        color: 'white',
                }
            },
            {
                when: row => row.progress > 41 && row.progress <= 80,
                style: {
                    backgroundColor: COLORS.warning,
			        color: 'white',
                }
            },
            {
                when: row => row.progress > 81 && row.progress <= 99,
                style: {
                    backgroundColor: COLORS.success,
			        color: 'white',
                }
            },
            {
                when: row => row.progress === 100,
                style: {
                    backgroundColor: COLORS.info,
			        color: 'white',
                }
            }
        ],
    },
    {name: 'Prazo', selector: row => row.deadline},
];

const ListView = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState([]);

    const handleGoToTask = (row) => {
        history.push(`tasks/edit/${row.id}`);
    };

    const handleGoToNew = () => {
        dispatch({type: 'ADD_TASK', status: ""});
        history.push(`tasks/new`);
    };

    useEffect(() => {
        API.get('/task/all').then((response) => {
            setData(response.data);
        }).catch((e) => {
            enqueueSnackbar('Não foi possível fazer a consulta', {variant: "error"});
        })
    }, []);

    return (
        <Card>
            <DataTable
                columns={columns}
                data={data}
                title="Lista de tarefas"
                pagination
                pointerOnHover
                onRowClicked={(row) => handleGoToTask(row)}
                actions={
                    <Button startIcon={<ControlPointIcon />} variant="contained" color="primary" onClick={e => handleGoToNew()}>
                        Nova tarefa
                    </Button>
                }
            />
        </Card>
    );
}

export default ListView;
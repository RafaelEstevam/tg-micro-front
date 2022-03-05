import DataTable from '../../components/table.component';

import {
    Box,
    Button,
    Grid,
    IconButton,
    CardContent,
    Card,
    CardHeader,
    Divider,
    TextField,
    Tooltip
} from '@material-ui/core';

import ControlPointIcon from '@material-ui/icons/ControlPoint';

import CategoriesListHook from './hook';

const columns = [
    {name: 'ID', maxWidth: '60px', selector: row => row.id},
    {name: 'Categoria', selector: row => row.name},
];

const ListView = (props) => {
    const {
        data,
        handleChange,
        handleDelete,
        handleLoad,
        handleOnSubmit,
        setValues,
        values
    } = CategoriesListHook();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <form
                    autoComplete="off"
                    onSubmit={(e) => handleOnSubmit(e)}
                    {...props}
                >
                    <Card>
                        <CardHeader
                            title="Categorias"
                            subheader="Crie/edite sua categoria"
                            style={{alignItems: 'center'}}
                            action={
                                <Tooltip title="Cadastrar nova categoria">
                                    <IconButton aria-label="settings" variant="outlined" color="primary" onClick={() => setValues({name: ""})}>
                                        <ControlPointIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nome da categoria"
                                    name="name"
                                    minRows={1}
                                    onChange={handleChange}
                                    required
                                    helperText="O nome deve ser diferente de outra categoria"
                                    value={'' || values.name}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        </CardContent>
                        <Divider />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: values.id ? 'space-between' : 'flex-end',
                                width: '100%',
                                p: 2
                            }}
                        >
                            {values.id && (
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    onClick={() => handleDelete()}
                                >
                                    Apagar categoria
                                </Button>
                            )}

                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                            >
                                Salvar categoria
                            </Button>
                        </Box>
                    </Card>
                </form>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <DataTable
                        columns={columns}
                        data={data}
                        title="Lista de categorias"
                        pagination
                        pointerOnHover
                        onRowClicked={(row) => handleLoad(row)}
                    />
                </Card>
            </Grid>
        </Grid>
    );
}

export default ListView;
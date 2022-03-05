import react, {useEffect, useState, useMemo} from 'react';
import {
    Button,
    Card,
    Grid,
    CardHeader,
    Tooltip,
    IconButton,
    Divider,
    CardContent,
    TextField,
    Box
} from '@material-ui/core';

import UserListHook from './hook';

import DataTable from '../../components/table.component';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

const columns = [
    {name: 'ID', maxWidth: '60px', selector: row => row.id},
    {name: 'Login', selector: row => row?.email}
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
    } = UserListHook();

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
                            title="Login"
                            subheader="Crie/edite login"
                            style={{alignItems: 'center'}}
                            action={
                                <Tooltip title="Cadastrar novo login">
                                    <IconButton aria-label="settings" variant="outlined" color="primary" onClick={() => setValues({email: "", password: ""})}>
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
                                        label="E-mail"
                                        name="email"
                                        minRows={1}
                                        onChange={handleChange}
                                        required
                                        value={'' || values.email}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Senha"
                                        name="password"
                                        type="password"
                                        onChange={handleChange}
                                        value={'' || values.password}
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
                                    Apagar login
                                </Button>
                            )}

                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                            >
                                Salvar login
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
                        title="Lista de logins"
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
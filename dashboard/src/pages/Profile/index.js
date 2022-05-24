import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {status} from '../../services/enun';
import Select from '../../components/select.component';
import ProfileHook from './hook.js';
import CustomCard from '../../components/card.component.js';
import {PageTitleComponent} from '../../components/pageTitle.component';

const TaskVkew = (props) => {

  const accessibility = useSelector(state => state.accessibility);

  const {
    userId,
    values,
    setValues,
    handleChange,
    handleOnSubmit
  } = ProfileHook();

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => handleOnSubmit(e)}
      // {...props}
    >
      <PageTitleComponent title="Perfil do usuário" />

      <CustomCard mt className="second-background">
        
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                color={accessibility.nightMode ? 'neutral' : 'default'}
                focused={accessibility.nightMode}
                label="Nome"
                name="name"
                minRows={1}
                onChange={handleChange}
                required
                value={'' || values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                color={accessibility.nightMode ? 'primary' : 'primary'}
                focused={accessibility.nightMode}
                label="CPF"
                name="doc"
                minRows={1}
                onChange={handleChange}
                required
                value={'' || values.doc}
                variant="outlined"
              />
            </Grid>
            
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                color={accessibility.nightMode ? 'primary' : 'primary'}
                focused={accessibility.nightMode}
                label="Email"
                name="email"
                onChange={handleChange}
                value={'' || values.email}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                color={accessibility.nightMode ? 'primary' : 'primary'}
                focused={accessibility.nightMode}
                label="Senha"
                name="password"
                type="password"
                onChange={handleChange}
                value={'' || values.password}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                color={accessibility.nightMode ? 'primary' : 'primary'}
                focused={accessibility.nightMode}
                label="Avatar"
                name="avatar"
                onChange={handleChange}
                value={'' || values.avatar}
                variant="outlined"
              />
              {values?.avatar?.length > 0 && (
                <Box mt={2}>
                  <img src={values.avatar} width="100px" height="100px" alt="Avatar" />
                </Box>
              )}
            </Grid>
            
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            // justifyContent: id ? 'space-between' : 'flex-end',
            width: '100%',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Salvar perfil
          </Button>
        </Box>
      </CustomCard>
    </form>
  );
};

export default TaskVkew;
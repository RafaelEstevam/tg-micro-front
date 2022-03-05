import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Slider,
  Typography
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {status} from '../../services/enun';
import Select from '../../components/select.component';
import TaskHook from './hook.js';
import CustomCard from '../../components/card.component.js';
import {PageTitleComponent} from '../../components/pageTitle.component';



const TaskVkew = (props) => {

  const accessibility = useSelector(state => state.accessibility);

  const {
    id,
    values,
    slideValue,
    handleChange,
    handleChangeSlide,
    handleDelete,
    handleOnSubmit
  } = TaskHook();

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => handleOnSubmit(e)}
      {...props}
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
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth
                color={accessibility.nightMode ? 'primary' : 'primary'}
                focused={accessibility.nightMode}
                label="Gênero"
                name="gender"
                onChange={handleChange}
                value={'' || values.gender}
                variant="outlined"
                select
                SelectProps={{ native: true }}
              >
                <option>Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outros</option>
                <option value="N">Não informar</option>
              </TextField>
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth
                color={accessibility.nightMode ? 'primary' : 'primary'}
                focused={accessibility.nightMode}
                label="Aniversário"
                name="birthday"
                type="date"
                onChange={handleChange}
                value={'' || values.birthday}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth
                color={accessibility.nightMode ? 'primary' : 'primary'}
                focused={accessibility.nightMode}
                label="Telefone"
                name="phone"
                onChange={handleChange}
                value={'' || values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth
                color={accessibility.nightMode ? 'primary' : 'primary'}
                focused={accessibility.nightMode}
                label="Celular"
                name="mobile"
                onChange={handleChange}
                value={'' || values.mobile}
                variant="outlined"
              />
            </Grid>
            
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: id ? 'space-between' : 'flex-end',
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
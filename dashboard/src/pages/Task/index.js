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
import {status} from '../../services/enun';
import Select from '../../components/select.component';
import TaskHook from './hook.js';

const TaskVkew = (props) => {

  const {
    id,
    values,
    slideValue,
    handleChange,
    handleChangeSlide,
    handleDelete,
    handleOnSubmit
  } = TaskHook();

  //TODO Convert date to string 

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => handleOnSubmit(e)}
      {...props}
    >
      <Card>
        <CardHeader
          title="Tarefa"
          subheader="Crie/edite sua tarefa"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Título"
                name="title"
                minRows={1}
                onChange={handleChange}
                required
                value={'' || values.title}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography>
                Progresso: {`${slideValue}`} %
              </Typography>
              <Slider
                value={slideValue}
                onChange={handleChangeSlide}
                aria-labelledby="continuous-slider"
                min={0}
                max={100}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <Select 
                value={'' || values.profile}
                onChange={handleChange}
                api="/profile/all"
                label="Usuários"
                name="profile"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth
                label="Prazo"
                name="deadline"
                onChange={handleChange}
                type="date"
                value={'' || values.deadline}
                variant="outlined"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <Select 
                value={'' || values.category}
                onChange={handleChange}
                api="/category/all"
                label="Categoria"
                name="category"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth
                label="Status da tarefa"
                name="status"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.status || ''}
                variant="outlined"
              >
                <option>Selecione</option>
                {status.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Descrição da tarefa"
                name="description"
                onChange={handleChange}
                rows={4}
                multiline
                value={'' || values.description}
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
          {id && (
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => handleDelete()}
            >
              Apagar tarefa
            </Button>
          )}
          

          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Salvar tarefa
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default TaskVkew;
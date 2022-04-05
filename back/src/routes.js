const { Router } = require("express");
const userController = require("./controller/userController");
const dwController = require("./controller/dwController");
const termController = require("./controller/termController");
const historicController = require("./controller/historicController");
const talkController = require("./controller/talkController");
const students = require("./legado/students");

const routes = Router();

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World' });
});

routes.post('/login', userController.login);
routes.get('/logout/:id', userController.logout);

routes.post('/users/new', userController.post);
routes.put('/users/edit/:id', userController.put);
routes.get('/users/:id', userController.get);
routes.get('/usersOnline', userController.getUsersOnline);

routes.post('/term/new', termController.post);
routes.get('/term/get/last', termController.getLastTerm);

routes.get('/talk/:from/:to', talkController.getTalkByToFrom);

routes.get('/historics', historicController.getHistorics);
routes.get('/historics/:user_id', historicController.getHistoricsByUser);

routes.post('/getCoursesByStudentEmail', dwController.getCoursesByStudentEmail);
routes.post('/getClassesByStudentEmailAndCourse', dwController.getClassesByStudentEmailAndCourse);
routes.post('/getCommentsByClassesAndStudentEmail', dwController.getCommentsByClassesAndStudentEmail);
routes.post('/getTasksByClassesAndStudentEmail', dwController.getTasksByClassesAndStudentEmail);

routes.get('/students', (req, res) => {
    res.json(students);
});

module.exports = routes;
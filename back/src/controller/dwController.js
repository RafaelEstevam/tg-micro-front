const {con} = require("../config.js");

module.exports = {
    async test(req, res) {
        const result = await con.query("SELECT * FROM activation", function (err, result, fields) {
            if (err) throw err;
            return res.json(result);
        });
    },

    async getCoursesByStudentEmail(req, res){
        const {email} = req.body;
        const result = await con.query(`
        SELECT students.id, students.student_name, students.student_email, course_name, course_id
            FROM students, courses, students_courses
            WHERE students.student_email = "${email}" and
            students_courses.student_id = students.id and
            courses.id = students_courses.course_id    
        `, (err, result) => {
            return res.json(result);
        });
    },

    async getClassesByStudentEmailAndCourse(req, res){
        const {email, course_id} = req.body;
        const result = await con.query(`
        select classes.id, c.course_name, s.student_name from classes, courses c, students_courses sc, students s where
            classes.course_id = ${course_id} and
            c.id = classes.course_id and
            s.student_email = '${email}' and
            s.id = sc.student_id and 
            sc.course_id = classes.course_id   
        `, (err, result) => {
            return res.json(result);
        });
    },
    
    async getCommentsByClassesAndStudentEmail(req, res){
        const {email} = req.body;
        const result = await con.query(`
        select comments.id, comments.comment, s.student_name, c.class_name, c2.course_name from comments, students s, classes c, courses c2 where
            s.student_email = '${email}' and
            comments.student_id = s.id and 
            c.id = comments.class_id and 
            c2.id = c.course_id;
        `, (err, result) => {
            return res.json(result);
        });
    },

    async getTasksByClassesAndStudentEmail(req, res){
        const {email} = req.body;
        const result = await con.query(`
        select tasks.id, tasks.task_name, s.student_name, c.class_name, c2.course_name from tasks, students s, classes c, courses c2 where
            s.student_email = '${email}' and
            tasks.student_id = s.id and 
            c.id = tasks.class_id and 
            c2.id = c.course_id;
        `, (err, result) => {
            return res.json(result);
        });
    }

    // SELECT * FROM `students`, `courses`, `students_courses` WHERE students.id = 1 and  students_courses.student_id = students.id and courses.id = students_courses.course_id; 
    // SELECT * FROM `students`, `courses`, `students_courses` WHERE students.student_email = "aluno1@tg.com" and  students_courses.student_id = students.id and courses.id = students_courses.course_id;
    // SELECT * FROM `students`, `classes`, `students_classes` WHERE students.id = 1 and students_classes.student_id = students.id and classes.id = students_classes.class_id;

    // SELECT * FROM `students`, `classes`, `students_classes`, `courses` WHERE
	// students.id = 1 and
    // students_classes.student_id = students.id and classes.id = students_classes.class_id AND
    // classes.course_id = courses.id;

}
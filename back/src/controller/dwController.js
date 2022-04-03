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
    }
    

    // SELECT * FROM `students`, `courses`, `students_courses` WHERE students.id = 1 and  students_courses.student_id = students.id and courses.id = students_courses.course_id; 
    // SELECT * FROM `students`, `courses`, `students_courses` WHERE students.student_email = "aluno1@tg.com" and  students_courses.student_id = students.id and courses.id = students_courses.course_id;
    // SELECT * FROM `students`, `classes`, `students_classes` WHERE students.id = 1 and students_classes.student_id = students.id and classes.id = students_classes.class_id;

    // SELECT * FROM `students`, `classes`, `students_classes`, `courses` WHERE
	// students.id = 1 and
    // students_classes.student_id = students.id and classes.id = students_classes.class_id AND
    // classes.course_id = courses.id;

}
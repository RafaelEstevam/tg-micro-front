const {con} = require("../config.js");

const queries = {
    async test(req, res) {
        const result = await con.query("SELECT * FROM activation", function (err, result, fields) {
            if (err) throw err;
            return res.json(result);
        });
    },

    async getCoursesByStudentEmail(req, res){
        const {email} = req.body;
        const result = await con.query(`
        SELECT students.id, students.student_name, students.student_email, course_name, course_id, course_grade
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
        let response;
        const result = await con.query(`
        select classes.id, c.course_name, classes.class_name, classes.class_time, classes.class_dateofclass from classes, courses c, students_courses sc, students s where
            classes.course_id = ${course_id} and
            c.id = classes.course_id and
            s.student_email = '${email}' and
            s.id = sc.student_id and 
            sc.course_id = classes.course_id   
        `, (err, result) => {

            let totalClassTime = 0;
            let daysOfClass = [];

            result?.forEach((item) => {
                if(item.class_time){
                    totalClassTime += item.class_time;
                }

                const finded = daysOfClass.find((subitem) => {
                    let iDate = item.class_dateofclass.toString();
                    let sDate = subitem.class_dateofclass.toString();
                    return iDate === sDate;
                })

                if(!finded){
                    daysOfClass.push({class_dateofclass: item.class_dateofclass, class_time: item.class_time});
                }

                if(finded){
                    finded.class_time += item.class_time;
                    daysOfClass = daysOfClass.filter((subitem) => {
                        return subitem.class_dateofclass !== finded.class_dateofclass;
                    });
                    daysOfClass.push(finded);
                }

            });

            return res.json({result, ...{totalClassTime, daysOfClass}});

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

    async getTasksByClass(req, res){
        const {email, course_id, class_id} = req.body;
        const result = await con.query(`
        select tasks.id as task_id, tasks.task_name, s.student_name, c.id as class_id, c.class_name, c.class_time, c2.course_name, tasks.task_homework, tasks.task_grade, tasks.task_datetodelivery from tasks, students s, classes c, courses c2 where
            s.student_email = '${email}' and
            tasks.student_id = s.id and
            c.id = ${class_id} and
            c.id = tasks.class_id and
            c.course_id = ${course_id} and
            c2.id = c.course_id
        `, (err, result) => {
            return res.json(result);
        });
    },

    async getTasksByClassesAndStudentEmail(req, res){
        const {email, course_id} = req.body;
        const result = await con.query(`
        select tasks.id, tasks.task_name, s.student_name, c.class_name, c2.course_name, tasks.task_homework, tasks.task_grade, tasks.task_datetodelivery from tasks, students s, classes c, courses c2 where
            s.student_email = '${email}' and
            tasks.student_id = s.id and 
            c.id = tasks.class_id and
            c.course_id = ${course_id} and
            c2.id = c.course_id;
        `, (err, result) => {

            let totalHomeWork = 0;
            let daysOfDelivery = [];
            let filteredDaysOfDelivery = [];
            let averageActivitiesDelivered = 0.0;

            result?.forEach((item) => {
                if(item.task_homework){
                    totalHomeWork += 1;
                };
                item.task_homework = item.task_homework === 1 ? true : false;
                daysOfDelivery.push({task_datetodelivery: item.task_datetodelivery});
            });

            daysOfDelivery?.map((item) => {
                let totalTasksOfDay = 0;
                daysOfDelivery.forEach((subitem) => {
                    let iDate = item.task_datetodelivery.toString();
                    let sDate = subitem.task_datetodelivery.toString();
                    if(iDate === sDate){
                        totalTasksOfDay += 1;
                    }
                });
                item.totalTasksOfDay = totalTasksOfDay;

                const finded = filteredDaysOfDelivery.find((subitem) => {
                    let iDate = item.task_datetodelivery.toString();
                    let sDate = subitem.task_datetodelivery.toString();
                    return iDate === sDate;
                });

                if(!finded){
                    filteredDaysOfDelivery.push(item);
                }

            });

            averageActivitiesDelivered = result.length !== 0 ? (result.length / filteredDaysOfDelivery.length).toFixed(2) : 0;

            return res.json({result, ...{totalActivities: result.length, totalHomeWork, averageActivitiesDelivered, filteredDaysOfDelivery }});
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

module.exports = queries;
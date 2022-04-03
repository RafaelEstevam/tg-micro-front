const axios = require('axios');
const { con } = require("./config.js");

const callback = (err, result, fields) => {
    if (err) {
        console.log(err.sqlMessage);
        return "error"
    };
}

module.exports = {
    async executeETL(){
        const {data} = await axios.get('http://localhost:8081/students');
        let courses = [];
        let classes = [];
        let students_courses = [];
        // let courses_classes = [];
        let students_classes = [];
        let comments = [];
        let tasks = [];

        const students = data.map((item) => {
            item.courses.map((subitem) => {
                const searched = courses.find((i) => {
                    return i.id === subitem.id
                });
                if(!searched){
                    courses = [...courses, ...[subitem]];
                }

                students_courses = [...students_courses, ...[{student_id: item.id, course_id: subitem.id }]]

                subitem.classes.map((c) => {
                    // const relationSearched = courses_classes.find((cc) => {
                    //     return cc.course_id === subitem.id && cc.class_id === c.id
                    // })

                    // if(!relationSearched){
                    //     courses_classes = [...courses_classes, ...[{course_id: subitem.id, class_id: c.id }]]
                    // }

                    const classSearched = classes.find((cl) => {
                        return cl.id === c.id;
                    })

                    if(!classSearched){
                        c.course_id = subitem.id
                        classes = [...classes, ...[c]];
                    }
                    
                    students_classes = [...students_classes, ...[{student_id: item.id, class_id: c.id }]]

                    c.comments.map((comment) => {
                        comments = [...comments, ...[{id: comment.id, student_id: item.id, class_id: c.id, comment: comment.comment }]]
                    })

                    c.tasks.map((task) => {
                        tasks = [...tasks, ...[{id: task.id, student_id: item.id, class_id: c.id, name: task.name }]]
                    });

                });
            })
            item.data.id = item.id;
            return item.data;
        });


        students.forEach(element => {
            con.query(`INSERT INTO students(id, student_name, student_email) values("${element.id}", "${element.name}", "${element.email}")`, callback)
        });

        courses.forEach(element => {
            con.query(`INSERT INTO courses(id, course_name) values("${element.id}", "${element.name}")`, callback)
        });

        classes.forEach(element => {
            con.query(`INSERT INTO classes(id, class_name, class_time, course_id) values("${element.id}", "${element.name}", "${element.time}", "${element.course_id}")`, callback)
        });

        students_courses.forEach(element => {
            con.query(`INSERT INTO students_courses(student_id, course_id) values("${element.student_id}", "${element.course_id}")`, callback)
        });

        // courses_classes.forEach(element => {
        //     con.query(`INSERT INTO courses_classes(course_id, class_id) values("${element.course_id}", "${element.class_id}")`, callback)
        // });

        comments.forEach(element => {
            con.query(`INSERT INTO comments(id, student_id, class_id, comment) values("${element.id}", "${element.student_id}", "${element.class_id}",  "${element.comment}")`, callback)
        });

        students_classes.forEach(element => {
            con.query(`INSERT INTO students_classes(student_id, class_id) values("${element.student_id}", "${element.class_id}")`, callback)
        });

        tasks.forEach(element => {
            con.query(`INSERT INTO tasks(id, student_id, class_id, task_name) values("${element.id}", "${element.student_id}", "${element.class_id}",  "${element.name}")`, callback)
        });

        // const result = await con.query("SELECT * FROM activation", function (err, result, fields) {
        //     if (err) throw err;
        //     return res.json(result);
        // });
    } 
}
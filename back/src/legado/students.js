module.exports = [
    {
        "id": 1,
        "data": {
            "name": "Aluno 1",
            "email": "aluno1@tg.com"
        },
        "courses": [
            {"id": 1, "name": "Matemática", "grade": 7.0, "classes" : [
                {"id": 1, "name": "Equação do 2º grau", "dateOfClass": "2021-04-05", comments: [
                    {"id": 1, "comment": "Essa equação não serve de nada."}
                ], tasks: [
                    {"id": 1, "name": "Dever de casa", "homeWork": false, "dateOfDelivery": "2021-04-05"},
                    {"id": 2, "name": "Atividade avaliativa", "homeWork": true, "grade": 8.0, "dateOfDelivery": "2021-04-05"},
                    {"id": 3, "name": "Atividade avaliativa", "homeWork": true, "grade": 6.0, "dateOfDelivery": "2021-06-20"},
                    {"id": 6, "name": "Atividade avaliativa", "homeWork": true, "grade": 6.0, "dateOfDelivery": "2021-06-20"},
                    {"id": 7, "name": "Atividade avaliativa", "homeWork": true, "grade": 7.0, "dateOfDelivery": "2021-06-20"},
                    {"id": 8, "name": "Atividade avaliativa", "homeWork": true, "grade": 6.5, "dateOfDelivery": "2021-07-20"},
                    {"id": 9, "name": "Atividade avaliativa", "homeWork": true, "grade": 9.0, "dateOfDelivery": "2021-07-20"}
                ], "time": 22},
                {"id": 2, "name": "Regra de três", "dateOfClass": "2021-04-05", comments: [
                    {"id": 2, "comment": "Como faço para calcular porcentagem?", answers: [
                        {"id": 1, "student_id": 2, "comment": "Você pode usar regra de três", "accept": true},
                        {"id": 2, "student_id": 1, "comment": "A ok, obrigado", "accept": false},
                        {"id": 3, "student_id": 3, "comment": "Você pode multiplicar o valor total pelo percentual que vc quer descobrir divido por 10. Ex: 100 (total) X (20 (percentual) / 10) = 20", "accept": false},
                    ] },
                ], tasks: [], "time": 32},
                {"id": 3, "name": "Fração", "dateOfClass": "2021-04-06", comments: [], tasks: [], "time": 24},
                {"id": 13, "name": "Multifplicação", "dateOfClass": "2021-04-06", comments: [], tasks: [], "time": 24},
                {"id": 14, "name": "Divisão", "dateOfClass": "2021-04-07", comments: [], tasks: [], "time": 24},
                {"id": 15, "name": "Adição", "dateOfClass": "2021-04-07", comments: [], tasks: [], "time": 24},
                {"id": 16, "name": "Subtração", "dateOfClass": "2021-04-07", comments: [], tasks: [], "time": 24},
                {"id": 17, "name": "Fatorial", "dateOfClass": "2021-04-08", comments: [], tasks: [], "time": 24},
            ]},
            {"id": 3, "name": "Português", "grade": 7.5, "classes": [
                {"id": 4, "name": "Ortografia", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 22},
                {"id": 5, "name": "Interpretação de texto", "dateOfClass": "2021-04-06", comments: [], tasks: [], "time": 32},
                {"id": 6, "name": "Gramática", "dateOfClass": "2021-04-07", comments: [], tasks: [], "time": 24}
            ]},
            {"id": 4, "name": "História","grade": 8.5, "classes": [
                {"id": 7, "name": "2º Guerra mundial", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 26},
                {"id": 8, "name": "Guerra Fria", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 20},
                {"id": 9, "name": "Chernobyl", "dateOfClass": "2021-04-07", comments: [], tasks: [], "time": 22}

            ]},
            {"id": 6, "name": "Física", "grade": 9, "classes": [
                {"id": 10, "name": "Bomba nuclear", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 22},
                {"id": 11, "name": "Buracos negros", "dateOfClass": "2021-04-06", comments: [], tasks: [], "time": 13},
                {"id": 12, "name": "Teoria da relatividade", "dateOfClass": "2021-04-06", comments: [], tasks: [], "time": 18}
            ]},
        ]
    },

    {
        "id": 2,
        "data": {
            "name": "Aluno 2",
            "email": "aluno2@tg.com"
        },
        "courses": [
            {"id": 3, "name": "Português", "grade": 7.0, "classes": [
                {"id": 4, "name": "Ortografia", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 22},
                {"id": 5, "name": "Interpretação de texto", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 32},
                {"id": 6, "name": "Gramática", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 24}
            ]},
            {"id": 6, "name": "Física", "grade": 6.0, "classes": [
                {"id": 10, "name": "Bomba nuclear", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 22},
                {"id": 11, "name": "Buracos negros", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 13},
                {"id": 12, "name": "Teoria da relatividade", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 18}
            ]},
            {"id": 10, "name": "Química", "grade": 7.5, "classes": []},
            {"id": 11, "name": "Inglês", "grade": 8.5, "classes": []},
        ]
    },
    {
        "id": 3,
        "data": {
            "name": "Aluno 3",
            "email": "aluno3@tg.com"
        },
        "courses": [
            {"id": 3, "name": "Português", "grade": 5.5, "classes": [
                {"id": 4, "name": "Ortografia", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 22},
                {"id": 5, "name": "Interpretação de texto", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 32},
                {"id": 6, "name": "Gramática", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 24}
            ]},
            {"id": 6, "name": "Física", "grade": 6.5, "classes": [
                {"id": 10, "name": "Bomba nuclear", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 22},
                {"id": 11, "name": "Buracos negros", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 13},
                {"id": 12, "name": "Teoria da relatividade", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 18}
            ]},
            {"id": 10, "name": "Química", "grade": 8.0, "classes": []},
            {"id": 11, "name": "Inglês", "grade": 9.0, "classes": []},
        ]
    },

    {
        "id": 4,
        "data": {
            "name": "Aluno 4",
            "email": "aluno4@tg.com"
        },
        "courses": [
            {"id": 1, "name": "Matemática", "grade": 7.5, "classes" : [
                {"id": 1, "name": "Equação do 2º grau", "dateOfClass": "2021-04-05", comments: [
                    {"id": 3, "comment": "Essa equação não serve de nada."}
                ], tasks: [
                    {"id": 4, "name": "Dever de casa"},
                    {"id": 5, "name": "Atividade avaliativa"}
                ], "time": 22},
                {"id": 2, "name": "Regra de três", "dateOfClass": "2021-04-05", comments: [
                    {"id": 2, "comment": "Como faço para calcular porcentagem?"},
                ], tasks: [], "time": 32},
                {"id": 3, "name": "Fração", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 24},
            ]},
            {"id": 3, "name": "Português", "grade": 7.0, "classes": [
                {"id": 6, "name": "Gramática", "dateOfClass": "2021-04-05", comments: [], tasks: [], "time": 24}
            ]}
        ]
    },
]
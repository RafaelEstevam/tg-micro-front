module.exports = [
    {
        "id": 1,
        "data": {
            "name": "Aluno 1",
            "email": "aluno1@tg.com"
        },
        "courses": [
            {"id": 1, "name": "Matemática", "classes" : [
                {"id": 1, "name": "Equação do 2º grau", comments: [
                    {"id": 1, "comment": "Essa equação não serve de nada."}
                ], tasks: [
                    {"id": 1, "name": "Dever de casa"},
                    {"id": 2, "name": "Atividade avaliativa"}
                ], "time": 22},
                {"id": 2, "name": "Regra de três", comments: [
                    {"id": 2, "comment": "Como faço para calcular porcentagem?"},
                ], tasks: [], "time": 32},
                {"id": 3, "name": "Fração", comments: [], tasks: [], "time": 24},
            ]},
            {"id": 3, "name": "Português", "classes": [
                {"id": 4, "name": "Ortografia", comments: [], tasks: [], "time": 22},
                {"id": 5, "name": "Interpretação de texto", comments: [], tasks: [], "time": 32},
                {"id": 6, "name": "Gramática", comments: [], tasks: [], "time": 24}
            ]},
            {"id": 4, "name": "História", "classes": [
                {"id": 7, "name": "2º Guerra mundial", comments: [], tasks: [], "time": 26},
                {"id": 8, "name": "Guerra Fria", comments: [], tasks: [], "time": 20},
                {"id": 9, "name": "Chernobyl", comments: [], tasks: [], "time": 22}

            ]},
            {"id": 6, "name": "Física", "classes": [
                {"id": 10, "name": "Bomba nuclear", comments: [], tasks: [], "time": 22},
                {"id": 11, "name": "Buracos negros", comments: [], tasks: [], "time": 13},
                {"id": 12, "name": "Teoria da relatividade", comments: [], tasks: [], "time": 18}
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
            {"id": 3, "name": "Português", "classes": [
                {"id": 4, "name": "Ortografia", comments: [], tasks: [], "time": 22},
                {"id": 5, "name": "Interpretação de texto", comments: [], tasks: [], "time": 32},
                {"id": 6, "name": "Gramática", comments: [], tasks: [], "time": 24}
            ]},
            {"id": 6, "name": "Física", "classes": [
                {"id": 10, "name": "Bomba nuclear", comments: [], tasks: [], "time": 22},
                {"id": 11, "name": "Buracos negros", comments: [], tasks: [], "time": 13},
                {"id": 12, "name": "Teoria da relatividade", comments: [], tasks: [], "time": 18}
            ]},
            {"id": 10, "name": "Química", "classes": []},
            {"id": 11, "name": "Inglês", "classes": []},
        ]
    }
]
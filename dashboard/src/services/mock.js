export default function mock(){
    return [
        {
            subject: 'Português',
            review: 7.5,
            class: 5,
            tasks: 3,
            jobs: 2,
            experience: {
                xp: 3500,
                level: 5,
                nextLevel: 45,
                currentLevel: 55
            },
            achievements: [
                { title: 'Mais participativo' },
                { title: 'Aluno presente' },
                { title: 'Mais colaborativo' }
            ],
            podium: {
                first: { student: 'Nome do aluno 1', avatar: 'http://192.168.0.14:3000/static/media/avatar.beda5535.jpg' },
                second: { student: 'Nome do aluno 2', avatar: 'http://192.168.0.14:3000/static/media/avatar.beda5535.jpg' },
                third: { student: 'Nome do aluno 3', avatar: 'http://192.168.0.14:3000/static/media/avatar.beda5535.jpg' }
            },
            carrossel: [
                { title: 'Tempo médio', subtitle: 'Estudo da matéria', value: 100.35, label: 'minutos' },
                { title: 'Quantidade média', subtitle: 'Atividades entregues', value: 20, label: 'por dia' },
            ],
            chart: [
                { date: '20-06', min: 38 },
                { date: '21-06', min: 52 },
                { date: '22-06', min: 61 },
                { date: '23-06', min: 45 },
                { date: '24-06', min: 48 },
                { date: '25-06', min: 38 },
                { date: '26-06', min: 38 },
            ],
            emphasis: { title: 'Destaque', subtitle: 'Aluno participativo' },
            chat: [
                { title: 'Interações nas aulas', value: 59 },
                { title: 'Mensagens para o professor', value: 45 },
            ],
            activities: [
                { title: 'Atividade 1', deadline: '20/06/2021' },
                { title: 'Atividade 2', deadline: '20/06/2021' },
                { title: 'Atividade 3', deadline: '20/06/2021' },
                { title: 'Atividade 4', deadline: '20/06/2021' }
            ]
        },
        {
            subject: 'Matemática',
            review: 4.5,
            class: 10,
            tasks: 0,
            jobs: 0,
            experience: {
                xp: 500,
                level: 5,
                nextLevel: 30,
                currentLevel: 70
            },
            achivements: [
                // {title: 'Mais participativo'},
                // {title: 'Aluno presente'},
                // {title: 'Mais colaborativo'}
            ],
            podium: {
                first: { student: 'Nome do aluno 1', avatar: 'http://192.168.0.14:3000/static/media/avatar.beda5535.jpg' },
                second: { student: 'Nome do aluno 2', avatar: 'http://192.168.0.14:3000/static/media/avatar.beda5535.jpg' },
                third: { student: 'Nome do aluno 3', avatar: 'http://192.168.0.14:3000/static/media/avatar.beda5535.jpg' }
            },
            carrossel: [
                { title: 'Tempo médio', subtitle: 'Estudo da matéria', value: 30, label: 'minutos' },
                { title: 'Quantidade média', subtitle: 'Atividades entregues', value: 1, label: '' },
            ],
            chart: [
                { date: '20-06', min: 12 },
                { date: '21-06', min: 32 },
                { date: '22-06', min: 23 },
                { date: '23-06', min: 54 },
                { date: '24-06', min: 32 },
                { date: '25-06', min: 76 },
                { date: '26-06', min: 12 },
            ],
            emphasis: { title: 'Destaque', subtitle: 'Aluno participativo' },
            chat: [
                { title: 'Interações nas aulas', value: 19 },
                { title: 'Mensagens para o professor', value: 25 },
            ],
            activities: [
                { title: 'Atividade 1', deadline: '20/06/2021' },
                { title: 'Atividade 2', deadline: '20/06/2021' },
                { title: 'Atividade 3', deadline: '20/06/2021' },
                { title: 'Atividade 4', deadline: '20/06/2021' }
            ]
        },
    
    ]

}
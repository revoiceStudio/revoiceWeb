import todayQuiz from './components/todayQuiz.vue'
import lastBread from './components/lastBread.vue'
export default [{
        path: '/',
        component: todayQuiz
    },
    {
        path: '/todayquiz',
        component: todayQuiz
    },
    {
        path: '/lastbread',
        component: lastBread
    }
]
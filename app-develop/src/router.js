import todayQuiz from "./components/todayQuiz.vue";
import lastBread from "./components/lastBread.vue";
import skyAir from "./components/skyAir.vue";
export default [
  {
    path: "/",
    component: todayQuiz
  },
  {
    path: "/todayquiz",
    component: todayQuiz
  },
  {
    path: "/lastbread",
    component: lastBread
  },
  {
    path: "/skyair",
    component: skyAir
  }
];

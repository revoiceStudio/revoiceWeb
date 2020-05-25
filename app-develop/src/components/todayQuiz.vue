<template>
  <div class="limiter">
    <div class="container-table100">
      <a href="/"><img id="main" src="../assets/nav_revoice.png"/></a>
      <div class="wrap-table100">
        <div class="dropdown">
          <button class="dropbtn">
            <h1>오늘의 퀴즈▼</h1>
          </button>
          <div class="dropdown-content">
            <a href="#/todayquiz">오늘의 퀴즈</a>
            <a href="#/lastbread">라스트 브레드</a>
            <a href="#/skyair">스카이 에어</a>
          </div>
        </div>
        <h1>시즌1 랭킹</h1>
        <div class="table">
          <div class="row header">
            <div id="ranking" class="cell">
              랭킹
            </div>
            <div class="cell">
              닉네임
            </div>
            <div class="cell">
              포인트
            </div>
            <div class="cell">
              최근 플레이
            </div>
            <div class="cell">
              지역
            </div>
          </div>

          <div
            class="row"
            v-for="(value, index) in users"
            :key="value"
            v-if="index < 20"
          >
            <div id="ranking" class="cell" data-title="Ranking">
              {{ index + 1 }}
            </div>
            <div class="cell" data-title="Full Name">
              {{ value.name }}
            </div>
            <div class="cell" data-title="Point">
              {{ value.user_point }}
            </div>
            <div class="cell" data-title="Recent Play">
              {{ value.play_dt }}
            </div>
            <div class="cell" data-title="Location">
              {{ value.locale }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TodayQuiz",
  data: function() {
    return {
      users: []
    };
  },
  methods: {
    getData: function() {
      let vm = this;
      axios
        .get("/todayQuiz")
        .then(res => {
          vm.users = res.data;
        })
        .catch(err => {
          console.log(err);
        });

      /* setInterval(() => {
      this.$store.dispatch('RETRIEVE_DATA_FROM_BACKEND')
      }, 10*1000)      
      */
    }
  },
  created() {
    this.getData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#ranking {
  width: 100px;
}
#main {
  position: absolute;
  top: 20px;
  left: 50px;
  width: 169px;
  height: 37px;
  cursor: pointer;
}
h1 {
  font-family: "Nanum Pen Script";
  margin-bottom: 25px;
  font-weigth: bold;
  display: inline;
}
.dropbtn {
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  width: 178.05px;
  margin: auto;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #6c7ae0;
}
</style>

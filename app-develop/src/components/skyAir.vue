<template>
  <div class="limiter">
    <div class="container-table100">
      <a href="/"><img id="main" src="../assets/nav_revoice.png"/></a>
      <div class="wrap-table100">
        <div class="dropdown">
          <button class="dropbtn">
            <h1>스카이 에어▼</h1>
          </button>
          <div class="dropdown-content">
            <a href="#/todayquiz">오늘의 퀴즈</a>
            <a href="#/lastbread">라스트 브레드</a>
            <a href="#/skyair">스카이 에어</a>
          </div>
        </div>
        <h1>항공권 추천 Top 5</h1>
        <div class="table">
          <div class="row header">
            <div class="location cell">
              출발지
            </div>
            <div class="location cell">
              도착지
            </div>
          </div>
          <div class="row">
            <div class="location cell" data-title="출발지">
              <input
                v-on:input="searchTypingOrigin"
                v-bind:value="ori_point"
                class="form-control"
                type="place"
                id="origin"
                name="ori_point"
                placeholder="ex)인천"
                autocomplete="off"
              />
              <div
                class="dropdown-content-search"
                v-bind:style="searchStyleOrigin"
              >
                <div v-for="origin in search" :key="origin.id">
                  <a v-on:click="searchOrigin"
                    >{{ origin.PlaceName }}({{ origin.PlaceId }})</a
                  >
                  <p>{{ origin.CountryName }}</p>
                </div>
              </div>
            </div>
            <div class="location cell" data-title="도착지">
              <input
                v-on:input="searchTypingDestination"
                v-bind:value="des_point"
                class="form-control"
                type="place"
                id="destination"
                name="des_point"
                placeholder="ex)로마"
                autocomplete="off"
              />
              <div
                class="dropdown-content-search"
                v-bind:style="searchStyleDestination"
              >
                <div v-for="destination in search" :key="destination.id">
                  <a v-on:click="searchDestination"
                    >{{ destination.PlaceName }}({{ destination.PlaceId }})</a
                  >
                  <p>{{ destination.CountryName }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="table">
          <div class="row header">
            <div class="date cell">
              출발 날짜
            </div>
            <div class="date cell">
              도착 날짜
            </div>
          </div>
          <div class="row">
            <div class="date cell" data-title="출발 날짜">
              <input
                v-model="out_date"
                class="form-control"
                type="date"
                id="outDate"
                name="outDate"
              />
            </div>
            <div class="date cell" data-title="도착 날짜">
              <input
                v-model="in_date"
                class="form-control"
                type="date"
                id="inDate"
                name="inDate"
              />
            </div>
          </div>
        </div>
        <div>
          <button class="btn-primary btn-lg btn-block" v-on:click="getData">
            항공권 조회
          </button>
        </div>
        <div class="row" v-for="value in sky" :key="value">
          {{ value.outItineraries.carrier }}
          {{ value.outItineraries.oriPoint }}
          {{ value.outItineraries.desPoint }}

          {{ value.outItineraries.outMonth }}
          {{ value.outItineraries.outDay }}
          {{ value.outItineraries.outHour }}
          {{ value.outItineraries.outMinute }}

          {{ value.outItineraries.inMonth }}
          {{ value.outItineraries.inDay }}
          {{ value.outItineraries.inHour }}
          {{ value.outItineraries.inMinute }}

          {{ value.inItineraries.carrier }}
          {{ value.inItineraries.oriPoint }}
          {{ value.inItineraries.desPoint }}

          {{ value.inItineraries.outMonth }}
          {{ value.inItineraries.outDay }}
          {{ value.inItineraries.outHour }}
          {{ value.inItineraries.outMinute }}

          {{ value.inItineraries.inMonth }}
          {{ value.inItineraries.inDay }}
          {{ value.inItineraries.inHour }}
          {{ value.inItineraries.inMinute }}

          {{ value.price }}
          <a
            style="margin:0"
            class="btn-primary btn-lg"
            v-bind:href="'https://www.skyscanner.co.kr/' + value.url"
            >선택</a
          >
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urlencode from "urlencode";
export default {
  name: "SkyAir",
  data: function() {
    return {
      sky: [],
      ori_point: "",
      des_point: "",
      out_date: "",
      in_date: "",
      search: [],
      searchStyleOrigin: {},
      searchStyleDestination: {}
    };
  },
  methods: {
    getData: function() {
      let vm = this;
      const outDate = this.out_date;
      const inDate = this.in_date;
      const parsedOutDate = outDate.split("-");
      const parsedInDate = inDate.split("-");
      axios
        .post("http://13.209.69.224:2020/web", {
          ori_point: this.ori_point,
          des_point: this.des_point,
          out_year: parsedOutDate[0],
          out_month: parsedOutDate[1],
          out_day: parsedOutDate[2],
          in_year: parsedInDate[0],
          in_month: parsedInDate[1],
          in_day: parsedInDate[2]
        })
        .then(res => {
          console.log(res.data);
          if (res.data.resultCode == "OK") {
            vm.sky = res.data.output.roundInfo;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTime: function() {
      let today = new Date();
      let startDay = new Date();
      let endDay = new Date();
      startDay.setDate(today.getDate() + 2);
      endDay.setDate(today.getDate() + 6);
      console.log(startDay, endDay);
    },
    searchOrigin: function(event) {
      console.log("이벤트 : ", event.target.innerHTML);
      this.ori_point = event.target.innerHTML;
      this.searchStyleOrigin = { display: "none" };
    },
    searchDestination: function(event) {
      console.log("이벤트 : ", event.target.innerHTML);
      this.des_point = event.target.innerHTML;
      this.searchStyleDestination = { display: "none" };
    },
    searchTypingOrigin: function(e) {
      const newValue = e.target.value;
      this.ori_point = newValue;
      let vm = this;
      const point = urlencode(newValue);
      console.log(newValue);
      console.log(point);
      this.searchStyleDestination = { display: "none" };
      this.searchStyleOrigin = { display: "block" };
      if (newValue == "") {
        this.searchStyleOrigin = { display: "none" };
      }
      axios
        .get(
          "https://www.skyscanner.co.kr/g/autosuggest-flights/KR/ko-KR/" +
            point +
            "?IsDestination=false&enable_general_search_v2=true"
        )
        .then(res => {
          console.log(res.data);
          vm.search = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchTypingDestination: function(e) {
      const newValue = e.target.value;
      this.des_point = newValue;
      let vm = this;
      const point = urlencode(newValue);
      console.log(newValue);
      console.log(point);
      this.searchStyleOrigin = { display: "none" };
      this.searchStyleDestination = { display: "block" };
      if (newValue == "") {
        this.searchStyleDestination = { display: "none" };
      }
      axios
        .get(
          "https://www.skyscanner.co.kr/g/autosuggest-flights/KR/ko-KR/" +
            point +
            "?IsDestination=false&enable_general_search_v2=true"
        )
        .then(res => {
          console.log(res.data);
          vm.search = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.location.cell {
  width: 240px;
  font-family: "Single Day";
}
.date.cell {
  width: 240px;
  font-family: "Single Day";
}
#origin,
#destination,
#outDate,
#inDate {
  width: 80%;
  margin: auto;
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
  font-family: "Single Day";
  margin-bottom: 25px;
  font-weigth: bold;
  display: inline;
}
input {
  text-align: center;
  width: 80%;
}
.wrap-table100 {
  position: absolute;
  max-width: 1000px;
  width: 85%;
  top: 50px;
}
.raw {
  background-color: #f9f9f9;
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

.dropdown-content-search {
  display: none;
  position: relative;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content-search a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  width: 178.05px;
  margin: auto;
}

.dropdown-content-search a:hover {
  background-color: #f1f1f1;
}
</style>

<template>
<div class="limiter">  
		<div class="container-table100">         
			<div class="wrap-table100">
        <h1>오늘의 퀴즈 시즌1 랭킹</h1>   
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
					
          <div class="row" v-bind:key="value" v-for="(value, index) in users" v-if="index < 20">
            <div id="ranking" class="cell" data-title="Ranking">
              {{ index + 1}}
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
export default {
  name: 'TodayQuiz',
  data:function(){
    return{
      users: []
    }
  },
  methods:{
    getData: function(){
        let vm = this
        axios.get('/todayQuiz')
        .then((res)=>{
          console.log(res.data)
          vm.users = res.data
        })
        .catch((err)=>{
          console.log(err)
        })
        
     /* setInterval(() => {
      this.$store.dispatch('RETRIEVE_DATA_FROM_BACKEND')
      }, 10*1000)      
      */
    }
  },
  created(){
    this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #ranking{
    width: 100px;
  }
  h1{
    margin-bottom : 25px;
    font-weigth: bold;
  }  
</style>
